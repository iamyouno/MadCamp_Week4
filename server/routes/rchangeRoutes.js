const reply = require("../models/rchange");

module.exports = function (app, Rchange) {

    const {verifyToken} = require('./middlewares/authorization');

    app.get('/api/Jilli/rchange/:roomNum', function (req, res) {
        Rchange.find({roomNum: req.params.roomNum}, function(err, Rchanges){
            res.json(Rchanges)
        })       
    })

    app.post('/api/Jilli/rchange/:roomNum', verifyToken, function (req, res) {
        var rchange = new Rchange()
        rchange.roomNum = req.body.roomNum;
        rchange.select = req.body.select;
        rchange.user_id = res.locals.userId;
        
        rchange.save(function(err){
            if (err){
                console.error(err)
                res.status(404).json({error: "fail"});
                return;
            }
            console.log("saved room change")
            res.json(rchange)
        })
        
    })

    // app.put('/api/Jilli/rchange/:roomNum', function (req, res) {
    //     Rchange.find({roomNum: req.params.roomNum}, function (err, rchange) {
    //         rchange[0].select = req.body
    //         rchange[0].save(function (err) {
    //             if (err){
    //                 console.error(err)
    //                 return
    //             }
    //             console.log("del success")
    //             res.json(rchange)
                
    //         })
            
    //     })
    // })

    app.delete('/api/Jilli/rchange/:roomNum', verifyToken ,function (req, res) {
        Rchange.deleteOne({roomNum: req.params.roomNum}, function (err, rchange) {
            if (err){
                res.status(404).json({error: "error"});
                console.error(err)
                return
            }
            console.log("del success")
            res.json({message: "deleted"})
        })
    })

}