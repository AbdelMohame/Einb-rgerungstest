class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectAnswers = [];
        this.playerName = '';
    }

    startQuiz() {
        this.playerName = prompt("Bitte gib deinen Namen ein:");
        if (!this.playerName) {
            alert("Du musst einen Namen eingeben, um das Quiz zu starten!");
            return;
        }

        this.showQuestion();
    }

    showQuestion() {
        const quizContainer = document.getElementById("quiz");
        const currentQuestion = this.questions[this.currentQuestionIndex];

        quizContainer.innerHTML = `
            <h2 style="color: #000000;">${this.currentQuestionIndex + 1}. ${currentQuestion.question}</h2>
            <ul id="options">
                ${currentQuestion.options.map((option, index) => `<li data-index="${index}">${option}</li>`).join("")}
            </ul>
        `;

        const options = document.getElementById("options").getElementsByTagName("li");
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener("click", (event) => this.checkAnswer(event));
        }
    }

    checkAnswer(event) {
        const selectedIndex = parseInt(event.target.getAttribute("data-index"));
        const currentQuestion = this.questions[this.currentQuestionIndex];

        if (selectedIndex === currentQuestion.correctAnswer) {
            this.score++;
        } else {
            this.incorrectAnswers.push(this.currentQuestionIndex + 1);
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const resultsContainer = document.getElementById("results");
        resultsContainer.style.display = "block";

        const totalQuestions = this.questions.length;
        const percentage = (this.score / totalQuestions) * 100;
        const passStatus = percentage >= 70 ? "bestanden" : "nicht bestanden";

        resultsContainer.innerHTML = `
            <h2>Quiz beendet, ${this.playerName}!</h2>
            <p>Du hast ${this.score} von ${totalQuestions} Fragen richtig beantwortet.</p>
            <p>Das Ergebnis beträgt ${percentage.toFixed(2)}%.</p>
            <p>Du hast das Quiz ${passStatus}.</p>
            <p>Falsch beantwortete Fragen: ${this.incorrectAnswers.length > 0 ? this.incorrectAnswers.length + ' von ' + totalQuestions : 'Keine'}</p>
            <button onclick="this.repeatQuiz()">Quiz wiederholen</button>
            <button onclick="this.showCorrectAnswers()">Richtige Antworten anzeigen</button>
        `;
    }

    showCorrectAnswers() {
        if (this.showCorrectAnswersFlag) {
            return;
        }

        this.showCorrectAnswersFlag = true;

        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");

        resultsContainer.innerHTML += '<h2>Richtige Antworten:</h2>';
        this.questions.forEach((question, index) => {
            resultsContainer.innerHTML += `<p>${index + 1}. ${question.options[question.correctAnswer]}</p>`;
        });

        quizContainer.innerHTML = "";
    }

    repeatQuiz() {
        this.showCorrectAnswersFlag = false;
        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");
        resultsContainer.style.display = "none";
        quizContainer.innerHTML = "";
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectAnswers = [];
        this.showQuestion();
    }
}

const quizData = [
{
                question: "Wann wurde die Bundesrepublik Deutschland gegründet?",
                options: ["1949", "2000", "1890", "1670"],
                correctAnswer: 0
            },
            {
                question: "Welches Organ gehört nicht zu den Verfassungsorganen Deutschlands?",
                options: ["der Bundespräsident", "die Bürgerversammlung", "der Bundesrat", "die Regierung"],
                correctAnswer: -1
            },
            {
                question: "In welchem Militärbündnis war die DDR Mitglied?",
                options: ["im Rheinbund", "im Europabündnis", "in der NATO", "im Warschauer Pakt"],
                correctAnswer: 3
            },
            {
                question: "Welcher Fluss fließt durch Berlin?",
                options: ["Rhein", "Donau", "Elbe", "Spree"],
                correctAnswer: 3
            },
            {
                question: "Wie viele Bundesländer hat Deutschland?",
                options: ["12", "16", "8", "10"],
                correctAnswer: 1
            },
            {
                question: "Wer ist das Staatsoberhaupt Deutschlands?",
                options: ["Bundeskanzler", "Präsident", "Kaiser", "König"],
                correctAnswer: 1
            },
            {
                question: "Was ist die Hauptstadt von Bayern?",
                options: ["Hamburg", "München", "Stuttgart", "Frankfurt"],
                correctAnswer: 1
            },
            {
                question: "Welches Ereignis fand am 9. November 1989 statt?",
                options: ["Wiedervereinigung Deutschlands", "Erster Weltkrieg endete", "Gründung der Bundesrepublik", "Berlinale Filmfestival"],
                correctAnswer: 0
            },
            {
                question: "Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?",
                options: ["Helmut Kohl", "Konrad Adenauer", "Gerhard Schröder", "Angela Merkel"],
                correctAnswer: 1
            },
            {
                question: "In welchem Jahr wurde die EU gegründet?",
                options: ["1957", "1972", "1992", "2001"],
                correctAnswer: 0
            },
            {
                question: "Welcher deutsche Feiertag wird am 3. Oktober gefeiert?",
                options: ["Tag der Arbeit", "Tag der Deutschen Einheit", "Erntedankfest", "Weihnachten"],
                correctAnswer: 1
            },
            {
                question: "Was ist die Landeshauptstadt von Nordrhein-Westfalen?",
                options: ["Düsseldorf", "Köln", "Essen", "Dortmund"],
                correctAnswer: 0
            },
            {
                question: "Wer schrieb das Gedicht 'Die Lorelei'?",
                options: ["Johann Wolfgang von Goethe", "Friedrich Schiller", "Heinrich Heine", "Erich Kästner"],
                correctAnswer: 2
            },
            {
                question: "Wie nennt man das deutsche Parlament?",
                options: ["Reichstag", "Bundesrat", "Landtag", "Bundestag"],
                correctAnswer: 3
            },
            {
                question: "Was ist das Wahrzeichen von Berlin?",
                options: ["Brandenburger Tor", "Fernsehturm", "Reichstag", "Schloss Bellevue"],
                correctAnswer: 1
            },
            {
                question: "Welche Farben hat die deutsche Flagge?",
                options: ["Schwarz-Rot-Gold", "Rot-Weiß-Schwarz", "Grün-Weiß-Rot", "Blau-Gelb-Rot"],
                correctAnswer: 0
            },
            {
                question: "Welcher deutsche Komponist gilt als Klassikmeister und war taub?",
                options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Richard Wagner"],
                correctAnswer: 1
            }
            // weiter Fragen...
]
const quiz = new Quiz(quizData);

document.getElementById("startQuizButton").addEventListener("click", () => quiz.startQuiz());
