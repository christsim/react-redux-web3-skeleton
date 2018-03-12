import React from "react";
import { connect } from "react-redux";
import { 
    getWeb3Action, 
    getWeb3AccountDetailsAction,
    getWeb3NetworkDetailsAction,
} from "../actions/web3Actions";
import store from "../store";
import { notifyBlockNumberChanged, notifyAccountChanged } from "../util/web3Util";

@connect(
    //map to props
    (store) => {
        return {
            web3: store.web3Reducer.web3,
            networkDetails: store.web3Reducer.networkDetails,
            accountDetails: store.web3Reducer.accountDetails,
        }
    }
)
export default class Web3Component extends React.Component {

    componentWillMount() {
        store.dispatch(getWeb3Action())
            .then(web3Action => web3Action.action.payload)
            .then(web3 => {
                store.dispatch(getWeb3NetworkDetailsAction(web3));

                notifyAccountChanged(web3, (accounts => {
                    store.dispatch(getWeb3AccountDetailsAction(web3));
                }));
                notifyBlockNumberChanged(web3, (blockNumber => {
                    store.dispatch(getWeb3NetworkDetailsAction(web3));
                }));
            });
    }

    render() {
        var body = (this.props.web3.loading) ? 
        (<h1>Loading</h1>) : 
        (
            <div>
                <h1>Web3 {this.props.web3.version}</h1>
                <div>{this.props.web3.error}</div>

                <div><NetworkDetails networkDetails={this.props.networkDetails }/></div>
                <div><AccountDetails accountDetails={this.props.accountDetails }/></div>
            </div>
        );

        return (    
            <div>
                {body}
            </div>
        );
    }
}

const NetworkDetails = (props) => {
    var networkDetails = props.networkDetails;

    if(!networkDetails) {
        return <div>Not connected to network.</div>
    } else if(networkDetails.loading) {
        return (<div>Loading</div>);
    } else if (networkDetails.error) {
        return (<div>Unable to get network details: {networkDetails.error}</div>)
    } else {
        return (
        <div>
            <div>Block Number: {networkDetails.blockNumber}</div>
            <div>Protocol Version: {networkDetails.protocolVersion}</div>
            <div>Is Syncing: {networkDetails.isSyncing ? networkDetails.isSyncing : "false"}</div>
        </div>)
    }

}

const AccountDetails = (props) => {
    var accountDetails = props.accountDetails;

    if(!accountDetails) {
        return <div>No account selected.</div>
    } else if(accountDetails.loading) {
        return (<div>Loading</div>);
    } else if (accountDetails.error) {
        return (<div>Unable to get account details: {accountDetails.error}</div>)
    } else if (!accountDetails.accounts || accountDetails.accounts.length == 0) {
        return <div>No account selecteds.</div>
    } else {
        return (<div>
            {accountDetails.accounts.map(ad => 
                (<div key={ad.account}>
                    <div>Account: {ad.account}</div>
                    <div>Balance: {ad.balance}</div>
                </div>)
            )}
        </div>)
    }
}
