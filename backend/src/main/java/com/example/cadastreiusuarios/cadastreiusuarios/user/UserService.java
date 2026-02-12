package com.example.cadastreiusuarios.cadastreiusuarios.user;

import com.example.cadastreiusuarios.cadastreiusuarios.common.exceptions.UserFriendlyException;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserCreate;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserResponse;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public List<UserResponse> list() {
        List<UserResponse> users = new ArrayList<>();
        repository.findAll().forEach(user -> users.add(new UserResponse(user)));
        return users;
    }

    public UserResponse get(Long id) {
        if (id == null) {
            throw new UserFriendlyException("Id is required");
        }

        Optional<User> userQuery = repository.findById(id);

        if (userQuery.isEmpty()) {
            throw new UserFriendlyException("User not found");
        }

        return new UserResponse(userQuery.get());
    }

    public UserResponse create(UserCreate user) {
        if (user.name() == null) {
            throw new UserFriendlyException("Name is required");
        }
        if (user.name().length() < 3) {
            throw new UserFriendlyException("Name must be at least 3 characters");
        }
        if (user.name().length() >= 50) {
            throw new UserFriendlyException("Name must be less than 50 characters");
        }

        if (user.email() == null) {
            throw new UserFriendlyException("Email is required");
        }
        if (!user.email().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new UserFriendlyException("Email is invalid");
        }
        if (user.email().length() >= 50) {
            throw new UserFriendlyException("Email must be less than 50 characters");
        }

        if (user.password() == null) {
            throw new UserFriendlyException("Password is required");
        }
        if (user.password().length() < 6) {
            throw new UserFriendlyException("Password must be at least 6 characters");
        }
        if (user.password().length() >= 20) {
            throw new UserFriendlyException("Password must be less than 20 characters");
        }

        if (!user.password().equals(user.confirmPassword())) {
            throw new UserFriendlyException("Password and confirm password must match");
        }

        User userEntity = new User(user.name(), user.email(), user.password());
        return new UserResponse(repository.save(userEntity));
    }

    public UserResponse update(UserUpdate user) {
        if (user.id() == null) {
            throw new UserFriendlyException("Id is required");
        }

        if (user.name() == null) {
            throw new UserFriendlyException("Name is required");
        }
        if (user.name().length() < 3) {
            throw new UserFriendlyException("Name must be at least 3 characters");
        }
        if (user.name().length() >= 50) {
            throw new UserFriendlyException("Name must be less than 50 characters");
        }

        if (user.email() == null) {
            throw new UserFriendlyException("Email is required");
        }
        if (!user.email().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new UserFriendlyException("Email is invalid");
        }
        if (user.email().length() >= 50) {
            throw new UserFriendlyException("Email must be less than 50 characters");
        }

        if (user.password() == null) {
            throw new UserFriendlyException("Password is required");
        }
        if (user.password().length() < 6) {
            throw new UserFriendlyException("Password must be at least 6 characters");
        }
        if (user.password().length() >= 20) {
            throw new UserFriendlyException("Password must be less than 20 characters");
        }

        if (!user.password().equals(user.confirmPassword())) {
            throw new UserFriendlyException("Password and confirm password must match");
        }

        Optional<User> userQuery = repository.findById(user.id());

        if (userQuery.isEmpty()) {
            throw new UserFriendlyException("User not found");
        }

        User userEntity = userQuery.get();
        userEntity.setName(user.name());
        userEntity.setEmail(user.email());
        userEntity.setPassword(user.password());
        return new UserResponse(repository.save(userEntity));
    }

    public int remove(Long id) {
        if (id == null) {
            throw new UserFriendlyException("Id is required");
        }

        Optional<User> userQuery = repository.findById(id);

        if (userQuery.isEmpty()) {
            throw new UserFriendlyException("User not found");
        }

        repository.deleteById(id);
        return 1;
    }
}
