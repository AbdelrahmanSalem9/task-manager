const router = require('express').Router();
const User = require('../model/UserModel.js');
const authValidator = require('../util/AuthValidator.js');
const bcrypt = require('bcrypt');

router.post('/', authValidator, async (req, res) => {

    // check email
    const user = await User.findOne({ "email": req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // check password
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) return res.status(400).send("Invalid email or password");

    // create jwt
    const token = user.genAuthToken()
    res.header("x-auth-token", token);
    res.send("You are IN!!");

});

module.exports = router