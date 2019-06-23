import $ from "jquery";

import validate from "jquery-validation"

export function main() {
    $(document).ready(function () {
        const requestsRoute = '//127.0.0.1:5000/json/';

        function routeAjax(route) {
            if (typeof route === 'string') {
                return requestsRoute + route
            } else {
                console.log('Wrong route')
            }
        }


        $('#signIn').click(function () {
            console.log('test');
            // if (validateLogin()) {
            //     testRequest();
            // }
            // showAfterLogin();
            // hideLogin();
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
                    showAfterLogin();
                    hideLogin();
                }
            }).fail(function () {
                console.log('No response')
            })
        }

        function showAfterLogin() {
            $("#listDefault, #buttonDefault, #registrationContainer").show("slow");
        }

        function hideLogin() {
            $("#signInContainer").hide();
        }

        $('#loginForm').validate({

            //TODO
            //
            // errorPlacement: function (error, element) {
            //
            //     error.insertBefore('#errorField');
            // },

            rules: {
                email: {
                    required: true,
                    email: true,
                    maxlength: 35
                },
                password: {
                    required: true,
                    // rangelength: [7, 35]
                    minlength: 7,
                    maxlength: 35
                }
            },
            // success: "valid",
            submitHandler: function () {
                testRequest();
            }
        });
    });
}