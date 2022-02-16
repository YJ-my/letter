import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"
import { getToken } from "../../shared/token";
import apis from "../../shared/apis";
import { postApis } from "../../shared/apis";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";


const getPost = createAction(GET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));


const initialState = {
    list: [],
};


const initalPost = {
    username: "jini@naver.com",
    postId: 1,
    nickname : "닉네임",
    content: "내용이에요",
    anonymous: false,
    modifiedAt: "2202-02-12",
};

//게시글 조회
const getPostDB = () => {
    return function (dispatch, getState, {history}) {
        postApis.getPost()
            .then((res)=>{            
            console.log("getPostDB",res.data); //백엔드에서 넘어온 데이터 확인
            let post_list = [];
            
            res.data.forEach((_post)=>{
                const post = {
                    username:_post.username,
                    postId : _post.postId,
                    content: _post.content,
                    modifiedAt: _post.localDateTime,
                    nickname: _post.nickName,
                    replyCount: _post.replyCount,
                    anonymous:_post.anonymous,
                };

                post_list.push(post);
            });            
            dispatch(getPost(post_list));
        });     
    }
}

//게시글 1개만 가져오기
const getOnePostDB = (postId) => {
    return async function (dispatch, getState, { history }) {

        postApis.getOnePost(postId)
        .then((res) => {
            console.log(res.data);

            const _post = res.data;
            const post = {
                username:_post.username,
                postId : _post.postId,
                content: _post.content,
                modifiedAt: _post.localDateTime,
                nickname: _post.nickName,
                replyCount: _post.replyCount,
                anonymous:_post.anonymous,
            };
            dispatch(getPost(post));
        })
        .catch((err) => {
          console.log("게시물 1개 가져오기 실패 : ", err.response);
          history.replace("/");
        });
    };
  };


//게시글 작성
const addPostDB = (content,anonymous) => {
    return async function (dispatch, getState, {history}) {
        
        const _user = getState().user.user;         
        console.log("편지 작성중",content, anonymous, _user.nickname);

        postApis.addPost(content,anonymous).then((respones)=>{
            //const user = getState().user.user;
            console.log("포스트 성공 데이터",respones.data);
            window.alert("편지 전달 성공 :)");
            history.push("/");
        }).catch((error)=>{
            window.alert("편지 발송에 실패했습니다 :(");
            console.log("포스트 작성 에러",error);
        });
    };
};


//게시글 수정

const editPostDB = (postId, post) => {
    return function (dispatch, getState, {history}) {

        console.log(postId, post);

        postApis.editPost(postId,post).then((res)=>{
            console.log(res.data); //result 값
            dispatch(editPost(postId,{...post}));
        }).catch((error)=>{
            console.log("게시글 작성 에러",error);
            window.alert("편지 수정을 실패했습니다 :(");
        })
        
    };
};


//게시글 삭제
const deletePostDB = (postId) => {
    return function (dispatch, getState, {history}){
        
        apis.delete(`/api/posts/${postId}`,{postId}).then((res) => {
            console.log(res);
        }).catch(err => {
            window.alert("편지 삭제를 실패했습니다 :(");
        });
    };
};




export default handleActions ({

    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        console.log(draft.list);
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.postId === action.payload.postId);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    getPostDB,
    getOnePostDB,
    addPostDB,
    deletePostDB,
    editPostDB
};

export {actionCreators};