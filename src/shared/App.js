import React from "react";

import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from "../redux/configureStore";

import {Grid} from '../elements/index';

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
              <Route path="/" exact component={Main}/>  
              <Route path="/post" exact component={PostDetail}/>{/* 상세페이지+답장 */}  
            </ConnectedRouter>        
          </Grid>
        </Grid>
      </React.Fragment>
  );
}

export default App;
