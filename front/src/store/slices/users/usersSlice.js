import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = 
{
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}

const initialErrors = 
{
    username: '',
    password: '',
    email: '',
}    

export const usersSlice = createSlice({

    name: 'users',
    initialState: {
        users: [],
        userSelect: initialUserForm,
        visibleForm: false, 
        errors: initialErrors,
        isLoading: true, 
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload,
                }
            ];
            state.userSelect = initialUserForm;
            state.visibleForm = false;
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                        password: u.password
                    };
                }
                return u;
            });
            state.userSelect = initialUserForm;
            state.visibleForm = false;
        },
        loadingUser: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        onUserSelectedForm: (state, action) => {
            state.userSelect = action.payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.userSelect = initialUserForm;
        },
        loadingError: (state, {payload}) => {
            state.errors = payload;
        }
    }
 
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUser,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = usersSlice.actions;