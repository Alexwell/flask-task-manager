import $ from 'jquery';
import {signIn} from "./templates/signIn";
import {listsContainer} from "./templates/listsContainer";
import {list} from "./templates/list";
import {logout} from "./templates/logout";
import {button} from "./templates/button";
import {editList} from "./templates/editList";
import {task} from "./templates/task";


import validate from 'jquery-validation';


export function main() {
    $(document).ready(function () {
        const _requestsRoute = '//127.0.0.1:5000/json/';
        const _validateMinLength = 3;
        const _validateMaxLength = 64;


        function _routeAjax(route) {
            if (typeof route === 'string') {
                return _requestsRoute + route
            } else {
                console.log('Wrong route')
            }
        }


        $('main').html(signIn());


        $('#registerNow').click(function () {
            hideLogin();
            showRegistration();
        });

        $('#signInLink').click(function () {
            hideRegistration();
            showLogin();
        });


        $('#userLogout p').click(function () {
            logoutRequest()
        });


        $(document).on('click', '#taskUp', function () {
            console.log('Up!!!')
        });

        $(document).on('click', '#taskDown', function () {
            console.log('Down!!!')
        });


        $(document).on('click', '#addTODOList', function () {
            addTODOListRequest();
        });


        $(document).on('click', '#editListLabel', function () {
            $(this).parentsUntil('thead').find('#name').html(editList($(this).data('list-id')));
        });


        $(document).on('click', '#editListBtn', function () {
            editListValidate($(this).parent())
        });

        $(document).on('click', '#delListLabel', function () {
            let listId = $(this).data('list-id'),
                delElement = $(this).parentsUntil('#listDefault');
            delTODOListRequest(listId, delElement);

        });


        $(document).on('click', '#addTaskBtn', function () {
            addTaskValidate($(this).parent());
        });


        $(document).on('click', '#editTaskLabel', function () {

            $(this).parents('tr').find('#userID').html(editList($(this).data('task-id'), 'task'));
        });


        $(document).on('click', '#editTaskBtn', function () {
            editTaskValidate($(this).parent())
        });


        function registrationRequest() {
            $.post(_routeAjax('registration'), {
                registration_email: $('#registrationEmail').val(),
                registration_password: $('#registrationPassword').val(),
                registration_password_confirm: $('#confirmRegistrationPassword').val()
            }).done(function (response) {
                console.log(response);
                if (response['registration_response_status'] === 'email_already_exist') {
                    console.log("wrong mail");
                    $('#emailValidationError').addClass('label-error');
                    $('#emailValidationError').text('Email already exist')
                }
                if (response['registration_response_status'] === 'registration_success') {
                    hideRegistration();
                    showLogin();
                }
            }).fail(function () {
                console.log('No registration response')
            })
        }

        function loginRequest() {
            $.post(_routeAjax('login'), {
                login_email: $('#loginEmail').val(),
                login_password: $('#loginPassword').val(),
            }).done(function (response) {
                // if (response['login_response_status'] === 'wrong_login') {
                //     console.log("wrong login");
                //     $('#loginEmailError').addClass('label-error');
                //     $('#loginEmailError').text('Wrong email')
                // }
                if (response['login_response_status'] === 'wrong_password') {
                    console.log("wrong password");
                    $('#loginPasswordError').addClass('label-error');
                    $('#loginPasswordError').text('Wrong password')
                } else if (response['login_response_status'] === 'login_success') {
                    console.log(response['login_response_status']);
                    console.log('===>', response);
                    // hideLogin();
                    showAfterLogin(response['user_lists']);
                } else {
                    console.log(response);
                    let errorMsg = '';
                    for (let i in response) {
                        if (response[i].length > 0) {
                            for (let j = 0; j < response[i].length; j++) {
                                errorMsg += response[i][j] + ' ';
                            }
                        }
                    }
                    console.log(errorMsg);
                    $('#loginEmailError').addClass('label-error');
                    $('#loginEmailError').text(errorMsg)
                }
            }).fail(function () {
                console.log('No login response');
            })
        }

        function logoutRequest() {
            $.post(_routeAjax('logout'), {}).done(function (response) {

                if (response['logout_response_status'] === 'logout_success') {
                    console.log(response['logout_response_status']);
                    hideAfterLogin();
                    showLogin();
                }
            }).fail(function () {
                console.log('No logout response')
            })

        }


        function addTODOListRequest() {
            $.post(_routeAjax('addTODOList'), {}).done(function (response) {
                console.log(response);
                $('#listContainer').append(list(response['current_list_id'], response['current_user_email']));
            }).fail(function () {
                console.log('No addTODOList response')
            })
        }

        function delTODOListRequest(listId, delElement) {
            $.post(_routeAjax('delTODOList'), {
                list_id: listId
            }).done(function (response) {
                if (response['remove_list_response_status'] === 'remove_list_success') {
                    delElement.remove();
                }
            }).fail(function () {
                console.log('Fail del')
            })
        }

        function editTODOListLabelRequest(form) {
            $.post(_routeAjax('editTODOListLabel'), {
                todo_list_id: form.data('list-id'),
                todo_list_name: form.children('#editListTxt').val()
            }).done(function (response) {
                console.log(response);
                if (response['edit_todo_list_status'] === 'success') {
                    form.text(response['new_label'])
                } else {
                    showValidationErrors(response, form);
                }

            }).fail(function () {
                console.log('List edit failed');
            });
        }

        function addTask(form) {
            $.post(_routeAjax('addTask'), {
                task_list_id: form.data('list-id'),
                task_list_label: form.children('#editTaskTxt').val()
            }).done(function (response) {
                console.log(response);
                if (response['add_task_response_status'] === 'success') {
                    // toHideContent.hide();
                    // toHideContent.prev().text(response['new_label']);
                    // toHideContent.prev().show();
                }
            }).fail(function () {
                console.log('No addTask response')
            })
        }

        function editTaskLabelRequest(form) {
            $.post(_routeAjax('editTaskLabel'), {
                task_id: form.data('list-id'),
                task_name: form.children('#editListTxt').val()
            }).done(function (response) {
                console.log(response);
                if (response['edit_task_status'] === 'success') {
                    form.text(response['new_task_label'])
                } else {
                    showValidationErrors(response, form);
                }

            }).fail(function () {
                console.log('List edit failed');
            });
        }


        function showAfterLogin(userData) {
            console.log(userData);
            $('#userLogout').html(logout());
            $('main').html(listsContainer()).append(button());
            if (userData.length > 0) {
                for (let i in userData) {
                    $('#listContainer').append(list(userData[i].id, userData[i].label));
                    if (userData[i].tasks.length > 0) {
                        for (let j = 0; j < userData[i].tasks.length; j++) {
                            $(`#tbody${userData[i].id}`).append(task(userData[i].tasks[j].id, userData[i].tasks[j].priority, userData[i].tasks[j].name));
                        }
                    }
                }
            }
        }

        function showValidationErrors(response, form) {
            console.log(response, form);
            let errorMsg = '';
            for (let i in response) {
                if (response[i].length > 0) {
                    for (let j = 0; j < response[i].length; j++) {
                        errorMsg += response[i][j] + ' ';
                    }
                }
            }
            console.log(errorMsg);
            form.children('#editListError').text(errorMsg);
            form.children('#editListError').addClass('label-error');

        }


        function hideAfterLogin() {
            $('#listsContainer, #addTODOList, #userLogout').hide();
        }

        function showLogin() {
            $('#signInContainer').show('slow');
        }

        function hideLogin() {
            $('#signInContainer').hide();
        }

        function showRegistration() {
            $('#registration').show('slow');
        }

        function hideRegistration() {
            $('#registration').hide();
        }


        $('#loginForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    maxlength: _validateMaxLength
                },
                password: {
                    required: true,
                    minlength: _validateMinLength,
                    maxlength: _validateMaxLength
                }
            },
            // success: 'valid',
            submitHandler: function () {
                loginRequest();
            }
        });


        $('#registrationForm').validate({
            rules: {
                registration_email: {
                    required: true,
                    email: true,
                    maxlength: _validateMaxLength
                },
                registration_password: {
                    required: true,
                    minlength: _validateMinLength,
                    maxlength: _validateMaxLength
                },
                registration_password_confirm: {
                    equalTo: '#registrationPassword'
                }
            },
            // messages: {
            //     registration_email: {
            //         required: 'test required',
            //         email: 'test mail'
            //     }
            // },
            // errorPlacement: function (error, element) {
            //     $('#errorTxt').append(error)
            //
            // },
            submitHandler: function () {
                registrationRequest();
            }
        });


        function addTaskValidate(form) {
            $(form).validate({
                rules: {
                    task_label: {
                        required: true,
                        // minlength: _validateMinLength,
                        maxlength: _validateMaxLength
                    }
                },
                submitHandler: function () {
                    addTask(form);
                }
            });

        }


        function editListValidate(form) {
            $(form).validate({
                rules: {
                    list_label: {
                        required: true,
                        maxlength: _validateMaxLength
                    }
                },
                submitHandler: function () {
                    editTODOListLabelRequest(form);
                }
            });

        }

        function editTaskValidate(form) {
            $(form).validate({
                rules: {
                    list_label: {
                        required: true,
                        maxlength: _validateMaxLength
                    }
                },
                submitHandler: function () {
                    editTaskLabelRequest(form);
                }
            });
        }

    });
}




