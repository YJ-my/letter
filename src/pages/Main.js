import React from "react";
import { history } from "../redux/configureStore";
import {Grid, Button} from "../elements/index";
import Card from "../components/Card";

const Main = (props) => {
    return(
        <React.Fragment>
            <Card/>
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