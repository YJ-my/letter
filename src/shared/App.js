import React from "react";
import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {Grid} from '../elements/index';
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { getCookie } from "./cookie";
import '../shared/App.css';

//page import
import Header from '../components/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';
import ReplyWrite from '../pages/ReplyWrite';
import PostDetail from '../pages/PostDetail';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getCookie("authorization");

  React.useEffect(() => { //쿠키 있는 지 확인하기
    dispatch(postActions.getPostDB());
    
    if (token && !user) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  return (
    <React.Fragment>      
      <Header/>
      <Grid padding="16px" margin="0 auto">          
        <ConnectedRouter history={history}>  
          <Route path="/" exact component={Main}/> 
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/write/:postId" exact component={PostWrite}/>
          <Route path="/reply_write" exact component={ReplyWrite}/>
          <Route path="/post/:postId" exact component={PostDetail}/>      
        </ConnectedRouter>
      </Grid>      
    </React.Fragment>
  );
}

export default App;
