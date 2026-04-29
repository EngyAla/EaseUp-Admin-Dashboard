// @ts-nocheck
import { useEffect, useState } from "react";
import { UsersListContext } from "./UsersListContext";
import axiosInstance from "../../api/axiosInstance";

const UsersListProvider = ({ children }) => {
    const [usersListData, setUsersListData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getUsersListData = async () =>{
            try{
                const response = await axiosInstance.get("Admins/user-monitoring");
                setUsersListData(response.data.students);
                setLoading(false);
            } catch(error){
                console.log("UsersList Error: ", error)
            }
        }
        getUsersListData();
    }, []);

    // console.log(usersListData);

    return (
        <UsersListContext.Provider value={{ usersListData, loading }}>
            {children}
        </UsersListContext.Provider>
    );
};

export default UsersListProvider;