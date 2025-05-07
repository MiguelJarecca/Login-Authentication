package com.miguel.backenduser.auth.constants;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public interface TokenJwtConfig {

    SecretKey key = Jwts.SIG.HS256.key().build();

    // public final static String SECRET_KEY = "algun_token_con_alguna_frase_secreta";
    public final SecretKey SECRET_KEY = key;
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";

}
