import React from "react";
import { history } from "../redux/configureStore";
import {Grid, Button, Text} from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { actionCreators as PostActions } from "../redux/modules/post";
import { BiMailSend } from "react-icons/bi";

const Main = (props) => {
    const dispatch = useDispatch();     
    const postList = useSelector((state) => state.post.list);

    React.useEffect(()=>{        
        dispatch(PostActions.getPostDB());//처음 렌더링될 때 포스트리스트 갱신하기
    });

    return(
        <React.Fragment>
            {postList.map((p, idx) => {
                return(
                    <Grid  
                    key={idx}
                    _onClick={()=>{
                        history.push(`/post/${p.postId}`)
                    }}>
                        <Card 
                            {...p}
                            key={idx}
                                            
                        />
                    </Grid>
                    
                );
            })}
            <Grid padding="20px">
                <Button is_fixed
                    _onClick={()=>{
                        history.push("/write");
                    }}
                >편지 부치기<BiMailSend style={{fontSize: "20px",verticalAlign: "sub"}}/></Button>
            </Grid>            
        </React.Fragment>
    );
}



export default Main;