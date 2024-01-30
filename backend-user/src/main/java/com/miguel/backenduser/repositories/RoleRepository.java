package com.miguel.backenduser.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.miguel.backenduser.models.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    
    Optional<Role> findByName(String name);
}
