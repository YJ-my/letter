import axios from "axios";
import { getCookie } from "./cookie";


const apis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
});

apis.interceptors.request.use(function (config) {
    const token = getCookie("token");
    config.headers["Content-Type"] = "application/json;charset=UTF-8; charset=UTF-8";
    config.headers.common["authorization"] = `${token}`;
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
    getUser: () => apis.get("/user/islogin"),
  
}

export const postApis = {
    //게시글 불러오기
    getPost: () => 
        apis.get("/api/mains")
    ,
    //게시글 1개 불러오기
    getOnePost: (postId) => 
        apis.get(`/api/posts/${postId}`)
    ,
    //게시글 작성하기
    addPost: (content, anonymous) => 
        apis.post("/api/posts", {
            content:content,
            anonymous:anonymous,
        })
    ,
    //게시글 수정하기
    editPost:(postId, content, anonymous) => 
        apis.post(`/api/posts/${postId}`)
    ,
    //게시글 삭제
    deletePost: (postId) => 
        apis.delete(`/api/posts/${postId}`)
    ,
    //답장작성
    replyPost: (postId, comment, anonymous) => 
        apis.post(`/api/reply/${postId}`)
    ,
    //답장삭제
    replyDelete: (postId) => 
        apis.delete(`/api/reply/${postId}`)
    ,
}


export default apis;