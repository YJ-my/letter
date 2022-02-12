import React from "react";
import { history } from "../redux/configureStore";
import {Grid, Button} from "../elements/index";
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
            {postList.map((item, idx) => {
                return(
                    <Card 
                        {...item}
                        key={idx}
                    />
                );
            })}
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