import '../styles/comment.css'
import { data } from '../../comments.json'
import useCommentTree from '../hooks/useCommentTree'
import { useRef, useState } from 'react';
import useAddComment from '../hooks/useAddComment';
type commentType = {
    name: string
    content: string
    parent: number
}



function Comment() {
    let res: number[][] = useCommentTree(data);
    console.log(res)
    const date = new Date();

    const [visible, setVisible] = useState<boolean>(false);
    const [id, setId] = useState<number>(0)
    const name = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const handleClicK = (e: any, cmntId: number) => {
        e.preventDefault();
        setId(cmntId)
        setVisible(true);
    }
    const handleComentData = (e: any) => {
        e.preventDefault();
        console.log("HI")
        console.log(name.current?.value);
        if (name.current && content.current)
            useAddComment(id, name.current?.value, content.current?.value);
        setVisible(false);
    }
    return (
        <>
            {

                res.map(comment => (
                    <div key={comment[0]} style={{ marginLeft: `${comment[1] + 10}px` }} className='comment' onClick={(e) => handleClicK(e, comment[0])}>
                        <div className="userData">
                            <div className="name">{data[comment[0] - 1].name}</div>
                            <div className="date">{date.toLocaleString()}</div>
                        </div>
                        <div className="commentContent">

                            {data[comment[0] - 1].content}
                        </div>

                    </div>
                ))
            }
            {visible ? (

                <div className="addCommentContainer" >
                    <span onClick={() => setVisible(false)}>Close</span>
                    <form className='addCommentForm' >
                        <input type='text' placeholder='Name' ref={name} />
                        <textarea placeholder='Your reply' ref={content} />
                        <button onClick={handleComentData}>Reply</button>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default Comment