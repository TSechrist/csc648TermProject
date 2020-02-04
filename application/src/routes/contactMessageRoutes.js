/**
 *Routes and post functions for the contact seller page and form
 * 
 * @author Alexander Beers, Ibraheem Chaudry, Saleh Zahran
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const initCategories = require('../database/initCategories')

//Initializes categories of items for database
var categories = initCategories.init()
var globalItemId

//Post method called from the modal to send data to the contact seller page
router.post("/contactSeller", (req, res) => {
    console.log("This is the sender ID: "+ req.session.userID)
    var itemid = req.body.itemid
    globalItemId = itemid

    res.render('contactSeller', {
        searchResult: "",
        categories: categories,
        isLogin: req.session.loggedin,
        userName: req.session.name,
        valid: false
    })
  
})

//Post function called by the contact seller form
router.post("/contact", (req, res) => {
    console.log("This is the sender ID: "+ req.session.userID)

    if (message( req.body.phoneNumber, req.body.name, globalItemId,req.session.userID)) {
        res.render('contactSeller', {
            searchResult: "",
            categories: categories,
            isLogin: req.session.loggedin,
            userName: req.session.name,
            valid: true
        })
    }
})

//Grab the id of the reciever using the item ID
function getRecieverID(itemID) {
    return new Promise(resolve => {
        pool.query('SELECT userID FROM item WHERE itemID = ?', [itemID], function (error, result, fields) {
            if (error) console.log(error)

            if (result[0]) {
                var userID = result[0].userID
                resolve(userID)
            }
        })
    })
}

//Grab item name using itemID
function getItemName(itemID) {
    return new Promise(resolve => {
        pool.query('SELECT name FROM item WHERE itemID = ?', [itemID], function (error, result, fields) {
            if (error) console.log(error)

            if (result[0]) {
                var itemName = result[0].name
                resolve(itemName)
            }
        })
    })
}

//Add message to the database using the required fields
async function message( phoneNumber, name, itemID, sender) {
    const senderID = sender

    const recieverID = await getRecieverID(itemID)
    const itemName = await getItemName(itemID)
    const newMessage = {
        phoneNumber: phoneNumber,
        senderID,
        recieverID,
        name: name,
        itemName: itemName,
        itemID: itemID
    }

    console.log(newMessage)

    pool.query('INSERT INTO message SET ?', newMessage, (err, rows, result) => {
        if (err) console.log(err)
        return true
    })
}

module.exports = router