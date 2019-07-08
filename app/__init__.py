# -*- coding: utf-8 -*-
from flask import Flask, Blueprint
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# app = Flask(__name__,
#             static_url_path='',
#             static_folder='templates',
#             template_folder='templates')
# app.config.from_object(Config)
# cors = CORS(app, resources={r'/json/*': {'origins': '*'}})


db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'login'

bp = Blueprint('bp', __name__,
               static_url_path='',
               static_folder='templates',
               template_folder='templates')


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    app.register_blueprint(bp)
    return app


from app import routes, models, errors
