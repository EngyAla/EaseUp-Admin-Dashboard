// @ts-nocheck
import { useEffect, useState } from "react";
import { OverviewContext } from "./OverviewContext";
import axiosInstance from "../../api/axiosInstance";

const OverviewProvider = ({ children }) => {
    const [overviewData, setOverviewData] = useState({});
    // const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getOverview = async () =>{
            try{
                const response = await axiosInstance.get("Admins/overview");
                setOverviewData(response.data);
                // setLoading(false);
            } catch(error){
                console.log("Overview Error: ", error)
            }
        }
        getOverview();
    }, []);

    // console.log(overviewData);

    return (
        <OverviewContext.Provider value={{overviewData}}>
            {children}
        </OverviewContext.Provider>
    );
};

export default OverviewProvider;