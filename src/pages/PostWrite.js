import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import styled from "styled-components";

// import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
            편지작성
        </Text>

      </Grid>


      <Grid padding="16px">
        <Input
        //   value={contents}
        //   _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

    </React.Fragment>
  );
};

export default PostWrite;

const Select = styled.select`
  width: 200px;
  height: 50px;
`;