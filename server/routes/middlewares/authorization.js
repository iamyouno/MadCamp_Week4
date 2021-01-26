const jwt = require('jsonwebtoken');
require('dotenv').config({path: '/home/ubuntu/MadCamp_Week4/.env'});
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
// require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        console.log(req.cookies.user)
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        if (decoded) {
            res.locals.userId = decoded.user_id;
            next();
        } else {
            console.log("unauthorized")
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        console.log("token expired")
        res.status(401).json({ error: 'token expired' });
    }
};

exports.verifyToken = verifyToken;
