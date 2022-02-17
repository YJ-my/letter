import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as replyActions } from "../redux/modules/reply";
import Reply from "../components/Reply";

const ReplyList = (props) => {    
    const dispatch = useDispatch();   
    const reply_list = useSelector((state) => state.reply.list); //답장리스트    
    const { postId } = props;

    //console.log("답장리스트확인",reply_list, reply_list[postId]);

    React.useEffect(() => {
        if(reply_list[postId]){
           return;
        }
       dispatch(replyActions.getReplyDB(postId)); //답장리스트 가져오기
    },[]);  

    return(
        <React.Fragment>
            {/* {reply_list[postId] && 
                reply_list[postId].reply_list.map((el, i) => {
                    return(                                
                        <Reply 
                            {...el} 
                            key={el.commentId} 
                            postId={postId}
                            idx={i}
                        />
                    );
                }
            )} */}
        </React.Fragment>
    );
}

ReplyList.defaultProps ={
    postId: "",
};

export default ReplyList;