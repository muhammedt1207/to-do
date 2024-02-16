import React, { useState } from "react";

export const Task = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(props.taskName);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskNameChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleSave = () => {
    props.updateTaskName(props.id, editedTaskName);
    setIsModalOpen(false);
  };

  return (
    <div className={`lists ${props.status ? 'done ' : ''}`}>
      <input
        style={{ borderRadius: 10, height: 60 }}
        type="checkbox"
        onClick={() => props.statusOfTheTask(props.id)}
      />
      <h3>{props.taskName}</h3>
      <button style={{ borderRadius: 10, height: 30 }} onClick={() => props.removeTask(props.id)}> X </button>
      <button style={{ borderRadius: 10, color: "transparent", height: 30 }} onClick={openModal}>
        <i className="fas fa-edit" style={{ color: "black" }}></i>
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <input type="text" value={editedTaskName} onChange={handleTaskNameChange} />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};
