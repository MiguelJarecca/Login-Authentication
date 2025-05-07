package com.miguel.backenduser.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miguel.backenduser.models.dto.UserDto;
import com.miguel.backenduser.models.dto.mapper.DtoMapperUser;
import com.miguel.backenduser.models.entities.Role;
import com.miguel.backenduser.models.entities.User;
import com.miguel.backenduser.models.request.UserRequest;
import com.miguel.backenduser.repositories.RoleRepository;
import com.miguel.backenduser.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> findAll() {
        List<User> users = (List<User>) userRepository.findAll();
        
        return users
            .stream()
            .map(u -> DtoMapperUser.builder().setUser(u).build())
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        Optional<User> o = userRepository.findById(id);
        if (o.isPresent()) {
            return Optional.of(
                DtoMapperUser
                    .builder()
                    .setUser(o.orElseThrow())
                    .build()    
            );
        } else {
            return Optional.empty();
        }
    }

    @Override
    @Transactional
    public UserDto save(User user) {
        String passwordBCrypt = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordBCrypt);

        Optional<Role> oUser = roleRepository.findByName("ROLE_USER");

        List<Role> roles = new ArrayList<>();

        if (oUser.isPresent()) {
            roles.add(oUser.orElseThrow());
        }

        if (user.isAdmin()) {
            Optional<Role> oAdmin = roleRepository.findByName("ROLE_ADMIN");
            if (oAdmin.isPresent()) {
                roles.add(oAdmin.orElseThrow());
            }
        }

        user.setRoles(roles);

        return DtoMapperUser.builder().setUser(userRepository.save(user)).build();
    }

    @Override
    @Transactional
    public Optional<UserDto> update(UserRequest user, Long id) {

        Optional<User> o = userRepository.findById(id);
        User userOptional = null;

        if (o.isPresent()) {

            Optional<Role> oUser = roleRepository.findByName("ROLE_USER");

            List<Role> roles = new ArrayList<>();

            if (oUser.isPresent()) {
                roles.add(oUser.orElseThrow());
            }

            if (user.isAdmin()) {
                Optional<Role> oAdmin = roleRepository.findByName("ROLE_ADMIN");
                if (oAdmin.isPresent()) {
                    roles.add(oAdmin.orElseThrow());
                }
            }

            User userDb = o.orElseThrow();
            userDb.setRoles(roles);
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userOptional = userRepository.save(userDb);
        }
        
        return Optional.ofNullable(DtoMapperUser.builder().setUser(userOptional).build());
    }

    @Override
    @Transactional
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

  

    
}