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


// These two arrays contain gifs objects.  These will be used for displaying
// for displaying gifs on the final page.   
// A score greater than 6/10 will receive a success gif.
// Gifs within each array are chosen at random by loadResultsPageHtml().
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

// The .page-loader-button class is held by the 'Start' button at the beginning
// of the quiz.  It is also held by the 'Next Question' button on each question
// page.  
// handlePageLoaderButtonClicked() listens for clicks and checks to see whether 
// the quiz is on the final question.  If the quiz is on the final question, the
// final page is loaded. Else, the next question is loaded.
function handlePageLoaderButtonClicked() {
	$('.page-loader-button').on('click', function(event){
		console.log("handlePageLoaderButtonClicked() ran.");
		if (questionCount > 9) {
			loadResultsPageHtml();	
			handlePlayAgain();
		} else {
			loadQuestionPageHtml();
		}
	});
}

// loadQuestionPageHtml() loads the next question's HTML created by the 'generate' 
// functions. loadQuestionPageHtml() then calls handleAnswerClick(), which is  a
// listener for the user clicking an answer in the newly-displayed HTML.
function loadQuestionPageHtml() {
	console.log('loadQuestionPageHtml() ran.');
	$('main').html(generateFullQuestionPageHtml(questionCount));
	handleAnswerClick();
}

// This function pulls together the three HTML strings for a new answer page 
// and returns them to be loaded to the page by loadQuestionPageHtml().
function generateFullQuestionPageHtml() {
	console.log('generateFullQuestionPageHtml() ran.');
	const initialHtmlAndImg = generateInitialHtmlAndImg(questionCount);
	const formAndFinalHtml = generateFormAndFinalHtml(questionCount);
	const progressAndResultText = generateProgressAndResultText();
	return initialHtmlAndImg+progressAndResultText+formAndFinalHtml; 
}

// First of three functions to generate next question page HTML.
// generateInitialHtmlAndImg() uses the question number (questionCount) to select the
// image fir the next question from quizArray.  quizArray contains the data for each
// question in the order they appear in the quiz.
function generateInitialHtmlAndImg() {
	console.log('generateInitialHtmlAndImg running.');
	const dogImgTag = quizData[questionCount].imageLink;
	const initialHtmlAndImg =  
	`<div class="col-2">
		<div class="col-8 center-div">
			${dogImgTag} </br>
			<input type="button"  class="button-next page-loader-button hidden" value="Next"></input> </br>
			`;
	return initialHtmlAndImg;
}

// Secomd of three functions to generate next question page HTML.
// generateFormAndFinalHtml() uses the questionCount variable to reference the available 
// answers from the current question's object in quizData. 
// The HTML classes '.js-option1', '.js-option2' etc correspond to 'option1', 'option2' keys in
// the object for each question within quizData. See the next comment for more detail.
function generateFormAndFinalHtml() {
	console.log('generateFormAndFinalHtml() ran.');
	const formAndFinalHtml = 
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
	return formAndFinalHtml;
}

// Third of three functions to generate next question page HTML.
// generateProgressAndResultText() uses the values stored in the variables questionCount 
// and score to display progrtess so far in the quiz.
// Note that the resulting <p> element has the class '.progress-and-result'.  This is 
// because this <p> element will be replaced with a 'correct' or 'incorrect' message  
// when the user clicks an answer in the quiz.
function generateProgressAndResultText() {
	console.log('generateProgressAndResultText() ran.')
	const progressAndResultText =
	`<p class="progress-and-result">Question ${questionCount+1}/10 (${score} correct so far)</p>
	`
	return progressAndResultText;
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
		console.log('handleAnswerClick() ran.');

		// HTML class names for input button option numbers are prefixed with 'js-' (eg 'js-option1')
		// So this adjustment is made during the assignment for the variable classNameOfCorrectAnswer.
		const classNameOfCorrectAnswer = 'js-' + quizData[questionCount].answer;

		// correctButton is assigned a reference to the 'correct answer' button.
		const correctButton = $('form').find('.'+ classNameOfCorrectAnswer);

		// userAnswer is assigned the button clicked by the user...
		const userAnswer = event.currentTarget;

		// loadAnswerResultHtml() alters the button css styling to show whether the user is right/wrong.
		// For more details, see the next function comments. 
		loadAnswerResultHtml(userAnswer, classNameOfCorrectAnswer, correctButton);
		revealNextButton();
		$(".button-answer").off("click");
		questionCount++;
	});
}

// This function loads the appropriate HTML when the user clicks an answer button.
function loadAnswerResultHtml(userAnswer, classNameOfCorrectAnswer, correctButton) {
	console.log('loadAnswerResultHtml() ran.');

	// markAnswer() returns true if the user's answer is correct, and false if not.
	// So the variable result is assigned either true or false.
	const result = markAnswer(userAnswer, classNameOfCorrectAnswer, correctButton);
	
	// giveFeedback() replaces the progress text with a 'correct' or 'incorrect' message, depending
	// on whether the user has clicked the correct button.
	giveFeedback(result, userAnswer, correctButton);

	// Here, the current function loadAnswerResultHtml() alters the button css styling to show 
	// whether the user is right/wrong.  
	// If the user clicks the wrong button, it is highlighted red and the correct answer is 
	// highlighted green.  If the user clicks the right button, it is highlighted in green and the
	// variable score is incremented by 1. 
	if (result) {
		score++;
	} else {
		$(userAnswer).addClass('incorrect');
	}
	$(correctButton).addClass('correct');
}

// markAnswer() returns true if the user's answer is correct, and false if not.
// This value is assigned to the variable result in the above function.
function markAnswer(userAnswer, classNameOfCorrectAnswer, correctButton) {
	console.log('checkAnswer() ran.');
	if ($(userAnswer).hasClass(classNameOfCorrectAnswer)) {
		return true;
	} else {
		return false;
	}
}

// The 'next' button element is intially assigned the CSS property 'display: hidden;'
// by default through the class '.hidden'. Once the user clicks an answer, the 
// '.hidden' class is removed from the 'next'  button element to allow the user to 
// click through to the next question.
function revealNextButton() {
	console.log('revealNextButton() ran.');
	const nextButton = $('main').find('.button-next');
	$(nextButton).removeClass('hidden');
	// handlePageLoaderButtonClicked() - the same function that listens for clicks on
	// the 'start' button at the beginning of the quiz.  
	// This calls an event listener for the user clicking the 'next' button.  
	// This will set off the processes that cause the next question's HTML page to load.
	// It also checks whether the quiz has reached the last question, and, if so, loads
	// the results page (see comments on loadsResultsPage(), below).
	handlePageLoaderButtonClicked();
}

// giveFeedback() replaces the progress text with a 'correct' or 'incorrect' message, 
// depending on whether the user has clicked the correct button. 
// The variable result is created in loadAnswerResultHtml().  It stores the value 'true' 
// or 'false', depending on whether the user has clicked the correct answer.
function giveFeedback(result, userAnswer, correctButton) {
	console.log('giveFeedback() ran.');
	const htmlToReplaceWithFeedback = $('.progress-and-result');
	if (result) {
		htmlToReplaceWithFeedback.text(`That's right!`);
	} else {
		htmlToReplaceWithFeedback.text(`Sorry! You clicked ${$(userAnswer).val()}, but the correct answer was ${$(correctButton).val()}.`);
	}
}

// loadResultsPageHtml() is called when the user clifcks 'next' on the final question.
// The function loads the final page html, displaying the user's score,
// a 'success' or 'failure' message and the randomly selected gif.  
// The object for each gif within successGifs and failureGifs takes the following form:
/*
		{
			imageLink: 'https://media.giphy.com/media/14pKVNqXY40EVi/giphy.gif',
			alt: 'Gif animation of a dog with a stick in its mouth walking into a fence',
		},
*/ 
function loadResultsPageHtml() {
	console.log('loadResultsPageHtml() ran.');
	
	// pickRandomGif() assigns to the variable finalGif a randomly selected 
	// gif.  If the user scores over 6/10, the gif is chosen from successGifs.
	// Otherwise, it is chose from failureGifs.  . 
	let finalGif = pickRandomGif();

	// pickFeedbackText() is similar to the above, but assigns the variable
	// finalWord a 'success' or 'failure' message depending on the user's score. 
	let finalWord = pickFeedbackText();

	// The function then loads the final page html, displaying the user's 
	// score, a 'success' or 'failure' message and the randomly selected gif. 
	$('main').html(
`<h2 class="heading-success-failure">${score}/10<br>${finalWord}</h2>
			<img class="img-success-failure" src="${finalGif.imageUrl}" alt="${finalGif.alt}">
		<br>
			<button name="Start again button" class="button-start-again"><span>Play again <img class="paw-print" src="https://image.ibb.co/jFBR7w/paw_print.png" alt="paw_print"></span></button>`
		)
}

// pickRandomGif() assigns to the variable finalGif a randomly selected 
// gif.  If the user scores over 6/10, the gif is chosen from successGifs.
// Otherwise, it is chose from failureGifs.  
// pickRandomGif() also assigns the variable finalWord a 'success' or 
// 'failure' message depending on their score. 
function pickFeedbackText() {
	console.log('pickRandomGif() ran.');
	if (score > 6) {
		return "Congratulations!";
	} else {
		return "Bad luck!";
	}

}

function pickRandomGif() {
	console.log('pickRandomGif() ran.');
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
	console.log('handlePlayAgain() ran.');
	score = 0;
	questionCount = 0;
	$('.button-start-again').on('click', function(event) {
		loadQuestionPageHtml();	
	});
}

// On loading HTML and all other JS, stylings etc, start listening for clicks
// in the start button! 
handlePageLoaderButtonClicked();
