let getData = async (url) => {
    fetch(url).then()
    let response = await fetch(url);
    let json = response.json();
    return json;
};

let questionsAndAnswers;

let renderQuestions = async () => {
    let quiz = await getData("https://opentdb.com/api.php?amount=10&type=boolean");
    questionsAndAnswers = quiz.results;
    let answers;
    let output = [];
    let questionContainer = document.createElement("div");
    questionsAndAnswers.forEach((quiz_question) => {
    let {question} = quiz_question;
    

    answers = [];
    

    answers.push(
        '<label>'
            + '<input type="radio" name="question" value="true">'
            + true + 
        '</label>'
    );

    answers.push(
        '<label>'
            + '<input type="radio" name="question" value="false">'
            + false + 
        '</label>'
    );

    output.push(
        `<div class="questions">  ${question}  </div>` +
        `<div class="answers">`+ answers.join('') + `</div>`

    );})

    output.forEach((quizOutput) => {
        let newQuestion = document.createElement("div");
        newQuestion.innerHTML = quizOutput;
        newQuestion.style.border = "1px solid black";
        questionContainer.append(newQuestion);

    })
    document.body.append(questionContainer)};


renderQuestions();







