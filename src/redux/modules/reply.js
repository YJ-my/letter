import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/apis";
import { postApis } from "../../shared/apis";


const ADD_REPLY = "ADD_REPLY";
const DELETE_REPLY = "DELETE_REPLY";

const addReply = createAction(ADD_REPLY, (reply_list) => ({reply_list}));
const deleteReply = createAction(DELETE_REPLY, (commentId) => ({commentId}));


const initialState = {
    list:[],
};

//답장 추가하기
const addReplyDB = (postId, reply) => {
    return function (dispatch, getState, {history}) {
        console.log("답장테스트중",reply);

        const _post_idx = getState().post.list.findIndex((p) => p.postId === parseInt(postId));
        const post = getState().post.list[_post_idx]; 

        postApis.replyPost(postId,reply).then((res)=>{
            console.log("답장",res);
            console.log("target post",post);

            window.alert("답장 부치기 성공!📮");
            history.push("/");

        }).catch((error)=>{
            console.log("답장전송실패!",error);
            window.alert("앗! 우체국 파업중! 답장을 못 부쳤어요!");
        });
    }     
};

//답장 삭제하기
const deleteReplyDB = (replyId) => {
    return function (dispatch, getState, {history}){
        console.log("답장 삭제",replyId);

        const replyList = getState().post.list.reply; //편지 리스트 안에 답장리스트 불러오기
        const reply_index = replyList.findIndex((w)=>{ //리스트에서 같은 아이디를 가진 답장 찾기
            return w.replyId === replyId
        });

        //dispatch(deleteReply(reply_index));
    }
};


export default handleActions  ({
    [ADD_REPLY]: (state,draft) => produce(state, (draft)=>{
        
    }),
    [DELETE_REPLY]: (state,draft) => produce(state, (draft)=>{

    }),

},initialState);


const actionCreators = {
    addReplyDB,

};

export {actionCreators};