package com.example.cadastreiusuarios.cadastreiusuarios.user.dto;

import com.example.cadastreiusuarios.cadastreiusuarios.user.User;

public record UserResponse(Long id, String name, String email) {

    public UserResponse(User user) {
        this(user.getId(), user.getName(), user.getEmail());
    }
}
