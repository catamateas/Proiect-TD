import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TodoForm = ({ listId, onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Don't leave it empty");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/todos/${listId}`, {
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
            </Form.Group>
            <Button type="submit" className="mt-2">Add Todo</Button>
        </Form>
    );
};

export default TodoForm;
