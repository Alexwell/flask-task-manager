# -*- coding: utf-8 -*-
from datetime import datetime
from flask import render_template, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app import app, db
from app.models import User, List, Tasks
from app.forms import RegistrationForm, LoginForm


def ajax_route(route):
    _default_route = '/json/'
    if isinstance(route, str):
        return _default_route + route
    else:
        raise TypeError('route is not string')


# @app.before_request
# def before_request():
#     if current_user.is_authenticated:
#         current_user.last_seen = datetime.utcnow()
#         db.session.commit()


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route(ajax_route('registration'), methods=['POST'])
def registration():
    for k in request.form:
        print(f'{k} ===> {request.form[k]}')
    if current_user.is_authenticated:
        return jsonify({'response_test': 'user_already signed in!'})

    form = RegistrationForm(request.form)
    print(form.validate())
    if form.validate():
        check_user = User.query.filter_by(email=form.registration_email.data).first()
        if check_user is not None:
            return jsonify({'registration_response_status': 'email_already_exist'})
        user = User(email=form.registration_email.data)
        user.set_password(form.registration_password.data)
        db.session.add(user)
        db.session.commit()
        return jsonify({'registration_response_status': 'registration_success'})

    return jsonify({'response_test': 'Not registered!'})


@app.route(ajax_route('login'), methods=['POST'])
def login():
    _test_tasks1 = [{'task_id': 777,
                     'task_label': 'test task label 1 !!',
                     'task_status': False,
                     },
                    {'task_id': 888,
                     'task_label': 'test task label 2!!',
                     'task_status': True,
                     },
                    {'task_id': 555,
                     'task_label': 'test task label 3!!',
                     'task_status': False,
                     }
                    ]

    _test_tasks2 = [{'task_id': 222,
                     'task_label': 'test task label 3.1!!',
                     'task_status': False,
                     },
                    {'task_id': 444,
                     'task_label': 'test task label 4!!',
                     'task_status': True,
                     },
                    {'task_id': 999,
                     'task_label': 'test task label 5 !!',
                     'task_status': True,
                     }
                    ]

    if current_user.is_authenticated:
        return jsonify({'login_test': 'user_already signed in!'})
    form = LoginForm(request.form)
    if form.validate():
        user = User.query.filter_by(email=form.login_email.data).first()
        if user is None:
            return jsonify({'login_response_status': 'wrong_login'})
        if not user.check_password(form.login_password.data):
            return jsonify({'login_response_status': 'wrong_password'})

        lists = List.query.filter_by(user_id=user.id, del_status=False).all()
        lists_json = []
        # print(lists)
        counter = 0
        for i in lists:
            print(i.id)
            # tasks = Tasks.query.filter_by(list_id=i.id, del_status=False).all()
            lists_json.append(i.to_json())
            # lists_json.append(_test_tasks1)
            lists_json[counter]['tasks'] = _test_tasks1
            counter += 1

        print(lists_json)
        # print(lists_json[1]['tasks'])

        # lists_id, lists_label, lists_tasks = [], [], []
        # for i in lists:
        #     lists_id.append(i.id)
        #     lists_label.append(i.label)
        # print(lists_id)
        login_user(user)
        # return jsonify({'login_response_status': 'login_success',
        #                 'user_data': {
        #                     'user_email': user.email,
        #                     'user_id': user.id,
        #                     'user_lists': {'lists_id': lists_id,
        #                                    'lists_label': lists_label,
        #                                    # 'lists_tasks': lists_tasks,
        #                                    }
        #                 }
        #                 })

        return jsonify({'login_response_status': 'login_success',
                        'lists_json': lists_json})

    return jsonify({'login_test': 'Not logged'})


@app.route(ajax_route('logout'), methods=['POST'])
def logout():
    logout_user()
    return jsonify({'logout_response_status': 'logout_success'})


@app.route(ajax_route('addTODOList'), methods=['POST'])
@login_required
def add_todo_list():
    print(current_user.is_authenticated)
    print(current_user.email)
    print(current_user.id)
    add_list = List(label=current_user.email, user_id=current_user.id)
    db.session.add(add_list)
    db.session.commit()
    list_id = List.query.filter_by(user_id=current_user.id).order_by(List.id.desc()).first()
    print(f'===> {list_id.id}')
    return jsonify({'current_user_email': current_user.email,
                    'current_list_id': list_id.id})


@app.route(ajax_route('delTODOList'), methods=['POST'])
@login_required
def del_todo_list():
    for i in request.form:
        print(i, '===> ', request.form[i])
    list_to_del = List.query.filter_by(id=request.form['list_id']).first()
    print(list_to_del)
    if list_to_del:
        print(list_to_del.del_status)
        list_to_del.del_status = True
        print(list_to_del.del_status)
        db.session.commit()
        return jsonify({'remove_list_response_status': 'remove_list_success'})
    else:
        return jsonify({'remove_list_response_status': 'remove_list_failed'})


@app.route(ajax_route('editTODOListLabel'), methods=['POST'])
@login_required
def edit_todo_list_label():
    for i in request.form:
        print(i, '===> ', request.form[i])

    list_to_change = List.query.filter_by(id=request.form['todo_list_id']).first()
    if list_to_change:
        list_to_change.label = request.form['todo_list_name']
        db.session.commit()
        return jsonify({'edit_todo_list_status': 'success',
                        'new_label': list_to_change.label})
    else:
        return jsonify({'edit_todo_list_status': 'wrong list id'})


@app.route(ajax_route('addTask'), methods=['POST'])
@login_required
def add_task():
    print(current_user.email)
    task = Tasks(name=current_user.email, list_id=777)
    db.session.add(task)
    db.session.commit()
    return jsonify({'addTask_response_status': 'addTask_success'})
