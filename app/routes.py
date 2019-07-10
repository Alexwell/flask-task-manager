# -*- coding: utf-8 -*-
from flask import render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app import bp, db
from app.models import User, List, Tasks
from app.forms import RegistrationForm, LoginForm, EditListForm, EditTaskForm


def _ajax_route(route):
    _default_route = '/json/'
    if isinstance(route, str):
        return _default_route + route
    else:
        raise TypeError('route is not string')


def view_after_login():
    lists = List.query.filter_by(user_id=current_user.id, del_status=False).all()
    lists_json = []
    counter = 0
    for i in lists:
        lists_json.append(i.to_json())
        tasks = Tasks.query.filter_by(list_id=i.id, del_status=False).order_by(Tasks.priority).all()
        tasks_json = []
        for j in tasks:
            tasks_json.append((j.to_json()))

        lists_json[counter]['tasks'] = tasks_json
        counter += 1
    return jsonify({'user_lists': lists_json})


@bp.route('/')
@bp.route('/index')
def index():
    if current_user.is_authenticated:
        view_after_login()
        return render_template('index.html', login_status='logged_in')
    return render_template('index.html', login_status='not_logged')


@bp.route(_ajax_route('registration'), methods=['POST'])
def registration():
    form = RegistrationForm(request.form)
    if form.validate():
        user = User(email=form.registration_email.data)
        user.set_password(form.registration_password.data)
        db.session.add(user)
        db.session.commit()
        return jsonify({'registration_response_status': 'registration_success'})
    return jsonify(form.errors)


@bp.route(_ajax_route('login'), methods=['POST'])
def login():
    form = LoginForm(request.form)
    if form.validate():
        user = User.query.filter_by(email=form.login_email.data).first()
        if not user.check_password(form.login_password.data):
            return jsonify({'login_password': ['Wrong password.']})
        login_user(user)
        return jsonify({'login_response_status': 'login_success'})
    else:
        return jsonify(form.errors)


@bp.route(_ajax_route('login_success_view'), methods=['POST'])
@login_required
def login_success():
    return view_after_login()


@bp.route(_ajax_route('logout'), methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'logout_response_status': 'logout_success'})


@bp.route(_ajax_route('add_todo_list'), methods=['POST'])
@login_required
def add_todo_list():
    add_list = List(user_id=current_user.id)
    db.session.add(add_list)
    db.session.commit()
    list_id = List.query.filter_by(user_id=current_user.id).order_by(List.id.desc()).first()
    return jsonify({'current_user_email': current_user.email,
                    'current_list_id': list_id.id})


@bp.route(_ajax_route('del_todo_list'), methods=['POST'])
@login_required
def del_todo_list():
    list_to_del = List.query.filter_by(id=request.form['list_id']).first()
    if list_to_del:
        list_to_del.del_status = True
        db.session.commit()
        return jsonify({'remove_list_response_status': 'remove_list_success'})
    else:
        return jsonify({'remove_list_response_status': 'remove_list_failed'})


@bp.route(_ajax_route('edit_todo_list_label'), methods=['POST'])
@login_required
def edit_todo_list_label():
    form = EditListForm(request.form)
    if form.validate():
        list_to_change = List.query.filter_by(id=request.form['todo_list_id']).first()
        if list_to_change:
            list_to_change.label = request.form['todo_list_name']
            db.session.commit()
            return jsonify({'edit_todo_list_status': 'success',
                            'new_label': list_to_change.label})
        else:
            return jsonify({'edit_todo_list_status': 'wrong list id'})
    else:
        return jsonify(form.errors)


@bp.route(_ajax_route('add_task'), methods=['POST'])
@login_required
def add_task():
    form = EditTaskForm(request.form)
    if form.validate():
        task = Tasks(name=request.form['task_name'], list_id=request.form['task_id'])
        db.session.add(task)
        db.session.commit()
        task.priority = task.id
        db.session.commit()
        return jsonify({'add_task_response_status': 'success',
                        'task_id': task.id,
                        'task_priority': task.priority,
                        'task_name': task.name
                        })
    else:
        return jsonify(form.errors)


@bp.route(_ajax_route('edit_task_label'), methods=['POST'])
@login_required
def edit_task_label():
    form = EditTaskForm(request.form)
    if form.validate():
        task_to_change = Tasks.query.filter_by(id=request.form['task_id']).first()
        if task_to_change:
            task_to_change.name = request.form['task_name']
            db.session.commit()
            return jsonify({'edit_task_status': 'success',
                            'new_task_label': task_to_change.name})
        else:
            return jsonify({'edit_todo_list_status': 'wrong task id'})
    else:
        return jsonify(form.errors)


@bp.route(_ajax_route('del_task'), methods=['POST'])
@login_required
def del_task():
    task_to_del = Tasks.query.filter_by(id=request.form['task_id']).first()
    if task_to_del:
        task_to_del.del_status = True
        db.session.commit()
        return jsonify({'remove_task_response_status': 'success'})
    else:
        return jsonify({'remove_task_response_status': 'remove_list_failed'})


@bp.route(_ajax_route('move_task'), methods=['POST'])
@login_required
def move_task():
    current_task = Tasks.query.filter_by(priority=request.form['current_task_priority']).first()
    other_task = Tasks.query.filter_by(priority=request.form['other_task_priority']).first()
    if current_task and other_task:
        current_task.priority, other_task.priority = other_task.priority, current_task.priority
        db.session.commit()
        return jsonify({'move_task_up_response': 'success',
                        'new_current_task_priority': current_task.priority,
                        'new_other_task_priority': other_task.priority})
    else:
        return jsonify({'move_task_up_response_': 'move_task_up_failed'})


@bp.route(_ajax_route('task_status_change'), methods=['POST'])
@login_required
def task_status_change():
    task = Tasks.query.filter_by(id=request.form['task_id']).first()
    if task:
        if task.done_status:
            task.done_status = False
        else:
            task.done_status = True
        db.session.commit()
        return jsonify({'task_status_change_response_': 'success'})
    else:
        return jsonify({'task_status_change_response_': 'task_status_change_failed'})
