'use strict';

// This array contains the questions/answers and images for each question.
const quizData = [
	{
		"answer": "option4",
		"image": "Dog-Pics/border-terrier.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/n9iTLG/border_terrier.jpg" alt="border_terrier">',
		"option1": "Irish Terrier",
		"option2": "Beagle",
		"option3": "Poodle",
		"option4": "Border Terrier",
	}, 
	{
		"answer": "option2",
		"image": "Dog-Pics/pit-bull.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/fdB4ub/pit_bull.jpg" alt="pit_bull">',
		"option1": "Bull Terrier", 
		"option2": "Pit Bull",
		"option3": "Vizsla",
		"option4": "Bulldog",
	},
	{
		"answer": "option1",
		"image": "Dog-Pics/whippet.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/ijFL7w/whippet.jpg" alt="whippet">',
		"option1": "Whippet" ,
		"option2": "Greyhound",
		"option3": "Border Collie",
		"option4": "Westy",
	}, 
	{
		"answer": "option3",
		"image": "Dog-Pics/border-collie.jpg",
		"imageLink": '<img class="dog-pic" src="https://image.ibb.co/kmzeSw/border_collie.jpg" alt="border_collie">',
		"option1": "Bearded Collie" ,
		"option2": "German Pointer",
		"option3": "Border Collie",
		"option4": "German Shepherd",
	},
	{
		"answer": "option2",
		"image": "Dog-Pics/great-dane.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/k8fa0G/great_dane.jpg" alt="great_dane">',
		"option1": "Newfoundland", 
		"option2": "Great Dane",
		"option3": "Mastiff",
		"option4": "Chihuahuah",
	}, 
	{
		"answer": "option4",
		"image": "Dog-Pics/labrador.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/g9E2fG/labrador.jpg" alt="labrador">',
		"option1": "Irish Wolfhound",
		"option2": "Golden Retriever",
		"option3": "Bloodhound",
		"option4": "Labrador",
	},
	{
		"answer": "option2",
		"image": "Dog-Pics/rottweiler.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/fexNfG/rottweiler.jpg" alt="rottweiler">',
		"option1": "Doberman", 
		"option2": "Rottweiler",
		"option3": "Giant Schnauzer",
		"option4": "Jack Russell",
	},
	{
		"answer": "option1",
		"image": "Dog-Pics/german-shepherd.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/fDqm7w/german_shepherd.jpg" alt="german_shepherd">',
		"option1": "German Shepherd", 
		"option2": "Dutch Shepherd",
		"option3": "Belgian Shepherd",
		"option4": "King Shepherd",
	},
	{
		"answer": "option2",
		"image": "Dog-Pics/golden-retriever.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/iB4Dnw/golden_retriever.jpg" alt="golden_retriever">',
		"option1": "Labrador",
		"option2": "Golden Retriever",
		"option3": "Bull Terrier",
		"option4": "Poodle",
	},
	{
		"answer": "option4",
		"image": "Dog-Pics/beagle.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/caEDnw/beagle.jpg" alt="beagle">',
		"option1": "English Foxhound",
		"option2": "Welsh Hound",
		"option3": "Basset Hound",
		"option4": "Beagle",
	}
];


// These two arrays contain gifs objects for displaying on the results page.   
const successGifs = 
	[
		{
			imageUrl: 'https://media.giphy.com/media/l4FGzcWoiddHwXQQg/giphy.gif',
			alt: "Gif: A pool player executes a trick shot while a shih tzu stands on the pool table.",
		},
		{
			imageUrl: 'https://media.giphy.com/media/dTJd5ygpxkzWo/giphy.gif',
			alt: "Gif: A pug has its belly scratched",
		},
		{
			imageUrl: 'https://media.giphy.com/media/1LweXxLwVT0J2/giphy.gif',
			alt: "Gif: A dog with a hotdog in its mouth.",
		},
	]
const failureGifs = 
	[
		{
			imageUrl: 'https://media.giphy.com/media/14pKVNqXY40EVi/giphy.gif',
			alt: "Gif: A dog with a stick in his mouth collides with a fence",	
		},
		{
			imageUrl: 'https://media.giphy.com/media/ZFZLIuWWkr29y/giphy.gif',
			alt: "Gif: A dog face-plants into a hedge",
		},
		{
			imageUrl: 'https://media.giphy.com/media/42075qeD6Mk0M/giphy.gif',
			alt: "Gif: A dog fails to catch a frisbee",
		},
	]


// questionCount tracks how many questions have been answered.  
// score tracks how many questions have been answered correctly.
let questionCount = 0, score = 0;


// handlePageLoaderButtonClicked() listens for clicks on 'start quiz' or 'next question'
// and either loads the next page or the final page, depending on the user's progress.
function handlePageLoaderButtonClicked() {
	$('.page-loader-button').on('click', function(event){
		if (questionCount > 9) {
			loadResultsPageHtml();	
			handlePlayAgain();
		} else {
			loadQuestionPageHtml();
		}
	});
}

// loadQuestionPageHtml() loads the next question's HTML created by the 'generate' 
// functions and then sets off a listener for user answers.
function loadQuestionPageHtml() {
	$('main').html(generateFullQuestionPageHtml(questionCount));
	handleAnswerClick();
}

// This function pulls together the three HTML strings for a new answer page 
// and returns them to be loaded to the page by loadQuestionPageHtml().
function generateFullQuestionPageHtml() {
	let initialHtmlAndImg = generateInitialHtmlAndImg(questionCount);
	let formAndFinalHtml = generateFormAndFinalHtml(questionCount);
	let progressAndResultText = generateProgressAndResultText();
	return initialHtmlAndImg+progressAndResultText+formAndFinalHtml; 
}

// First of three functions to generate next question page HTML.
// Selects the appropriate image from quizArray.
function generateInitialHtmlAndImg() {
	let dogImgTag = quizData[questionCount].imageLink;
	let html =  
	`<div class="col-2">
		<div class="col-8 center-div">
			${dogImgTag} </br>
			<input type="button"  class="button-next page-loader-button hidden" value="Next"></input> </br>
			`;
	return html;
}

// Second of three functions to generate next question page HTML.
// Uses the questionCount variable to get the answer to the current question.
function generateFormAndFinalHtml() {
	let html = 
	`
					<form>
							<input type="button"  name="Answer button - ${quizData[questionCount].option1}" class="button-answer js-option1" value="${quizData[questionCount].option1}"></input> 
							<input type="button"  name="Answer button - ${quizData[questionCount].option2}" class="button-answer js-option2" value="${quizData[questionCount].option2}"></input> 
					<div class="row">
							<input type="button"  name="Answer button - ${quizData[questionCount].option3}" class="button-answer js-option3" value="${quizData[questionCount].option3}"></input> 
							<input type="button"  name="Answer button - ${quizData[questionCount].option4}" class="button-answer js-option4" value="${quizData[questionCount].option4}"></input> 
					</div>
					</form>
			</div>
			<div class="col-2">
			</div>
	`;
	return html;
}

// Third of three functions to generate next question page HTML.
// Displays progress so far in the quiz.
function generateProgressAndResultText() {
	let html =
	`<p class="progress-and-result">Question ${questionCount+1}/10 (${score} correct so far)</p>
	`
	return html;
}

// As mentioned in the last comment, each object in quizData has an 'answer' key, which
// names the correct answer by its 'option' number (eg 'answer': 'option1')
/*
	For example, for the following question object the answer to the question is 'Border Terrier'.
	{
		"answer": "option4",
		"image": "Dog-Pics/border-terrier.jpg",
		"imageLink": '<img class="dog-pic" src="https://preview.ibb.co/n9iTLG/border_terrier.jpg" alt="border_terrier">',
		"option1": "Irish Terrier",
		"option2": "Beagle",
		"option3": "Poodle",
		"option4": "Border Terrier",
	}
*/
function handleAnswerClick() {
	$('.button-answer').one('click', function(event) {

		// HTML class names for input button option numbers are prefixed with 'js-' (eg 'js-option1')
		// So this adjustment is made during the assignment for the variable classNameOfCorrectAnswer.
		let classNameOfCorrectAnswer = 'js-' + quizData[questionCount].answer;

		// correctButton is assigned a reference to the 'correct answer' button.
		let correctButton = $('form').find('.'+ classNameOfCorrectAnswer);

		// userAnswer is assigned the button clicked by the user...
		let userAnswer = event.currentTarget;

		// Alters the button css styling to show whether the user is right/wrong.
		loadAnswerResultHtml(userAnswer, classNameOfCorrectAnswer, correctButton);
		revealNextButton();
		$(".button-answer").off("click");
		questionCount++;
	});
}

// This function loads the appropriate HTML when the user clicks an answer button.
function loadAnswerResultHtml(userAnswer, classNameOfCorrectAnswer, correctButton) {

	// Returns true if the user's answer is correct, and false if not.
	let result = markAnswer(userAnswer, classNameOfCorrectAnswer, correctButton);
	
	// Replaces .progress-and-result text with either a 'correct' or 'incorrect' message.
	giveFeedback(result, userAnswer, correctButton);

	// If the user clicks the wrong button, it is highlighted red and the correct answer is 
	// highlighted green.  If the user clicks the right button, it is highlighted in green
	// and the variable score is incremented by 1. 
	if (result) {
		score++;
	} else {
		$(userAnswer).addClass('incorrect');
	}
	$(correctButton).addClass('correct');
}

// Returns true if the user's answer is correct, and false if not.
function markAnswer(userAnswer, classNameOfCorrectAnswer, correctButton) {
	return $(userAnswer).hasClass(classNameOfCorrectAnswer)
}

function revealNextButton() {
	$('.button-next').removeClass('hidden');
	// handlePageLoaderButtonClicked() - the same function that listens for clicks on
	// the 'start' button at the beginning of the quiz.  
	// This calls an event listener for the user clicking the 'next' button.  
	handlePageLoaderButtonClicked();
}

// Replaces the progress text with a 'correct' or 'incorrect' message, 
// depending on whether the user has clicked the correct button. 
function giveFeedback(result, userAnswer, correctButton) {
	let htmlToReplaceWithFeedback = $('.progress-and-result');
	if (result) {
		htmlToReplaceWithFeedback.text(`That's right - it's a ${$(userAnswer).val()}!`);
	} else {
		htmlToReplaceWithFeedback.text(`Sorry! You clicked ${$(userAnswer).val()}, but the correct answer was ${$(correctButton).val()}.`);
	}
}

// Called when the user clicks 'next' on the final question. 
function loadResultsPageHtml() {
	
	// Assigns to the variable finalGif a randomly selected gif
	let finalGif = pickRandomGif();

	// Assigns a 'success' or 'failure' message depending on the user's score. 
	let finalWord = pickFeedbackText();

	// Loads the final page html
	$('main').html(
`<h2 class="heading-success-failure">${score}/10<br>${finalWord}</h2>
			<img class="img-success-failure" src="${finalGif.imageUrl}" alt="${finalGif.alt}">
		<br>
			<button name="Start again button" class="button-start-again"><span>Play again <img class="paw-print" src="https://image.ibb.co/jFBR7w/paw_print.png" alt="paw_print"></span></button>`
		)
}

// Assigns an appropriate feedback message. 
function pickFeedbackText() {
	if (score > 6) {
		return "Congratulations!";
	} else {
		return "Bad luck!";
	}
}

// Randomly selects an appropriate gif
function pickRandomGif() {
	if (score > 6) {
		return successGifs[Math.floor(Math.random()*3)];
	} else {
		return failureGifs[Math.floor(Math.random()*3)];
	}
}

// An event listener for the user clicking the 'play again' button.
// Clicking the 'play again' button will reset the score and questionCount,
// and then reload the quiz html from the first question.
function handlePlayAgain() {
	score = 0;
	questionCount = 0;
	$('.button-start-again').on('click', function(event) {
		loadQuestionPageHtml();	
	});
}

// On loading HTML and all other JS, stylings etc, start listening for clicks
// in the start button! 
handlePageLoaderButtonClicked();
