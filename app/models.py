# -*- coding: utf-8 -*-
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db, login


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    lists = db.relationship('List', backref='author', lazy='dynamic')

    # last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}, id {self.id}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(250))
    del_status = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tasks = db.relationship('Tasks', backref='list', lazy='dynamic')

    def __repr__(self):
        return f'<Label {self.label}, id {self.id}, user_id {self.user_id}, del_status {self.del_status}>'


class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    status = db.Column(db.Boolean, default=False, nullable=False)
    done_status = db.Column(db.Boolean, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))

    def __repr__(self):
        return f'<Name {self.name}, id {self.id}, status {self.status}, list_id {self.list_id}>'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
