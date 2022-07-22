import React from 'react'
import { data } from "../../comments.json"
function useAddComment(parent: number, name: string, content: string) {
    data.push({
        id: data.length + 1,
        name: name,
        content: content,
        parent: parent
    })
    console.log(data)
}

export default useAddComment