'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, BookOpen, Calculator, Atom, Globe } from 'lucide-react';
import { motion } from 'motion/react';

// ─── Module Content Data ────────────────────────────────────────────────────────
// Each module maps to a node ID from the Dashboard path.
// Colors use the project palette: green #93D334, purple #7E52B1, gold #D9A14B

interface ModuleData {
  title: string;
  subject: string;
  description: string;
  content: string[];
  icon: 'calculator' | 'atom' | 'globe';
  themeColor: string;
  themeBg: string;
}

const MODULE_CONTENT: Record<string, ModuleData> = {
  '1': {
    title: 'Addition & Subtraction',
    subject: 'Math',
    description: 'Hey Hero! Let\'s learn how to add and subtract numbers before the quiz!',
    content: [
      'Addition means putting numbers together to get a bigger number. For example: 5 + 3 = 8.',
      'Think of it like this — if you have 5 apples and your friend gives you 3 more, now you have 8 apples!',
      'Subtraction is the opposite — it means taking away. If you had 8 apples and gave 3 to your friend, you would have 5 left. So 8 - 3 = 5.',
    ],
    icon: 'calculator',
    themeColor: '#93D334',
    themeBg: '#4F5745',
  },
  '2': {
    title: 'The Solar System',
    subject: 'Science',
    description: 'Ready for an adventure? Discover the amazing planets that orbit our Sun!',
    content: [
      'Our Solar System has 8 planets that orbit around the Sun. The Sun is a giant ball of hot gas that gives us light and warmth.',
      'The order from the Sun is: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. A fun way to remember: "My Very Educated Mother Just Served Us Nachos!"',
      'Earth is the third planet from the Sun and the only one known to have life. It takes 365 days for Earth to go around the Sun — that\'s one year!',
    ],
    icon: 'atom',
    themeColor: '#7E52B1',
    themeBg: '#3D2A5C',
  },
  '3': {
    title: 'Basic Grammar',
    subject: 'English',
    description: 'Become a word hero! Learn how to build great sentences.',
    content: [
      'Every sentence needs two things: a subject (who or what) and a verb (what they do). For example: "The cat sleeps."',
      '"The cat" is the subject and "sleeps" is the verb. Easy, right? You can make longer sentences by adding more details: "The fluffy cat sleeps on the sofa."',
      'Remember: always start a sentence with a capital letter and end with a period (.), a question mark (?), or an exclamation mark (!). Great job learning this!',
    ],
    icon: 'globe',
    themeColor: '#D9A14B',
    themeBg: '#4A3A25',
  },
};

// Fallback module for unknown IDs
const FALLBACK_MODULE: ModuleData = {
  title: 'Learning Module',
  subject: 'General',
  description: 'Get ready to learn something new before the quiz!',
  content: [
    'This module will help you prepare for the upcoming quiz.',
    'Read through the material carefully and take your time.',
    'When you feel ready, hit the Start Quiz button below!',
  ],
  icon: 'calculator',
  themeColor: '#93D334',
  themeBg: '#4F5745',
};

// ─── Icon Map ───────────────────────────────────────────────────────────────────

const ICON_MAP = {
  calculator: Calculator,
  atom: Atom,
  globe: Globe,
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  const module = MODULE_CONTENT[moduleId] || FALLBACK_MODULE;
  const IconComponent = ICON_MAP[module.icon];

  return (
    <div className="min-h-screen bg-[#141F23] flex justify-center relative font-sans overflow-hidden px-6">

      <div className="w-full sm:max-w-md flex flex-col min-h-screen py-6 relative">

        {/* ── Back Button ── */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push('/main/dashboard')}
          className="flex items-center gap-1 text-[#9D9D9D] hover:text-white transition-colors mb-6 self-start"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-[14px] font-bold">Back</span>
        </motion.button>

        {/* ── Subject Pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className="px-4 py-2 rounded-full font-bold text-xs tracking-wider text-white inline-block"
            style={{ backgroundColor: module.themeColor }}
          >
            {module.subject.toUpperCase()}
          </span>
        </motion.div>

        {/* ── Icon + Title Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Icon Circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: module.themeBg }}
          >
            <IconComponent className="w-12 h-12" style={{ color: module.themeColor }} />
          </div>

          {/* Title */}
          <h1
            className="text-[26px] font-bold text-white text-center mb-3 leading-tight"
            style={{ fontFamily: "'Hammersmith One', sans-serif" }}
          >
            {module.title}
          </h1>

          {/* Description */}
          <p className="text-[#9D9D9D] text-sm font-bold text-center max-w-[300px] leading-relaxed">
            {module.description}
          </p>
        </motion.div>

        {/* ── Content Cards ── */}
        <div className="flex flex-col gap-3 flex-grow mb-8">
          {module.content.map((paragraph, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.12 }}
              className="rounded-[20px] p-5"
              style={{ backgroundColor: module.themeBg }}
            >
              <div className="flex items-start gap-3">
                {/* Step Number */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs text-white"
                  style={{ backgroundColor: module.themeColor }}
                >
                  {idx + 1}
                </div>

                {/* Text */}
                <p className="text-white text-[15px] leading-relaxed font-medium">
                  {paragraph}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex flex-col items-center gap-5 pb-4"
        >
          {/* Start Quiz Button — matches exam page CHECK button style */}
          <button
            onClick={() => router.push(`/main/exam?id=${moduleId}`)}
            className="w-full h-[58px] bg-[#93D334] hover:bg-[#A0E03E] active:bg-[#7FBF2A] text-[#141F23] font-bold text-[16px] rounded-[25px] transition-all duration-200 active:translate-y-[2px] shadow-[0_4px_0_0_#6B9A24] active:shadow-[0_0px_0_0_#6B9A24]"
          >
            START QUIZ
          </button>

          {/* Skip link — matches exam page */}
          <button
            onClick={() => router.push('/main/dashboard')}
            className="text-[#9D9D9D] font-light text-[14px] hover:text-[#C0C0C0] transition-colors"
          >
            back to dashboard
          </button>
        </motion.div>

      </div>
    </div>
  );
}
