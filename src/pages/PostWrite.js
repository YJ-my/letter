import React from "react";
import { Grid, Text, Button,Input,Fixed } from "../elements/index";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { actionCreators as PostActions } from "../redux/modules/post";

import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const [contents, setContents] = React.useState("");
    const [anonymous, setAnonymous] = React.useState(false); //익명체크

    const changeContents =  (e) => {
        setContents(e.target.value);
    };

    const changeScales = () => {
        setAnonymous(!anonymous);
        //console.log(anonymous);
    };

    const nickname = "닉네임";
    
    const addPost = () => {
        dispatch(PostActions.addPostDB(contents, nickname, anonymous));
    };

    return(
        <React.Fragment>
            <Text margin="0px" size="36px" bold color="white">편지쓰기</Text><br></br>
            <Grid bg="#eee" padding="20px" radius="10px">
                <Grid>               
                    <Grid min_height="70vh">
                        <Grid is_flex>
                            <Text>2022.02.11</Text>
                        </Grid>
                        <input type="checkbox" id="scales" name="scales" onChange={changeScales}></input>
                        <label htmlFor="scales">익명작성</label>
                        <Grid>
                            <Input
                                value={contents}
                                _onChange={changeContents}
                                // label="게시글 내용"
                                placeholder="편지 내용을 입력해주세요 :)"
                                multiLine
                            />
                        </Grid>
                    </Grid> 
                    </Grid>

                    <Button is_fixed 
                        _onClick={()=>{
                            // history.push("/")
                            addPost();
                        }}>작성하기
                    </Button>
            </Grid>

        </React.Fragment>
    );
};

export default PostWrite;