

export const AuthService = (userLogin) => {
  
    //Retorna verdadero o falso
    return (userLogin.username === 'admin' && userLogin.password === '123456');
    
}
