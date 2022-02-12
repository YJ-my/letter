import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";


const getPost = createAction(GET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));


const initialState = {
    list: []
};


const initalPost = {
    content:"안녕하세요 편지써봅니다.",
    nickname:"닉네임",
    anonymous:false, //익명여부
};


const addPostDB = () => {
    return function (dispatch, getState, {history}) {
        const _user = getState.user.user;

    };

};


export default handleActions ({

    [GET_POST]: (state, action) => produce(state, (draft) => {

    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {

    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기

};

export {actionCreators};