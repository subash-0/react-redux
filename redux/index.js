import {createStore, applyMiddleware,combineReducers} from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import  {thunk}  from 'redux-thunk';
//store 

const inc = 'increament';
const init ='init';
const dec = 'decreament';
const incbyAmt = 'incbyAmount';
const store = createStore(
    combineReducers({
        account:accountReducer,
        bonus: bonusReducer,
    })
    ,applyMiddleware(logger.default,thunk));

let history = [];
// reducer
function accountReducer(state={amount:1},action){
            // if(action.type===inc){
            //     // mutate
            // //    state.amount = state.amount+1;
            //     // immutability->state must be immutable, it is not good practice to make mutate state
            //     return {amount: state.amount+1}
            // }
            // if(action.type===dec){
            //   return {amount: state.amount-1}
            // }
            // if(action.type===incbyAmt){
            //   return {amount: state.amount+ action.payload}
            // }

                switch(action.type){
                    case init :
                        return { amount:action.payload}
                    case inc:
                        return {amount:state.amount+1}
                       
                    case dec:
                        return {amount:state.amount-1}
                       
                    case incbyAmt:
                        return {amount:state.amount + action.payload}
                       
                    default:
                        return state;
                }

            return state;
}

function bonusReducer(state={points:1},action){
        switch(action.type){
            case inc:
                return {points:state.points+1};
            default:
                return state;
            }

}

// global state
// middleware are the actions taken at the middle of the action to make some possibility.
//API async call


//action creaters


 function initUser(id){
    return async (dispatch,getState)=>{
  const {data}= await axios.get(`http://localhost:3000/accounts/${id}`)
    dispatch({type:init,payload:data.amount}) 
}}

function increament(){
    return {type:inc}
}
function decreament(){
    return {type:dec}
}
function incbyAmount(value){
    return {type:incbyAmt,payload:6}
}

setInterval(() => {
store.dispatch(increament());

}, 2000);