const express = require('express');
const router = express.Router();

router.get('/signup', (req, res, next) => {
    return res.status(200).json({
        msg: `Sign up router`
    })
})

module.exports = router;
