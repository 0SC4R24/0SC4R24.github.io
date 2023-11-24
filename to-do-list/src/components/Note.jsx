// Note.jsx
import React from 'react';

function Note({ note, onDelete }) {
  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className="note mx-3 mb-3 border p-3 rounded">
      <h4>{note.title || 'No Title'}</h4>
      <p>{note.content}</p>
      <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

export default Note;
