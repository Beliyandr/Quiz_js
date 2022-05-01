const questions = [
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];
function quiz(questions) {
  // Элементы DOM
  const headerContainer = document.querySelector("#header");
  const listContainer = document.querySelector("#list");
  const submitBtn = document.querySelector("#submit");
  // Переменные игры
  let score = 0; // кол-во правильных ответов
  let questionIndex = 0; // тукещий вопрос

  clearPage();
  showQuestion();
  submitBtn.addEventListener("click", checkAnswer);

  function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
  }

  function showQuestion() {
    //!вопрос **********************
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace(
      "%title%",
      questions[questionIndex]["question"]
    );
    headerContainer.innerHTML = title;

    //!Варианты ответов ***********************
    for ([index, answerText] of questions[questionIndex]["answers"].entries()) {
      const questionTemplate = `<li>
				<label>
					<input value = ${index + 1} type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li> `;
      const answerHtml = questionTemplate.replace("%answer%", answerText);
      listContainer.innerHTML += answerHtml;
    }
  }

  function checkAnswer() {
    const checkedRadio = listContainer.querySelector(
      'input[type="radio"]:checked'
    );

    // Если ответ не выбран выходим, ничего не делаем
    if (!checkedRadio) {
      submitBtn.blur();
      return;
    }
    // Узнаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value);

    // Если ответ верен - увеличиваем счетчик

    if (userAnswer === questions[questionIndex]["correct"]) {
      score++;
    }

    //!Проверка на остаток вопросов
    if (questionIndex !== questions.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion();
    } else {
      clearPage();
      showResults();
    }
  }

  function showResults() {
    let title, message;

    if (score === questions.length) {
      title = "Поздавляем! 🧁";
      message = "Вы ответили верно на все вопросы! 😎👍";
    } else if ((score * 100) / questions.length >= 50) {
      title = "Не плохой результат!";
      message = "Вы ответили правильно больше чем на половину вопросов! 👍";
    } else {
      title = "Стоит немного поучиться!🧑‍🎓";
      message = "Вы ответили правильно меньше чем на половину вопросов!🤔 ";
    }

    //Результаты викторины
    const resultTemplate = `
  <h2 class="title">${title}</h2>
  <h3 class="summary">${message}</h3>
  <p class="result">Ваше количество правильных ответов : ${score}  из ${questions.length}</p>
  `;

    headerContainer.innerHTML = resultTemplate;

    //Меняем кнопку на играть снова
    submitBtn.innerText = "Начать заново";
    submitBtn.onclick = () => {
      history.go();
    };
  }
}

quiz(questions);
