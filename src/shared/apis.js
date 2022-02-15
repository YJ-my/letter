import axios from "axios";
import { getCookie } from "./cookie";

const token = getCookie("authorization");
console.log(getCookie("authorization"));


const apis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
});

apis.interceptors.request.use(function (config) {
    config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";
    config.headers.common["authorization"] = `${token}`;
    return config;
});




export const userApis = {
    //로그인요청
    login: (frm) =>
        apis.post("/user/login", frm)
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