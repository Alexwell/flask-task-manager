export function editList(listId) {
    return `
     <form class="input-group" id="editListGroup" data-list-id="${listId}">
        <label for="editListTxt" class="sr-only" id="editListError">Task name</label>
        <input type="text" class="form-control list-add-placeholder"
               placeholder="Edit list name..."
               aria-label="Rec uname" aria-describedby="button-addon2" id="editListTxt" name="list_label">
        <button class="btn btn-outline-secondary btn-add" type="submit"
                id="editListBtn" >Edit
        </button>
    </form>
    `

}