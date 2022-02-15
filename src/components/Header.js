import React from "react";
import styled from "styled-components";
import {Grid, Button, Text} from "../elements/index";
import { useDispatch , useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions} from "../redux/modules/user";
import { BsMailbox } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);

    console.log(user_info,is_login);
    
    const logout = () => {
        dispatch(userActions.loginOutAction());
    };


    if(is_login){ //로그인이 됐다면
        return(
            <React.Fragment>
                <HeaderGrid>
                    <Grid is_flex width="auto">
                        <a href="/" style={{color:"#F0EDCC", textDecoration:"none"}}>{user_info.nickname}의 우체국<BsMailbox style={{
                            marginLeft:"5px",
                            fontSize:"20px",
                            verticalAlign:"sub",
                            marginTop:"3px"
                        }}/></a>
                        {/* <Button width="80px" text="홈"></Button> */}
                    </Grid>
                    <Grid is_flex width="auto">
                        <Button 
                            bg="transparent"
                            color="#FFD662"
                            size="22px"
                            padding="0"
                            width="auto"
                            margin="5px 0 0 0"
                            _onClick={logout}
                        ><BiLogOut/></Button>
                    </Grid>
                </HeaderGrid>           
            </React.Fragment>
        );
    }
    return(
        <React.Fragment>
            <HeaderGrid>
                <Grid is_flex width="auto">
                    <a href="/" style={{color:"#F0EDCC", textDecoration:"none"}}>나의 우체국<BsMailbox style={{
                        marginLeft:"5px",
                        fontSize:"20px",
                        verticalAlign:"sub"
                    }}/></a>
                    {/* <Button width="80px" text="우체국" color="#F0EDCC" _onClick={()=>{
                        history.push("/");
                    }}></Button> */}
                </Grid>
                <Grid is_flex width="auto">
                    <Button 
                        margin="5px 10px 0 0" 
                        bg="transparent"
                        color="#FFD662"
                        size="22px"
                        padding="0"
                        width="auto"
                        _onClick={()=>{
                            history.push("/login");
                        }}
                    ><BiLogIn/></Button>
                    <Button 
                        margin="5px 0 0"
                        bg="transparent"
                        color="#FFD662"
                        size="22px"
                        padding="0"
                        width="auto"
                        _onClick={()=>{
                            history.push("/signup");
                        }}
                    ><FaUserPlus/></Button>
                </Grid>
            </HeaderGrid>            
        </React.Fragment>
    );
};

Header.defaultProps = {
   
};

const HeaderGrid = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 8px 16px;
    border-bottom: 5px solid #093e49;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
`;

export default Header;