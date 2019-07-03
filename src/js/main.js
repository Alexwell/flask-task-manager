import $ from 'jquery';
import {signIn} from "./templates/signIn";
import {listsContainer} from "./templates/listsContainer";
import {list} from "./templates/list";


import validate from 'jquery-validation';


export function main() {
    $(document).ready(function () {
        const _requestsRoute = '//127.0.0.1:5000/json/';
        const _validateMinLength = 3;
        const _validateMaxLength = 64;


        const signInTemplate = signIn();
        const listsContainerTemplate = listsContainer();
        const listTemplate = list();


        function _routeAjax(route) {
            if (typeof route === 'string') {
                return _requestsRoute + route
            } else {
                console.log('Wrong route')
            }
        }


        $('main').html(signInTemplate);


        $('#registerNow').click(function () {
            hideLogin();
            showRegistration();
        });

        $('#signInLink').click(function () {
            hideRegistration();
            showLogin();
        });


        $('#userLogout').click(function () {
            logoutRequest()
        });

        $('#addTODOList').click(function () {
            addTODOListRequest();
        });


        $(document).on('click', '#editListLabel', function () {

            $(this).parentsUntil('thead').find('div#name').hide();
            $(this).parentsUntil('thead').find('div#editListGroup').show();

        });


        $(document).on('click', '#editListBtn', function () {
            let listId = $(this).data('list-id'),
                listName = $(this).prev().val(),  //TODO change prev()
                hideElement = $(this).parent();
            console.log(listName);

            editTODOListLabelRequest(listId, listName, hideElement);
        });

        $(document).on('click', '#delListLabel', function () {
            let listId = $(this).data('list-id'),
                hideElement = $(this).parentsUntil('div.list');

            delTODOListRequest(listId, hideElement);

        });


        $(document).on('click', '#addTaskBtn', function () {

            let listId = $(this).data('list-id'),
                taskLabel = $(this).prev().val(); //TODO change prev()
            // hideElement = $(this).parent();
            addTask(listId, taskLabel)

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
                    hideLogin();
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
                $('#editListLabel').attr('data-list-id', (response['current_list_id']));
                $('#delListLabel').attr('data-list-id', (response['current_list_id']));
                $('#editListBtn').attr('data-list-id', (response['current_list_id']));
                $('#addTaskBtn').attr('data-list-id', (response['current_list_id']));
                console.log(response);
                addTODOList();
            }).fail(function () {
                console.log('No addTODOList response')
            })
        }

        function delTODOListRequest(listId, hideElement) {
            $.post(_routeAjax('delTODOList'), {
                list_id: listId
            }).done(function (response) {
                if (response['remove_list_response_status'] === 'remove_list_success') {
                    hideElement.text('')
                }
            }).fail(function () {
                console.log('Fail del')
            })

        }


        function editTODOListLabelRequest(listId, listName, toHideContent) {
            $.post(_routeAjax('editTODOListLabel'), {
                todo_list_id: listId,
                todo_list_name: listName
            }).done(function (response) {
                console.log(response['edit_todo_list_status']);
                if (response['edit_todo_list_status'] === 'success') {
                    toHideContent.hide();
                    toHideContent.prev().text(response['new_label']);
                    toHideContent.prev().show();
                }

            }).fail(function () {
                console.log('List edit failed');
            });
        }


        function addTask(listId, taskLabel) {
            $.post(_routeAjax('addTask'), {
                task_list_id: listId,
                task_list_label: taskLabel
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
            for (let i in userData) {
                console.log(i + '===>' + userData[i].label)
            }

            console.log(userData);

            // $('#userEmail').text(userData.user_email);
            // $('#userID').text(userData.user_id);

            // $('#listDefault').html(testDivTest);
            $('main').html(listsContainer());
            $('#listContainer').html(list());
            $('#listContainer').append(list())
            $('#listDefault, #addTODOList, #userLogout').show('slow');
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

        // let listCounter = 1;


        function addTODOList() {
            // $('.list').css('visibility','visible');
            // $('#addTask').attr('id', 'addTask' + listCounter);
            // $('#listName').text(listCounter);
            $('#listsContainer').append($('#listContainer').html());
            // $('#listsContainer>#listDefault').attr('id', 'listDefault' + listCounter);
            // $('#listsContainer #addTask').attr('id', 'listDefault' + listCounter);

            // listCounter++;
            // addTODOListRequest();
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
    });
}




