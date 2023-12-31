import './login.css';
import '../../global.css';
import greenEconomy from '../../images/greenEconomy.png';

export default function Login(props){

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    No MetaMask detected. 
                    <br></br>
                    Please install&nbsp;
                    <span className = "login-highlight">
                        METAMASK 
                    </span>
                    &nbsp;to your browser to proceed. 
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        return (
            <div>
                <p>
                    Please log in with&nbsp;
                    <span className = "login-highlight">
                        METAMASK 
                    </span>
                    &nbsp;to proceed. 
                </p>
                <a className = "global-link" onClick = {props.connectTo}>
                    Click here to connect
                </a>
            </div>
        )
    }

    return (
        <div className = "login">
            <img src = {greenEconomy} className = "login-logo" alt = "logo" />
            <h2>
                23-24 Sem 1 EE4032 <br/>
                Carbon Credits Trading
                <br/>
                <span className = "login-author">
                    Developed by: Group 1
                </span>
            </h2>
            {
                props.isHaveMetamask ?
                <LoginMetamask /> :
                <NoMetamask />
            }
            {props.pending && <p> Logging you in... </p>}
        </div>
    )
}
