function addNote(){
	var notes = document.querySelector(".notes")
	var newNote = document.querySelector(".noteTemplate").cloneNode(true)
	newNote.className = "myNotes"
	newNote.classList.add("new")
	var numberOfNotes = document.querySelectorAll(".notes .myNotes").length
	newNote.id = "note" + (numberOfNotes + 1)
	notes.appendChild(newNote)
	document.querySelector("#" + newNote.id + " .delete").id = newNote.id
	document.querySelector("#" + newNote.id + " .noteTitle").required = true
	document.querySelector("#" + newNote.id + " .noteBody" ).required = true
}

function deleteNote(element){
	var idNumber = element.id.match(/\d/g).join("")
	var notes = document.querySelector(".notes")
	var noteToDelete = document.querySelector("#" + element.id)
	notes.removeChild(noteToDelete)
}

function saveNotepad(){

}

function deleteNotepad(){
	document.getElementById("notepadForm").reset()
}
