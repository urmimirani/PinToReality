const express = require('express');
const jwt = require('jsonwebtoken');
const Board = require('../models/Board');
const User = require('../models/User');
const config = require('../config');

const router = express.Router();

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const board = new Board({ title: req.body.title, items: req.body.items, userId: req.user.userId });
        await board.save();
        res.status(201).send('Board created');
    } catch (error) {
        res.status(500).send('Error creating board');
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const boards = await Board.find({ userId: req.user.userId });
        res.json(boards);
    } catch (error) {
        res.status(500).send('Error fetching boards');
    }
});

router.get('/all', async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).send('Error fetching boards');
    }
});

module.exports = router;
