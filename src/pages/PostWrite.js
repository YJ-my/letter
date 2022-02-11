import React from "react";
import { Grid, Text, Button,Input,Fixed } from "../elements/index";
import { history } from "../redux/configureStore";
import styled from "styled-components";


// import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const [contents, setContents] = React.useState("");
    const changeContents =  (e) => {
        setContents(e.target.value);
    };
    return(
        <React.Fragment>
            <Text margin="0px" size="36px" bold>편지쓰기</Text><br></br>
            <Grid bg="#eee" padding="20px" radius="10px" min_height="80vh">
                <Grid>               
                    <Grid min_height="80vh">
                        <Grid is_flex>
                            <Text>2022.02.11</Text>
                        </Grid>
                        <input type="checkbox" id="scales" name="scales"></input>
                            <label for="scales">익명작성</label>
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
                <Fixed bottom="10px">
                    <Button width="calc(100%)" _onClick={()=>{history.push("/")}}>작성하기</Button>
                </Fixed>
            </Grid>

        </React.Fragment>
    );
};

export default PostWrite;