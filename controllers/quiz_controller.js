var models = require('../models');

exports.question = function(req, res, next){
	models
	.Quiz
	.findById(req.params.quizId)
	.then(function(quiz) {
		if(quiz) {
			var answer = req.query.answer || "";
			var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';
		    res.render('quizzes/show',{quiz : quiz, answer: answer});
		}
		else {
			throw new Error('No existe ese quiz en la BBDD');
		}
	}).catch(function(error) {next(error);});
};

exports.index = function(req, res, next) {
	models.Quiz.findAll()
		.then(function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {
			next(error);
		});
};

exports.search = function(req, res, next) {
	models.Quiz.findAll({where: ["question like ?", '%'+req.query.search.split(" ").join("%")+'%']})
		.then(function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {
			next(error);
		});
};


exports.check = function(req, res) {
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || "";

				var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';

				res.render('quizzes/result', { quiz: quiz, 
											   result: result, 
											   answer: answer });
			} else {
				throw new Error('No existe ese quiz en la BBDD.');
			}
		})
		.catch(function(error) {
			next(error);
		});	
};


exports.show = function(req, res, next){
	models.Quiz.findById(req.params.quizId)
	.then(function(quiz) {
		if(quiz) {
			var answer = req.query.answer || "";
			var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';
		    res.render('quizzes/show',{quiz : quiz, answer: answer});
		}
		else {
			throw new Error('No existe ese quiz en la BBDD');
		}
	}).catch(function(error) {next(error);});
	
};