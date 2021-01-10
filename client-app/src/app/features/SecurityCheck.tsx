import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

const withSecurityCheck = (WrappedComponent: any) => {
    
    return (() => {
        const [cookies] = useCookies(["user"]);
        const history = useHistory();
        if(cookies.user === undefined) {
            history.push("/");
            return (<></>);
        } 
        else {
            return (<WrappedComponent/>);
        }
    });
}

export {withSecurityCheck};