const router = require('express').Router();
const Exercise = require('../models/exercise.model');
router.route('/').get((req, res) => {
	Exercise.find() //mongoose method to find users
		.then((exercises) => res.json(exercises))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date
	});
	newExercise
		.save() //mongoose method to add new user
		.then(() => res.json('Exercise Added!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id)
		.then((exersice) => res.json(exersice))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exersice deleted!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post((req, res) => {
	Exercise.findById(req.params.id)
		.then((exersice) => {
			exersice.username = req.body.username;
			exersice.description = req.body.description;
			exersice.duration = Number(req.body.duration);
			exersice.date = Date.parse(req.body.date);

			exersice
				.save()
				.then(() => res.json('Exersice Updated!'))
				.catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
