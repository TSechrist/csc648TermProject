/**
 * Routes for about pages 
 *
 * @author Alexander Beers.
 */

const express = require('express')
const router = express.Router()
const path = require('path')

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'about.html'))
})

router.get("/team/ibraheem", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/ibraheem.html'))
})

router.get("/team/tom", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/tom.html'))
})

router.get("/team/alexander", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/alexander.html'))
})

router.get("/team/lance", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/lance.html'))
})

router.get("/team/paul", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/paul.html'))
})

router.get("/team/saleh", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/team', '/saleh.html'))
})

module.exports = router