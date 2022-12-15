import { useAuth } from "../hooks/useAuth";
import { createContext, useEffect, useReducer } from "react";


export const Auth = createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {

	const { data, error, validation, isPending } = useAuth(
		"https://auth-system-production.up.railway.app/v1/api/user/profile"
	);

	useEffect(() => {
		if (data) {
			if (!data.success) {
				localStorage.removeItem("token");
				dispatch(
					{ type: "LOGOUT" }
				);
			}
			if (data.success) {
				dispatch({ type: "LOGIN", payload: data.success });
                localStorage.setItem('name', data.data.name)
            }
		}
	}, [data]);

	

	const [state, dispatch] = useReducer(authReducer, {
		user: null,
        loaded:null
	});

	return (
		<Auth.Provider value={{ ...state, dispatch, data }}>
			{children}
		</Auth.Provider>
	);
};
