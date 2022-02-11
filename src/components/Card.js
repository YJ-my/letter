import React from "react";
import {Grid, Text, Button} from "../elements/index";
import { useHistory } from "react-router-dom";
const Card = (props) => {
    const history = useHistory();
    return(
        <React.Fragment>
            <Grid bg="#eee" padding="20px" radius="10px">            
                <Grid>
                    <Text>0개의 답장</Text>
                    <hr/>
                </Grid>
                <Grid _onClick={()=>{ history.push("/") }}>
                    <Text><b>닉네임</b>님으로부터</Text>
                    <Text>내용..어쩌구저쩌구...샬라샬라....</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Card;