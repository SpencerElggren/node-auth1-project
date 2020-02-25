const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/users-model');

router.post('/register', (req,res) =>{
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req,res) => {
    let {username, password} = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({message: 'Welkommen'})
            } else {
                res.status(401).json({message: 'keiner kann dir sagen welche turen die richtigen sind'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.get('/logout', (req,res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ you: 'du bist im labyrinth'})
            } else {
                res.status(200).json({you: 'lauf, kind, lauf, so schnell do kanst'})
            }
        });
    } else {
        res.status(200).json({ bye: 'du kommst hier nicht mehr raus'})
    }
});
module.exports = router;