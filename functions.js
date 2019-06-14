var notesToDelete = new Array();

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
	newNote.querySelector(".noteTitle").value = document.querySelector(".noteTitle").value
	newNote.querySelector(".noteBody").value = document.querySelector(".noteBody").value
	notes.appendChild(newNote)
	document.querySelector(".noteTitle").value = ""
	document.querySelector(".noteBody").value = ""
	document.querySelector("#" + newNote.id + " .delete").id = newNote.id
	document.querySelector("#" + newNote.id + " .noteTitle").required = true
	document.querySelector("#" + newNote.id + " .noteBody" ).required = true
}

function deleteNote(element){
	var idNumber = element.id.match(/\d/g).join("")
	var notes = document.querySelector(".notes")
	var noteToDelete = document.querySelector("#" + element.id)
	if(noteToDelete.name){
		console.log("pushed to Delete")
		notesToDelete.push(noteToDelete.name)
	}
	notes.removeChild(noteToDelete)
}

function saveNotepad(){
	var file = {};
	var content = {};
	var data = {};
	var notes = document.querySelectorAll(".notes .myNotes")
	if(notes.length > 0){
		notes.forEach(function(note, index){
			content["content"] = note.querySelector(".noteBody").value
			file[note.querySelector(".noteTitle").value + ".txt"] = content
			data["files"] = file
			postRequest("https://api.github.com/gists", data, note.id)
		});
	}
	if(notesToDelete.length > 0){
		notesToDelete.forEach(function(gistId){
			deleteRequest(gistId)
		})
		notesToDelete.length = 0
	}
}

function deleteNotepad(){
	document.getElementById("notepadForm").reset()
}

function postRequest(url, data, noteId){
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'token 138337ec84788757f7fda1481a46908fed484838'
		}),
	})
	.then(response => response.json())
	.then(data => {
		console.log(data)
		var noteElement = document.querySelector("#note1")
		noteElement.name = data.id
		if(noteElement.classList.contains("new"))
			noteElement.classList.remove("new")
	})
	.catch(error => console.error(error))
}

function deleteRequest(gistId){
	fetch(("https://api.github.com/gists/" + gistId), {
		method: 'DELETE',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'token 138337ec84788757f7fda1481a46908fed484838'
		}),
	})
	.catch(error => console.error(error))
}