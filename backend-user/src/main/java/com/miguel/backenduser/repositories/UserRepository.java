package com.miguel.backenduser.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.miguel.backenduser.models.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
    //Buscamos por palabra clave
    Optional<User>findByUsername(String username);

    //Buscamos por consulta personalizada
    @Query("SELECT u FROM User u WHERE u.username=?1")
    Optional<User> getUserByUsername(String username);
}
