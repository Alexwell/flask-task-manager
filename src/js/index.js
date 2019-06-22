import $ from "jquery";
import jQuery from "jquery";
import popper from "popper.js";
import bootstrap from "bootstrap";


$(document).ready(function () {
    const requestsRoute = '//127.0.0.1:5000/api/';

    function routeAjax(route) {
        if (typeof route === 'string'){
            return requestsRoute + route
        }
        else {
            console.log('Wrong route')
        }
    }


    $('#signIn').click(function () {
        console.log('test');
        testRequest();
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
        }).fail(function () {
            console.log('No response')
        })
    }
});

