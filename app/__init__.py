# -*- coding: utf-8 -*-
from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__,
            static_url_path='',
            static_folder='templates',
            template_folder='templates')
app.config.from_object(Config)
cors = CORS(app, resources={r'/json/*': {'origins': '*'}})
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'

from app import routes, models, errors