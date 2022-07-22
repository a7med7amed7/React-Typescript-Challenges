
type commentType = {
    id: number
    name: string
    content: string
    parent: number | null
}
function useCommentTree(data: commentType[]) {
    console.log("useCommentTree")
    let visited: number[] = []
    let deque: number[][] = [];
    let result: number[][] = [];
    let map = new Map<number, number[]>();
    data.map(comment => {
        if (comment.parent !== null) {

            let temp: number[] | undefined = map.get(comment.parent);
            if (!temp) temp = [];
            map.set(comment.parent, [...temp, comment.id]);
        } else {
            deque.unshift([comment.id, 0]);
            visited.push(comment.id);
        }
    })
    // // let i = 0;
    while (deque.length > 0) {
        let top = deque[0];
        result.push(top);
        console.log(top);
        deque.shift();
        const temp: number[] | undefined = map.get(top[0]);
        if (temp) {
            for (let i = 0; i < temp.length; i++) {
                if (!visited.includes(temp[i])) {

                    deque.unshift([temp[i], top[1] + 60]);
                    visited.push(temp[i]);
                }
            }
        }
    }
    return result;

}

export default useCommentTree