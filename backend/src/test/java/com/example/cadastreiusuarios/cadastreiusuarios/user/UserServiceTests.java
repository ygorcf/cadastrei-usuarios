package com.example.cadastreiusuarios.cadastreiusuarios.user;

import com.example.cadastreiusuarios.cadastreiusuarios.common.exceptions.UserFriendlyException;
import com.example.cadastreiusuarios.cadastreiusuarios.user.dto.UserCreate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;

    @Test
    void shouldListUsers() {
        // arrange
        User u = new User("Ygor", "ygor@gmail.com", "123456");
        u.setId(0L);
        when(repository.findAll()).thenReturn(List.of(u));

        // act
        List<User> users = service.list();

        // assert
        assert users.size() == 1;
        assert users.get(0).getId() == 0L;
        assert users.get(0).getName().equals("Ygor");
        assert users.get(0).getEmail().equals("ygor@gmail.com");
        assert users.get(0).getPassword().equals("123456");
    }

    @Test
    void shouldThrowExceptionIfNameIsNull() {
        // arrange
        UserCreate u = new UserCreate(null, null, null, null);
        Exception e;

        // act
        try {
            service.create(u);
            e = null;
        } catch (Exception ex) {
            e = ex;
        }

        // assert
        assert e != null;
        assert e instanceof UserFriendlyException;
        assert e.getMessage().equals("Name is required");
    }

    @Test
    void shouldThrowExceptionIfNameLengthIsLessThan3() {
        // arrange
        UserCreate u = new UserCreate("", null, null, null);
        Exception e;

        // act
        try {
            service.create(u);
            e = null;
        } catch (Exception ex) {
            e = ex;
        }

        // assert
        assert e != null;
        assert e instanceof UserFriendlyException;
        assert e.getMessage().equals("Name must be at least 3 characters");
    }

    @Test
    void shouldThrowExceptionIfNameLengthIsGreaterThan50() {
        // arrange
        StringBuilder name = new StringBuilder();
        for (int i = 0; i < 51; i++) {
            name.append("a");
        }
        UserCreate u = new UserCreate(name.toString(), null, null, null);
        Exception e;

        // act
        try {
            service.create(u);
            e = null;
        } catch (Exception ex) {
            e = ex;
        }

        // assert
        assert e != null;
        assert e instanceof UserFriendlyException;
        assert e.getMessage().equals("Name must be less than 50 characters");
    }

    @Test
    void shouldSaveUser() {
        // arrange
        UserCreate u = new UserCreate("Ygor", "ygor@gmail.com", "ygor123", "ygor123");
        User mockedSave = new User("Ygor", "ygor@gmail.com", "ygor123");
        mockedSave.setId(0L);
        when(repository.save(any())).thenReturn(mockedSave);
        User savedUser;
        ArgumentCaptor<User> userArgCaptor = ArgumentCaptor.forClass(User.class);

        // act
        savedUser = service.create(u);

        // assert
        assert savedUser == mockedSave;
        verify(repository).save(userArgCaptor.capture());

        User userArg = userArgCaptor.getValue();
        assert userArg.getId() == null;
        assert userArg.getName().equals("Ygor");
        assert userArg.getEmail().equals("ygor@gmail.com");
        assert userArg.getPassword().equals("ygor123");
    }
}
