const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

const renderAuthPage = (app, actualPage, extraParams = {}) => (req, res) => {
    const query = Object.assign({}, req.query, extraParams);
    return app.render(req, res, actualPage, query);
};

async function start () {
    await app.prepare();
    const server = express();
    server.use(express.static('assets'));

    server.get('/login', renderAuthPage(app, '/auth'));
    server.get('/register', renderAuthPage(app, '/auth'));
    server.get('/auth', (req, res) => {
        res.status(301).redirect('/login');
    });

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
