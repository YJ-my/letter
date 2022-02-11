import React from "react";
import styled from "styled-components";
import {Grid, Button, Text, Fixed} from "../elements/index";
import "../shared/post.css";

const PostDetail = (props) => {
    return(
        <React.Fragment>
            <Grid >
                <Grid is_scroll >               
                    <Grid  min_height="85vh" display="inline-block" bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative">
                        <Grid is_flex>
                            <Text>2022.02.11</Text>
                            <Text bold>닉네임</Text>
                        </Grid>
                        <Grid>
                            <Text>어쩌구 저쩌구 내용입니다.</Text>
                        </Grid>
                        <Fixed bottom="10px">
                            <Button width="calc(50% - 10px)" margin="0 10px 0 0">수정</Button>
                            <Button width="calc(50% - 10px)">삭제</Button>
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




export default PostDetail;