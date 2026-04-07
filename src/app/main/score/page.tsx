'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { NextPage } from 'next';
import { Suspense } from 'react';

function ScoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const score = searchParams.get('score') || '0';
  const total = searchParams.get('total') || '5';
  const time = searchParams.get('time') || '0';

  const totalExp = Math.round((parseInt(score) / parseInt(total)) * 31) + '+';

  return (
    <div className="min-h-screen bg-[#141F23] flex justify-center items-center relative font-sans overflow-hidden">

      {/* Gray Overlay (covers background exam content) */}
      <div className="absolute inset-0 bg-[rgba(217,217,217,0.65)]" />

      {/* Score Modal Card */}
      <div className="w-[300px] bg-[#141F23] rounded-[32px] relative z-10 flex flex-col items-center px-6 pt-16 pb-8">

        {/* Title */}
        <h2 className="text-[#FFCD00] text-[24px] font-bold text-center">
          Perfect Lesson !
        </h2>

        {/* Subtitle */}
        <p className="text-[#D9D9D9] text-[13px] font-bold text-center mt-3 mb-8">
          You really did a great job !!!
        </p>

        {/* Stats: EXP + TIME side by side */}
        <div className="flex gap-3 mb-3 w-full justify-center">

          {/* TOTAL EXP */}
          <div className="w-[120px] h-[100px] bg-[#93D334] rounded-[18px] overflow-hidden flex flex-col">
            <div className="text-[#141F23] text-[11px] font-bold text-center py-[4px]">
              TOTAL EXP
            </div>
            <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
              <span className="text-[#93D334] text-[22px] font-bold">{totalExp}</span>
            </div>
          </div>

          {/* TOTAL TIME */}
          <div className="w-[120px] h-[100px] bg-[#7E52B1] rounded-[18px] overflow-hidden flex flex-col">
            <div className="text-[#141F23] text-[11px] font-bold text-center py-[4px]">
              TOTAL TIME
            </div>
            <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
              <span className="text-[#7E52B1] text-[22px] font-bold">{time}s</span>
            </div>
          </div>
        </div>

        {/* TOTAL SCORE centered */}
        <div className="w-[120px] h-[100px] bg-[#D9A14B] rounded-[18px] overflow-hidden flex flex-col mb-8">
          <div className="text-[#141F23] text-[11px] font-bold text-center py-[4px]">
            TOTAL SCORE
          </div>
          <div className="flex-1 bg-[#141F23] rounded-[18px] mx-[3px] mb-[3px] flex items-center justify-center">
            <span className="text-[#D9A14B] text-[22px] font-bold">{score}/{total}</span>
          </div>
        </div>

        {/* CONTINUE Button */}
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

const ScorePage: NextPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#141F23]" />}>
      <ScoreContent />
    </Suspense>
  );
};

export default ScorePage;
