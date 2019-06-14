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
	var file = {};
	var content = {};
	var data = {};
	var notes = document.querySelectorAll(".notes .myNotes")
	var firstNote = notes[0]
	content["content"] = firstNote.querySelector(".noteBody").value
	file[firstNote.querySelector(".noteTitle").value + ".txt"] = content
	data["files"] = file
	var response = postRequest("https://api.github.com/gists", data)
	console.log(response)
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
			'Authorization': 'token 39035ef83dc9e9140ed67c7b52b7beb28557dd92'
		}),
	})
	.then(response => response.json())
}