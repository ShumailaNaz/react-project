import { useContext } from "react";
import { Auth } from "../context/Auth";

export const useAuthContext = () => {
    const context = useContext(Auth)

    if (!context) throw Error('useAuthContext must be inside an AuthContextProvider')
        
    return context
}