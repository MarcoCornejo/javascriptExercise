function addNote(){
	var notes = document.querySelector(".notes")
	var newNote = document.querySelector(".noteTemplate").cloneNode(true)
	newNote.className = "myNotes"
	newNote.classList.add("new")
	var numberOfNotes = document.querySelectorAll(".notes .myNotes").length
	if(numberOfNotes > 0){
		var idNumberOfLastNote = parseInt(document.querySelectorAll(".notes .myNotes")[numberOfNotes-1].id.match(/\d/g).join(""))
		newNote.id = "note" + (idNumberOfLastNote + 1)
	}else{
		newNote.id = "note1"
	}
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

function postRequest(url, data){
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'token 8dc693ff94b1a1fa893950f3c86a4667fc30a069'
		}),
	})
	.then(response => response.json())
}