const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find() //mongoose method to find users
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });
	newUser
		.save() //mongoose method to add new user
		.then(() => res.json('User Added!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
