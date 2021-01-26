module.exports = function(app, User){
    const usersController = require('./controllers/users.controllers');
    app.post('/api/users/login', usersController.createToken);
    app.post('/api/users/new', usersController.createNewUser);

    // const todosController = require('./controllers/todos.controllers');
    const {verifyToken} = require('./middlewares/authorization');
    // app.get('/api/todos/', verifyToken, todosController.getAll);
    
    app.get('/api/users/check', verifyToken, function(req,res){
        res.json({user_id: res.locals.userId});
    })
}