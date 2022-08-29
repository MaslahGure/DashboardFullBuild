import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";



import React from 'react'

const PersistLogin = () => {
    

    const [isLoading,setIsLoading] =useState(true);
    const refresh =useRefreshToken();
    const {auth, persist} = useAuth();

    useEffect (()=>{
        let isMounted =true;
        const verifyRefreshToken =async ()=>{
            try {
                await refresh();
                
            } catch (error) {
                
            }
            finally{
                isMounted && setIsLoading(false);
            }
            
        }
       !auth?.accessToken?verifyRefreshToken(): setIsLoading(false);

       return ()=> isMounted =false;

    },[refresh,auth])

    return (
        //displays the elements under Outlet or a Loading page
        <>
        {!persist
         ?<Outlet/>
         :isLoading
            ?<p>Loading</p>
            :<Outlet/>
        }
        </>
    )
}

export default PersistLogin
