"use client"
import { getCurrentUser } from "@/service/UserService";
import { UserContext } from "./userContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getCurrentUser();
                setUser({...userData});
                // console.log(userData);
            }
            catch (err) {
                console.log(err);
                setUser(undefined);
                toast.error("Error in fetching user data")
            }
        }
        fetchUser();
        console.log("userProvider render");
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;