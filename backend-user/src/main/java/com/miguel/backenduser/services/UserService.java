package com.miguel.backenduser.services;

import java.util.List;
import java.util.Optional;

import com.miguel.backenduser.models.entities.User;
import com.miguel.backenduser.models.request.UserRequest;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    Optional<User> update(UserRequest user, Long id);

    User save(User user);

    void remove(Long id);
    
}
