import $ from "jquery";
import validate from 'jquery-validation';
import {
    addTask, editTaskLabelRequest, editTODOListLabelRequest,
    loginRequest, registrationRequest
} from "./requests";

const _validateEmailMaxLength = 50;
const _validatePasswordMinLength = 7;
const _validatePasswordMaxLength = 64;
const _validateListMaxLength = 50;
const _validateTaskMaxLength = 70;


export function loginValidate(form) {
    $(form).validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength: _validateEmailMaxLength
            },
            password: {
                required: true,
                minlength: _validatePasswordMinLength,
                maxlength: _validatePasswordMaxLength
            }
        },
        submitHandler: function () {
            loginRequest(form);
        }
    });
}


export function registrationValidate(form) {
    $(form).validate({
        rules: {
            registration_email: {
                required: true,
                email: true,
                maxlength: _validateEmailMaxLength
            },
            registration_password: {
                required: true,
                minlength: _validatePasswordMinLength,
                maxlength: _validatePasswordMaxLength
            },
            registration_password_confirm: {
                equalTo: '#registrationPassword'
            }
        },
        submitHandler: function () {
            registrationRequest(form);
        }
    });

}


export function editListValidate(form) {
    $(form).validate({
        rules: {
            list_label: {
                required: true,
                maxlength: _validateListMaxLength
            }
        },
        submitHandler: function () {
            editTODOListLabelRequest(form);
        }
    });

}

export function addTaskValidate(form) {
    $(form).validate({
        rules: {
            task_label: {
                required: true,
                maxlength: _validateTaskMaxLength
            }
        },
        submitHandler: function () {
            addTask(form);
        }
    });
}


export function editTaskValidate(form) {
    $(form).validate({
        rules: {
            list_label: {
                required: true,
                maxlength: _validateTaskMaxLength
            }
        },
        submitHandler: function () {
            editTaskLabelRequest(form);
        }
    });
}