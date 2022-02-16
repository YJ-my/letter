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
const deletePost = createAction(DELETE_POST, (postId) => ({postId}));




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
            //         modifiedAt: _post.localDateTime,
            //         nickname: _post.nickName,
            //         replyCount: _post.replyCount,
            //         anonymous:_post.anonymous,
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

            //dispatch(setPost(res.data));

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
            const date = moment().format("YYYY-MM-DD");
            const user = getState().user.user;
            console.log("포스트 성공 데이터",respones.data);

            dispatch(addPost({ 
                content:content, 
                anonymous:anonymous, 
                postId: respones.data,
                username: user.username, 
                nickname:user.nickname,
                localDateTime:date,
                replyCount:0,
            }));

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

        console.log(postId, post);

        postApis.editPost(postId,post).then((res)=>{
            console.log(res.data); //result 값
            dispatch(editPost(postId,{...post}));

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
            dispatch(deletePost(postId));
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
        let idx = draft.list.findIndex((p) => p.postId === action.payload.postId);
        draft.list[idx] = draft.list.filter((p) => {
            console.log(p.postId, action.payload.postId);
            return p.postId !== action.payload.postId
        })
        // draft.list = draft.list.filter((el) => {
        //     if (el.postId === action.payload.postId) {
        //       return false;
        //     }
        //     return true;
        // });
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