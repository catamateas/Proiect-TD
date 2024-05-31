package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.model.TodoList;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoListRepository todoListRepository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping("/{listId}")
    public Todo createTodo(@PathVariable Long listId, @RequestBody Todo todo) {
        TodoList todoList = todoListRepository.findById(listId).orElseThrow();
        todo.setTodoList(todoList);
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(id).orElseThrow();
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
