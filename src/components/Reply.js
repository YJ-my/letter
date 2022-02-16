import React from "react";
import styled from "styled-components";
import {Grid, Text, Fixed, Button} from "../elements/index";

const Reply = () => {
    return(
        <Grid className="detail_card" min_height="85vh" display="inline-block" bg="#eee" padding="20px" radius="10px" relative="relative">
            <Grid is_flex>
                <Text>2022.02.11</Text>
                <Text bold>닉네임</Text>
            </Grid>
            <Grid>
                <Text>어쩌구 저쩌구 답장입니다.</Text>
            </Grid>
            <Fixed width="calc(100% - 20px)" left="10px" bottom="10px">
                <Button>답장 지우기</Button>
            </Fixed>
        </Grid>  
    );

};


export default Reply;