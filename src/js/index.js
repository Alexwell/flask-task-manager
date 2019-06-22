import $ from "jquery";
import jQuery from "jquery";
import popper from "popper.js";
import bootstrap from "bootstrap";


$(document).ready(function () {
    $('#signIn').click(function () {
        console.log('test');
        testRequest();
    });

    function testRequest() {
        $.post('/test', {
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

