import React from "react";
import {Grid, Text, Button} from "../elements/index";
import { history } from "../redux/configureStore";
import {useDispatch, useSelector} from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';


const Card = (props) => {
    const dispatch = useDispatch(); 
    //const post_id = props.match.params.id;   
    return(
        <React.Fragment>
            <Grid>             
                <Grid bg="#F0EDCC" padding="20px" margin="0 0 15px 0" radius="10px">
                    <Grid>
                        <Text margin="0 0 10px 0"><b>{props.replyCount}</b>개의 답장</Text>
                        <hr/>
                    </Grid>
                    <Grid>
                        <Text size="16px"><b>{props.nickname}</b>님으로부터</Text>
                        <Text margin="10px 0 0 0">{props.content}</Text>
                    </Grid>
                    <Text align="right">더 읽어보기</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Card;