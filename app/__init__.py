# -*- coding: utf-8 -*-
from flask import Flask
from config import Config
from flask_cors import CORS

app = Flask(__name__,
            static_url_path='',
            static_folder='templates',
            template_folder='templates')
app.config.from_object(Config)
cors = CORS(app, resources={r'/api/*': {'origins': '*'}})
# CORS(app)

from app import routes, models, errors
