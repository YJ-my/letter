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
    list: [
        {
            postId: 1,
            nickname : "하이루",
            content: "편지를 써볼게여",
            anonymous: true,
            modifiedAt: "2022-02-15",
            replyCount : 3,
        },
        {   
            postId: 2,
            nickname : "편지왕",
            content: "편지왕은 나야나",
            anonymous: false,
            modifiedAt: "2022-02-15",
            replyCount : 1,
        },
    ]
};


const initalPost = {
    content:"안녕하세요 편지써봅니다.",
    nickname:"닉네임",
    anonymous:false, //익명여부
    modifiedAt:"2202-02-12",
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
            console.log("포스트리스트",post_list);
        });     
    }
}

//게시글 작성
const addPostDB = (content,anonymous) => {
    return async function (dispatch, getState, {history}) {
        
        const _user = getState().user.user;         
        console.log("편지 작성중",content, anonymous, _user.nickname);

        postApis.addPost(content,anonymous).then((respones)=>{
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

const editPostDB = (postId=null, content, anonymous) => {
    return function (dispatch, getState, {history}) {
        const _user = getState().user.user;
        const user_info = {
            nickname: _user.nickname,  // 유저 닉네임
            username: _user.username, //유저 아이디
        };

        const _post_idx = getState().post.list.findIndex((p) => p.id === postId);
        const _post = getState().post.list[_post_idx];

        const post = {
            ...initalPost,
            content:content,
            anonymous:anonymous,
        };

        console.log(content, anonymous, user_info.nickname);

        postApis.editPost(post).then((res)=>{
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
        let idx = draft.list.findIndex((p) => p.id === action.payload.postId);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    getPostDB,
    addPostDB,
    deletePostDB,
    editPostDB
};

export {actionCreators};