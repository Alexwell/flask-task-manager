import $ from 'jquery';

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

        $('#addTask').click(function () {
            addTask()
        });

        $(document).on('click', '#editListLabel', function () {
            // console.log(this);
            console.log('=====>  ', $(this).data('list-id'));
            // let listId = $(this).data('list-id');

            console.log($(this).parent());
            console.log($(this).parentsUntil('thead'));
            console.log($(this).parentsUntil('thead').find('div#editListGroup'));

            $(this).parentsUntil('thead').find('div#name').hide();  //TODO reshow
            $(this).parentsUntil('thead').find('div#editListGroup').show();

            // $(this).parent().text('test pencil');
            // $(this).parentsUntil('thead').text('test22');


            // let newName = editTODOListLabel(listId);
            // console.log(newName);
        });

        $(document).on('click', '#editListBtn', function () {
            let listId = $(this).data('list-id'),
                listName = $(this).prev().val(),  //TODO change prev()
                hide = $(this).parent();
            console.log(listName);

            editTODOListLabel(listId, listName, hide);

            // $(this).parent().hide();

        });






        function registrationRequest() {
            $.post(_routeAjax('registration'), {
                registration_email: $('#registrationEmail').val(),
                registration_password: $('#registrationPassword').val(),
                registration_password_confirm: $('#confirmRegistrationPassword').val()
            }).done(function (response) {
                console.log(response)
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
                    $('#loginEmailError').text('Email is not exist')
                }
                if (response['login_response_status'] === 'wrong_password') {
                    console.log("wrong password");
                    $('#loginPasswordError').addClass('label-error');
                    $('#loginPasswordError').text('Wrong password')
                }
                if (response['login_response_status'] === 'login_success') {
                    console.log(response['login_response_status']);
                    hideLogin();
                    showAfterLogin(response['user_data']);
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
                $('#editListBtn').attr('data-list-id', (response['current_list_id']));
                console.log(response);
                addTODOList();
            }).fail(function () {
                console.log('No addTODOList response')
            })
        }


        function editTODOListLabel(listId, listName, toHideContent) {

            // console.log('=========>',toHideContent);
            $.post(_routeAjax('editTODOListLabel'), {
                todo_list_id: listId,
                todo_list_name: listName
            }).done(function (response) {
                console.log(response['edit_todo_list_status']);
                toHideContent.hide();
                toHideContent.prev().text(response['edit_todo_list_status']);
                toHideContent.prev().show();
                // toHideContent.parent().text(response['edit_todo_list_status']);
                // changeListName(response['edit_todo_list_status'])

                // return response['edit_todo_list_status'];
            }).fail(function () {
                console.log('fail!!')
            });
        }


        function addTask() {
            $.post(_routeAjax('addTask'), {}).done(function (response) {
                console.log(response);
            }).fail(function () {
                console.log('No addTask response')
            })
        }


        function showAfterLogin(userData) {
            for (let i in userData) {
                console.log(i + '===>' + userData[i])
            }

            // $('#userEmail').text(userData.user_email);
            // $('#userID').text(userData.user_id);


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

        let listCounter = 1;


        function addTODOList() {
            // $('.list').css('visibility','visible');
            // $('#addTask').attr('id', 'addTask' + listCounter);
            // $('#listName').text(listCounter);
            $('#listsContainer').append($('#listContainer').html());
            $('#listsContainer>#listDefault').attr('id', 'listDefault' + listCounter);
            // $('#listsContainer #addTask').attr('id', 'listDefault' + listCounter);

            listCounter++;
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




