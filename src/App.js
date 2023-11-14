import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import MakeListing from "./components/makelisting/makelisting";
import Market from "./components/market/market";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

    const [market, setListing] = useState(0);
    const [creditBalance, setCreditBalance] = useState(0);
    const [userListings, setUserListings] = useState(0);
    const [listingsLen, setListingsLen] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [MarketLength, setMarketLength] = useState(0);
    

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    // useEffect(() => {
    //     const { ethereum } = window;
    //     const checkMetamaskAvailability = async () => {
    //         if (!ethereum) {
    //             setHaveMetamask(false);
    //         }
    //         setHaveMetamask(true);
    //     };
    //     checkMetamaskAvailability();
    // }, []);

////// connect to MetaMask. 
    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            await contract.methods.registerUser().send({from: address});
            navigate('/CarbonCreditsTrading/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }

    const newListing = async () => {
        const desc = document.getElementById('desc').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        try {
            await contract.methods.makeListing(desc, quantity, price).send({from: address})
        } catch(err) {
            setErrorMsg("Failed to make listing. Please check your input fields.")
        }
    }

//     const showValUpdate = async () => {
//         const ans = await getData();
//         setStoredPending(false);
//         setStoredDone(false);

//         setShowVal(ans);
//         RecordPush('get', ans);
//     }

    const fetchCredits = async () => {
        const credits = await contract.methods.getUserCredits().call({from: address})
        setCreditBalance(credits)
    }

    const buyListing = async (listingID, listingPrice) => {
        try {
            await contract.methods.purchaseListing(listingID).send({from: address})
        }
        catch(err) {
            setErrorMsg("Failed to buy listing. Please check that you have sufficient SepoliaETH.")
        }
    }

    const updateMarket = async() => {
        const marketplace = await contract.methods.viewListings().call();
        setListing(marketplace);
        setMarketLength(marketplace.length)
    }

    const fetchListings = async() => {
        const listings = await contract.methods.viewUserListings().call({from: address})
        setUserListings(listings);
    }

// ////// display functions. 
    const ProfileDisplay = () => {
        return (
            <Profile 
                isConnected = {isConnected}
                address = {address} 
                balance = {balance}
                credits = {creditBalance}
                showCredits = {fetchCredits}
                allUserListings = {userListings}
                showListings = {fetchListings}
            />
        )
    }

    const MakeListingDisplay = () => {
        return (
            <MakeListing 
                isConnected = {isConnected}
                makeListingHandle = {newListing} 
                error = {errorMsg}
            />
        )
    }

    const MarketDisplay = () => {
        return (
            <Market 
                isConnected = {isConnected}
                recordList = {market}
                marketRecordLen = {MarketLength}
                showMarket = {updateMarket}
                buyHandle = {buyListing}
                error = {errorMsg}
            />
        )
    }


    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/CarbonCreditsTrading" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
                    <Route path = "/CarbonCreditsTrading/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/CarbonCreditsTrading/makeListing" element = {<MakeListingDisplay/>}></Route>
                    <Route path = "/CarbonCreditsTrading/marketplace" element = {<MarketDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}

