/**
 * Handles user authentication using express-session module.
 *
 *Handles login and logout requests from clients.1
 *
 * @author Ibraheem Chaudry.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const bcrypt= require('bcrypt')
const saltRounds = 10

//User authentication function handles login requests for clients
router.post('/auth', function(request, response) {
	  var email = request.body.email
	  var password = request.body.password
	
	  if (email && password) {
		    pool.query('SELECT * FROM User WHERE email = ? ', [email], (err, result) => {
			      if (result.length > 0) {
				
				    //Grab password from database returned user 
				    var encryptedPassword

				    //Grab userID of person logged in
				    var userID

				    //Grab name of the person logged in 
				    var userName

				    Object.keys(result).forEach(function(key){
					      var row= result[key]
					      encryptedPassword=row.password
					      userID = row.userID
					      userName=row.firstname
				    })
				
				    //Compare passwords for a match 
				    bcrypt.compare(password, encryptedPassword, (err, result) => {	
					      if (err) { throw (err); }
					      if (result==true) {
						        request.session.loggedin = true
						        request.session.email = email
						        request.session.userID = userID
						        request.session.name= userName

						        request.flash('success_msg', 'You are logged in')
						        return response.send({valid: true})

					      } else {
						        request.flash('error_msg', 'Incorrect Password! Please Try Again')
						
						        return response.send({valid: false})
				        }
				    })
		    } else {
				request.flash('error_msg', 'Incorrect Username or Password! Please try again.')
				return response.send({valid: false})
	      }
		})
	  } 
})

//Post function to handle registration form
router.post('/regis', function (request, response) {
    console.log("registration being processed")
		
	  var password = request.body.passwordRegister
	  var email = request.body.email
	
	  //Check if email already exists in the database
	  pool.query('SELECT * FROM User WHERE email = ? ', [email], function(error, result, fields) {
	      if (result.length != 0) {
		        request.flash('error','Email already registered')
		        response.redirect('back')
	      } else {
		        //Encrypt Password for entry into database
		        bcrypt.hash(password, saltRounds, function (err,   hash) {
		        if (err) { throw (err); }
		        var createUser = {
			          firstname: request.body.firstname,
			          lastname: request.body.lastname,
			          email: email,
			          password: hash,
		        }

		        // now the createStudent is an object you can use in your database insert logic.
            pool.query('INSERT INTO User SET ?', createUser, function (err, res) {		       
			          if (err) throw err			
		        })

		        request.session.loggedin = true
		        request.session.email = email	
		        return response.redirect('/user/messages')
		        })		
	      }
    })
})

//Route for logging out
router.get('/logout', function (req, res, next) {
    if (req.session) {
    	req.flash('success_msg', 'You are logged out')
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/')
            }
        })
    }
})

module.exports = router