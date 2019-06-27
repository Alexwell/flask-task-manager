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
            console.log(this);
            editTODOListLabel();
            console.log(2);
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
                $('#listName').text(response['current_user_email'] + ' new task!');
                $('#editListLabel').attr('data-list-id', (response['current_list_id']));
                console.log(response);
                addTODOList();
            }).fail(function () {
                console.log('No addTODOList response')
            })
        }

        function editTODOListLabel() {
            $.post(_routeAjax('editTODOListLabel'), {
                todo_list_label: $(this).data('list-id')
            }).done(function (response) {
                console.log('true!')
            }).fail(function () {
                console.log('fail!!')
            })
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




