'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase/client';

// ─── Question Data ──────────────────────────────────────────────────────────────

interface DiagnosticQuestion {
  id: number;
  subject: 'Math' | 'IPA' | 'English';
  question: string;
  options: string[];
  correctAnswer: string;
  difficultyWeight: number;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // ── Math Questions ──
  {
    id: 1,
    subject: 'Math',
    question: 'What is 12 + 15?',
    options: ['25', '27', '30', '22'],
    correctAnswer: '27',
    difficultyWeight: 1,
  },
  {
    id: 2,
    subject: 'Math',
    question: 'What is 8 × 7?',
    options: ['54', '56', '48', '63'],
    correctAnswer: '56',
    difficultyWeight: 2,
  },
  {
    id: 3,
    subject: 'Math',
    question: 'What is 144 ÷ 12?',
    options: ['10', '14', '12', '11'],
    correctAnswer: '12',
    difficultyWeight: 3,
  },
  {
    id: 4,
    subject: 'Math',
    question: 'What is the value of 3² + 4²?',
    options: ['20', '25', '14', '7'],
    correctAnswer: '25',
    difficultyWeight: 3,
  },
  // ── IPA (Science) Questions ──
  {
    id: 5,
    subject: 'IPA',
    question: 'What planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctAnswer: 'Mercury',
    difficultyWeight: 1,
  },
  {
    id: 6,
    subject: 'IPA',
    question: 'What gas do plants absorb from the air?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctAnswer: 'Carbon Dioxide',
    difficultyWeight: 2,
  },
  {
    id: 7,
    subject: 'IPA',
    question: 'How many bones does an adult human have?',
    options: ['196', '206', '256', '186'],
    correctAnswer: '206',
    difficultyWeight: 2,
  },
  {
    id: 8,
    subject: 'IPA',
    question: 'What is the boiling point of water in Celsius?',
    options: ['90°C', '100°C', '110°C', '80°C'],
    correctAnswer: '100°C',
    difficultyWeight: 1,
  },
  // ── English Questions ──
  {
    id: 9,
    subject: 'English',
    question: 'Choose the correct sentence:',
    options: [
      'She go to school every day.',
      'She goes to school every day.',
      'She going to school every day.',
      'She gone to school every day.',
    ],
    correctAnswer: 'She goes to school every day.',
    difficultyWeight: 1,
  },
  {
    id: 10,
    subject: 'English',
    question: 'What is the past tense of "run"?',
    options: ['Runned', 'Running', 'Ran', 'Runs'],
    correctAnswer: 'Ran',
    difficultyWeight: 2,
  },
  {
    id: 11,
    subject: 'English',
    question: 'Fill in the blank: "I have ___ finished my homework."',
    options: ['already', 'all ready', 'all ways', 'alot'],
    correctAnswer: 'already',
    difficultyWeight: 2,
  },
  {
    id: 12,
    subject: 'English',
    question: 'What is the synonym of "happy"?',
    options: ['Sad', 'Angry', 'Joyful', 'Tired'],
    correctAnswer: 'Joyful',
    difficultyWeight: 1,
  },
];

// ─── Subject Config (uses the project's existing color palette) ──────────────

const SUBJECT_CONFIG = {
  Math: {
    color: '#93D334',       // Green — same as exam page accent
    barBg: '#4F5745',       // same as exam progress track
    label: 'Math',
  },
  IPA: {
    color: '#7E52B1',       // Purple — same as score page "TOTAL TIME" card
    barBg: '#4A3A5E',
    label: 'Science',
  },
  English: {
    color: '#D9A14B',       // Gold — same as score page "TOTAL SCORE" card
    barBg: '#5A4A30',
    label: 'English',
  },
};

// ─── Component ──────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'calculating' | 'result';

export default function DiagnosticPage() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState({ Math: 0, IPA: 0, English: 0 });
  const [assignedLevel, setAssignedLevel] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [username, setUsername] = useState('Student');

  // Fetch username on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const u = session.user.user_metadata?.username;
        if (u) setUsername(u);
      }
    };
    fetchUser();
  }, []);

  const question = DIAGNOSTIC_QUESTIONS[currentIndex];
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const progressPercent = (currentIndex / totalQuestions) * 100;
  const subjectConfig = question ? SUBJECT_CONFIG[question.subject] : SUBJECT_CONFIG.Math;

  // ─── Save to Supabase ───────────────────────────────────────────────────────

  const saveResults = async (newScores: typeof scores, level: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from('profiles')
      .update({
        diagnostic_completed: true,
        starting_level: level,
        math_score: newScores.Math,
        ipa_score: newScores.IPA,
        english_score: newScores.English,
      })
      .eq('id', session.user.id);
  };

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleSelectAnswer = (answer: string) => {
    if (isTransitioning) return;
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!selectedAnswer || isTransitioning) return;

    const updatedAnswers = { ...userAnswers, [question.id]: selectedAnswer };
    setUserAnswers(updatedAnswers);

    if (currentIndex < totalQuestions - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      }, 250);
    } else {
      // ── Final question — calculate results ──
      setPhase('calculating');

      const newScores = { Math: 0, IPA: 0, English: 0 };
      const maxScores = { Math: 0, IPA: 0, English: 0 };

      DIAGNOSTIC_QUESTIONS.forEach((q) => {
        maxScores[q.subject] += q.difficultyWeight;
        if (updatedAnswers[q.id] === q.correctAnswer) {
          newScores[q.subject] += q.difficultyWeight;
        }
      });

      const totalEarned = newScores.Math + newScores.IPA + newScores.English;
      const totalMax = maxScores.Math + maxScores.IPA + maxScores.English;
      const percentage = (totalEarned / totalMax) * 100;

      let level = 'Foundation';
      if (percentage > 75) level = 'Intermediate';
      else if (percentage >= 40) level = 'Beginner';

      setScores(newScores);
      setAssignedLevel(level);

      await saveResults(newScores, level);

      setTimeout(() => {
        setPhase('result');
      }, 2500);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // PHASE: INTRO — Purple theme matching auth pages
  // ═══════════════════════════════════════════════════════════════════════════════

  if (phase === 'intro') {
    return (
      <div className="h-screen bg-[#6D40AA] flex flex-col justify-end relative font-sans overflow-hidden">

        {/* Background Ellipses — identical to login/register */}
        <div className="absolute top-[-50px] sm:top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none z-0">
          <div className="absolute inset-0 rounded-full border-[50px] sm:border-[70px] border-[#7646B5]" />
          <div className="absolute inset-[50px] sm:inset-[70px] rounded-full border-[50px] sm:border-[70px] border-[#7F4EBE]" />
          <div className="absolute inset-[100px] sm:inset-[140px] rounded-full border-[50px] sm:border-[70px] border-[#8957C9]" />
          <div className="absolute inset-[150px] sm:inset-[210px] rounded-full border-[50px] sm:border-[70px] border-[#9462D6]" />
          <div className="absolute inset-[200px] sm:inset-[280px] rounded-full bg-[#A06CE3]" />
        </div>

        {/* Main Content Card — same layout as auth pages */}
        <div className="w-full sm:max-w-md mx-auto relative z-10 flex flex-col">
          <div className="bg-white w-full rounded-t-[3rem] p-8 pt-12 flex flex-col items-center relative z-10 min-h-[65vh]">

            {/* Icon */}
            <div className="w-20 h-20 bg-[#FFCC00] rounded-full mb-6 flex items-center justify-center text-3xl shadow-sm">
              📝
            </div>

            {/* Title */}
            <h1 className="text-2xl font-extrabold text-[#382654] mb-2 text-center">
              Diagnostic Test
            </h1>
            <p className="text-[#6D637A] font-bold text-sm text-center mb-8 max-w-[280px] leading-relaxed">
              Hi <span className="text-[#FFCB05]">{username}</span>! Answer a few questions so we can find your starting level.
            </p>

            {/* Subject List */}
            <div className="w-full flex flex-col gap-3 mb-8">
              {(['Math', 'IPA', 'English'] as const).map((subj) => {
                const config = SUBJECT_CONFIG[subj];
                const count = DIAGNOSTIC_QUESTIONS.filter((q) => q.subject === subj).length;
                return (
                  <div
                    key={subj}
                    className="flex items-center justify-between border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                        style={{ backgroundColor: config.color }}
                      >
                        {config.label.charAt(0)}
                      </div>
                      <span className="font-bold text-[#382654]">{config.label}</span>
                    </div>
                    <span className="text-[#AAA4B3] font-bold text-sm">{count} Qs</span>
                  </div>
                );
              })}
            </div>

            {/* Start Button — yellow CTA matching auth pages */}
            <button
              onClick={() => setPhase('quiz')}
              className="w-full bg-[#FFCC00] text-white font-extrabold text-[15px] tracking-wider rounded-[2rem] py-4 hover:bg-[#F2C003] transition-colors"
            >
              START TEST
            </button>

            <p className="text-[#AAA4B3] text-xs text-center mt-5 font-bold">
              About 5 minutes • No pressure!
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PHASE: CALCULATING — Dark theme matching exam/score pages
  // ═══════════════════════════════════════════════════════════════════════════════

  if (phase === 'calculating') {
    return (
      <div className="min-h-screen bg-[#141F23] flex flex-col justify-center items-center relative font-sans overflow-hidden px-6">
        <div className="flex flex-col items-center">
          {/* Simple spinner */}
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full border-[4px] border-[#4F5745]" />
            <div className="absolute inset-0 rounded-full border-[4px] border-t-[#93D334] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">⚡</div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
            Calculating your level...
          </h2>
          <p className="text-[#9D9D9D] text-sm">Analyzing your answers</p>

          {/* Bouncing dots — using project accent colors */}
          <div className="flex gap-2 mt-8">
            <div className="w-3 h-3 rounded-full bg-[#93D334] animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 rounded-full bg-[#7E52B1] animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 rounded-full bg-[#D9A14B] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PHASE: RESULT — Dark modal card matching /main/score exactly
  // ═══════════════════════════════════════════════════════════════════════════════

  if (phase === 'result') {
    const levelEmoji: Record<string, string> = {
      Foundation: '🌱',
      Beginner: '⭐',
      Intermediate: '🚀',
    };

    const levelColor: Record<string, string> = {
      Foundation: '#93D334',
      Beginner: '#D9A14B',
      Intermediate: '#7E52B1',
    };

    // Calculate max scores per subject for progress display
    const maxScoresPerSubject: Record<string, number> = { Math: 0, IPA: 0, English: 0 };
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      maxScoresPerSubject[q.subject] += q.difficultyWeight;
    });

    return (
      <div className="min-h-screen bg-[#141F23] flex justify-center items-center relative font-sans overflow-hidden">

        {/* Gray Overlay — same as score page */}
        <div className="absolute inset-0 bg-[rgba(217,217,217,0.65)]" />

        {/* Result Modal Card — same structure as score page */}
        <div className="w-[320px] bg-[#141F23] rounded-[32px] relative z-10 flex flex-col items-center px-6 pt-12 pb-8">

          {/* Emoji */}
          <div className="text-5xl mb-4">{levelEmoji[assignedLevel] || '🌱'}</div>

          {/* Title */}
          <h2 className="text-[#FFCD00] text-[22px] font-bold text-center">
            Test Complete!
          </h2>

          {/* Level */}
          <p className="text-[16px] font-bold text-center mt-2 mb-6" style={{ color: levelColor[assignedLevel] || '#93D334' }}>
            Your Level: {assignedLevel}
          </p>

          {/* Subject Score Cards — matching score page card structure */}
          <div className="flex gap-3 mb-3 w-full justify-center flex-wrap">

            {/* MATH SCORE */}
            <div className="w-[90px] h-[90px] bg-[#93D334] rounded-[18px] overflow-hidden flex flex-col">
              <div className="text-[#141F23] text-[9px] font-bold text-center py-[4px]">
                MATH
              </div>
              <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
                <span className="text-[#93D334] text-[18px] font-bold">
                  {scores.Math}/{maxScoresPerSubject.Math}
                </span>
              </div>
            </div>

            {/* IPA SCORE */}
            <div className="w-[90px] h-[90px] bg-[#7E52B1] rounded-[18px] overflow-hidden flex flex-col">
              <div className="text-[#141F23] text-[9px] font-bold text-center py-[4px]">
                SCIENCE
              </div>
              <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
                <span className="text-[#7E52B1] text-[18px] font-bold">
                  {scores.IPA}/{maxScoresPerSubject.IPA}
                </span>
              </div>
            </div>

            {/* ENGLISH SCORE */}
            <div className="w-[90px] h-[90px] bg-[#D9A14B] rounded-[18px] overflow-hidden flex flex-col">
              <div className="text-[#141F23] text-[9px] font-bold text-center py-[4px]">
                ENGLISH
              </div>
              <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
                <span className="text-[#D9A14B] text-[18px] font-bold">
                  {scores.English}/{maxScoresPerSubject.English}
                </span>
              </div>
            </div>

          </div>

          {/* Subtitle */}
          <p className="text-[#D9D9D9] text-[12px] font-bold text-center mt-4 mb-6">
            {assignedLevel === 'Foundation'
              ? "Great start! We'll build your skills from the ground up."
              : assignedLevel === 'Beginner'
                ? "Nice work! You have a good base. Let's level up!"
                : "Amazing! You're ready for challenging content!"}
          </p>

          {/* CONTINUE Button — yellow CTA matching score page */}
          <button
            onClick={() => router.push('/main/dashboard')}
            className="w-full h-[52px] bg-[#FFCD00] hover:bg-[#FFD52E] rounded-[16px] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="text-[#180E2F] text-[16px] font-bold">CONTINUE</span>
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PHASE: QUIZ — Dark theme matching /main/exam exactly
  // ═══════════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-[#141F23] flex justify-center items-center relative font-sans overflow-hidden px-6">

      <div className={`w-full sm:max-w-md flex flex-col min-h-[90vh] py-6 relative transition-all duration-250 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>

        {/* Progress Bar — same style as exam page */}
        <div className="w-full h-[12px] bg-[#4F5745] rounded-full mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: subjectConfig.color,
            }}
          />
        </div>

        {/* Subject Pill + Counter */}
        <div className="flex items-center justify-between mb-16">
          <div
            className="px-4 py-2 rounded-full font-bold text-xs tracking-wider text-white"
            style={{ backgroundColor: subjectConfig.color }}
          >
            {subjectConfig.label.toUpperCase()}
          </div>
          <span className="text-[#9D9D9D] font-bold text-sm">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Question — clean like exam page */}
        <div className="flex items-center justify-center flex-grow mb-16">
          <h2 className="text-[22px] font-normal text-white text-center leading-relaxed" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
            {question.question}
          </h2>
        </div>

        {/* Options — same pill style as exam page */}
        <div className="flex flex-col gap-[12px] flex-grow justify-end pb-8">
          {question.options.map((option, idx) => {
            const labels = ['A', 'B', 'C', 'D'];
            const isSelected = selectedAnswer === option;

            return (
              <button
                key={`${question.id}-${idx}`}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full min-h-[58px] px-[22px] rounded-[25px] flex items-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#93D334] text-[#141F23] font-bold'
                    : 'bg-[#4F5745] text-white hover:bg-[#5C6150]'
                }`}
              >
                <span className="text-[18px]" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
                  {labels[idx]}. {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom — CHECK button + skip, same as exam page */}
        <div className="h-32 flex flex-col items-center justify-end gap-5">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`w-[313px] h-[58px] font-bold text-[16px] rounded-[25px] transition-colors ${
              selectedAnswer
                ? 'bg-[#93D334] hover:bg-[#A0E03E] text-[#141F23]'
                : 'bg-[#4F5745] text-[#9D9D9D] cursor-not-allowed'
            }`}
          >
            {currentIndex === totalQuestions - 1 ? 'FINISH' : 'CHECK'}
          </button>

          <button
            onClick={() => router.push('/main/dashboard')}
            className="text-[#9D9D9D] font-light text-[14px] hover:text-[#C0C0C0] transition-colors pb-2"
          >
            skip
          </button>
        </div>

      </div>
    </div>
  );
}
