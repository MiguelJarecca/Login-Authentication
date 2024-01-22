package com.miguel.backenduser.repositories;

import org.springframework.data.repository.CrudRepository;

import com.miguel.backenduser.models.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
}
