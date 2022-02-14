import axios from "axios";
import { getToken } from "./token";
//테스트중
const apis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
    headers: {
        "content-type": "application/json; charset=UTF-8",
        accept: "application/json",
    },   
    withCredentials: true, //자격요건: 쿠키
});


const temp  = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", //form data로 변환하지 않아도 form으로 전송해줌
        accept: "*/*",
    },  

});

apis.interceptors.request.use((config) => {  
    console.log(document.cookie);  
    //config.headers["authorization"] = getToken() ? `${getToken()}` : "";
    return config;
});

const login_headers = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    accept: "*/*",
};

export const userApis = {
    //로그인요청
    login: (username, password) =>{
        temp.post("/user/login", {username, password})
    },

    // 회원가입 요청
    signup: (username, nickname, password ) =>
        temp.post("/user/signup", {username, nickname, password})
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