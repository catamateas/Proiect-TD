import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Card, ListGroup, Button } from 'react-bootstrap';

const TodoList = ({ list, onDelete }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/todolists/${list.id}`);
            if (response.data && response.data.todos) {
                setTodos(response.data.todos);
            } else {
                console.error('Invalid todos response:', response.data);
                setTodos([]);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        }
    };

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleDeleteList = (e) => {
        e.stopPropagation(); // Previne propagarea evenimentului de click
        if (window.confirm('Are you sure you want to delete this list?')) {
            onDelete(list.id);
        }
    };

    return (
        <Card className="my-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h2>{list.name}</h2>
                <Button variant="danger" size="sm" onClick={handleDeleteList}>Delete List</Button>
            </Card.Header>
            <Card.Body>
                <TodoForm listId={list.id} onAdd={addTodo} />
                <ListGroup>
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default TodoList;
