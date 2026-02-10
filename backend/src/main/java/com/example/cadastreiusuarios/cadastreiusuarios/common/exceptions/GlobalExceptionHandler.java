package com.example.cadastreiusuarios.cadastreiusuarios.common.exceptions;

import com.example.cadastreiusuarios.cadastreiusuarios.common.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserFriendlyException.class)
    public ResponseEntity<ErrorResponse> handleUserFriendlyException(UserFriendlyException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage(), 400));
    }
}
