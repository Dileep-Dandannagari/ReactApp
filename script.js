const mainContainer = document.querySelector("main");
const notesContainer = document.querySelector(".notes-container")
const addNotesBtn = document.querySelector("#add-notes-btn");


let myNotes = JSON.parse(localStorage.getItem("notes")) || [];

addNotesBtn.addEventListener("click", function () {
    myNotes.push({
        note: "",
        id: Date.now()
    })
    localStorage.setItem("notes", JSON.stringify(myNotes));
    showNotes();
})
function showNotes() {
    mainContainer.innerHTML = "";
    myNotes.forEach(note => {
        mainContainer.innerHTML += `
    <div  class="notes-container">
            <div class="tool-bar">
                <i onclick="updateNotes(${note.id})"  class="save-icon fa-regular fa-floppy-disk"></i>
                <i onclick="deleteNote(${note.id})" class="delete-icon fa-solid fa-trash"></i>
            </div>
            <textarea id="textarea-${note.id}"  class="text-area">${note.note}</textarea>
            <h3 class="date">${new Date(note.id).toString().slice(0, 25)}</h3>
    </div>`

    });
}
function deleteNote(noteID) {
    myNotes = myNotes.filter((note) => note.id !== noteID);
    showNotes();
    localStorage.setItem("notes", JSON.stringify(myNotes));
}
function updateNotes(noteID) {
    const textarea = document.getElementById(`textarea-${noteID}`);
    const update = myNotes.find((note) => note.id === noteID)
    update.note = textarea.value;
    localStorage.setItem("notes", JSON.stringify(myNotes));
    showNotes();
}
window.onload = showNotes;


document.body.addEventListener("keypress", function (e) {
    if (e.key === "0") {
        localStorage.clear("notes")
        showNotes();
    }
})