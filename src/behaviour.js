/*

GTG Notes - Your personal notes application.
Source file for app behaviour
Written by ghgltggamer
Licensed under the MIT License.
Only modify this file is familiar with GNTK, GTG Ripple lib and js advanced concepts.

*/


/*
This is the core file of the GTG Notes app which handles all the core of the app example includes creating and saving notes
*/

// GTG Notes classes for better structuring the code

// Ui class manages the ui components
class GTG_Notes_UI{
    // Create method which creates a new note for the user
    create(){
        const Window = new GNTK_Popup_Window('Create a new note', `<br><input id="note-title" class="inp" type="text" name="text" placeholder="Note title"><br><br><textarea style="height: 100px;" id="note-des" class="inp" placeholder="A little description about the note"></textarea><br><br><center><button id="btn-create-note" class="btn">Create</button>`);
        GTG_applyRippleEffect('button', 'rgba(0, 0, 0, 0.2)');
        
        const button_create = document.getElementById('btn-create-note');
        button_create.addEventListener('click', ()=>{
            const note_title = document.getElementById("note-title").value;
            const description = document.getElementById('note-des').value;
            const note_format = {
                title: note_title,
                description: description,
                content: ''
            }
            localStorage.setItem(note_title, JSON.stringify(note_format));
            GNTK_Destroy(GNTK_NODE_2D);
            document.getElementById('reload').click();
        })
    }


    // Delete method will delete the notes
    delete(){
        const Window = new GNTK_Popup_Window('Delete Note by Title Code', `<br><center><input class="inp" type="number" id="code" placeholder="Title code"><br><br><button class="btn" id="delete">Delete</button>`);
        GTG_applyRippleEffect('button', 'rgba(0, 0, 0, 0.2)');

        const button_delete = document.getElementById('delete');
        button_delete.addEventListener('click', ()=>{
            const input_code = document.getElementById('code').value;
            localStorage.removeItem(localStorage.key(input_code));
            document.getElementById('reload').click();
        })
    }
}


// Core class manages the Core components
class GTG_Notes_Core{
    // mouse hold event
    mouseHold(target, callback, duration=2000){
        var t;
        document.getElementById(target).addEventListener('mousedown', ()=>{
            t = setTimeout(callback,duration);
        })
        document.getElementById(target).addEventListener('mouseup', ()=>{
            clearTimeout(t);
        })
        document.getElementById(target).addEventListener('mouseout', ()=>{
            clearTimeout(t);
        })
    }
}

const note = new GTG_Notes_UI;
document.getElementById('new-notes-button').addEventListener('click', ()=>{
    note.create();
})
document.getElementById('rem-notes-button').addEventListener('click', ()=>{
    note.delete();
})



// notes loader
function GTG_Notes_Show(){
    for (var i = 0;i < localStorage.length;i++){
        const key = localStorage.key(i);
        const data_json_string = localStorage.getItem(key);
        // console.log(JSON.parse(data_json_string));
        const fetch_obj = JSON.parse(data_json_string);
        const html = `<button class="note-show">
            <h2>
                ${fetch_obj.title} - Code (${i})
            </h2>
            <p>
                ${fetch_obj.description}
            </p>
        </button>`;
        var elm = document.createElement('div')
        elm.innerHTML = html;
        elm.addEventListener('click', ()=>{
            document.body.innerHTML = `
            <link rel="stylesheet" href="theme.css">
            <center style="margin: 10px;">
                ${key} - Editing 
                <button class="btn" id="home">Home</button>
                <button class="btn" id="save">Save</button>
                <hr style="border: 0px;border-bottom: 1px solid silver;">
                <br>
                <textarea class="inp" style="height: 80vh;width: 90%;" id="note-cont" placeholder="Enter the content...">${fetch_obj.content}</textarea>
            </center>
            <a href="" id="reload"></a>
            `;
            const home_btn = document.getElementById('home');
            const save_btn = document.getElementById('save');
            // let note_content = document.getElementById('note-cont');
            save_btn.addEventListener('click', ()=>{
                fetch_obj.content = document.getElementById('note-cont').value;
                localStorage.setItem(key, JSON.stringify(fetch_obj));
            })
            home_btn.addEventListener('click', ()=>{
                document.getElementById('reload').click();

            })
            GTG_applyRippleEffect('button', 'rgba(0, 0, 0, 0.2)');
        })
        document.getElementById('show-notes').appendChild(elm);
    }
}


GTG_Notes_Show();
GTG_applyRippleEffect('button', 'rgba(0, 0, 0, 0.2)');