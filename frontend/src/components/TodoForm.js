import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TodoForm = ({ listId, onAdd }) => {
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setErrorMessage("Don't leave it empty");
            return;
        }
        setErrorMessage('');
        try {
            const response = await axios.post(`http://localhost:8080/api/todolists/${listId}/todos`, {
                title,
                completed: false
            });
            setTitle('');
            onAdd(response.data);
            toast.success('Todo item added successfully');
        } catch (error) {
            console.error('Error adding todo:', error);
            toast.error('Error adding todo');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="my-4">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errorMessage && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
            </Form.Group>
            <Button type="submit" className="mt-2">Add Todo</Button>
        </Form>
    );
};

export default TodoForm;
