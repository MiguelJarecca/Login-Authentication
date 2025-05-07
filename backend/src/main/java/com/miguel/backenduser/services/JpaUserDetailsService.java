package com.miguel.backenduser.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miguel.backenduser.repositories.UserRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<com.miguel.backenduser.models.entities.User> o =
            userRepository.getUserByUsername(username);

        if (!o.isPresent()) {
            throw new UsernameNotFoundException(String.format("username &s no existe en el sistema", username));
        }

        com.miguel.backenduser.models.entities.User user = o.orElseThrow();

        System.out.println("control 3 " +user);    

        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());

        return new User(
            user.getUsername(), 
            user.getPassword(), 
            true, 
            true, 
            true, 
            true, 
            authorities
        );
    }
    
}
