'use client';

import type { NextPage } from 'next';
import BottomNavigation from '../../../components/BottomNavigation';
import ProfileHeader from '../../../components/ProfileHeader';

const achievements = [
  {
    title: 'achievement  1',
    description: 'Lorem ipsum dolor sit amet Placeholder text here Sample',
    progress: 102,
    total: 220,
  },
  {
    title: 'achievement  1',
    description: 'Lorem ipsum dolor sit amet Placeholder text here Sample',
    progress: 151,
    total: 220,
  },
  {
    title: 'achievement  1',
    description: 'Lorem ipsum dolor sit amet Placeholder text here Sample',
    progress: 129,
    total: 220,
  },
  {
    title: 'achievement  1',
    description: 'Lorem ipsum dolor sit amet Placeholder text here Sample',
    progress: 181,
    total: 220,
  },
  {
    title: 'achievement  1',
    description: 'Lorem ipsum dolor sit amet Placeholder text here Sample',
    progress: 187,
    total: 220,
  },
];

const AchievementPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-[#ECF8EC] font-sans pb-24 relative overflow-hidden flex flex-col items-center">

      {/* Top Profile Section */}
      <ProfileHeader themeTextClass="text-[#5BA885]" />

      {/* Main Content Card */}
      <div className="w-full sm:max-w-md mx-auto relative flex-grow mt-2">
        <div className="bg-white w-full rounded-t-[40px] min-h-[80vh] relative overflow-hidden">

          {/* Inner bordered container */}
          <div className="mx-[13px] mt-[57px] border-[1.5px] border-[#D9D9D9] rounded-[40px] relative overflow-hidden">

            {achievements.map((item, index) => (
              <div key={index}>
                {/* Achievement Item */}
                <div className="flex items-start gap-4 px-7 py-5">

                  {/* Icon Placeholder */}
                  <div className="w-[92px] h-[89px] bg-[#D9D9D9] rounded-[15px] flex-shrink-0" />

                  {/* Text & Progress */}
                  <div className="flex flex-col gap-1 flex-grow pt-1">
                    <h3 className="text-black text-[16px] font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#B8B6B6] text-[11px] font-bold leading-snug mt-1">
                      {item.description}
                    </p>
                    {/* Progress Bar */}
                    <div className="w-[220px] h-[30px] bg-[#D9D9D9] rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-[#FFCD00] rounded-full transition-all duration-500"
                        style={{ width: `${(item.progress / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider (not after last item) */}
                {index < achievements.length - 1 && (
                  <div className="w-full h-[2px] bg-[#D9D9D9]" />
                )}
              </div>
            ))}

          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AchievementPage;
