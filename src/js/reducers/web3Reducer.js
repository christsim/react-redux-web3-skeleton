
const initialState = {
    web3: null,
    blockNumber: null,
    account: null,
    balance: null
};

// dont mutate state!!
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "GET_WEB3_PENDING":
            return {...state, loading: true, error:null};
        case "GET_WEB3_FULFILLED":
            return {...state, loading: false, web3: action.payload, error:null};
        case "GET_WEB3_REJECTED":
            return {...state, loading: false, error: action.payload, error:null};

        case "GET_WEB3_BLOCKNUMBER_PENDING":
            return {...state, error:null };
        case "GET_WEB3_BLOCKNUMBER_FULFILLED":
            return {...state, blockNumber: action.payload, error:null};
        case "GET_WEB3_BLOCKNUMBER_REJECTED":
            return {...state, blockNumber: null, error: action.payload};

        case "GET_WEB3_ACCOUNT_PENDING":
            return {...state, account: null, error:null};
        case "GET_WEB3_ACCOUNT_FULFILLED":
            return {...state, account: action.payload, error:null};
        case "GET_WEB3_ACCOUNT_REJECTED":
            return {...state, account: null, error: action.payload};
            
        case "GET_WEB3_ACCOUNT_BALANCE_PENDING":
            return {...state, balance: null, error:null};
        case "GET_WEB3_ACCOUNT_BALANCE_FULFILLED":
            return {...state, balance: action.payload, error:null};
        case "GET_WEB3_ACCOUNT_BALANCE_REJECTED":
            return {...state, balance: null, error: action.payload};

        default:
            return state;
    }
}

