'use client';

import type { NextPage } from 'next';
import BottomNavigation from '../../../components/BottomNavigation';
import ProfileHeader from '../../../components/ProfileHeader';

const ProfilePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-[#ECF8EC] font-sans pb-24 relative overflow-hidden flex flex-col items-center">
      
      {/* Top Profile Section */}
      <div className="w-full relative z-10 pt-4">
        {/* We reuse the ProfileHeader but customize the text color for the profile page specifically. 
            Since ProfileHeader is generic, we pass in the themeTextClass */}
        <ProfileHeader themeTextClass="text-[#5BA885]" />
      </div>

      {/* Main Content Card container */}
      <div className="w-full sm:max-w-md mx-auto relative flex-grow mt-2 flex flex-col px-3">
        {/* White Background Card */}
        <div className="bg-white w-full rounded-t-[40px] flex-grow relative pb-20 shadow-lg border-[1.5px] border-[#D9D9D9] pt-1">
          
          {/* Inner Content Container - bordered card inside */}
          <div className="mx-3 mt-3 border-[1.5px] border-[#D9D9D9] rounded-[40px] min-h-[70vh] relative overflow-hidden flex flex-col pt-10 pb-8 px-5">
            
            {/* Avatar Circle */}
            <div className="w-[171px] h-[171px] bg-[#D9D9D9] rounded-full mx-auto relative overflow-hidden flex-shrink-0 z-10 shadow-sm border border-gray-100">
              {/* Fallback avatar matching the screenshot vibe */}
              <div className="w-full h-full bg-[#f2c296] relative">
                 <div className="absolute top-0 w-full h-12 bg-[#1F2C45]" />
                 
                 {/* Eyes */}
                 <div className="absolute top-14 left-6 w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center shadow-inner">
                    <div className="w-4 h-4 rounded-full bg-gray-800" />
                 </div>
                 <div className="absolute top-14 right-6 w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center shadow-inner">
                    <div className="w-4 h-4 rounded-full bg-gray-800" />
                 </div>
                 
                 {/* Nose and mouth */}
                 <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-4 h-2 rounded-full bg-[#DD9878]" />
                 <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-[#D48967]" />
                 
                 {/* Box/Card being held */}
                 <div className="absolute bottom-0 w-[120%] h-[50px] bg-[#CD8C5D] -translate-x-[10%] rotate-2" />
              </div>
            </div>

            {/* Fulan Text */}
            <h2 className="text-black text-[20px] font-bold font-inter mt-8 mb-2">
              Fulan
            </h2>

            {/* Experience / Level Bar */}
            <div className="w-full h-[30px] bg-[#D9D9D9] rounded-full overflow-hidden relative mb-[35px]">
              <div className="w-[125px] h-full bg-black rounded-full" />
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-center mb-7">
              <button className="bg-black text-white px-8 py-2 rounded-full text-[16px] font-bold font-inter hover:bg-gray-800 transition-colors h-[36px] flex items-center justify-center min-w-[130px]">
                Edit Profile
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-[rgba(217,217,217,0.92)] mb-8" />

            {/* Achievements Section */}
            <div className="flex flex-col gap-6 pl-2">
              
              {/* Achievement Item 1 */}
              <div className="flex items-center gap-5">
                {/* Achievement Icon Placeholder */}
                <div className="w-[108px] h-[83px] bg-[#D9D9D9] rounded-2xl flex-shrink-0" />
                {/* Achievement Details */}
                <div className="flex flex-col gap-3 flex-grow pl-1">
                  <h3 className="text-black text-[14px] font-bold font-inter translate-y-2">achievement  1</h3>
                  {/* Progress Bar */}
                  <div className="w-[160px] h-[21.82px] bg-[#D9D9D9] rounded-full overflow-hidden relative">
                     <div className="w-[74.18px] h-full bg-[#FFCD00] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Achievement Item 2 */}
              <div className="flex items-center gap-5">
                {/* Achievement Icon Placeholder */}
                <div className="w-[108px] h-[83px] bg-[#D9D9D9] rounded-2xl flex-shrink-0" />
                {/* Achievement Details */}
                <div className="flex flex-col gap-3 flex-grow pl-1">
                  <h3 className="text-black text-[14px] font-bold font-inter translate-y-2">achievement  1</h3>
                  {/* Progress Bar */}
                  <div className="w-[160px] h-[21.82px] bg-[#D9D9D9] rounded-full overflow-hidden relative">
                     <div className="w-[74.18px] h-full bg-[#FFCD00] rounded-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
