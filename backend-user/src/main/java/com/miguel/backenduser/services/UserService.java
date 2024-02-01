package com.miguel.backenduser.services;

import java.util.List;
import java.util.Optional;

import com.miguel.backenduser.models.dto.UserDto;
import com.miguel.backenduser.models.entities.User;
import com.miguel.backenduser.models.request.UserRequest;

public interface UserService {

    List<UserDto> findAll();

    Optional<UserDto> findById(Long id);

    Optional<UserDto> update(UserRequest user, Long id);

    UserDto save(User user);

    void remove(Long id);
    
}
