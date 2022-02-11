import React from "react";
import {Grid, Text, Button} from "../elements/index";

import Card from "../components/Card";

const Main = (props) => {
    return(
        <React.Fragment>
            <Card/>
            <Grid padding="20px">
                <Button is_fixed>편지 쓰기</Button>
            </Grid>            
        </React.Fragment>
    );
}

export default Main;