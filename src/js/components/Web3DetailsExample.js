import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { notifyBlockNumberChanged, notifyAccountChanged } from "../util/web3Util";

export default class Web3DetailsExample extends React.Component {

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
