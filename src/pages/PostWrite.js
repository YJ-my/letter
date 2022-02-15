import React from "react";
import { Grid, Text, Button,Input,Fixed } from "../elements/index";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { actionCreators as PostActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import "moment";
import moment from "moment";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const [contents, setContents] = React.useState("");
    const [anonymous, setAnonymous] = React.useState(false); //익명체크
    const date = moment().format("YYYY-MM-DD");


    const changeContents =  (e) => {
        setContents(e.target.value);
    };

    const changeScales = () => {
        setAnonymous(!anonymous);
    };
    
    const addPost = () => {
        dispatch(PostActions.addPostDB(contents,anonymous));
    };

    const editPost = () => {
        dispatch(PostActions.editPostDB(contents,anonymous));
    };

    let post_id = props.match.params.postId;
    // console.log(post_id);
    const is_edit = post_id ? true : false;

    return(
        <React.Fragment>
            <Text margin="0px" size="36px" bold color="white">{is_edit ? ("편지 다시쓰기") : ("편지쓰기")}</Text><br></br>
            <Grid bg="#eee" padding="20px" radius="10px">
                <Grid>               
                    <Grid min_height="70vh">
                        <Grid is_flex>
                            <Text>{date}</Text>
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
                {is_edit ? (<Button is_fixed 
                    _onClick={()=>{
                        editPost();
                    }}>수정하기
                </Button>) : (<Button is_fixed 
                    _onClick={()=>{
                        addPost();
                    }}>작성하기
                </Button>)}
            </Grid>

        </React.Fragment>
    );
};

export default PostWrite;