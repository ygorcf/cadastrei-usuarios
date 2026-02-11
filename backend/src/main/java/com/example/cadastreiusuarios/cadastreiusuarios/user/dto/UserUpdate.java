package com.example.cadastreiusuarios.cadastreiusuarios.user.dto;

public record UserUpdate(Long id, String name, String email, String password, String confirmPassword) {
}
