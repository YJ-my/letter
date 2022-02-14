import axios from "axios";
import { getToken } from "./token";
import { getCookie } from "./cookie";

const apis = axios.create({});

const urlApis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
    // headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     //accept: "application/json",
    //     // "Access-Control-Allow-Origin": "*",
    //     // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //     // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    // },   
    //withCredentials: true, //자격요건: 쿠키
});


const temp  = axios.create({
    // baseURL:
    //     "http://15.164.251.132:8080",
    withCredentials: true,
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", //form data로 변환하지 않아도 form으로 전송해줌
        accept: "*/*",
    },
});

apis.interceptors.request.use((config) => {  
    console.log(document.cookie);
    config.headers["Content-Type"] = "application/json;charset=UTF-8; charset=UTF-8";  
    // const accessToken = document.cookie.split("=")[1];
    // config.headers.common["authorization"] = `${accessToken}`;
    //config.headers["authorization"] = getToken() ? `${getToken()}` : "";
    return config;
});


export const userApis = {
    //로그인요청
    login: (params) =>
        apis.post("/user/login", params, {withCredentials: true})
    ,
    // 회원가입 요청
    signup: (username, nickname, password) =>
        apis.post("/user/signup", {username, nickname, password})
    ,
    logout: () => {
        apis.get("/user/logout");
    },
    
  
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