// NoteEditor.jsx
import React, { useState } from 'react';
import '../styles/NoteEditor.css';

function NoteEditor({ onNoteSave }) {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const handleSave = () => {
    const newNote = {
      id: new Date().getTime(),
      title: title,
      content: editorContent,
    };

    // Call the onNoteSave callback to add the new note
    onNoteSave(newNote);

    // Clear the editor content and title after saving
    setEditorContent('');
    setTitle('');
  };

  return (
    <div className="note-editor">
      <div className="container-fluid mx-auto input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Nota</span>
        <form className="form-floating">
          <textarea  
            className="form-control" 
            id="floatingInputValue" 
            placeholder="Insertar nota" 
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
          <label htmlFor="floatingInputValue">Insertar nota</label>
        </form>
      </div>
      <button className="btn btn-primary mx-3 mb-3" onClick={handleSave}>Guardar</button>
    </div>
  );
}

export default NoteEditor;
