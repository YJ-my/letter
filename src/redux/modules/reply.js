import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const ADD_REPLY = "ADD_REPLY";
const DELETE_REPLY = "DELETE_REPLY";

const addReply = createAction(ADD_REPLY, (reply) => ({reply}));
const deleteReply = createAction(DELETE_REPLY, (commentId) => ({commentId}));


const initialState = {
    list:[],
}

export default handleActions  ({
    [ADD_REPLY]: (state,draft) => produce(state, (draft)=>{
        
    }),
    [DELETE_REPLY]: (state,draft) => produce(state, (draft)=>{

    }),

},initialState);


const actionCreators = {


};

export {actionCreators};