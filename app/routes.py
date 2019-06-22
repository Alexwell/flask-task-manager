# -*- coding: utf-8 -*-
from flask import render_template, url_for, request, jsonify
from app import app


def ajax_route(route):
    default_route = '/api/'
    if isinstance(route, str):
        return default_route + route
    else:
        raise TypeError('route is not string')


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
    response_bull = not request.form['testParamBull']

    return jsonify({'response_str': response_str,
                    'response_int': response_int,
                    'response_float': response_float,
                    'response_bull': response_bull
                    })
