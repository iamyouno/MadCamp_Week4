const User = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '/home/ubuntu/MadCamp_Week4/.env'});
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
exports.createToken = async function (req, res, next) {
    try {
        const user = await User.find(req.body);
        
        if (user.length) {
            const token = jwt.sign({
                user_id: user[0].user_id
            }, YOUR_SECRET_KEY, {
                expiresIn: '1h'
            });

            res.cookie('user', token ); // cookie에 저장한다는게 무슨 소리지?
            res.status(201).json({
                result: 'ok',
                token
            });
            } else {
                res.status(400).json({ error: 'invalid user' });
            }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.createNewUser = async function (req, res, next) {
    try {
        const finduser = await User.find({user_id: req.body.user_id});

        if(finduser.length != 0){
            res.json({ error: 'invalid id & password'})
        } else {
            const user = await new User(req.body).save();
            res.status(201).json({
                result: 'ok',
                user: user
        });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};