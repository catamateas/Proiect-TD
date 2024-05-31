package com.example.todo.controller;

import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.model.TodoList;
import com.example.todo.repository.TodoListRepository;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todolists")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<TodoList> getAllTodoLists() {
        return todoListRepository.findAll();
    }

    @PostMapping
    public TodoList createTodoList(@RequestBody TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoList(@PathVariable Long id) {
        todoListRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{listId}")
    public TodoList getTodoList(@PathVariable Long listId) {
        return todoListRepository.findById(listId).orElseThrow(() -> new ResourceNotFoundException("TodoList not found with id " + listId));
    }

    @PostMapping("/{listId}/todos")
    public Todo createTodo(@PathVariable Long listId, @RequestBody Todo todo) {
        TodoList todoList = todoListRepository.findById(listId).orElseThrow(() -> new ResourceNotFoundException("TodoList not found with id " + listId));
        todo.setTodoList(todoList);
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{listId}/todos/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long listId, @PathVariable Long todoId) {
        todoRepository.deleteById(todoId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/todos/{todoId}")
    public Todo updateTodo(@PathVariable Long todoId, @RequestBody Todo todoRequest) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id " + todoId));
        todo.setTitle(todoRequest.getTitle());
        todo.setCompleted(todoRequest.isCompleted());
        return todoRepository.save(todo);
    }
}
