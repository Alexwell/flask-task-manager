export function task(taskName) {
    return `
    <tr>
        <td>
            <input type="checkbox" name="test">
        </td>
        <td id="userID">${taskName}</td>
        <td>
            <div class="task-buttons">
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