import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import {Grid, Button, Text, Input} from "../elements/index";
import { BiMailSend } from "react-icons/bi";
import {actionCreators as replyActions} from "../redux/modules/reply";

const ReplyWrite = (props) => {
    const dispatch = useDispatch();

    const params_id = props.match.params.postId;
    const user_info = useSelector((state) => state.user.user);
    const postList = useSelector((state) => state.post.list);
    const post_idx = postList.findIndex(p => p.postId === parseInt(params_id));    
    const post = postList[post_idx];

    const [contents, setContents] = React.useState('');
    const [anonymous, setAnonymous] = React.useState(false); //익명체크

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const changeScales = (e) => {
        setAnonymous(!anonymous);
    };

    const replyPost = () => {
        const reply = {
            comment:contents,
            anonymous:anonymous
        };

        dispatch(replyActions.addReplyDB(params_id,reply));

    }   

    return(
        <React.Fragment>
            <Grid>
                <HarfDiv>                
                    <Text size="25px" color="white">답장할 편지📮</Text>
                    <Grid bg="#F0EDCC" padding="20px"  margin="0 20px 0 0" radius="10px">
                        <Text overflow="scroll">{post.content}</Text>
                    </Grid>
                </HarfDiv>


                <HarfDiv style={{verticalAlign:"top"}}>
                    <Text size="25px" color="white">답장💌</Text>
                    <Grid>
                        <Input 
                            value={contents} 
                            _onChange={changeContents} 
                            placeholder="답장을 작성해주세요 :-)" 
                            multiLine 
                        />
                        <label style={{color:"white"}} onChange={changeScales}>
                            <input type="checkbox"/>
                            익명으로 쓸래요
                        </label>                   
                    </Grid>
                </HarfDiv>

                <Grid padding="20px">
                    <Button is_fixed
                        _onClick={()=>{
                            replyPost();
                        }}
                    >답장 부치기<BiMailSend style={{fontSize: "20px",verticalAlign: "sub"}}/></Button>
                </Grid>

            </Grid>

        </React.Fragment>
    );
};

const HarfDiv = styled.div`
    display: block;
    width: 100%;
    @media screen and (min-width: 769px) {
        display: inline-block;
        width: calc(50% - 20px);
        margin: 0 10px
    };
`;


export default ReplyWrite;