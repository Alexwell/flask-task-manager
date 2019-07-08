import $ from 'jquery';
import {header} from "./templates/header";
import {footer} from "./templates/footer";
import {signIn} from "./templates/signIn";
import {registration} from "./templates/registration";
import {editList} from "./templates/editList";
import {task} from "./templates/task";
import {
    logoutRequest, addTODOListRequest, delTODOListRequest,
    delTaskRequest, moveRequest, taskStatusChangeRequest
} from "./requests";

import {
    registrationValidate, loginValidate, editListValidate,
    addTaskValidate, editTaskValidate
} from "./validators";


export function main() {
    $(document).ready(function () {


        $('body').html(header()).append(footer());

        $('main').html(signIn());


        $(document).on('click', '#userLogout p', function () {
            logoutRequest()
        });


        $(document).on('click', '#registerNow', function () {
            $('main').html(registration());
        });

        $(document).on('click', '#signInLink', function () {
            $('main').html(signIn());
        });


        $(document).on('click', '#signIn', function () {
            loginValidate(($(this).parent()));
        });


        $(document).on('click', '#registrationBtn', function () {
            registrationValidate($(this).parent());
        });


        $(document).on('click', '#addTODOList', function () {
            addTODOListRequest();
        });


        $(document).on('click', '#editListLabel', function () {
            $(this).parentsUntil('thead').find('#name').html(editList($(this).data('list-id')));
        });


        $(document).on('click', '#editListBtn', function () {
            editListValidate($(this).parent())
        });

        $(document).on('click', '#delListLabel', function () {
            let listId = $(this).data('list-id'),
                delElement = $(this).parentsUntil('#listDefault');
            delTODOListRequest(listId, delElement);
        });


        $(document).on('click', '#addTaskBtn', function () {
            addTaskValidate($(this).parent());
        });


        $(document).on('click', '#editTaskLabel', function () {

            $(this).parents('tr').find('#userID').html(editList($(this).data('task-id'), 'task'));
        });


        $(document).on('click', '#editTaskBtn', function () {
            editTaskValidate($(this).parent())
        });


        $(document).on('focus', '#editListTxt, #editTaskTxt', function () {
            $(this).prev('label').hide()
        });


        $(document).on('click', '#delTaskLabel', function () {
            let taskId = $(this).data('task-id'),
                delElement = $(this).parentsUntil('tbody');
            delTaskRequest(taskId, delElement);
        });


        $(document).on('click', '#taskUp', function () {
            let currentTask = $(this).parents('tr'),
                otherTask = currentTask.prev('tr');
            if (otherTask.data('list-priority') !== undefined) {
                moveRequest(currentTask, otherTask, 'up');
            }
        });

        $(document).on('click', '#taskDown', function () {
            let currentTask = $(this).parents('tr'),
                otherTask = currentTask.next('tr');
            if (otherTask.data('list-priority') !== undefined) {
                moveRequest(currentTask, otherTask, 'down');
            }
        });


        $(document).on('change', '#taskStatus', function () {
            taskStatusChangeRequest($(this).data('task-id'));
        });


        $(document).on('mouseover', 'tbody tr:last-child', function () {
            $(this).children('td').addClass('hover-js')
        });

        $(document).on('mouseout click', 'tbody tr:last-child', function () {
            $(this).children('td').removeClass('hover-js')
        });

    });
}




