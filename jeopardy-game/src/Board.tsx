import React from 'react';

interface Item {
  value: number;
  question: string;
  answer: string;
}

interface Category {
  category: string;
  items: Item[];
}

interface BoardProps {
  questions: Category[];
  onScoreUpdate: (team: number, score: number) => void;
  onQuestionClick: (question: string, answer: string) => void;
}

const Board: React.FC<BoardProps> = ({ questions, onScoreUpdate, onQuestionClick }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {questions.map((category, categoryIndex) => (
        <div key={categoryIndex} className="col-span-1">
          <h3>{category.category}</h3>
          {category.items.map((item) => (
            <div
              key={item.value}
              className="question"
              onClick={() => {
                onScoreUpdate(0, item.value); // Update score for team 1
                onQuestionClick(item.question, item.answer);
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
