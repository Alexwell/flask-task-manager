export function list(listId,listName) {
    return `
    <div class="list" id="listDefault">
    <div class="container" id="listId" data-list-id="${listId}">
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
                                    <div id="name">${listName}</div>

                                <td>

                                    <div class="list-header-buttons">
                                        <img src="img/pencil.png" alt="pencil"
                                             id="editListLabel" data-list-id="${listId}">
                                        <img src="img/del.png" alt="del" id="delListLabel" data-list-id="${listId}">
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
                                                id="addTaskBtn" data-list-id="${listId}">Add
                                            Task
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
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