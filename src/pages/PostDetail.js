import React from "react";
import {Grid, Button, Text, Fixed} from "../elements/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = (props) => {
    const params_id = props.match.params.postId;
    const postList = useSelector((state) => state.post.list);
    const post_idx = postList.findIndex((p) => p.postId === params_id);
    const post = postList[post_idx];

    // console.log(params);

    React.useEffect(() => {
        if(post){
           return; 
        }        
    }, []);
    
    return(
        <React.Fragment>            
            <Grid >
                <Grid is_scroll >               
                    <Grid  min_height="85vh" display="inline-block" bg="#F0EDCC" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative">
                        <Grid is_flex>
                            <Text>{props.modifiedAt}</Text>
                            <Text bold>{props.nickname}</Text>
                        </Grid>
                        <Grid>
                            <Text>{props.content}</Text>
                        </Grid>
                        <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                            <Button width="calc(50% - 5px)" margin="0 10px 0 0">수정</Button>
                            <Button width="calc(50% - 5px)">삭제</Button>
                        </Fixed>
                    </Grid>

                    {/* 답장 영역 */}
                    <Grid display="inline-block">                        
                        <Grid className="detail_card" min_height="85vh" display="inline-block" bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px" >
                            <Grid is_flex>
                                <Text>2022.02.11</Text>
                                <Text bold>닉네임</Text>
                            </Grid>
                            <Grid>
                                <Text>어쩌구 저쩌구 답장입니다.</Text>
                            </Grid>
                        </Grid>  
                        <Grid className="detail_card" min_height="85vh" display="inline-block" bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px" >
                            <Grid is_flex>
                                <Text>2022.02.11</Text>
                                <Text bold>닉네임</Text>
                            </Grid>
                            <Grid>
                                <Text>어쩌구 저쩌구 답장2입니다.</Text>
                            </Grid>
                        </Grid>                     
                    </Grid>
                    {/* 답장영역 끝 */}
                </Grid>                
            </Grid>
           
            
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
    uid : "002"
}


export default PostDetail;