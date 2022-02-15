import axios from "axios";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const apis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
        token: token,
    },
});

apis.interceptors.request.use(function (config) {
    const accessToken = document.cookie.split("=")[1];
    config.headers.common["authorization"] = `${accessToken}`;
    return config;
});



export const userApis = {
    //로그인요청
    login: (username, password) =>
        apis.post("/user/login", {username:username, password:password})
    ,
    // 회원가입 요청
    signup: (username, nickname, password) =>
        apis.post("/user/signup", {
            username:username,
            nickname:nickname, 
            password:password
        })
    ,
    //유저정보 백단에서 가져오기
    userInfo: (token) =>
        apis.post("/user/islogin", {
        authorization: token,
    }),
  
}

// export const postApis = {
//     getPost: () => 
//         apis.get(`/api/mains`)
//     ,

//     addPost: (content, anonymous, uid) => 
//         apis.post("/api/posts", content, anonymous, uid)
//     ,
// }


export default apis;