const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

async function start () {
    await app.prepare();
    const server = express();

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}

(async function () {
    try {
        await start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
