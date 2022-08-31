const next = require('next')
const express = require('express');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
// tells "NextJS" to take the wheel
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();

    server.get("/p/:id", (req, res) => {
        // Passing in "req.params" into "post.js" to be used by "getServerSideProps()" thru "query"
        app.render(req, res, "/post", { id: req.params.id }); // Could replace w/ ", req.params)" instead
    })

    server.get("*", (req, res) => {
        return handle(req, res);
    })

    server.listen(3000, err => {
        if (err) throw err;
        console.log("Now serving on server 3000");
    })
})