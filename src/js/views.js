import $ from "jquery";
import {logout} from "./templates/logout";
import {listsContainer} from "./templates/listsContainer";
import {button} from "./templates/button";
import {list} from "./templates/list";
import {task} from "./templates/task";


export function viewAfterLogin(userData) {
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
    let errorMsg = '';
    for (let i in response) {
        if (response.hasOwnProperty(i)) {
            for (let j = 0; j < response[i].length; j++) {
                errorMsg += response[i][j] + ' ';
            }
        }
    }
    form.children('#editListError').text(errorMsg);
    form.children('#editListError').addClass('label-error');

}