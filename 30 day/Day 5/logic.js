const note_container = document.querySelector('.container');
const add_notes_btn = document.querySelector('.add-note');

let count = 0;

// Load notes from localStorage
function loadNotes() {
    const saved = JSON.parse(localStorage.getItem('notes') || '[]');
    saved.forEach((note, i) => {
        count++;
        const inputBox = document.createElement('div');
        inputBox.classList.add('input-box');
        inputBox.innerHTML = `
            <div class="note">
                <div class="note-header">
                    <input type="text" class="note-title" placeholder="${count} Title..." value="${note.title}" />
                    <div class="note-actions">
                        <button class="delete-note" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <textarea class="note-text" placeholder="Write your note here...">${note.text}</textarea>
                <button class="save-note">Save</button>
            </div>
        `;
        note_container.appendChild(inputBox);
    });
}

// Save current notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.input-box').forEach((box) => {
        const title = box.querySelector('.note-title').value;
        const text = box.querySelector('.note-text').value;
        notes.push({ title, text });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Add new note
add_notes_btn.addEventListener('click', () => {
    count++;
    const inputBox = document.createElement('div');
    inputBox.classList.add('input-box');
    inputBox.innerHTML = `
        <div class="note">
            <div class="note-header">
                <input type="text" class="note-title" placeholder="${count} Title..." />
                <div class="note-actions">
                    <button class="delete-note" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <textarea class="note-text" placeholder="Write your note here..."></textarea>
            <button class="save-note">Save</button>
        </div>
    `;
    note_container.appendChild(inputBox);
});

// Delete note using delegation
note_container.addEventListener('click', (e) => {
    if (e.target.closest('.delete-note')) {
        const inputBox = e.target.closest('.input-box');
        if (inputBox) {
            inputBox.remove();
            saveNotes(); // update storage
        }
    }
});

// Save button inside notes
note_container.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-note')) {
        saveNotes();
        console.log('Notes saved to localStorage');
    }
});

// Load notes when page loads
window.addEventListener('load', loadNotes);