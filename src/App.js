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
    const [marketLength, setMarketLength] = useState(0);
    const [creditBalance, setCreditBalance] = useState(0);
    const [userListings, setUserListings] = useState(0);
    const [listingsLen, setListingsLen] = useState(0);
    const [errMakeListing, setErrMakeListing] = useState("")
    const [errBuy, setErrBuy] = useState("")
    const [pendingLogin, setPendingLogin] = useState(false)
    const [statusMake, setStatusMake] = useState("")
    const [statusBuy, setStatusBuy] = useState("")

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

            setPendingLogin(true)
            // await contract.methods.registerUser().send({ from: address});
            setPendingLogin(false)
            navigate('/CarbonCredits/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }

    const newListing = async () => {
        const desc = document.getElementById('desc').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        setStatusMake("")

        if ((desc == "") || (quantity < 1) || (price < 1)) {
            setErrMakeListing("Failed to make listing. Please check your input fields.")
            setTimeout(function(){
                setErrMakeListing("");
           },10000);
        } else {
            setStatusMake("Making your listing...")
            try {
                await contract.methods.makeListing(desc, quantity, price).send({from: address})
                setStatusMake("Done! Your listing will be visible after refreshing the marketplace.")
                setTimeout(function(){
                    setStatusMake("");
                },10000);
            } catch(err) {
                setErrMakeListing("Failed to make listing. Please check your input fields.")
                setStatusMake("")
                setTimeout(function(){
                    setErrMakeListing("");
            },10000);
            }
        }
    }

    const fetchCredits = async () => {
        const credits = await contract.methods.getUserCredits().call({from: address})
        setCreditBalance(credits)
    }

    const buyListing = async (listingID, listingPrice) => {
        setStatusBuy("Purchasing listing ".concat(listingID.concat("...")))
        try {
            await contract.methods.purchaseListing(listingID).send({from: address, value: listingPrice * 10000000000000000})
            setStatusBuy("Purchased!")
            setTimeout(function(){
                setStatusBuy("");
            },10000);
        }
        catch(err) {
            setErrBuy("Failed to buy listing. Please check that you have sufficient SepoliaETH.")
            setStatusBuy("")
            setTimeout(function(){
                setErrBuy("");
           },10000);
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
        setListingsLen(listings.length);
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
                userListingsLen = {listingsLen}
            />
        )
    }

    const MakeListingDisplay = () => {
        return (
            <MakeListing 
                isConnected = {isConnected}
                makeListingHandle = {newListing} 
                error = {errMakeListing}
                status = {statusMake}
            />
        )
    }

    const MarketDisplay = () => {
        return (
            <Market 
                isConnected = {isConnected}
                recordList = {market}
                marketRecordLen = {marketLength}
                showMarket = {updateMarket}
                buyHandle = {buyListing}
                error = {errBuy}
                status = {statusBuy}
            />
        )
    }


    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/CarbonCredits" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} pending = {pendingLogin} />}></Route>
                    <Route path = "/CarbonCredits/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/CarbonCredits/makeListing" element = {<MakeListingDisplay/>}></Route>
                    <Route path = "/CarbonCredits/marketplace" element = {<MarketDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}

