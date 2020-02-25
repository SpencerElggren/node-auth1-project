const bcyrpt = require('bcryptjs');
const router = require('express').Router();
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const restricted = require('../auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);
router.get("/hash", (req, res) => {
    const authentication = req.headers.authentication;

    const hash = bcrypt.hashSync(authentication, 8);

    res.json({ originalValue: authentication, hashedValue: hash });

    // $2a$13$9kEnIDU/c2mGBQq4R6u2eeCcpLBwZOYQXpdnTrezJeBWpJW8D/jDa
    // $2a$13$anVsq35CZDmj.Fg8LDn6be0WdcJ6EOlLyY0AddqAbuov7EuP/uUIC
    // $2a$08$zLoclERJ2mulEzJ2q5/sYutJtHDmQrLdZFsrLdeTMCmHwlNBuQCbu
});

router.get("/", (req, res) => {
    res.json({ api: "All we have to do is decide what to do with the time that is given to us" });
});

module.exports = router;