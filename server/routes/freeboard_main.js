module.exports = function(app, Freeboard){

    const {verifyToken} = require('./middlewares/authorization');

    app.post('/api/freeboard', verifyToken, function(req,res){
        console.log("create content");
        var freeboard = new Freeboard();
        freeboard.title = req.body.title;
        freeboard.content = req.body.content;
        freeboard.anonymous =req.body.anonymous;
        freeboard.userid = res.locals.userId;

        freeboard.save(function(err){
            if(err){
                console.error(err);
                res.json({message: "fail"});
                return;
            }

            res.json({message: "success"});
            return;
        })
    })

    app.get('/api/freeboard', function(req,res){
        Freeboard.find({},{comment: 0}, function(err,freeboards){
            if(err){
                console.error(err)
                res.json({message: "fail"});
                return;
            }
            res.json(freeboards);
            return;
        })
    })

    app.get('/api/freeboard/:board_id', function(req,res){
        Freeboard.findById(req.params.board_id, function(err,freeboard){
            if(err){
                res.json({message: "fail"});
                return;
            }
            if(!freeboard){
                res.json({message: "not found"});
                return;
            }
            res.json(freeboard);
            return
        })
    })

    app.put('/api/freeboard/:board_id', verifyToken, function(req,res){
        Freeboard.findById(req.params.board_id, function(err, freeboard){
            if(err){
                res.json({message: "fail"});
                return;
            }
            if(!freeboard){
                res.json({message: "not found"});
                return;
            }
            freeboard.comment.push({userid: res.locals.userId, anonymous: req.body.anonymous, commentcontent: req.body.commentcontent});
            freeboard.save(function(err){
                if(err){
                    res.json({message: "fail"});
                    return;
                }
                res.json({message: "success"});
                return;
            })
        })
    })
}