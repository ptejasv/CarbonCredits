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
            <Link to = "/CarbonCreditsTrading/profile">Profile</Link>
            &nbsp;|&nbsp;
            <Link to = "/CarbonCreditsTrading/makeListing">Make Listing</Link>
            &nbsp;|&nbsp;
            <Link to = "/CarbonCreditsTrading/marketplace">Marketplace</Link>
        </div>
    )
}