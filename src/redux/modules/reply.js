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


const addReplyDB = (postId, reply) => {
    return function (dispatch, getState, {history}) {
        console.log("답장테스트중",reply);

        const _post_idx = getState().post.list.findIndex((p) => p.postId === parseInt(postId));
        const post = getState().post.list[_post_idx]; 

        postApis.replyPost(postId,reply).then((res)=>{
            console.log("답장",res);
            console.log("target post",post);

            // window.alert("답장 부치기 성공!📮");
            // history.push("/");

        }).catch((error)=>{
            console.log("답장전송실패!",error);
            window.alert("앗! 우체국 파업중! 답장을 못 부쳤어요!");
        });

    }
     
}

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