// App.js
import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleNoteSave = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteDelete = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  // Filter notes based on the search term
  const filteredNotes = notes.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="text-center">Aplicacion de Notas</h1>

      {/* Search Bar with Bootstrap */}
      <div className="container-fluid mx-auto">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">Buscador</span>
          <form className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="basic-url" 
              placeholder="Buscar por titulo o contenido"
              aria-describedby="basic-addon3 basic-addon4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label htmlFor="basic-url">Buscar por titulo o contenido</label>
          </form>
        </div>
      </div>

      {/* Title Text Area */}
      <h2 className="text-center">Insertar Nota</h2>
      <div className="container-fluid mx-auto">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">Titulo</span>
          <form className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="newNoteTitle" 
              placeholder="Insertar titulo" 
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <label htmlFor="newNoteTitle">Insertar titulo</label>
          </form>
        </div>
      </div>

      {/* Note List and Editor */}
      <NoteEditor
        onNoteSave={(newNote) => {
          // Add the new title to the note
          newNote.title = newNoteTitle;
          
          // Call the handleNoteSave function
          handleNoteSave(newNote);

          // Reset the newNoteTitle state
          setNewNoteTitle('');
        }}
      />
      <NoteList notes={filteredNotes} onDelete={handleNoteDelete} />
    </div>
  );
}

export default App;
