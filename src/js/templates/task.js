export function task(taskPriority, taskName) {
    return `
    <tr data-list-priority ="${taskPriority}">
        <td>
            <input type="checkbox" name="test">
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
                     src="img/del_inner.png" alt="del">
                <img class="img-fluid"
                     src="img/pencil_inner.png"
                     alt="pencil">
            </div>
        </td>
    </tr>
    `
}