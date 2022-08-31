import axios from "axios";

function Post({ data, query }) {
    return (
        <div>
            <h1>Comments for Post #{query.id}</h1>
            {data.map(d => (
                <Comment {...d} key={d.id} />
            ))}
        </div>
    )
}

function Comment({ email, body }) {
    return (
        <div>
            <h5>{email}</h5>
            <p>{body}</p>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`)
    const { data } = res;
    return { props: { data, query } }
}

export default Post;