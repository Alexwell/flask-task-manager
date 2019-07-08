import $ from "jquery";
import {logout} from "./logout";
import {listsContainer} from "./listsContainer";
import {button} from "./button";
import {list} from "./list";
import {task} from "./task";

export function showAfterLogin(userData) {
    console.log(userData);
    $('#userLogout').html(logout());
    $('main').html(listsContainer()).append(button());
    if (userData.length > 0) {
        for (let i in userData) {
            if (userData.hasOwnProperty(i)) {
                $('#listContainer').append(list(userData[i].id, userData[i].label));
                if (userData[i].hasOwnProperty('tasks') && userData[i].tasks.length > 0) {
                    for (let j = 0; j < userData[i].tasks.length; j++) {
                        $(`#tbody${userData[i].id}`).append(task(userData[i].tasks[j].id, userData[i].tasks[j].priority, userData[i].tasks[j].name, userData[i].tasks[j].done_status));
                    }
                }
            }
        }
    }
}


export function showValidationErrors(response, form) {
    form.children('label').show();
    console.log(response, form);
    let errorMsg = '';
    for (let i in response) {
        if (response.hasOwnProperty(i)) {
            for (let j = 0; j < response[i].length; j++) {
                errorMsg += response[i][j] + ' ';
            }
        }
    }
    console.log(errorMsg);
    form.children('#editListError').text(errorMsg);
    form.children('#editListError').addClass('label-error');

}