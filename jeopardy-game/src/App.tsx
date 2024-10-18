// src/App.tsx

import React, { useState } from 'react';

interface Question {
    question: string;
    answer: string;
    value: number;
    answered: boolean;
}

interface Category {
    name: string;
    questions: Question[];
}

interface Player {
    name: string;
    score: number;
}

const categories: Category[] = [
    {
        name: "Red, White, and Binge-Worthy",
        questions: [
            { question: "This Netflix series follows a group of kids battling strange forces from the Upside Down in the 1980s.", answer: "Stranger Things", value: 200, answered: false },
            { question: "He’s the fictional president in The West Wing, known for his sharp wit and love of national parks.", answer: "Jed Bartlet", value: 400, answered: false },
            { question: "This animated comedy family from Springfield has been predicting the future for over 30 years.", answer: "The Simpsons", value: 600, answered: false },
            { question: "In Parks and Recreation, this character famously declares, “Treat Yo’ Self!”", answer: "Tom Haverford", value: 800, answered: false },
            { question: "This Netflix docuseries about big cats, mullets, and mayhem captivated America in 2020.", answer: "Tiger King", value: 1000, answered: false },
            { question: "What is the powerhouse of the cell?", answer: "Mitochondria", value: 1200, answered: false },
        ]
    },
    {
        name: "The Fifty Nifty United Quirks",
        questions: [
            { question: "This state is the only one where people wear shoes called “flip-flops” in the snow.", answer: "Colorado", value: 200, answered: false },
            { question: "In Georgia, it’s illegal to eat fried chicken with anything other than your hands", answer: "True", value: 400, answered: false },
            { question: "You can visit a UFO museum in this New Mexico town famous for an alleged alien crash.", answer: "Roswell", value: 600, answered: false },
            { question: "This state has more cows than people, earning it the nickname 'America’s Dairyland.'", answer: "Wisconsin", value: 800, answered: false },
            { question: "In this state, it's illegal to ride a horse faster than 10 MPH on public roads.", answer: "Utah", value: 1000, answered: false },
            { question: "Who discovered America?", answer: "Christopher Columbus", value: 1200, answered: false },
        ]
    },
    {
      name: "Founding Fathers and Founding Fails",
      questions: [
          { question: "Who was the first President of the United States?", answer: "George Washington", value: 200, answered: false },
          { question: "This document begins with the words, “We the People.”", answer: "Constitution", value: 400, answered: false },
          { question: "Alexander Hamilton famously died in a duel with this vice president.", answer: "Aaron Burr", value: 600, answered: false },
          { question: "This Founding Father invented bifocals but also suggested making a “Daylight Saving” system.", answer: "Benjamin Franklin", value: 800, answered: false },
          { question: "What ancient civilization built the pyramids?", answer: "Egyptians", value: 1000, answered: false },
          { question: "The first capital of the United States.", answer: "New York City", value: 1200, answered: false },
      ]
  },
  {
    name: "Y’all, That’s So American!",
    questions: [
        { question: "This sport is known as “America’s pastime”", answer: "Baseball", value: 200, answered: false },
        { question: "In which year did the Titanic sink?", answer: "1912", value: 400, answered: false },
        { question: "What war was fought between the North and South regions in the U.S.?", answer: "Civil War", value: 600, answered: false },
        { question: "Who was the first woman to fly solo across the Atlantic Ocean?", answer: "Amelia Earhart", value: 800, answered: false },
        { question: "What ancient civilization built the pyramids?", answer: "Egyptians", value: 1000, answered: false },
        { question: "Who discovered America?", answer: "Christopher Columbus", value: 1200, answered: false },
    ]
},
{
  name: "Lights, Camera, Star-Spangled Action!",
  questions: [
      { question: "He’s the actor known for playing Forrest Gump, Captain Phillips, and Mr. Rogers.", answer: "Tom Hanks", value: 200, answered: false },
      { question: "Which Prince made waves by slapping Chris Rock at the Oscars?", answer: "Will Smith", value: 400, answered: false },
      { question: "What war was fought between the North and South regions in the U.S.?", answer: "Civil War", value: 600, answered: false },
      { question: "Who was the first woman to fly solo across the Atlantic Ocean?", answer: "Amelia Earhart", value: 800, answered: false },
      { question: "What ancient civilization built the pyramids?", answer: "Egyptians", value: 1000, answered: false },
      { question: "Who discovered America?", answer: "Christopher Columbus", value: 1200, answered: false },
  ]
},
];

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([
        { name: "🔴 Red", score: 0 },
        { name: "🔵 Blue", score: 0 },
    ]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState("");

    const handleSelectQuestion = (categoryIndex: number, questionIndex: number) => {
        const question = categories[categoryIndex].questions[questionIndex];
        if (question.answered) {
            alert("This question has already been answered.");
            return;
        }
        setSelectedQuestion(question);
    };

    const handleSubmitAnswer = () => {
        if (!selectedQuestion) return;

        const isCorrect = userAnswer.toLowerCase() === selectedQuestion.answer.toLowerCase();
        const newPlayers = [...players];
        const currentPlayer = newPlayers[currentPlayerIndex];

        if (isCorrect) {
            currentPlayer.score += selectedQuestion.value;
            alert("Correct!");
        } else {
            currentPlayer.score -= selectedQuestion.value;
            alert(`Wrong! The correct answer was: ${selectedQuestion.answer}`);
        }

        selectedQuestion.answered = true;
        setPlayers(newPlayers);
        setUserAnswer("");
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setSelectedQuestion(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>United States of Trivia 🇺🇸 </h1>
            <img src='usa.png' style={{width: '500px', height: '600px'}}/>
            <h2>Scores</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}: ${player.score}</li>
                ))}
            </ul>

            <h2>Game Board</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {categories.map((category, index) => (
                            <th key={index} style={{ border: '1px solid black', padding: '10px' }}>{category.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {categories.map((category, cIndex) => {
                                const question = category.questions[rowIndex] || null;
                                return (
                                    <td key={cIndex} style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                                        {question && !question.answered ? (
                                            <button onClick={() => handleSelectQuestion(cIndex, rowIndex)}>
                                                ${question.value}
                                            </button>
                                        ) : (
                                            <span style={{ color: 'gray' }}>X</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedQuestion && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Question</h2>
                    <p>{selectedQuestion.question}</p>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button onClick={handleSubmitAnswer}>Submit Answer</button>
                </div>
            )}
        </div>
    );
};

export default App;
