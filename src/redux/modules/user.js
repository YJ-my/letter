import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";
import { history } from "../configureStore";
import { setToken, getToken, delToken } from "../../shared/token";
import apis from "../../shared/apis";
import { setAuthorizationToken } from "../../shared/setAuthorizationToken";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";
// const SIGN_UP = "SIGN_UP";


const logIn = createAction(LOGIN, (user)=>({user}));
const logOut = createAction(LOGOUT, (user) => ({user}));
const setUser = createAction(SET_USER, (username, is_login) => ({username, is_login}));
// const signUp = createAction(SIGN_UP, (user) => ({user}));


const initialState = {
    userInfo:{
        username: "유저아이디",
    },
    is_login : false,
};


//회원가입 요청 post
export const signupAction = (username, nickname, password) => {
    return function(dispatch, getState, {history}) {
        //console.log(username, password, nickname);
        const frm = new FormData();
        frm.append('username', username);
        frm.append('nickname', nickname);
        frm.append('password', password);        

        apis.post('/user/signup',frm)
        .then((response) => {
            console.log(response,"회원가입요청");
            window.alert("회원가입 되셨습니다.");
            history.push("/login");
        }).catch((error) => {
            window.alert("회원가입 오류입니다!", error.message);
            
        });    

    };
};


//로그인 요청 post
export const loginAction = (username, password) => {
    return function(dispatch, getState, {history}) {
        console.log(username, password);

        const frm = new FormData()
        frm.append('username', username);
        frm.append('password', password);

        apis.post('/user/login',frm)
        .then((response) => {
            console.log(response.headers, "로그인요청");

            //const token = response.headers.authorization;
            const token = response.headers["authorization"];
            setToken(token);
            setAuthorizationToken(token);
            console.log(token,"토큰저장완료!");

            const is_login = true;
            dispatch(
                setUser({is_login,username})
            );
            history.push("/");
            
        }).catch((error) => {
            window.alert("로그인오류입니다!", error);
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
export const loginOutAction = (username, password) => {
    return function(dispatch, getState, {history}) {
        console.log(username, password);
        apis.get("/user/logout")
        .then((response) =>{
            console.log(response,"로그아웃");
            delToken(); //토큰 삭제해주기
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