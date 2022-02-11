import React from "react";
import {Grid, Button, Text, Fixed} from "../elements/index";


const PostDetail = (props) => {
    return(
        <React.Fragment>
            <Grid bg="#eee" padding="20px" radius="10px" min_height="80vh">
                <Grid>               
                    <Grid min_height="80vh">
                        <Grid is_flex>
                            <Text>2022.02.11</Text>
                            <Text bold>닉네임</Text>
                        </Grid>
                        <Grid>
                            <Text>어쩌구 저쩌구 내용입니다.</Text>
                        </Grid>
                    </Grid>  
                    <Grid min_height="80vh">
                        <Grid is_flex>
                            <Text>2022.02.11</Text>
                            <Text bold>닉네임</Text>
                        </Grid>
                        <Grid>
                            <Text>어쩌구 저쩌구 내용입니다.</Text>
                        </Grid>
                    </Grid>  
                </Grid>              
                <Fixed bottom="10px">
                    <Button width="calc(50% - 10px)" margin="0 10px 0 0">수정</Button>
                    <Button width="calc(50% - 10px)">삭제</Button>
                </Fixed>
            </Grid>
        </React.Fragment>
    );

};

export default PostDetail;