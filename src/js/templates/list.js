export function list() {
    return `
    <div class="list" id="listDefault">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="list-main-block">
                    <div>
                        <table class="table table-bordered list-table">
                            <thead>
                            <tr>
                                <td>
                                    <img class="" src="img/datelist.png"
                                         alt="datelist">

                                </td>

                                <td id="listName">
                                    <div id="name"></div>
                                    <div class="input-group" id="editListGroup">
                                        <input type="text" class="form-control list-add-placeholder"
                                               placeholder="Edit list name..."
                                               aria-label="Rec uname" aria-describedby="button-addon2" id="editListTxt">

                                        <button class="btn btn-outline-secondary btn-add" type="button"
                                                id="editListBtn">Edit
                                        </button>
                                    </div>
                                </td>
                                <td>

                                    <div class="list-header-buttons">
                                        <img src="img/pencil.png" alt="pencil"
                                             id="editListLabel" data-list-id="">
                                        <img src="img/del.png" alt="del" id="delListLabel">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/add1.png" alt="add">
                                </td>
                                <td colspan="2">
                                    <div class="input-group" id="editTaskGroup">
                                        <input type="text" class="form-control list-add-placeholder"
                                               placeholder="Start typing here to create a task..."
                                               aria-label="Rec uname" aria-describedby="button-addon2" id="editTaskTxt">
                                        <button class="btn btn-outline-secondary btn-add" type="button"
                                                id="addTaskBtn">Add
                                            Task
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" name="test">
                                </td>
                                <td id="userID">Lorem ipsum dolor sit amet.</td>
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
                            <tr>
                                <td>
                                    <input type="checkbox" name="test">
                                </td>
                                <td>Lorem ipsum dolor sit amet consectetur a</td>
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
                            <tr>
                                <td>
                                    <input type="checkbox" name="test">
                                </td>
                                <td>Lorem ipsum dolor sit amet consectetur</td>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `

}