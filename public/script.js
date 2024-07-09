document.addEventListener("DOMContentLoaded", function () {
    // Initial state: show only the home section
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("welcome").style.display = "block";

    function navigateToSection(sectionId) {
        // Hide all sections
        var sections = document.querySelectorAll("section");
        sections.forEach(function (section) {
          section.style.display = "none";
        });
        // Show the selected section
        document.getElementById(sectionId).style.display = "block";
    
        var navLinks = document.querySelectorAll(".movies .movie");
        navLinks.forEach(function (link) {
          link.classList.remove("active");
        });
      }
      // Event listeners for navigation links
  var navLinks = document.querySelectorAll(".movies .movie");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var sectionId = link.getAttribute("href").slice(1);
      navigateToSection(sectionId);
    });
  });
  });
// Handle displaying only on phones 
document.addEventListener("DOMContentLoaded", function () {
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
  }

  if (!isMobileDevice()) {
    document.body.innerHTML =
      '<div class="not-mobile">This application is only available on mobile devices.</div>';
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.backgroundColor = "#2D1B47";
    document.body.style.color = "white";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.textAlign = "center";
    document.body.style.padding = "20px";
  }
});
// Handle displaying movies 
document.addEventListener('DOMContentLoaded', () => {
  const movies = document.querySelectorAll('.movie');
  movies.forEach(movie => {
      movie.addEventListener('click', async () => {
          const movieType = movie.getAttribute('data-movie');
          await fetchTrivia(movieType);
      });
  });
});

async function fetchTrivia(movieType) {
  try {
      const response = await fetch(`/trivia/${movieType}`);
      if (response.ok) {
          const data = await response.json();
          displayQuestions(data.title, data.questions);
      } else {
          console.error('Failed to fetch trivia');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

function displayQuestions(title, questions) {
  document.getElementById('game-title').textContent = title;
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = '';

  let score = 0;

  if (questions && questions.length > 0) {
      questions.forEach(question => {
          const li = document.createElement('li');

          const questionPara = document.createElement('p');
          questionPara.innerHTML = `<strong></strong> ${question.question}`;
          questionPara.classList.add('question-paragraph');
          li.appendChild(questionPara);

          const choicesList = document.createElement('ul');
          choicesList.classList.add('choices-list');
          if (question.choice && Array.isArray(question.choice)) {
              question.choice.forEach(choice => {
                  const choiceLi = document.createElement('li');
                  choiceLi.textContent = choice;
                  choiceLi.classList.add('choice-item');
                  choiceLi.addEventListener('click', () => {
                    // Handle user choice
                    handleChoiceSelection(choiceLi, question.correct_answer);
                    if (choice === question.correct_answer) {
                      score++;
                  }
                });
                  choicesList.appendChild(choiceLi);
              });
          } else {
              const noChoicesLi = document.createElement('li');
              noChoicesLi.textContent = 'No choices available';
              noChoicesLi.classList.add('no-choices'); 
              choicesList.appendChild(noChoicesLi);
          }
          li.appendChild(choicesList);

          const answerPara = document.createElement('p');
          answerPara.innerHTML = `<strong>Answer:</strong> ${question.correct_answer}`;
          answerPara.style.display = 'none';
          li.appendChild(answerPara);

          questionsList.appendChild(li);
      });
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Score';
        submitButton.classList.add('submit-button');
        submitButton.addEventListener('click', () => {
            submitScore(score);
        });
        questionsList.appendChild(submitButton);
  } else {
      const noQuestionsLi = document.createElement('li');
      noQuestionsLi.textContent = 'No questions available';
      questionsList.appendChild(noQuestionsLi);
  }

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}


function handleChoiceSelection(selectedChoice, correctAnswer) {
  const choicesList = selectedChoice.parentNode;
  const choices = choicesList.querySelectorAll('.choice-item');

  choices.forEach(choice => {
      if (choice.textContent === correctAnswer) {
          choice.style.backgroundColor = 'green';
      } else {
          choice.style.backgroundColor = '#C70039';
      }
  });
}

async function submitScore(userID, score) {
  try {
      const response = await fetch('/update-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userID, score })
      });

      if (response.ok) {
          alert('Score submitted successfully!');
      } else {
          console.error('Failed to submit score');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}


