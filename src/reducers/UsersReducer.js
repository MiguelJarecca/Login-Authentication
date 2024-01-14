
export const UsersReducer = (state = [], action) => {

    switch (action.type) {

        case 'addUser':

            return [
                ...state,
                    {
                        ...action.payload,
                        id: new Date().getTime(),
                    }
            ];  

        // case 'deleteUser':
        //     console.log("esyoy en el delete");
        //     return 
        //         state.filter(user => user.id !== action.payload);   

        case 'updateUser':
            console.log("esyoy en el updatre");
            console.log("payload", action.payload);

            return 
                state.map(u => {
                    if (u.id === action.payload.id) {
                    console.log("estoy aquiiii o no");
                    console.log("existingUser antes de la actualización:", u);
                        return {
                        
                            ...action.payload
                        };
                    }
                    console.log("updatedUser después de la actualización:", u);
                    return u;
                });
            
    
        default:
            return state;
    }

}