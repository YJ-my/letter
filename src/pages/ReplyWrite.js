import React from "react";
import styled from "styled-components";
import {Grid, Button, Text, Input} from "../elements/index";
import { BiMailSend } from "react-icons/bi";

const ReplyWrite = (props) => {
    const [contents, setContents] = React.useState('');
    const changeContents = (e) => {
        setContents(e.target.value);
    };

    return(
        <React.Fragment>
            <Grid>
                <HarfDiv>                
                    <Text size="25px" color="white">답장할 편지📮</Text>
                    <Grid bg="#F0EDCC" padding="20px"  margin="0 20px 0 0" radius="10px">
                        <Text overflow="scroll"></Text>
                    </Grid>
                </HarfDiv>


                <HarfDiv style={{verticalAlign:"top"}}>
                    <Text size="25px" color="white">답장💌</Text>
                    <Grid>
                        <Input 
                            value={contents} 
                            _onChange={changeContents} 
                            placeholder="답장을 작성해주세요 :-)" 
                            multiLine 
                        />
                        <label style={{color:"white"}}>
                            <input type="checkbox"/>
                            익명으로 쓸래요
                        </label>                   
                    </Grid>
                </HarfDiv>

                <Grid padding="20px">
                    <Button is_fixed>답장 부치기<BiMailSend style={{fontSize: "20px",verticalAlign: "sub"}}/></Button>
                </Grid>

            </Grid>

        </React.Fragment>
    );
};

const HarfDiv = styled.div`
    display: block;
    width: 100%;
    @media screen and (min-width: 769px) {
        display: inline-block;
        width: calc(50% - 20px);
        margin: 0 10px
    };
`;


export default ReplyWrite;