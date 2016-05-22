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
			if(req.params.format=='json'){
                res.render('quizzes/index_json.ejs', { quizzes: quizzes, layout: false} );
			}
			else {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		     };
		})
		.catch(function(error) {
			next(error);
		});
	
};

exports.new = function(req, res, next) {
	var quiz = models.Quiz.build({question: "", answer: ""});
	res.render('quizzes/new', {quiz: quiz});
};

exports.create = function(req, res, next){
	var quiz = models.Quiz.build({ question : req.body.quiz.question,
	                               answer : req.body.quiz.answer});
	quiz.save({fields: ["question", "answer"]})
	   .then(function(quiz) {
	   	req.flash('succes', 'Quiz creado con éxito')
	   	res.redirect('/quizzes');
	   })
	   .catch(function(error) {
	   	req.flash('error', 'Error al crear un Quiz: ' +error.message);
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

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId)
  		.then(function(quiz) {
      		if (quiz) {
        		req.quiz = quiz;
        		next();
      		} else { 
      			throw new Error('No existe quizId=' + quizId);
      		}
        })
        .catch(function(error) { next(error); });
};

exports.check = function(req, res) {
	var answer = req.query.answer || "";

	var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';

	res.render('quizzes/result', { quiz: req.quiz, 
								   result: result, 
								   answer: answer });
};


exports.show = function(req, res, next){
	var answer = req.query.answer || '';
    if(req.params.format=='json'){
       res.render('quizzes/show_json.ejs', { quiz: req.quiz, layout: false} );
    }
    else {
	res.render('quizzes/show', {quiz: req.quiz,
								answer: answer});
	};
};