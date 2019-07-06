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
            // let listId = $(this).parentsUntil('thead').find('#editListLabel').data('list-id'),
            //     listName = $(this).prev('#editListTxt').val(),
            //     change = $(this).parent();
            let form = $(this).parent();
            console.log(form);
            // editTODOListLabelRequest(listId, listName, change);

            editListValidate(form)


        });

        $(document).on('click', '#delListLabel', function () {
            let listId = $(this).data('list-id'),
                delElement = $(this).parentsUntil('#listDefault');
            delTODOListRequest(listId, delElement);

        });


        $(document).on('click', '#addTaskBtn', function () {
            let form = $(this).parentsUntil('tr').find('#editTaskGroup');
            console.log(form);
            addTaskValidate(form);
            // addTask(listId, taskLabel)
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
                if (response['login_response_status'] === 'wrong_login') {
                    console.log("wrong login");
                    $('#loginEmailError').addClass('label-error');
                    $('#loginEmailError').text('Wrong email')
                }
                if (response['login_response_status'] === 'wrong_password') {
                    console.log("wrong password");
                    $('#loginPasswordError').addClass('label-error');
                    $('#loginPasswordError').text('Wrong password')
                }
                if (response['login_response_status'] === 'login_success') {
                    console.log(response['login_response_status']);
                    console.log('===>', response);
                    // hideLogin();
                    showAfterLogin(response['user_lists']);
                } else {
                    console.log(response['login_response_status']);
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
                // $('#listName').text(response['current_user_email'] + ' new task!');
                // $('#editListLabel').attr('data-list-id', (response['current_list_id']));
                // $('#delListLabel').attr('data-list-id', (response['current_list_id']));
                // $('#editListBtn').attr('data-list-id', (response['current_list_id']));
                // $('#addTaskBtn').attr('data-list-id', (response['current_list_id']));
                console.log(response);
                // addTODOList();
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
                console.log(response['edit_todo_list_status']);
                if (response['edit_todo_list_status'] === 'success') {
                    form.text(response['new_label'])
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


        function showAfterLogin(userData) {
            console.log(userData);
            $('#userLogout').html(logout());
            $('main').html(listsContainer()).append(button());
            if (userData.length > 0) {
                for (let i in userData) {
                    $('#listContainer').append(list(userData[i].id, userData[i].label));
                    if (userData[i].tasks.length > 0) {
                        for (let j = 0; j < userData[i].tasks.length; j++) {
                            $(`#tbody${userData[i].id}`).append(task(userData[i].tasks[j].priority, userData[i].tasks[j].name));
                        }
                    }
                }
            }
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

    });
}




