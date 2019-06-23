import $ from 'jquery';

import validate from 'jquery-validation'

export function main() {
    $(document).ready(function () {
        const requestsRoute = '//127.0.0.1:5000/json/';
        const _validateMinLength = 2;

        function routeAjax(route) {
            if (typeof route === 'string') {
                return requestsRoute + route
            } else {
                console.log('Wrong route')
            }
        }


        $('#signIn').click(function () {
            console.log('test');
        });

        $('#registerNow').click(function () {
            hideLogin();
            showRegistration();
        });

        function testRequest() {
            $.post(routeAjax('test'), {
                testParamStr: 'Hello from front end',
                testParamNumber: 29,
                testParamBull: true
            }).done(function (response) {
                for (let i in response) {
                    console.log(i + ' ===> ' + response[i]);
                }
                if (response['response_bull']) {
                    hideLogin();
                    showAfterLogin();
                }
            }).fail(function () {
                console.log('No response')
            })
        }

        function registrationRequest() {
            $.post(routeAjax('registration'), {

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
                    maxlength: 35
                },
                password: {
                    required: true,
                    minlength: _validateMinLength,
                    maxlength: 35
                }
            },
            // success: 'valid',
            submitHandler: function () {
                testRequest();
            }
        });

        $('#registrationForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    maxlength: 35
                },
                password: {
                    required: true,
                    minlength: _validateMinLength,
                    maxlength: 35
                },
                passwordConfirm: {
                    equalTo: '#registrationPassword'
                }
            },
            submitHandler: function () {
                registrationRequest();
            }
        });
    });
}