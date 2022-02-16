import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"
import { getToken } from "../../shared/token";
import apis from "../../shared/apis";
import { postApis } from "../../shared/apis";

const GET_POST = "GET_POST";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";



const getPost = createAction(GET_POST, (post_list)=>({post_list}));
const setPost = createAction(SET_POST, (post)=>({post}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post_list) => ({post_list}));


const initialState = {
    list: [],
};



//게시글 조회
const getPostDB = () => {
    return function (dispatch, getState, {history}) {
        postApis.getPost()
            .then((res)=>{            
            //console.log("getPostDB",res.data); //백엔드에서 넘어온 데이터 확인
            const data = res.data;            

            // let post_list = [];
            // res.data.forEach((_post)=>{
            //     const post = {
            //         username:_post.username,
            //         postId : _post.postId,
            //         content: _post.content,
            //         localDateTime: _post.localDateTime,
            //         nickName: _post.nickName,
            //         replyCount: _post.replyCount,
            //         anonymous:_post.anonymous,
            //         replys:[],
            //     };

            //     post_list.push(post);
            // });
            
            dispatch(getPost(data));
        });     
    }
}

//게시글 1개만 가져오기
const getOnePostDB = (postId) => {
    return async function (dispatch, getState, { history }) {

        postApis.getOnePost(postId)
        .then((res) => {            

            //console.log("게시글 1개 콘솔",res.data.replys);
            const replys = res.data.replys;

            dispatch(setPost(res.data));

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
            const postId = respones.data;

            postApis.getOnePost(postId)
            .then((res) => {
                console.log("게시글 새로작성",res.data);
                dispatch(addPost({...res.data,replyCount:0}));
            })
            .catch((err) => {
                console.log("게시물 작성 1개 가져오기 실패 : ", err.response);
                history.replace("/");
            });

            window.alert("편지 전달 성공 :)");
            history.replace("/");

        }).catch((error)=>{
            window.alert("편지 발송에 실패했습니다 :(");
            console.log("포스트 작성 에러",error);
        });
    };
};


//게시글 수정

const editPostDB = (postId, post) => {
    return function (dispatch, getState, {history}) {
        postApis.editPost(postId,post).then((res)=>{
            const post_index = getState().post.list.find((item) => item.postId === postId);
            console.log(post_index);

            postApis.getOnePost(postId)
            .then((res) => {
                console.log("게시글 수정하기",res.data);
                dispatch(editPost({post_index,...res.data,replyCount:post_index.replyCount}));
            })
            .catch((err) => {
                console.log("편지 수정 게시글 가져오기 실패 : ", err.response);
                history.replace("/");
            });
            window.alert("편지 수정 성공 :)");
            history.replace("/");
        }).catch((error)=>{
            console.log("게시글 작성 에러",error);
            window.alert("편지 수정을 실패했습니다 :(");
        })
        
    };
};


//게시글 삭제
const deletePostDB = (postId) => {
    return function (dispatch, getState, {history}){
        
        console.log("포스트삭제",postId);

        postApis.deletePost(postId)
        .then((res) => {
            console.log(res);
            const post_index = getState().post.list.findIndex(
                (item) => item.postId === postId
              );
            const _post = getState().post.list.filter((item, index) => {
                return index !== post_index;
            });            

            dispatch(deletePost(_post));
            history.push("/");
            window.alert("편지 삭제를 완료했습니다 :)");

        }).catch(err => {
            window.alert("편지 삭제를 실패했습니다 :(");
            console.log("편지삭제실패",err);
            history.push("/");
        });
    };
};



export default handleActions ({

    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
    [SET_POST]: (state, action) => produce(state, (draft)=> {
        draft.list = draft.list.reduce((acc, cur) => {
            // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
            // 있으면? 덮어쓰고, 없으면? 넣어주기!
            if (acc.findIndex((p) => p.postId === action.payload.postId) === -1){
                return [...acc, cur];
            }else{
                acc[acc.findIndex((p) => p.postId === action.payload.postId)] = cur;
                return acc;
            }
        }, []); 
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.postId === action.payload.postId);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };        
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
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