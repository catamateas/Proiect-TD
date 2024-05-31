import React from 'react';
import { ListGroup, Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Sidebar = ({ lists, onSelectList, isOpen, toggleSidebar, searchTerm, setSearchTerm }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <Button variant="link" onClick={toggleSidebar} className="toggle-btn">
                {isOpen ? <FaTimes /> : <FaBars />}
            </Button>
            {isOpen && (
                <>
                    <InputGroup className="mb-3 search-bar">
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Search Lists"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    <ListGroup>
                        {lists.map(list => (
                            <ListGroup.Item key={list.id} action onClick={() => onSelectList(list.id)}>
                                {list.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </div>
    );
};

export default Sidebar;
