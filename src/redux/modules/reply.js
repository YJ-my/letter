import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/apis";
import { postApis } from "../../shared/apis";

const GET_REPLY = "GET_REPLY";
const ADD_REPLY = "ADD_REPLY";
const DELETE_REPLY = "DELETE_REPLY";


const getReply = createAction(GET_REPLY, (postId, data) => ({postId, data}));
const addReply = createAction(ADD_REPLY, (postId, comment) => ({postId, comment}));
const deleteReply = createAction(DELETE_REPLY, (postId, commentId) => ({postId, commentId}));


const initialState = {
    list:[],
};

//답장 불러오기
const getReplyDB = (postId) => {
    return function (dispatch, getState, {history}) {
        postApis.getReply(postId)
        .then((res)=>{
            console.log("getReplyDB",res.data); //백엔드에서 넘어온 데이터 확인   
            const data = res.data;

            dispatch(getReply(postId, data));

        }).catch((err)=>{
            console.log("답장불러오기실패", err);
            history.replace("/");
        });
    }
}




//답장 추가하기
// const addReplyDB = (postId, reply) => {
//     return function (dispatch, getState, {history}) {
//         console.log("답장테스트중",reply);

//         const _post_idx = getState().post.list.findIndex((p) => p.postId === parseInt(postId));
//         const post = getState().post.list[_post_idx]; 

//         postApis.replyPost(postId,reply).then((res)=>{
//             console.log("답장",res);
//             //console.log("target post",post);

//             window.alert("답장 부치기 성공!📮");
//             //history.push("/");

//         }).catch((error)=>{
//             console.log("답장전송실패!",error);
//             window.alert("앗! 우체국 파업중! 답장을 못 부쳤어요!");
//         });
//     }     
// };

//답장 삭제하기
// const deleteReplyDB = (postId, commentId) => {
//     return function (dispatch, getState, {history}){
//         console.log("답장 삭제",postId,commentId);

//         // const postList = getState().post.list; //편지 리스트 안에 답장리스트 불러오기
//         // const post_idx = postList.findIndex((p) => p.postId === parseInt(postId));
//         // const post = postList[post_idx];
//         // const replys = post.replys;
        
        
//         // const reply_index = replys.findIndex((r)=>{ //리스트에서 같은 아이디를 가진 답장 찾기
//         //     return r.commentId === replyId
//         // });

//         // console.log(reply_index);        

//         postApis.replyDelete(commentId)
//         .then((res)=>{
//             console.log(res);
//             //dispatch(deleteReply(postId,replyId));
//             window.alert("답장을 삭제했습니다.");
//             history.replace("/");
//         }).catch((err)=>{
//             window.alert("답장 삭제 실패");
//             console.log("답장 삭제 실패", err);
//         });
//     }
// };


export default handleActions  ({
    [GET_REPLY]:(state, action) => produce(state, (draft)=>{
        const postId = action.payload.postId;
        const data = action.payload.data;
        draft.list[postId] = data;
    }),
    [ADD_REPLY]: (state,action) => produce(state, (draft)=>{
        // draft.list[action.payload.postId].replyList.unshift(
        //     action.payload.comment
        // );
    }),
    [DELETE_REPLY]: (state,action) => produce(state, (draft)=>{
        // const postId = action.payload.postId;
        // const commentId = action.payload.commentId;
        // draft.list[postId].commentList = draft.list[postId].commentList.filter(
        //   (el) => {
        //     if (el.commentId === commentId) {
        //       return false;
        //     }
        //     return true;
        //   }
        // );
    }),

},initialState);


const actionCreators = {
    // addReplyDB,
    // deleteReplyDB,
    getReplyDB,
};

export {actionCreators};