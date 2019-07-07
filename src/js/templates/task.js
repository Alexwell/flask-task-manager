export function task(taskId, taskPriority, taskName, doneStatus) {
    if(doneStatus) doneStatus='checked';
    else doneStatus = '';
    return `
    <tr data-list-priority ="${taskPriority}">
        <td>
            <input type="checkbox" name="test" id="taskStatus" data-task-id="${taskId}" ${doneStatus}>
        </td>
        <td id="userID">${taskName}</td>
        <td>
            <div class="task-buttons">
                <div class="task-move">
                    <div class="task-up" id="taskUp"></div>
                    <div class="task-down" id="taskDown"></div>
                </div>
                <img class="img-fluid" src="img/move_inner.png"
                     alt="move">
                <img class="img-fluid img-mid"
                     src="img/del_inner.png" alt="del" id="delTaskLabel" data-task-id="${taskId}">
                <img class="img-fluid"
                     src="img/pencil_inner.png"
                     alt="pencil" id="editTaskLabel" data-task-id="${taskId}">
            </div>
        </td>
    </tr>
    `
}