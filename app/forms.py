# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length



class RegistrationForm(FlaskForm):
    registration_email = StringField(validators=[DataRequired(), Email(), Length(max=64)])
    registration_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64)])
    registration_password_confirm = PasswordField(validators=[EqualTo('registration_password')])

    # def validate_registration_email(self, registration_email):
    #     user = User.query.filter_by(email=registration_email.data).first()
    #     if user is not None:
    #         raise ValidationError('Use a different email.')


class LoginForm(FlaskForm):
    login_email = StringField(validators=[DataRequired(), Email(), Length(max=64)])
    login_password = PasswordField(validators=[DataRequired(), Length(min=3, max=64)])


class EditListForm(FlaskForm):
    todo_list_name = StringField(validators=[DataRequired(), Length(max=10)])
