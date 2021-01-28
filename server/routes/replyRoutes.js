const reply = require("../models/reply");

module.exports = function (app, Reply) {
    
    const {verifyToken} = require('./middlewares/authorization');
    
    app.get('/api/Jilli/:roomNum', function (req, res) {
        Reply.find({roomNum: req.params.roomNum}, function(err, replys){
            res.json(replys)
        })       
    })

    app.post('/api/Jilli/:roomNum', verifyToken ,function (req, res) {
        var reply = new Reply()
        reply.roomNum = req.body.roomNum
        reply.text = req.body.text
        reply.user_id = res.locals.userId;
        reply.save(function(err){
            if (err){
                console.error(err)
                res.status(404).json({error: "error"})
                return;
            }
            console.log("saved complete")
            res.json(reply)
        })
        
    })

}