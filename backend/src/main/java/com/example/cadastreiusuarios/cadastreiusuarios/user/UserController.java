package com.example.cadastreiusuarios.cadastreiusuarios.user;

import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> list() {
        return service.list();
    }

    @PostMapping
    public User create(@RequestBody UserCreate user) {
        return service.create(user);
    }
}
