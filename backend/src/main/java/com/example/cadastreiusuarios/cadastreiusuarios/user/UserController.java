package com.example.cadastreiusuarios.cadastreiusuarios.user;

import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserCreate;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserResponse;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public List<UserResponse> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public UserResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public UserResponse create(@RequestBody UserCreate user) {
        return service.create(user);
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id, @RequestBody UserUpdate user) {
        return service.update(new UserUpdate(id, user.name(), user.email(), user.password(), user.confirmPassword()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.remove(id);
    }
}
