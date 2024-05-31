package com.example.todo.controller;

import com.example.todo.model.TodoList;
import com.example.todo.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todolists")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    @Autowired
    private TodoListRepository todoListRepository;

    @GetMapping
    public List<TodoList> getAllTodoLists() {
        return todoListRepository.findAll();
    }

    @PostMapping
    public TodoList createTodoList(@RequestBody TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    @GetMapping("/{id}")
    public TodoList getTodoList(@PathVariable Long id) {
        return todoListRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void deleteTodoList(@PathVariable Long id) {
        todoListRepository.deleteById(id);
    }
}


