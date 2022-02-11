import React from "react";
import {Grid, Text, Button} from "../elements/index";
import { history } from "../redux/configureStore";

const Card = (props) => {
    return(
        <React.Fragment>
            <Grid bg="#eee" padding="20px" margin="0 0 15px 0"radius="10px">            
                <Grid>
                    <Text margin="0 0 10px 0"><b>0</b>개의 답장</Text>
                    <hr/>
                </Grid>
                <Grid _onClick={()=> {
                        history.push("/post");
                    }}>
                    <Text><b>닉네임</b>님으로부터</Text>
                    <Text margin="10px 0 0 0">내용..어쩌구저쩌구...샬라샬라....</Text>
                </Grid>
            </Grid>
            <Grid bg="#eee" padding="20px" margin="0 0 15px 0"radius="10px">            
                <Grid>
                    <Text margin="0 0 10px 0"><b>0</b>개의 답장</Text>
                    <hr/>
                </Grid>
                <Grid _onClick={()=> {
                        history.push("/post");
                    }}>
                    <Text><b>닉네임</b>님으로부터</Text>
                    <Text margin="10px 0 0 0">내용..어쩌구저쩌구...샬라샬라....</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Card;