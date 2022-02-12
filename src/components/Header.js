import React from "react";
import {Grid, Button} from "../elements/index";
import { useDispatch , useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions} from "../redux/modules/user";


const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);

    

    if(is_login){ //로그인이 됐다면
        return(
            <React.Fragment>
                <Grid is_flex padding="8px 16px">
                    <Grid is_flex>
                        <Button width="80px" text="홈"></Button>
                    </Grid>
                    <Grid is_flex width="auto">
                        <Button text="로그아웃" width="80px"></Button>
                    </Grid>
                </Grid>           
            </React.Fragment>
        );
    }
    return(
        <React.Fragment>
            <Grid is_flex padding="8px 16px">
                <Grid is_flex>
                    <Button width="80px" text="홈" _onClick={()=>{
                        history.push("/");
                    }}></Button>
                </Grid>
                <Grid is_flex width="auto">
                    <Button text="로그인" width="80px" margin="0 10px 0 0" 
                        _onClick={()=>{
                            history.push("/login");
                        }}
                    ></Button>
                    <Button width="80px" text="회원가입"
                        _onClick={()=>{
                            history.push("/signup");
                        }}
                    ></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Header.defaultProps = {
   
};

export default Header;