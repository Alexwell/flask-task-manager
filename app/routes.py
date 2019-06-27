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
    if current_user.is_authenticated:
        return jsonify({'login_test': 'user_already signed in!'})
    form = LoginForm(request.form)
    if form.validate():
        user = User.query.filter_by(email=form.login_email.data).first()
        if user is None:
            return jsonify({'login_response_status': 'wrong_login'})
        if not user.check_password(form.login_password.data):
            return jsonify({'login_response_status': 'wrong_password'})

        login_user(user)
        return jsonify({'login_response_status': 'login_success',
                        'user_data': {
                            'user_email': user.email,
                            'user_id': user.id,
                        }
                        })
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
    return jsonify({'addTODOList_response_status': 'addTODOList_success'})


@app.route(ajax_route('addTask'), methods=['POST'])
@login_required
def add_task():
    print(current_user.email)
    task = Tasks(name=current_user.email, list_id=777)
    db.session.add(task)
    db.session.commit()
    return jsonify({'addTask_response_status': 'addTask_success'})
