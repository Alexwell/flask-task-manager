# -*- coding: utf-8 -*-
from datetime import datetime
from flask import render_template, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app import app, db
from app.models import User
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


@app.route(ajax_route('test'), methods=['POST'])
def test():
    for i in request.form:
        print(f'{i} ===> {request.form[i]}')

    response_str = request.form['testParamStr'] + '! Hello from back end!'
    response_int = int(request.form['testParamNumber']) + 71
    response_float = float(request.form['testParamNumber']) + 71.8
    response_bull = True

    return jsonify({'response_str': response_str,
                    'response_int': response_int,
                    'response_float': response_float,
                    'response_bull': response_bull
                    })


@app.route(ajax_route('registration'), methods=['POST'])
def registration():
    for i in request.form:
        print(f'{i} ===> {request.form[i]}')
    if current_user.is_authenticated:
        return jsonify({'response_test': 'user_already signed in!'})

    form = RegistrationForm(request.form)
    print(form.validate())
    if form.validate():
        user = User(email=form.registration_email.data)
        user.set_password(form.registration_password.data)
        db.session.add(user)
        db.session.commit()
        return jsonify({'response_test': 'Registration success!',
                        'response_bull': True})

    return jsonify({'response_test': 'Not registered!'})


@app.route(ajax_route('login'), methods=['POST'])
def login():
    for i in request.form:
        print(f'{i} ===> {request.form[i]}')

    if current_user.is_authenticated:
        return jsonify({'login_test': 'user_already signed in!'})
    form = LoginForm(request.form)
    print(form.validate())
    if form.validate():
        user = User.query.filter_by(email=form.login_email.data).first()
        if user is None or not user.check_password(form.login_password.data):
            return jsonify({'login_response_status': False})
        login_user(user)
        return jsonify({'login_response_status': True})
    return jsonify({'login_test': 'Not logged'})
