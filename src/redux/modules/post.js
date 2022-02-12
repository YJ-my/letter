import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"
import {RESP} from "../../shared/respones";

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

const getPostDB = () => {
    return function (dispatch, getState, {history}) {
        //console.log(RESP.POST.list);
        
        const DB = RESP.POST.list;       

        let post_list = [];
        
        DB.forEach((_post) => {
            //console.log(doc.post_id, doc.content);

            const post = {
                post_id : _post.postId,
                content: _post.content,
                modifiedAt: _post.modifiedAt,
                nickname: _post.nickname,
                replyCount: _post.replyCount,            
            };

            //console.log(post);

            post_list.push(post);            
        });

        dispatch(getPost(post_list));
    }
}

const addPostDB = (content, nickname, anonymous) => {
    return function (dispatch, getState, {history}) {
        console.log(content, nickname, anonymous);
    };
};




export default handleActions ({

    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {

    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    getPostDB,
    addPostDB,
};

export {actionCreators};