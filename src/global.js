import { Link } from "react-router-dom";

export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export const GlobalToolBar = () => {
    return (
        <div className = "global-toolbar">
            <Link to = "/ee4032project">Login</Link>
            &nbsp;|&nbsp;
            <Link to = "/ee4032project/profile">Profile</Link>
            &nbsp;|&nbsp;
            <Link to = "/ee4032project/Marketplace">Market</Link>
            &nbsp;|&nbsp;
            <Link to = "/ee4032project/Sell">Sell</Link>
            &nbsp;|&nbsp;
            <Link to = "/ee4032project/MyListings">My Listings</Link>
        </div>
    )
}
