import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/apis";
import {setAuthorizationToken} from "../../shared/setAuthorizationToken";
import { setToken, delToken } from "../../shared/token";
import {setCookie, getCookie, deleteCookie} from "../../shared/cookie";

//깃 반영 테스트입니다.

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";
// const SIGN_UP = "SIGN_UP";


const logIn = createAction(LOGIN, (user)=>({user}));
const logOut = createAction(LOGOUT, (user) => ({user}));
const setUser = createAction(SET_USER, (username, is_login) => ({username, is_login}));
// const signUp = createAction(SIGN_UP, (user) => ({user}));


const initialState = {   
    username: null,
    is_login : false,
};


//회원가입 요청 post
export const signupAction = (username, nickname, password) => {
    return function(dispatch, getState, {history}) {
        //console.log(username, password, nickname);
        
        // const params = new URLSearchParams();
        // params.append('username', username);
        // params.append('nickname', nickname);   
        // params.append('password', password); 

        userApis.signup(username, nickname, password)
        .then((res) => {
            console.log(res,"회원가입요청");
            window.alert("회원가입 되셨습니다.");
            history.push("/login");
        }).catch((error) => {
            window.alert("회원가입 오류입니다!", error.message);
            
        });    

    };
};


//로그인 요청 post
const loginAction = (username, password) => {
    return function(dispatch, getState, {history}) {
        console.log(username, password);

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password); 

        userApis.login(params)
        .then((res) => {
            console.log(res.headers.authorization, "로그인토큰확인");

            // const token = response.headers.authorization;
            // console.log(typeof token);
            // setToken(token);
            // console.log("토큰저장완료!");
            // window.alert("로그인 성공 🔥");

            // console.log(response.headers.get("set-cookie"));
            // const token = response.headers["authorization"];
            // setCookie("is_login", `${token}`);
            // setAuthorizationToken(token);
            window.alert("로그인 성공 🔥");

            const is_login = true;
            dispatch(
                setUser({is_login,username})
            );
            history.push("/");
            
        })
        .catch((error) => {
            window.alert("로그인오류입니다!", error.response);
            console.log("로그인오류입니다!", error.response);
        })
    };
};

//로그인 여부 확인 get
// export const loginCheckAction = (username, password) => {
//     return function(dispatch, getState, {history}) {
//         console.log(username, password);
//         axios
//         .get("https://domain/user/islogin")
//         .then(function (response) {
//             const is_login = true; // 로그인 상태
//             const username = response.data.userInfo.username; // 사용자 정보
//             localStorage.setItem('username', username)

//             dispatch(getUser(is_login, username));
//         })
//         .catch(function (error) {
//             console.log("로그인 여부 확인 실패", error);
//         }).then(function() {
//             // 항상 실행
//         });
//     };
// };


//로그아웃 get
const loginOutAction = () => {
    return function(dispatch, getState, {history}) {
        userApis.logout()
        .then((res) =>{
            console.log(res,"로그아웃");
            dispatch(logOut());
            console.log("로그아웃 성공");
            window.location.reload();
        }).catch(function (error) {
            window.alert("로그아웃 실패");
        })
    };
};




export default handleActions ({

    // [LOGIN]: (state, action) => produce(state, (draft) => {

    // }),
    [LOGOUT]: (state, action) => produce(state, (draft) => {
        draft.username = null;
        draft.is_login = false;
        delToken();
    }),
    [SET_USER]: (state, action) => produce(state, (draft) => {
        //console.log(action.payload.username);
        draft.username = action.payload.username;
        draft.is_login = true;
    }),
    // [SIGN_UP]: (state, action) => produce(state, (draft) => {

    // }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    signupAction,
    loginAction,
    loginOutAction,
};

export {actionCreators};