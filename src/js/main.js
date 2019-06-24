import $ from 'jquery';

import validate from 'jquery-validation';

export function main() {
    $(document).ready(function () {
        const _requestsRoute = '//127.0.0.1:5000/json/';
        const _validateMinLength = 3;
        const _validateMaxLength = 64;

        function routeAjax(route) {
            if (typeof route === 'string') {
                return _requestsRoute + route
            } else {
                console.log('Wrong route')
            }
        }


        // $('#signIn').click(function () {
        //     console.log('test');
        // });

        $('#registerNow').click(function () {
            hideLogin();
            showRegistration();
        });

        // function testRequest() {
        //     $.post(routeAjax('test'), {
        //         testParamStr: 'Hello from front end',
        //         testParamNumber: 29,
        //         testParamBull: true
        //     }).done(function (response) {
        //         for (let i in response) {
        //             console.log(i + ' ===> ' + response[i]);
        //         }
        //         if (response['response_bull']) {
        //             hideLogin();
        //             showAfterLogin();
        //         }
        //     }).fail(function () {
        //         console.log('No response')
        //     })
        // }

        function registrationRequest() {
            $.post(routeAjax('registration'), {
                registration_email: $('#registrationEmail').val(),
                registration_password: $('#registrationPassword').val(),
                registration_password_confirm: $('#confirmRegistrationPassword').val()
            }).done(function (response) {
                for (let i in response) {
                    console.log(i + ' ===> ' + response[i]);
                }
                if (response['response_bull']) {
                    console.log(response['response_test']);
                    hideRegistration();
                    showLogin();
                }
            }).fail(function () {
                console.log('No response')
            })
        }

        function loginRequest() {
            $.post(routeAjax('login'), {
                login_email: $('#loginEmail').val(),
                login_password: $('#loginPassword').val(),
            }).done(function (response) {
                for (let i in response) {
                    console.log(i + ' ===> ' + response[i]);
                }
                if (response['login_response_status']) {
                    console.log(response['login_response_status']);
                    hideLogin();
                    showAfterLogin();
                }
            }).fail(function () {
                console.log('No response')
            })
        }


        function showAfterLogin() {
            $('#listDefault, #buttonDefault').show('slow');
        }

        function showLogin() {
            $('#signInContainer').show('slow');
        }

        function hideLogin() {
            $('#signInContainer').hide();
        }

        function showRegistration() {
            $('#registration').show('slow')
        }

        function hideRegistration() {
            $('#registration').hide()
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
            submitHandler: function () {
                registrationRequest();
            }
        });
    });
}