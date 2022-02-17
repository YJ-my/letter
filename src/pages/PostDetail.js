import React, { useState } from "react";
import { history } from "../redux/configureStore";
import {Grid, Button, Text, Fixed, Card} from "../elements/index";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import Reply from "../components/Reply";
import { FiSend } from "react-icons/fi";
import { FaAngleDoubleRight } from "react-icons/fa";
import Permit from "../shared/Permit";
const PostDetail = (props) => {
    const dispatch = useDispatch();   
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);
    const postList = useSelector((state) => state.post.list);
    const params_id = props.match.params.postId;    
    const post_idx = postList.findIndex((p) => p.postId === parseInt(params_id));    
    const post = postList[post_idx];  

    React.useEffect(() => {
        if(!post){    
           return; 
        }
        dispatch(postActions.getOnePostDB(parseInt(params_id)));
    });    

    if(post === undefined){
        return (
            <React.Fragment></React.Fragment>
        );
    };
    const replyList = post.replys; 

    const editOnePost = () => {
        history.push(`/write/${params_id}`)
    };

    const deletePost =() => {
        dispatch(postActions.deletePostDB(parseInt(params_id)));
    };   

    return(
        <React.Fragment>
            {post && (
                <Grid >                    
                    <Grid is_scroll >               
                        <Grid  min_height="80vh" display="inline-block" bg="#F0EDCC" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative" align>
                            <Grid is_flex>
                                <Text>{post.localDateTime}</Text>
                                <Text bold>{post.anonymous===false? (post.nickname):("익명")}</Text>
                            </Grid>
                            <Grid>
                                <Text>{post.content}</Text>
                            </Grid>
                            {is_login?post.username === user_info.username ? (
                                <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                                    <Button width="calc(50% - 5px)" margin="0 10px 0 0" _onClick={editOnePost}>수정</Button>
                                    <Button width="calc(50% - 5px)" _onClick={deletePost}>삭제</Button>
                                </Fixed>
                            ) : (
                                <Button reply
                                    _onClick={()=>{
                                        history.push(`/reply_write/${params_id}`);
                                    }}
                                ><FiSend/></Button>
                            ) : ''}
                        </Grid>
                        {/* 답장 영역 */}
                        <Permit>
                            {replyList.map((p, idx) => {                
                                return(                                
                                    <Reply {...p} key={idx} postId={params_id}></Reply>   
                                );                
                            })}
                        </Permit>                        
                        {/* 답장영역 끝 */}
                    </Grid>
                    {is_login ?(
                        <Text color="white">옆으로 스크롤을 넘기면 답장이 나옵니다 <FaAngleDoubleRight style={{fontSize: "15px",verticalAlign: "sub"}}/></Text>        
                    ):(
                        <Text color="white">로그인을 하시면 답장을 볼 수 있어요!</Text>
                    )}                        
                </Grid>           
            )}  
        </React.Fragment>
    );

};

PostDetail.defaultProps = {
    postId: 2,
    username:"가짜@가짜.com",
    nickname : "편지왕",
    content: "편지왕은 나야나",
    anonymous: false,
    modifiedAt: "2022-02-15",
    replyCount : 1,
}



export default PostDetail;