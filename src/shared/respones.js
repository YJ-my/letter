export const RESP = {

    POST: {
        result: true, //포스트가 잘 왔어!
        list: [ //myPosts
            {
                postId: 1,
                nickname : "닉네임",
                content: "내용이에요",
                anonymous: true,
                modifiedAt: "2022-02-12",
                replyCount : 1,
            },
            {
                postId: 2,
                nickname : "닉네임2",
                content: "내용이에요2",
                anonymous: false,
                modifiedAt: "2022-02-12",
                replyCount : 3,
            },
        ],
        reply: [
            {
                commentId: 1,
                nickname: "답장 닉네임",
                comment: "답장 내용입니다.",
                anontmous: true,
                modifiedAt: "2022-02-13",
            },
            {
                commentId: 2,
                nickname: "답장 닉네임2",
                comment: "답장 내용입니다.2",
                anontmous: false,
                modifiedAt: "2022-02-14",
            },
        ],
    },
    USER: {
        result: true, //유저정보가 잘 왔어!
        list: [
            {
                uid : "user000321",
                user_id: "123123@naver.com",
                user_name : "jini",
            },
            {
                uid : "user000001",
                user_id: "hello_world@gmail.com",
                user_name : "안지니입니다",                
            },
        ],
    },

}