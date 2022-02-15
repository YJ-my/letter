import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import {Grid, Button, Text, Fixed} from "../elements/index";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import Reply from "../components/Reply";
import { FiSend } from "react-icons/fi";


const PostDetail = (props) => {
    const dispatch = useDispatch();
    const {userInfo} = props;

    const params_id = props.match.params.postId;
    const user_info = useSelector((state) => state.user.user);
    const postList = useSelector((state) => state.post.list);
    const post_idx = postList.findIndex(p => p.postId === parseInt(params_id));    
    const post = postList[post_idx];

    console.log(userInfo);
    

    React.useEffect(() => {
        if(post){
           return; 
        }
        dispatch(postActions.getOnePostDB(params_id));
    });  

    return(
        <React.Fragment>   
            {post && (       
                <Grid >
                    <Grid is_scroll >               
                        <Grid  min_height="85vh" display="inline-block" bg="#F0EDCC" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative">
                            <Grid is_flex>
                                <Text>{post.modifiedAt}</Text>
                                <Text bold>{post.nickname}</Text>
                            </Grid>
                            <Grid>
                                <Text>{post.content}</Text>
                            </Grid>

                            {user_info?.nickname === userInfo?.nickname ? (
                                <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                                    <Button width="calc(50% - 5px)" margin="0 10px 0 0">수정</Button>
                                    <Button width="calc(50% - 5px)">삭제</Button>
                                </Fixed>
                            ) : (
                                <Button reply 
                                    _onClick={()=>{
                                        history.push("/reply_write");
                                    }}
                                ><FiSend/></Button> 
                            )}
                                                       
                        </Grid>
                        {/* 답장 영역 */}
                            <Grid display="inline-block">
                                <Reply></Reply>
                            </Grid>
                        {/* 답장영역 끝 */}
                    </Grid>                
                </Grid>           
            )}  
        </React.Fragment>
    );

};

PostDetail.defaultProps = {
    postId: 2,
    nickname : "편지왕",
    content: "편지왕은 나야나",
    anonymous: false,
    modifiedAt: "2022-02-15",
    replyCount : 1,
}



export default PostDetail;