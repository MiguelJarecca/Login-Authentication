package com.miguel.backenduser.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miguel.backenduser.models.entities.User;
import com.miguel.backenduser.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(originPatterns = "*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> list() {
        return (List<User>) userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User user) {
        User userDb = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDb);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Long id) {
        Optional<User> o = userService.update(user, id);
        if (o.isPresent()) {
            
            return ResponseEntity.status(HttpStatus.CREATED).body(o.orElseThrow());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        Optional<User> o = userService.findById(id);
        if (o.isPresent()) {
            userService.remove(id);
            return ResponseEntity.noContent().build(); // error 204
        }

        return ResponseEntity.notFound().build();
    }
}
