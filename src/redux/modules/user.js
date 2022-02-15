import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/apis";
import {setCookie, getCookie, deleteCookie} from "../../shared/cookie";

//깃 반영 테스트입니다.

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";
// const SIGN_UP = "SIGN_UP";


const userlogIn = createAction(LOGIN, (user)=>({user}));
const userlogOut = createAction(LOGOUT, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));
// const signUp = createAction(SIGN_UP, (user) => ({user}));


const initialState = {
    userInfo : {
        username: "",
    },    
    //is_login : false,
    token: null,
};


//회원가입 요청 post
export const signupAction = (username, nickname, password) => {
    return function(dispatch, getState, {history}) {
        //console.log(username, password, nickname);

        userApis.signup(username, nickname, password)
        .then((res) => {
            console.log(res,"회원가입");
            window.alert("회원가입 되셨습니다.");
            history.push("/login");
        }).catch((error) => {
            window.alert("회원가입 오류입니다!");
            console.log("회원가입 실패:",error);
            
        });    

    };
};


//로그인 요청 post
// const loginAction = (username, password) => {
//     return function(dispatch, getState, {history}) {
//         console.log(username, password);

//         // const frm = new FormData();
//         // frm.append("username", username);
//         // frm.append("password", password);

//         userApis.login(username, password)
//         .then((res) => {
//             console.log(res.headers.authorization, "로그인토큰확인");

//             const token = res.headers.authorization;
//             setCookie(token);           
//             dispatch(setUser(username));
//             history.replace("/");
//         })
//         .catch((error) => {
//             console.log("로그인오류입니다!", error);
//         })
//     };
// };


//로그인 요청 post
const loginAction = (username, password) => {
    return function(dispatch, getState, {history}) {
        console.log(username, password);

        // const frm = new FormData();
        // frm.append("username", username);
        // frm.append("password", password);

        userApis.login(username, password)
        .then((res) => {
            console.log(res.headers, "로그인 토큰확인");

            setCookie("token", res.headers["authorization"], 1);
            const token = res.headers["authorization"];                      

            userApis.userInfo(res.headers["authorization"])
            .then((res)=>{  
                console.log(res);              
                dispatch(setUser({
                    username:res.username,
                    token: token,
                }));
            }).catch((error) => console.log("유저정보오류!",error))
            history.push("/");
        })
        .catch((error) => {
            console.log("로그인오류입니다!", error);
            window.alert("로그인에 실패했습니다 :(");
        })
    };
};


const loginCheckDB = () => {
    return function (dispatch, getState, { history }) {
      const tokenCheck = document.cookie; //쿠키에 담겨있는 토큰 체크
      console.log(tokenCheck);
      const token = tokenCheck.split("=")[1];
      console.log(token);

      if (token) { //토큰이 있다면
        userApis
          .userInfo(token)
          .then((res) => {
            console.log(token);
            dispatch(
              setUser({ //유저정보를 다시 세팅
                username:res.username,
                token: token,
              })
            );
          })
          .catch((error) => console.log(error));
      }      
    };
  };

//로그아웃 get
const loginOutAction = () => {
    return function(dispatch, getState, {history}) {
        deleteCookie("token"); // 쿠키에서 토큰 삭제
        dispatch(userlogOut());
        history.replace("/");
    };
};




export default handleActions ({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        //console.log(action.payload.username);
        draft.username = action.payload.username;
        draft.token = action.payload.user.token;
    }),
    [LOGOUT]: (state, action) => produce(state, (draft) => {
        draft.userInfo = null;
        draft.token = false;
    }),
   
},initialState);


const actionCreators = { //액션 생성자 내보내기
    signupAction,
    loginAction,
    loginCheckDB,
    loginOutAction,
};

export {actionCreators};