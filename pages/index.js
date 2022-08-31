import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/dist/client/link";

function Index({ data }) {
    useEffect(() => (
        console.log("Only appears on client-side.")
    ))
    console.log(data);
    return (
        <div>
            <h1>Our Index Page</h1>
            <ul>
                {data.map(d => (
                    <li key={d.id}>
                        <Link href={`/post?id=${d.id}`} as={`/p/${d.id}`}>{d.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// This function gets called at build time on server-side.
// Won't be called on client-side, so you can even do direct DB queries.
export async function getStaticProps() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const { data } = res;
    // "Index" will receive "data" as a prop at build time
    return { props: { data } }
}

export default Index;