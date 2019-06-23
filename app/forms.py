# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length
from app.models import User


class RegistrationForm(FlaskForm):
    registration_email = StringField('Email', validators=[DataRequired(), Email()])
    registration_password = PasswordField('Password', validators=[DataRequired()])
    registration_password_confirm = PasswordField('Repeat password',
                                                  validators=[DataRequired(), EqualTo('registration_password')])
    registration_password_submit = SubmitField('Register')

    # def validate_email(self, email):
    #     user = User.query.filter_by(email=email.data).first()
    #     if user is not None:
    #         raise ValidationError('Use a different email.')
