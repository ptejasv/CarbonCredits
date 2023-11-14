import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import {useState} from 'react';

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/METAMASK.png';

export default function Profile(props){
    // const [len, setLen] = useState(0);

    useEffect(() => {
        loadData();
     }, []);

    function loadData() {
        props.showCredits()
        // setLen(props.recordList.length)
    } 

    const ProfilePage = () => {
        return (
            
        <div className = "profile-background">
            <div className = "profile">
                <div className = "profile-account">
                    <p>
                        <b>Profile</b>
                    </p>
                    <hr color = "black"/>
                    <p>
                        Address:&nbsp;
                        <span className = "global-message">{props.address}</span>
                        <br/>
                        Credits owned:&nbsp;
                        <span className = "global-message">{props.credits}</span>
                        <br/>
                        SepoliaETH balance:&nbsp;
                        <span className = "global-message">{props.balance}</span>
                    </p>
                </div>
            </div>

            <GlobalToolBar/>
        </div>
            
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <ProfilePage />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )
}