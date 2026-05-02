// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const getProfile = async () => {
        try {
            const response = await axiosInstance.get("Admins/profile-information", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.log("Get Profile Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getProfile();
            
        }
    }, [token]);

    console.log(profile);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, getProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);