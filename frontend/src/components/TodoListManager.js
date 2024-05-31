import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import Sidebar from './Sidebar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TodoListManager = () => {
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [selectedListId, setSelectedListId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todolists');
            if (Array.isArray(response.data)) {
                setLists(response.data);
            } else {
                console.error('Response data is not an array:', response.data);
                setLists([]);
            }
        } catch (error) {
            console.error('Error fetching lists:', error);
            setLists([]);
            toast.error('Error fetching lists');
        }
    };

    const handleCreateList = async () => {
        if (!newListName.trim()) {
            toast.error("Don't leave it empty");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/todolists', { name: newListName });
            setLists([...lists, response.data]);
            setNewListName('');
            toast.success('List created successfully');
        } catch (error) {
            console.error('Error creating list:', error);
            toast.error('Error creating list');
        }
    };

    const handleDeleteList = async (id) => {
        if (window.confirm('Are you sure you want to delete this list?')) {
            try {
                await axios.delete(`http://localhost:8080/api/todolists/${id}`);
                setLists(lists.filter(list => list.id !== id));
                if (selectedListId === id) {
                    setSelectedListId(null);
                }
                toast.success('List deleted successfully');
            } catch (error) {
                console.error('Error deleting list:', error);
                toast.error('Error deleting list');
            }
        }
    };

    const handleSelectList = (id) => {
        setSelectedListId(id);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredLists = lists.filter(list =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedList = lists.find(list => list.id === selectedListId);

    return (
        <Container fluid>
            <Row>
                <Col xs={isSidebarOpen ? 3 : 1} className="p-0">
                    <Sidebar lists={filteredLists} onSelectList={handleSelectList} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </Col>
                <Col xs={isSidebarOpen ? 9 : 11}>
                    <h1 className="text-center my-4">Todo List Manager</h1>
                    <Form inline className="mb-4" onSubmit={(e) => { e.preventDefault(); handleCreateList(); }}>
                        <Form.Control 
                            type="text"
                            className="mr-2"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="New List Name"
                        />
                        <Button type="submit" className="mt-2">Create List</Button>
                    </Form>
                    {selectedList && <TodoList list={selectedList} onDelete={handleDeleteList} />}
                </Col>
            </Row>
        </Container>
    );
};

export default TodoListManager;
