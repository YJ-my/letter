import React from "react";
import styled from "styled-components";
import {Grid, Text, Fixed, Button} from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as replyAction} from "../redux/modules/reply";

const Reply = (props) => {
    const dispatch = useDispatch();
    const {user_info, localDateTime, anonymous, content, postId, commentId} = props;
    //const user_info = useSelector((state) => state.user.user);
    const loginUser = useSelector((state) => state.user.user?.username);

    //답장 삭제하기
    const deleteReply = () => {
        dispatch(replyAction.deleteReplyDB(postId,commentId));
    };
    
    return(
        <Grid className="detail_card" min_height="80vh" display="inline-block" bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative">
            <Grid is_flex>
                <Text>{localDateTime}</Text>
                <Text bold>{anonymous===false? (user_info.nickname):"익명"}</Text>
            </Grid>
            <Grid>
                <Text>{content}</Text>
            </Grid>
            {loginUser === user_info.username && (
                <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                    <Button _onClick={()=>{
                        deleteReply();
                    }}>답장 지우기</Button>
                </Fixed>
            )}
        </Grid>  
    );

};


export default Reply;