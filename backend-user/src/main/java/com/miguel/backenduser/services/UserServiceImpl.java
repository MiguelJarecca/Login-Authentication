package com.miguel.backenduser.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miguel.backenduser.models.entities.User;
import com.miguel.backenduser.models.request.UserRequest;
import com.miguel.backenduser.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) userRepository.findAll(); 
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        String passwordBCrypt = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordBCrypt);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {

        Optional<User> o = findById(id);
        User userOptional = null;

        if (o.isPresent()) {
            User userDb = o.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userOptional = save(userDb);
        }
        
        return Optional.ofNullable(userOptional);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

  

    
}