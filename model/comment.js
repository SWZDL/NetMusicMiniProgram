import {
    Http
} from "../utils/http"

class Comment {
    static async getSongComment(id, limit, offset) {
        const comment = await Http.request({
            url: '/comment/music',
            data: {
                id,
                limit,
                offset
            }
        })
        return comment.data
    }
}

export {
    Comment
}


