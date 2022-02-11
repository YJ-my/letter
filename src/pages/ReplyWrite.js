import React from "react";
import styled from "styled-components";
import {Grid, Button, Text, Input} from "../elements/index";

const ReplyWrite = (props) => {
    const [contents, setContents] = React.useState('');
    const changeContents = (e) => {
        setContents(e.target.value);
    };

    return(
        <React.Fragment>
            <Grid>

                <HarfDiv>                
                    <Text size="25px">답장할 편지📮</Text>
                    <Grid bg="#eee" padding="20px"  margin="0 20px 0 0" radius="10px">
                        <Text overflow="scroll">
                            안녕하세요 편지 내용입니다.
                            안녕하세요 편지 내용입니다.안녕하세                        안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.
    요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입                        안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.
    안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.
    니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.안녕하세요 편지 내용입니다.
                        </Text>
                    </Grid>
                </HarfDiv>


                <HarfDiv>                
                    <Text size="25px">답장💌</Text>
                    <Grid>
                        <Input 
                            value={contents} 
                            _onChange={changeContents} 
                            placeholder="답장을 작성해주세요 :-)" 
                            multiLine 
                        />
                        <label>
                            <input type="checkbox"/>
                            익명으로 쓸래요
                        </label>                   
                    </Grid>
                </HarfDiv>

                <Grid padding="20px">
                    <Button is_fixed>답장 쓰기</Button>
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