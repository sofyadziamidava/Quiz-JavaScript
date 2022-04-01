let getData = async (url) => {
    fetch(url).then()
    let response = await fetch(url);
    let json = response.json();
    return json;
};

let questionsAndAnswers;
let questionContainer;

let renderQuestions = async () => {
    let quiz = await getData("https://opentdb.com/api.php?amount=10&type=boolean");
    questionsAndAnswers = quiz.results;
    let answers;
    let output = [];
    questionContainer = document.getElementById("quiz");
    questionContainer.innerHTML = "";
    for(var i=0; i<questionsAndAnswers.length; i++){
    let {question} = questionsAndAnswers[i];
  
    answers = [];
    
    answers.push(
        '<label>'
            + '<input type="radio" name="question'+i+'" value="True">'
            + true + 
        '</label>'
    );

    answers.push(
        '<label>'
            + '<input type="radio" name="question'+i+'" value="False">'
            + false + 
        '</label>'
    );

    output.push(
        `<div class="questions">  ${question}  </div>` +
        `<div class="answers">`+ answers.join('') + `</div>`

    );}

    output.forEach((quizOutput) => {
        let newQuestion = document.createElement("div");
        newQuestion.innerHTML = quizOutput;
        newQuestion.style.border = "1px solid black";
        questionContainer.append(newQuestion);

    })
    document.body.append(questionContainer);
};


let resultsContainer = document.getElementById("results");

let renderResults = (questionsAndAnswers, questionContainer, resultsContainer) => {
    var answerContainers = questionContainer.querySelectorAll('.answers');
 
    var userAnswer = '';
    var numCorrect = 0;


    for(var i=0; i<questionsAndAnswers.length; i++){
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        let correctAnswer;

        if(questionsAndAnswers[i].correct_answer){
            correctAnswer = "true";
        } else{
            correctAnswer = "false";
        }

        console.log("User: " + userAnswer);
        console.log("Correct: " + correctAnswer);
        console.log("correct_answer: " + questionsAndAnswers[i].correct_answer)

        if(userAnswer===questionsAndAnswers[i].correct_answer){
			numCorrect++;
			answerContainers[i].style.color = 'green';
		}
		else{
			answerContainers[i].style.color = 'red';
		}
    }

   resultsContainer.innerHTML = numCorrect + ' out of ' + questionsAndAnswers.length;
   document.body.append(resultsContainer);

}


document.querySelector("#start").addEventListener("click", () =>{
 renderQuestions();});

 document.querySelector("#submit").addEventListener("click", () =>{
    renderResults(questionsAndAnswers, questionContainer, resultsContainer);});
