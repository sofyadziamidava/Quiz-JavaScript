let startUrl = "https://opentdb.com/api.php";
let queries;
let getValueFromRadioBtns = (name) => {
let radioValue = document.querySelector(`[name = '${name}']:checked`);
if(radioValue !== null){
    queries += `&${name}=${radioValue.id}`;
}};

let getUrl = () => {
    queries = "?";
    let amount = document.querySelector("#amountQuestions").value;
    if(amount !== ""){
        queries += `amount=${amount}`;
    }else{
        queries += `amount=10`;
    }
    getValueFromRadioBtns("category");
    getValueFromRadioBtns("difficulty");
    getValueFromRadioBtns("type");

    console.log(startUrl + queries);
    return startUrl + queries;
};

let getData = async (url) => {
    fetch(url).then()
    let response = await fetch(url);
    let json = response.json();
    return json;
};

let questionsAndAnswers;
let questionContainer;

let renderQuestions = async () => {
    let url = getUrl();
    let quiz = await getData(url);
    questionsAndAnswers = quiz.results;
    let answers;
    let output = [];
    let allAnwsers;
    questionContainer = document.getElementById("quiz");
    questionContainer.innerHTML = "";

    if(questionsAndAnswers.length === 0){
        let message = document.getElementById("quiz");
        message.innerHTML = "Could not find quiz";
        // document.body.append(message);
        return;
    }

    for(var i=0; i<questionsAndAnswers.length; i++){
    let {question} = questionsAndAnswers[i];
  
    answers = [];
    allAnwsers = [];
    let correct_answer = questionsAndAnswers[i].correct_answer;
    let incorrect_answers = questionsAndAnswers[i].incorrect_answers;
    incorrect_answers.forEach(answer => allAnwsers.push(answer));
    allAnwsers.push(correct_answer);
    shuffleAnswers(allAnwsers);


    allAnwsers.forEach(answer =>  answers.push(
        '<label>'
            + '<input type="radio" name="question'+i+'" value="'+answer+'">'
            + answer  + '</label>'
    ));




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

let shuffleAnswers = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

let resultsContainer = document.getElementById("results");
let correctAnswerContainer = document.createElement("div");
let wrongAnswerContainer = document.createElement("div");


let renderResults = (questionsAndAnswers, questionContainer, resultsContainer) => {
    var answerContainers = questionContainer.querySelectorAll('.answers');
 
    var userAnswer = '';
    var numCorrect = 0;


    for(var i=0; i<questionsAndAnswers.length; i++){
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

        if(questionsAndAnswers[i].correct_answer){
            correctAnswer = "true";
        } else{
            correctAnswer = "false";
        }

        if(userAnswer===questionsAndAnswers[i].correct_answer){
			numCorrect++;
            let resultText = document.createElement("p");
            resultText.innerHTML = "";
            resultText.innerHTML = "Correct answer!";
            resultText.style.color = 'green';
            answerContainers[i].append(resultText);
		}
		else{
            let resultText = document.createElement("p");
            resultText.innerHTML = "";
            resultText.innerHTML = "Wrong answer!";
            resultText.style.color = 'red';
            answerContainers[i].append(resultText);
		}
    }

   getGrades(numCorrect, resultsContainer);
   document.body.append(resultsContainer);

}

let getGrades = (numCorrect, resultsContainer) => {
    let labelResult = document.createElement("h3");
    if (numCorrect < questionsAndAnswers.length / 2 ) 
    {labelResult.innerHTML = 'Failed ' + numCorrect + ' out of ' + questionsAndAnswers.length; 
    labelResult.style.color = 'red'; resultsContainer.append(labelResult);}
    else if(numCorrect >= questionsAndAnswers.length / 2 && numCorrect < (questionsAndAnswers.length / 4) * 3) {labelResult.innerHTML = 'Passed ' + numCorrect + ' out of ' + questionsAndAnswers.length; labelResult.style.color = 'yellow'; resultsContainer.append(labelResult);}
    else{labelResult.innerHTML = 'Well done! ' + numCorrect + ' out of ' + questionsAndAnswers.length; labelResult.style.color = 'green';resultsContainer.append(labelResult);}
} 


document.querySelector("#start").addEventListener("click", () =>{
startUrl = "https://opentdb.com/api.php";
 renderQuestions();
 resultsContainer.innerHTML = "";
 let showButton = document.querySelector('#submit');
 showButton.disabled = false;
 showButton.classList.replace('hidden', 'show');
});

 document.querySelector("#submit").addEventListener("click", () =>{
    renderResults(questionsAndAnswers, questionContainer, resultsContainer);
    let resultsBtn = document.querySelector("#submit");
    resultsBtn.disabled = true;
});


