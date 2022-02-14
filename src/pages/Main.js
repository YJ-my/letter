import React from "react";
import { history } from "../redux/configureStore";
import {Grid, Button, Text} from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { actionCreators as PostActions } from "../redux/modules/post";

const Main = (props) => {
    const dispatch = useDispatch();     
    const postList = useSelector((state) => state.post.list);

    React.useEffect(()=>{        
        dispatch(PostActions.getPostDB());//처음 렌더링될 때 포스트리스트를 가져와줘
    }, []);

    return(
        <React.Fragment>
            {/* {postList.map((p, idx) => {
                return(
                    <Card 
                        {...p}
                        key={idx}
                    />
                );
            })} */}

            <Grid>             
                <Grid bg="#F0EDCC" padding="20px" margin="0 0 15px 0" radius="10px">
                    <Grid>
                        <Text margin="0 0 10px 0"><b>{props.replyCount}0</b>개의 답장</Text>
                        <hr/>
                    </Grid>
                    <Grid>
                        <Text size="16px"><b>{props.nickname}하이루</b>님으로부터</Text>
                        <Text margin="10px 0 0 0">{props.content}라라라라라라라랄</Text>
                    </Grid>
                    <Text align="right">더 읽어보기</Text>
                </Grid>
            </Grid>
            <Grid padding="20px">
                <Button is_fixed
                    _onClick={()=>{
                        history.push("/write");
                    }}
                >편지 쓰기</Button>
            </Grid>            
        </React.Fragment>
    );
}

export default Main;