package com.miguel.backenduser.auth.filters;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.miguel.backenduser.auth.constants.TokenJwtConfig;
import com.miguel.backenduser.models.entities.User;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends UsernamePasswordAuthenticationFilter implements TokenJwtConfig{

    private AuthenticationManager authenticationManager;

    public JwtAuthFilter (AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, 
            HttpServletResponse response) throws AuthenticationException {

            User user = null;
            String username = null;
            String password = null;

            try {
                user = new ObjectMapper().readValue(request.getInputStream(), User.class);
                username = user.getUsername();
                password = user.getPassword();
            
                System.out.println("control 01 intentando iniciar");

            } catch (StreamReadException e) {
                e.printStackTrace();
            } catch (DatabindException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            UsernamePasswordAuthenticationToken authToken = new 
            UsernamePasswordAuthenticationToken(username, password);

            System.out.println("control 02 que es esto: " +authToken);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, 
            HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
            
            //Se va a JpaUserDetailsService regresa con los authorities     
            String username = ((org.springframework.security.core.userdetails.User) 
                authResult.getPrincipal()).getUsername();

            System.out.println("control 03 auntenticacion : " );
          

            //Creamos el token jws
            String token = Jwts.builder()
                    .subject(username)
                    .signWith(SECRET_KEY)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 3600000))
                    .compact();    

            response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN +token);

            System.out.println("control 04 que es esto del response: " +response);

            Map<String, Object> body = new HashMap<>();
            body.put("token", token);
            body.put("message", String.format(
                    "Hola %s has iniciado sesion con exito", 
                    username));
            body.put("username", username);

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(200);
            response.setContentType("application/json");

        }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, 
            HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
    
            Map<String, Object> body = new HashMap<>();
            body.put("message", "Error en la autenticacion username o password incorrecto");
            body.put("error", failed.getMessage());
            
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401);
            response.setContentType("application/json");
                
            }
    
    
}
