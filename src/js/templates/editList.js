export function editList() {
    return `
     <div class="input-group" id="editListGroup">
        <input type="text" class="form-control list-add-placeholder"
               placeholder="Edit list name..."
               aria-label="Rec uname" aria-describedby="button-addon2" id="editListTxt">
        <button class="btn btn-outline-secondary btn-add" type="button"
                id="editListBtn">Edit
        </button>
    </div>
    `

}