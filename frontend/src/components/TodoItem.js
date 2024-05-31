import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [errorMessage, setErrorMessage] = useState('');

    const handleComplete = () => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        axios.put(`http://localhost:8080/api/todos/${todo.id}`, updatedTodo)
            .then(response => {
                onUpdate(response.data);
            })
            .catch(error => console.log(error));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure ?')) {
            onDelete(todo.id);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!editedTitle.trim()) {
            setErrorMessage("Don't leave it empty");
            return;
        }
        const updatedTodo = { ...todo, title: editedTitle };
        axios.put(`http://localhost:8080/api/todos/${todo.id}`, updatedTodo)
            .then(response => {
                onUpdate(response.data);
                setIsEditing(false);
                setErrorMessage('');
            })
            .catch(error => console.log(error));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(todo.title);
        setErrorMessage('');
    };

    return (
        <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
            <div>
                <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleComplete}
                />
                {isEditing ? (
                    <input 
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <span className="mx-2">{todo.title}</span>
                )}
                {isEditing && errorMessage && <span className="text-danger mx-2">{errorMessage}</span>}
            </div>
            <div>
                {isEditing ? (
                    <>
                        <button className="btn btn-success btn-sm" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary btn-sm" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
