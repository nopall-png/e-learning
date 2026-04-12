'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/client';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
      } else {
        // Check if user has completed the diagnostic test
        const { data: profile } = await supabase
          .from('profiles')
          .select('diagnostic_completed')
          .eq('id', session.user.id)
          .single();

        if (!profile?.diagnostic_completed) {
          // First-time user — send to diagnostic test
          router.push('/main/diagnostic');
          return;
        }

        // Returning user — show welcome screen
        const activeUsername = session.user.user_metadata?.username || 'User';
        setUsername(activeUsername);
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#6D40AA] flex items-center justify-center text-white font-extrabold text-xl tracking-widest">
        MEMUAT...
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#6D40AA] flex flex-col justify-center items-center relative font-sans overflow-hidden p-6">

      {/* Background Ellipses */}
      <div className="absolute top-[-50px] sm:top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border-[50px] sm:border-[70px] border-[#7646B5]" />
        <div className="absolute inset-[50px] sm:inset-[70px] rounded-full border-[50px] sm:border-[70px] border-[#7F4EBE]" />
        <div className="absolute inset-[100px] sm:inset-[140px] rounded-full border-[50px] sm:border-[70px] border-[#8957C9]" />
        <div className="absolute inset-[150px] sm:inset-[210px] rounded-full border-[50px] sm:border-[70px] border-[#9462D6]" />
        <div className="absolute inset-[200px] sm:inset-[280px] rounded-full bg-[#A06CE3]" />
      </div>

      {/* Main Content Card */}
      <div className="bg-white w-full sm:max-w-md rounded-[3rem] p-10 relative z-10 flex flex-col items-center shadow-xl text-center">
        
        <div className="w-20 h-20 bg-[#FFCC00] rounded-full mb-6 flex items-center justify-center text-[#382654] font-extrabold text-3xl">
          {username?.charAt(0).toUpperCase() || 'U'}
        </div>

        <h1 className="text-3xl font-extrabold text-[#382654] mb-2">
          Halo, <span className="text-[#FFCB05]">{username}</span>!
        </h1>
        <p className="text-[#6D637A] font-bold mb-8">
          Selamat datang di dashboard E-Learning Anda.
        </p>

        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/auth/login');
          }}
          className="w-full bg-[#CFCBD4] text-[#382654] font-extrabold text-[15px] tracking-wider rounded-[2rem] py-4 hover:bg-[#b0acb5] transition-colors"
        >
          LOG OUT
        </button>

      </div>
    </div>
  );
}