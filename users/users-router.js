const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(() => res.status(401).json({message: 'The Black Arch shall not avail you, flamer of servers!'}));
});

module.exports = router;
