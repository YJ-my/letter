import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"
import { getToken } from "../../shared/token";
import apis from "../../shared/apis";
//import { postApis } from "../../shared/apis";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";


const getPost = createAction(GET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));


const initialState = {
    list: [
        {   
            postId: 1,
            nickname : "하이루",
            content: "편지를 써볼게여",
            anonymous: true,
            modifiedAt: "2022-02-15",
            replyCount : 3,
            // uid : "001"
        },
        {   
            postId: 2,
            nickname : "편지왕",
            content: "편지왕은 나야나",
            anonymous: false,
            modifiedAt: "2022-02-15",
            replyCount : 1,
            // uid : "002"
        },

    ]
};


const initalPost = {
    content:"안녕하세요 편지써봅니다.",
    nickname:"닉네임",
    anonymous:false, //익명여부
    modifiedAt:"2202-02-12",
};

//게시글 조회
const getPostDB = () => {
    return function (dispatch, getState, {history}) {
        apis.get(`/api/mains`).then((respones)=>{
            //console.log(respones.data);

            let post_list = [];

            respones.data.post.forEach((_post)=>{
                const post = {
                    post_id : _post.postId,
                    content: _post.content,
                    modifiedAt: _post.modifiedAt,
                    nickname: _post.nickname,
                    replyCount: _post.replyCount,            
                };

                post_list.push(post);
            });
            console.log(post_list);
            dispatch(getPost(post_list));
        });     
    }
}

//게시글 작성,수정
const addPostDB = (content, anonymous,nickname) => {
    return async function (dispatch, getState, {history}) {
        console.log(content, anonymous,nickname);
        const _user = getState().user.user; 

        const user_info = {
            nickname: _user.nickname,  // 유저 닉네임
            username: _user.username, //유저 아이디
        };
        const _post = {
            ...initalPost,
            content:content,
            anonymous:anonymous,
            nickname:nickname,
            // uid:uid,
        }
        //console.log(_post)

        const token = getToken();
        //console.log(token,"포스트작성 토큰확인");

        apis.post(`/api/posts`, {
            content : _post.content,
            anonymous : _post.anonymous,
            nickname: _post.nickname
            // uid : _post.uid
        },
        { headers: {
            Authorization: `Bearer ${token}`,
          },}
        ).then((respones)=>{
            console.log(respones.data,"포스트 성공 데이터");
            window.alert("편지 전달 성공 :)");
            history.push("/");
        }).catch((error)=>{
            window.alert("편지 발송에 실패했습니다 :(");
            console.log("포스트 작성 에러",error);
        });
    };
};

//게시글 삭제
const deletePostDB = (postId) => {
    return function (dispatch, getState, {history}){
        // console.log(postId);
        const TOKEN = getToken();
        // console.log(TOKEN)
        apis.delete(`/api/posts/${postId}`,{postId},{ headers: {
            "authorization" : `Bearer ${TOKEN}`
          }, }).then((res) => {
            console.log(res);
        }).catch(err => {
            window.alert("편지 삭제를 실패했습니다 :(");
        });
    };
};




export default handleActions ({

    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post
        console.log(draft.list)
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {

    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    getPostDB,
    addPostDB,
    deletePostDB,
};

export {actionCreators};