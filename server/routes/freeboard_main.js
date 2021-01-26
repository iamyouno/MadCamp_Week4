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
                res.status(404).json({message: "fail"});
                return;
            }
            if(!freeboard){
                res.status(404).json({message: "not found"});
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

    app.delete('/api/freeboard/:board_id', verifyToken, function(req,res){
        Freeboard.findById(req.params.board_id, function(err, freeboard){
            if(err){
                res.status(401).json({error: "error"});
                return;
            }
            if(!freeboard){
                res.json({message: "not found"});
                return;
            }
            console.log(req.body.commentid)
            Array.prototype.remove = function() {
                var what, a = arguments, L = a.length, ax;
                while (L && this.length) {
                    what = a[--L];
                    while ((ax = this.indexOf(what)) !== -1) {
                        this.splice(ax, 1);
                    }
                }
                return this;
            };
            freeboard.comment.remove({_id:req.body.commentid})
            freeboard.save(function(err){
                if(err){
                    res.status(401).json({error: "error"});
                    return;
                }
                res.json(freeboard)
                return;
            })
        })
    })

    ///글 순서 바뀌는지 체크 필요....
    app.put('/api/freeboard/update/:board_id',verifyToken, function(req,res){
        Freeboard.findById(req.params.board_id, function(err, freeboard){
            if(err){
                res.status(401).json({error: "error"});
                return;
            }
            if(!freeboard){
                res.json({message: "not found"});
                return;
            }
            freeboard.title = req.body.title;
            freeboard.content = req.body.content;
            freeboard.anonymous = req.body.anonymous;

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
    })

    app.delete('/api/freeboard/delete/:board_id' ,verifyToken, function(req,res){
        Freeboard.remove({_id: req.params.board_id}, function(err,output){
            if(err){
                res.status(500).json({ error: "database failure" });
                return;
            }
            res.json({message: "deleted"})
        })
    })
}