// src/App.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

interface Question {
    question: string;
    answer: string;
    value: number;
}

interface Category {
    name: string;
    questions: Question[];
}

const categoriesData: Category[] = [
    {
        name: "Stars, Stripes, and Shenanigans",
        questions: [
            { question: "What is the chemical symbol for water?", answer: "H2O", value: 200 },
            { question: "What planet is known as the Red Planet?", answer: "Mars", value: 400 },
            { question: "What gas do plants absorb?", answer: "CO2", value: 600 },
            { question: "What is the powerhouse of the cell?", answer: "Mitochondria", value: 800 },
            { question: "What planet is closest to the sun?", answer: "Mercury", value: 1000 },
        ]
    },
    {
        name: "History",
        questions: [
            { question: "Who was the first president of the United States?", answer: "George Washington", value: 200 },
            { question: "In what year did the Titanic sink?", answer: "1912", value: 400 },
            { question: "Who discovered America?", answer: "Christopher Columbus", value: 600 },
            { question: "What was the first civilization?", answer: "Sumer", value: 800 },
            { question: "Who was known as the Sun King?", answer: "Louis XIV", value: 1000 },
        ]
    },
    // Add more categories and questions as needed
];

const AppContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f2f2f2;
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;

const QuestionContainer = styled.div`
    margin-top: 20px;
`;

const App: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        setCurrentQuestionIndex(null);
        setScore(0);
    };

    const handleQuestionClick = (index: number) => {
        setCurrentQuestionIndex(index);
        setUserAnswer('');
        setIsAnswered(false);
    };

    const handleSubmitAnswer = () => {
        if (selectedCategory && currentQuestionIndex !== null) {
            const question = selectedCategory.questions[currentQuestionIndex];
            if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
                setScore(score + question.value);
            }
            setIsAnswered(true);
        }
    };

    const renderQuestion = () => {
        if (selectedCategory && currentQuestionIndex !== null) {
            const question = selectedCategory.questions[currentQuestionIndex];
            return (
                <QuestionContainer>
                    <h2>{question.question}</h2>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button onClick={handleSubmitAnswer}>Submit Answer</button>
                    {isAnswered && (
                        <p>
                            {userAnswer.toLowerCase() === question.answer.toLowerCase()
                                ? 'Correct!'
                                : `Wrong! The correct answer was: ${question.answer}`}
                        </p>
                    )}
                </QuestionContainer>
            );
        }
        return null;
    };

    return (
        <AppContainer>
            <h1>Jeopardy Game</h1>
            {selectedCategory ? (
                <>
                    <h2>Score: {score}</h2>
                    <h3>{selectedCategory.name}</h3>
                    {renderQuestion()}
                </>
            ) : (
                <>
                    <h2>Select a Category</h2>
                    <Table>
                        <thead>
                            <tr>
                                {categoriesData.map((category) => (
                                    <TableHeader key={category.name}>{category.name}</TableHeader>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
                                    {categoriesData.map((category) => {
                                        const question = category.questions[index];
                                        return (
                                            <TableCell
                                                key={question ? question.value : index}
                                                onClick={() => question && handleQuestionClick(index)}
                                            >
                                                {question ? question.value : ''}
                                            </TableCell>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </AppContainer>
    );
};

export default App;
