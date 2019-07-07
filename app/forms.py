# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length
from app.models import User


class RegistrationForm(FlaskForm):
    registration_email = StringField(validators=[DataRequired(), Email(), Length(max=64)])
    registration_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64)])
    registration_password_confirm = PasswordField(validators=[EqualTo('registration_password')])

    def validate_registration_email(self, registration_email):
        user = User.query.filter_by(email=registration_email.data).first()
        if user is not None:
            raise ValidationError('Use a different email.')


class LoginForm(FlaskForm):
    login_email = StringField(validators=[DataRequired(), Email(), Length(max=64)])
    login_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64)])

    def validate_login_email(self, login_email):
        user = User.query.filter_by(email=login_email.data).first()
        if user is None:
            raise ValidationError('Wrong email')

    # def validate_login_password(self, login_password, login_email):
    #     user = User.query.filter_by(email=login_email.data).first()
    #     if not user.check_password(login_password.data):
    #         raise ValidationError('Wrong password')


class EditListForm(FlaskForm):
    todo_list_name = StringField(validators=[DataRequired(), Length(max=10)])


class EditTaskForm(FlaskForm):
    task_name = StringField(validators=[DataRequired(), Length(max=20)])
