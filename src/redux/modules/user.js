import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";
const SIGN_UP = "SIGN_UP";


const login = createAction(LOGIN, (user)=>({user}));
const logout = createAction(LOGOUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const signUp = createAction(SIGN_UP, (user) => ({user}));

const initialState = {
    userInfo:{
        username: "유저아이디",
    },
    result : false,
};



export default handleActions ({

    [LOGIN]: (state, action) => produce(state, (draft) => {

    }),
    [LOGOUT]: (state, action) => produce(state, (draft) => {

    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {

    }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기

};

export {actionCreators};