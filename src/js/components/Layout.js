import React from "react";
import { getWeb3Action } from "../actions/web3Actions";
import Web3Provider from "./Web3Provider";
import Web3DetailsExample from "./Web3DetailsExample";

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <Web3Provider>
                        <Web3DetailsExample/>
                </Web3Provider>
            </div>
        );
    }
}