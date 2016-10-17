var express = require('express')
var apiRouter = express.Router() //get an instance of express router
var usersController = require('../controllers/users')
// var countsController = require('../controllers/countsController')

var User = require('../models/user')


// Non-Authenticated routes ===========

//make a user
apiRouter.route('/users')
	.post(usersController.create)

//login
apiRouter.route('/authenticate')
	.post(usersController.authenticate)

// Authenticated routes  ==============
//config middleware for auth
apiRouter.use(usersController.checkUser)

//users index
apiRouter.route('/users')
	.get(usersController.index)

//logged in user detail
apiRouter.route('/me')
	.get(function(req, res){
		res.send(req.decoded)
	})

//user CRUD
apiRouter.route('/users/:user_id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy)

// //counts CRUD
// apiRouter.route('/counts')
// 	.get(countsController.countIndex)
// 	.post(countsController.createCount)

// apiRouter.route('/counts/:id')
// 	.get(countsController.getCount)
// 	.patch(countsController.updateCount)
// 	.delete(countsController.deleteCount)

module.exports = apiRouter