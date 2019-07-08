import $ from "jquery";
import {registrationSuccess} from "./templates/registrationSuccess";
import {signIn} from "./templates/signIn";
import {list} from "./templates/list";
import {task} from "./templates/task";
import {showAfterLogin, showValidationErrors} from "./templates/views";


const _requestsRoute = 'json/';

function _routeAjax(route) {
    if (typeof route === 'string') {
        return _requestsRoute + route
    } else {
        console.log('Wrong route')
    }
}


export function registrationRequest(form) {
    $.post(_routeAjax('registration'), {
        registration_email: form.children('#registrationEmail').val(),
        registration_password: form.children('#registrationPassword').val(),
        registration_password_confirm: form.children('#confirmRegistrationPassword').val(),
    }).done(function (response) {
        console.log(response);
        if (response['registration_response_status'] === 'registration_success') {
            $('main').html(registrationSuccess())
        } else {
            showValidationErrors(response, form)
        }
    }).fail(function () {
        console.log('No registration response')
    })
}

export function loginRequest(form) {
    $.post(_routeAjax('login'), {
        login_email: form.children('#loginEmail').val(),
        login_password: form.children('#loginPassword').val(),
    }).done(function (response) {
        if (response['login_response_status'] === 'login_success') {
            console.log(response['login_response_status']);
            console.log('===>', response);
            showAfterLogin(response['user_lists']);
        } else {
            showValidationErrors(response, form);
        }
    }).fail(function () {
        console.log('No login response');
    })
}

export function logoutRequest() {
    $.post(_routeAjax('logout'), {}).done(function (response) {
        if (response['logout_response_status'] === 'logout_success') {
            console.log(response['logout_response_status']);
            $('#userLogout').html('');
            $('main').html(signIn());
        }
    }).fail(function () {
        console.log('No logout response')
    })
}


export function addTODOListRequest() {
    $.post(_routeAjax('addTODOList'), {}).done(function (response) {
        console.log(response);
        $('#listContainer').append(list(response['current_list_id'], response['current_user_email']));
    }).fail(function () {
        console.log('No addTODOList response')
    })
}


export function delTODOListRequest(listId, delElement) {
    $.post(_routeAjax('delTODOList'), {
        list_id: listId
    }).done(function (response) {
        if (response['remove_list_response_status'] === 'remove_list_success') {
            delElement.remove();
        } else {
            console.log(response)
        }
    }).fail(function () {
        console.log('Fail del')
    })
}


export function editTODOListLabelRequest(form) {
    $.post(_routeAjax('editTODOListLabel'), {
        todo_list_id: form.data('list-id'),
        todo_list_name: form.children('#editListTxt').val()
    }).done(function (response) {
        console.log(response);
        if (response['edit_todo_list_status'] === 'success') {
            form.text(response['new_label'])
        } else {
            showValidationErrors(response, form);
        }

    }).fail(function () {
        console.log('List edit failed');
    });
}

export function addTask(form) {
    $.post(_routeAjax('addTask'), {
        task_id: form.data('list-id'),
        task_name: form.children('#editTaskTxt').val()
    }).done(function (response) {
        console.log(response);
        if (response['add_task_response_status'] === 'success') {
            form.parents('table').find('tbody').append(task(response['task_id'], response['task_priority'], response['task_name'], false))
        } else {
            showValidationErrors(response, form);
        }

    }).fail(function () {
        console.log('No addTask response')
    })
}

export function editTaskLabelRequest(form) {
    $.post(_routeAjax('editTaskLabel'), {
        task_id: form.data('list-id'),
        task_name: form.children('#editListTxt').val()
    }).done(function (response) {
        console.log(response);
        if (response['edit_task_status'] === 'success') {
            form.text(response['new_task_label'])
        } else {
            showValidationErrors(response, form);
        }

    }).fail(function () {
        console.log('List edit failed');
    });
}


export function delTaskRequest(taskId, delElement) {
    $.post(_routeAjax('delTask'), {
        task_id: taskId
    }).done(function (response) {
        if (response['remove_task_response_status'] === 'success') {
            delElement.remove();
        } else {
            console.log(response)
        }
    }).fail(function () {
        console.log('Fail task del')
    })
}

export function taskStatusChangeRequest(taskId) {
    $.post(_routeAjax('taskStatusChange'), {
        task_id: taskId
    }).done(function (response) {
        console.log(response)
    }).fail(function () {
        console.log('No task status change response')
    })

}

export function moveRequest(currentTask, otherTask, direction = 'up') {
    $.post(_routeAjax('moveTask'), {
        current_task_priority: currentTask.data('list-priority'),
        other_task_priority: otherTask.data('list-priority'),
    }).done(function (response) {
        console.log(response);
        if (response['move_task_up_response'] === 'success') {
            currentTask.data('list-priority', response['new_current_task_priority']);
            otherTask.data('list-priority', response['new_other_task_priority']);
            if (direction === 'up') otherTask.before(currentTask);
            if (direction === 'down') otherTask.after(currentTask);
        } else {
            console.log(response)
        }
    }).fail(function () {
        console.log('No response move up')
    })
}
