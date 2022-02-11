import React from "react";
import styled from "styled-components";
import {Grid, Button, Text, Fixed, Input} from "../elements/index";
import { history } from "../redux/configureStore";

const ReplyWrite = (props) => {
    const [contents, setContents] = React.useState("");
    const changeContents =  (e) => {
        setContents(e.target.value);
    };
    return(
        <React.Fragment>
            <Text margin="0px" size="36px" bold>편지수정</Text><br></br>
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

                    <Button is_fixed _onClick={()=>{history.push("/post")}}>수정하기</Button>
            </Grid>

        </React.Fragment>
    );
};

export default ReplyWrite;