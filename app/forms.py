# -*- coding: utf-8 -*-
import re
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length
from app.models import User


def security_check(form, field):
    pattern = '(^[a-zA-Z.@_-]*)$'
    result = re.match(pattern, field.data)
    if not result:
        raise ValidationError('Use only letters, digits and .- _ @ ')




class RegistrationForm(FlaskForm):
    registration_email = StringField(validators=[DataRequired(), Email(), Length(max=64), security_check])
    registration_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64), security_check])
    registration_password_confirm = PasswordField(validators=[EqualTo('registration_password'), security_check])

    def validate_registration_email(self, registration_email):
        user = User.query.filter_by(email=registration_email.data).first()
        if user is not None:
            raise ValidationError('Use a different email.')


class LoginForm(FlaskForm):
    login_email = StringField(validators=[DataRequired(), Email(), Length(max=64), security_check])
    login_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64), security_check])

    def validate_login_email(self, login_email):
        user = User.query.filter_by(email=login_email.data).first()
        if user is None:
            raise ValidationError('Wrong email')

    # def validate_login_password(self, login_password, login_email):
    #     user = User.query.filter_by(email=login_email.data).first()
    #     if not user.check_password(login_password.data):
    #         raise ValidationError('Wrong password')


class EditListForm(FlaskForm):
    todo_list_name = StringField(validators=[DataRequired(), Length(max=10), security_check])


class EditTaskForm(FlaskForm):
    task_name = StringField(validators=[DataRequired(), Length(max=20), security_check])
