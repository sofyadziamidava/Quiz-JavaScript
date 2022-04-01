let getData = async (url) => {
    fetch(url).then()
    let response = await fetch(url);
    let json = response.json();
    return json;
};

let renderQuestions = async () => {
    let quiz = await getData("https://opentdb.com/api.php?amount=10&type=boolean");
    quiz.results.forEach((quiz_question) => {
    let {question, correct_answer, incorrect_answers} = quiz_question;
    let questionDiv = document.createElement("div");
    questionDiv.style.border = "1px solid black";
    questionDiv.innerHTML = `<p>Question: ${question}</p><p>Correct anwser: ${correct_answer}</p>
    <p>Incorrect anwser: ${incorrect_answers}</p>`;
    document.body.append(questionDiv);
    })};


renderQuestions();
