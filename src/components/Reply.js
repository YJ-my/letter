import React from "react";
import styled from "styled-components";
import {Grid, Text, Fixed, Button} from "../elements/index";
import { useDispatch, useSelector } from "react-redux";

const Reply = (props) => {
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);

    //console.log(props.username, user_info.username);

    
    return(
        <Grid className="detail_card" min_height="80vh" display="inline-block" bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px" relative="relative">
            <Grid is_flex>
                <Text>{props.localDateTime}</Text>
                <Text bold>{props.nickname}</Text>
            </Grid>
            <Grid>
                <Text>{props.content}</Text>
            </Grid>
            {props.username === user_info.username? (
                <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                    <Button>답장 지우기</Button>
                </Fixed>
            ) : ""}            
        </Grid>  
    );

};


export default Reply;