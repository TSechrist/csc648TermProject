/**
 * Search function used to query pool for items.
 *
 * 
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const initCategories = require('../database/initCategories')

//Initialize categories of items from database.
var categories = initCategories.init()
var results = null

console.log("This is what the global variable for results holds : "+ results)
//Search function that renders results to posts page
router.post('/results', (req, res) => {
    var message = ""
    res.setTimeout(200, () => {
        console.log("value returned from search entry is (" + req.body.searchEntry + ")")

        //if category was selected output all items for that category
        if (categories.includes(req.body.searchEntry)) {
            pool.query("SELECT * FROM item WHERE category=? AND approved = 1", [req.body.searchEntry], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    results = result                    
                }
                if (result.length == 0) {
                    message = "No search results were found for the given entry. Consider modifying your search."
                } else {
                    message = "Search returned " + result.length.toString() + " Result(s)."
                }
                res.render('results', {
                    displayMessage: message,
                    searchResult: result,
                    categories: categories,
                    isLogin: req.session.loggedin,
                    userName: req.session.name
                })
            })
        }
        else if (!req.body.searchEntry) {
            pool.query("SELECT * FROM item WHERE approved = 1 ORDER BY date_upload DESC ", (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    results = result
                }
                if (result.length == 0) {
                    message = "No search results were found for the given entry. Consider modifying your search."
                } else {
                    message = "Search returned " + result.length.toString() + " Result(s)."
                }
                res.render('results', {
                    displayMessage: message,
                    searchResult: result,
                    categories: categories,
                    isLogin: req.session.loggedin,
                    userName: req.session.name
                })
            })
        } else {
            //else only output the item that the user entered
            pool.query("SELECT * FROM item WHERE name like '%" + req.body.searchEntry + "%' AND approved = 1", (err, result) => {
                console.log(result)
                if (err) {
                    console.log(err)
                } else {
                    results = result
                }
                if (result.length == 0) {
                    message = "No search results were found for the given entry. Consider modifying your search."
                } else {
                    message = "Search returned " + result.length.toString() + " Result(s)."
                }
                res.render('results', {
                    displayMessage: message,
                    searchResult: result,
                    categories: categories,
                    isLogin: req.session.loggedin,
                    userName: req.session.name
                })
            })
        }
    })
})

//sorted search function that renders results to posts page
router.post('/results/sort', function (req, res, next) {
    var sortBy= req.body.sortBy

        //sort by price low to high
        if(sortBy == "price-asc"){
          
            results.sort((a,b)=>{
                return (a.price < b.price) ? 1 : -1 
            })
        }
         //sort by price low to high
         if(sortBy == "price-desc"){
           
            results.sort((a,b)=>{
                return (a.price > b.price) ? 1 : -1 
            })
        }

        res.render('results', {
            searchResult: results,
            categories: categories,
            isLogin: req.session.loggedin,
            userName: req.session.name
        })

})

module.exports = router