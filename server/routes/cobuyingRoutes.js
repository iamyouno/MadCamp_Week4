const cobuying = require("../models/cobuying");

module.exports = function (app, Cobuying) {
    app.get('/api/:dorm', function (req, res) {
        Cobuying.find({dorm: 'Jilli'}, function(err, cobuyings){
            res.json(cobuyings)
        })       
    })

    app.get('/api/cobuying/:id', function(req, res) {
        Cobuying.find({_id: req.params.id}, function (err, cobuying) {
            res.json(cobuying)
        })
    })

    app.post('/api/cobuying', function (req, res) {
        var cobuying = new Cobuying()
        cobuying.dorm = 'Jilli'
        cobuying.name = req.body.name
        cobuying.member = req.body.member
        cobuying.info = req.body.info

        cobuying.save(function(err){
            if (err){
                console.error(err)
                return;
            }
            console.log("saved complete")
            console.log(cobuying._id)
            res.json(cobuying)
        })
    })

    app.put('/api/cobuying/:id', function (req, res) {
        Cobuying.find({_id: req.params.id}, function (err, cobuying){
            console.log(cobuying[0].reply)
            // cobuying[0].reply = [1, 2, 3]
            // console.log(cobuying[0].reply)
            cobuying[0].reply = req.body
            cobuying[0].save(function (err) {
                if (err){
                    console.error(err)
                    return
                }
                
                res.json(cobuying.reply)
                
            })
            console.log("del success")
            res.json(cobuying.reply)
        })
        // json array 형식으로 content 저장?
        // 그냥 string array 로 저장
    })
}