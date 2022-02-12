import React from "react";
import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from "../redux/configureStore";
import {Grid} from '../elements/index';
import "./App.css";
import Header from '../components/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';
import ReplyWrite from '../pages/ReplyWrite';
import PostDetail from '../pages/PostDetail';

function App() {
  return (
    <React.Fragment>
      <Grid margin="0 auto">
        <Header/>
        <Grid padding="16px">          
          <ConnectedRouter history={history}>  
            <Route path="/" exact component={Main}/> {/* 메인페이지 */} 
            <Route path="/login" exact component={Login}/>{/* 로그인페이지 */}
            <Route path="/signup" exact component={Signup}/> {/* 회원가입 페이지 */}
            <Route path="/write" exact component={PostWrite}/> {/* 글 작성 페이지 */}
            <Route path="/write/:id" exact component={PostWrite}/>{/* 글 수정 페이지 */}
            <Route path="/reply_write" exact component={ReplyWrite}/>{/* 답장작성페이지 */}
            <Route path="/post/:id" exact component={PostDetail}/>{/*상세페이지+답장*/}
            
          </ConnectedRouter>             
        </Grid>
      </Grid>
      </React.Fragment>
  );
}

export default App;
