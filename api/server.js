const express = require('express');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const restricted = require('../auth/restricted-middleware');
const knex = require('../database/db-config');

const server = express();

const sessionConfig = {
    name: 'olorin',
    secret: 'servant of the secret fire',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    },
    store: new KnexStore({
        knex,
        tableName: 'istari',
        createTable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15
    })
};

server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
module.exports = server;
