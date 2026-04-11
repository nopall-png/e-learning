'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/client';

interface ProfileHeaderProps {
  themeTextClass: string;
}

export default function ProfileHeader({ themeTextClass }: ProfileHeaderProps) {
  const [username, setUsername] = useState<string>('Memuat...');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const u = session.user.user_metadata?.username;
        if (u) {
          setUsername(u);
        } else {
          setUsername('Pengguna');
        }
      } else {
        setUsername('Tamu');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full sm:max-w-md px-6 pt-12 pb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        
        {/* Avatar (Mocked using colored divs matching screenshot pattern) */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F2C296] relative shadow-md">
          {/* Simple face mockup using CSS */}
          <div className="absolute top-0 w-full h-4 bg-[#1F2C45]" />
          <div className="absolute top-5 left-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>
          <div className="absolute top-5 right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-[#DD9878]" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className={`${themeTextClass} font-extrabold text-lg tracking-wide transition-colors duration-500 max-w-[200px] truncate`}>
            Hi, {username}
          </h1>
          <div className="flex items-center gap-1 bg-white px-3 py-1 w-fit rounded-full shadow-sm">
            {/* Lightning Icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFCB05">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-[#382654] font-bold text-sm">0/12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
