import { Navigate } from "react-router-dom";
// import Eth from '../../images/eth.jpg';
import "./MyListings.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";   
import React, { useState } from 'react';

export default function MyListings(props){

    const MyListingsTitle = () => {

        return (

            <div> <h1> My Listings </h1>
            </div>

        )
    }

    const MyListingsPage = () => {
        return (
            <div className = "sell-background">
                <div className = "sell-menu">
                    <MyListingsTitle/>
                    <div className = "sell-menuFramework">                      
                        <br />
                        <button 
                            className = "btn" 
                            style={
                                { backgroundColor: 'green', borderRadius: '8px', padding: '10px' }
                            }
                        >
                            Remove
                            
                        </button>
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
                <MyListingsPage />:
                <Navigate to = '/ee4032project' />
            }
        </div>
    );
}