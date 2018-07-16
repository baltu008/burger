var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req, res){
	console.log(req.body.burger_name, " =entered name of burger")
	burger.create('burger_name', JSON.stringify(req.body.burger_name), function(row){
		var id = row.insertId;
		res.json({id:id});
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);

	burger.delete( 'burger' , condition, function () {
		res.redirect('/burgers');
	})
})

module.exports = router;