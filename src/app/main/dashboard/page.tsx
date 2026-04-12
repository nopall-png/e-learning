'use client';

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import BottomNavigation from '../../../components/BottomNavigation';
import ProfileHeader from '../../../components/ProfileHeader';

const Dashboard: NextPage = () => {
  const [activeFloor, setActiveFloor] = useState<1 | 2 | 3>(1);
  const [isNode1Completed, setIsNode1Completed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsNode1Completed(localStorage.getItem('node_1_completed') === 'true');
    }
  }, []);

  // Configuration for Floor themes
  const floorConfig = {
    1: {
      bg: 'bg-[#E5F7E7]',
      cardBg: 'bg-[#C5EAC9]',
      text: 'text-[#329D66]',
      node: 'bg-[#64A37A]',
      nodeHover: 'hover:bg-[#528C67]',
      currentNode: 'bg-[#E5F8E9]',
    },
    2: {
      bg: 'bg-[#FFF8E7]',
      cardBg: 'bg-[#F8E79A]',
      text: 'text-[#D39F49]',
      node: 'bg-[#D39F49]',
      nodeHover: 'hover:bg-[#B8893D]',
      currentNode: 'bg-[#FDF8E4]',
    },
    3: {
      bg: 'bg-[#E4F9FF]',
      cardBg: 'bg-[#BCEFFF]',
      text: 'text-[#27315F]',
      node: 'bg-[#575B7C]',
      nodeHover: 'hover:bg-[#434763]',
      currentNode: 'bg-[#E1FAFF]',
    }
  };

  const theme = floorConfig[activeFloor];

  return (
    <div className={`min-h-screen ${theme.bg} font-sans pb-24 relative overflow-hidden flex flex-col items-center transition-colors duration-500`}>
      
      {/* Reusable Top Profile Section */}
      <ProfileHeader themeTextClass={theme.text} />

      {/* Main Path Container */}
      <div className="w-full sm:max-w-md mx-auto flex flex-col relative flex-grow mt-4">
        
        {/* Tabs */}
        <div className="flex px-4 sm:px-6 space-x-2 relative z-10 translate-y-[1px]">
          <button 
            onClick={() => setActiveFloor(1)}
            className={`${activeFloor === 1 ? `${theme.cardBg} ${theme.text}` : 'bg-white text-[#C3CBC6]'} px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm tracking-wider transition-colors duration-300 shadow-sm`}
          >
            FLOOR 1
          </button>
          <button 
            onClick={() => setActiveFloor(2)}
            className={`${activeFloor === 2 ? `${theme.cardBg} ${theme.text}` : 'bg-white text-[#C3CBC6]'} px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm tracking-wider transition-colors duration-300 shadow-sm`}
          >
            FLOOR 2
          </button>
          <button 
            onClick={() => setActiveFloor(3)}
            className={`${activeFloor === 3 ? `${theme.cardBg} ${theme.text}` : 'bg-white text-[#C3CBC6]'} px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm tracking-wider transition-colors duration-300 shadow-sm`}
          >
            FLOOR 3
          </button>
        </div>

        {/* Floor Map Area */}
        <div className={`${theme.cardBg} w-full rounded-t-[3rem] p-8 min-h-[70vh] flex flex-col items-center relative z-0 transition-colors duration-500`}>
          
          {/* Level Map Curve Path Nodes */}
          <div className="relative w-[300px] h-[600px] mt-10 pointer-events-auto">
            
            {/* Node 1 (Clickable to enter learning module) */}
            <Link 
              href="/main/module/1"
              className={`absolute top-[0%] left-[50%] -translate-x-1/2 w-[60px] h-[60px] rounded-full transition-all duration-300 cursor-pointer shadow-md hover:scale-110 flex items-center justify-center font-extrabold text-xl z-10 ${
                isNode1Completed 
                  ? `${theme.currentNode} text-[#1A2024] shadow-[0_0_15px_rgba(255,255,255,0.7)]` 
                  : `${theme.node} ${theme.nodeHover} text-white`
              }`}
            >
              {isNode1Completed ? '✓' : '1'}
            </Link>
            
            {/* Node 2 */}
            <div className={`absolute top-[13%] left-[30%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.node} ${theme.nodeHover} transition-colors duration-500 cursor-pointer shadow-sm`} />
            
            {/* Node 3 */}
            <div className={`absolute top-[28%] left-[25%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.node} ${theme.nodeHover} transition-colors duration-500 cursor-pointer shadow-sm`} />
            
            {/* Node 4 (Current/Active) */}
            <div className={`absolute top-[41%] left-[45%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.currentNode} shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-colors duration-500 cursor-pointer flex items-center justify-center`}>
                {/* Optional pulse effect for current level */}
                <div className="w-10 h-10 rounded-full bg-white absolute animate-ping opacity-20"></div>
            </div>
            
            {/* Node 5 */}
            <div className={`absolute top-[54%] left-[65%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.node} ${theme.nodeHover} transition-colors duration-500 cursor-pointer shadow-sm`} />
            
            {/* Node 6 */}
            <div className={`absolute top-[69%] left-[75%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.node} ${theme.nodeHover} transition-colors duration-500 cursor-pointer shadow-sm`} />
            
            {/* Node 7 */}
            <div className={`absolute top-[84%] left-[65%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.node} ${theme.nodeHover} transition-colors duration-500 cursor-pointer shadow-sm`} />
            
            {/* Node 8 (Lowest) */}
            <div className={`absolute top-[97%] left-[40%] -translate-x-1/2 w-[60px] h-[60px] rounded-full ${theme.currentNode} opacity-70 transition-colors duration-500 cursor-pointer shadow-sm`} />
            
          </div>
          
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
