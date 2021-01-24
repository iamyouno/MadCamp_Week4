const reply = require("../models/reply");

module.exports = function (app, Reply) {
    app.get('/api/Jilli/:roomNum', function (req, res) {
        Reply.find({roomNum: req.params.roomNum}, function(err, replys){
            res.json(replys)
        })       
    })

    app.post('/api/Jilli/:roomNum', function (req, res) {
        var reply = new Reply()
        reply.roomNum = req.body.roomNum
        reply.text = req.body.text
        reply.save(function(err){
            if (err){
                console.error(err)
                return;
            }
            console.log("saved complete")
            res.json(reply)
        })
        
    })

}