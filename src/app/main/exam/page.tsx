'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import Link from 'next/link';

interface Question {
  text: string;
  options: { label: string; value: number }[];
  correct: number;
}

const generateRandomQuestion = (): Question => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const answer = num1 + num2;
  
  const wrong1 = answer + Math.floor(Math.random() * 5) + 1;
  const wrong2 = Math.max(1, answer - Math.floor(Math.random() * 5) - 1);
  
  const options = [
    { label: 'A', value: answer },
    { label: 'B', value: wrong1 },
    { label: 'C', value: wrong2 },
  ].sort(() => Math.random() - 0.5);

  options.forEach((opt, index) => {
    opt.label = ['A', 'B', 'C'][index];
  });

  return { text: `${num1} + ${num2} = ...`, options, correct: answer };
};

const ExamPage: NextPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const generated = Array.from({ length: 5 }, generateRandomQuestion);
    setQuestions(generated);
    startTimeRef.current = Date.now();
  }, []);

  if (questions.length === 0) return null;

  const question = questions[currentIndex];
  const progressPercent = (currentIndex / questions.length) * 100;

  const handleCheck = () => {
    if (selectedAnswer === question.correct) {
      const newScore = score + 1;
      setScore(newScore);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz finished — navigate to score page
        const timeInSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        localStorage.setItem('node_1_completed', 'true');
        router.push(`/main/score?score=${newScore}&total=${questions.length}&time=${timeInSeconds}`);
      }
    } else {
      if (selectedAnswer !== null) alert('Oops, try again!');
    }
  };

  return (
    <div className="min-h-screen bg-[#141F23] flex justify-center items-center relative font-sans overflow-hidden px-6">
      
      <div className="w-full sm:max-w-md flex flex-col min-h-[90vh] py-6 relative">
        
        {/* Progress Bar */}
        <div className="w-full h-[12px] bg-[#4F5745] rounded-full mb-20 overflow-hidden">
          <div className="h-full bg-[#91D433] rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Question */}
        <div className="flex items-center justify-center flex-grow mb-16">
          <h2 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
            {question.text}
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-[15px] flex-grow justify-end pb-8">
          {question.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelectedAnswer(opt.value)}
              className={`w-full h-[58px] px-[22px] rounded-[25px] flex items-center transition-all ${
                selectedAnswer === opt.value
                  ? 'bg-[#93D334] text-[#141F23] font-bold'
                  : 'bg-[#4F5745] text-white hover:bg-[#5C6150]'
              }`}
            >
              <span className="text-[24px]" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
                {opt.label}. {opt.value}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom */}
        <div className="h-32 flex flex-col items-center justify-end gap-5">
          <button 
            className="w-[313px] h-[58px] bg-[#93D334] hover:bg-[#A0E03E] text-[#141F23] font-bold text-[16px] rounded-[25px] transition-colors"
            onClick={handleCheck}
          >
            CHECK
          </button>
          <Link href="/main/dashboard" className="text-[#9D9D9D] font-light text-[14px] hover:text-[#C0C0C0] transition-colors pb-2">
            skip
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ExamPage;
