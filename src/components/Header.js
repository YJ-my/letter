import React from "react";
import {Grid, Button} from "../elements/index";
import { history } from "../redux/configureStore";

const Header = (props) => {
    return(
        <React.Fragment>
            {/* <Grid is_flex padding="8px 16px">
                <Grid is_flex>
                    <Button width="80px" text="홈"></Button>
                </Grid>
                <Grid is_flex width="auto">
                    <Button text="로그아웃" width="80px"></Button>
                </Grid>
            </Grid> */}
            <Grid is_flex padding="8px 16px">
                <Grid is_flex>
                    <Button width="80px" text="홈"></Button>
                </Grid>
                <Grid is_flex width="auto">
                    <Button text="로그인" width="80px" margin="0 10px 0 0"></Button>
                    <Button width="80px" text="회원가입"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Header.defaultProps = {
   
};

export default Header;