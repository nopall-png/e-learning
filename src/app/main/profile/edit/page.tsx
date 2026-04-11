'use client';

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase/client';

const EditProfilePage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const u = session.user.user_metadata?.username;
        if (u) {
          setUsername(u);
        }
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleSave = async () => {
    setErrorMsg('');
    if (!username.trim()) {
      setErrorMsg('Username cannot be empty');
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { username: username.trim() }
    });

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
    } else {
      // Success, go back to profile
      router.push('/main/profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#6D40AA] flex items-center justify-center font-sans">
        <p className="text-white font-extrabold tracking-widest">MEMUAT...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#6D40AA] font-sans relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Ellipses */}
      <div className="absolute top-[-50px] sm:top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border-[50px] sm:border-[70px] border-[#7646B5]" />
        <div className="absolute inset-[50px] sm:inset-[70px] rounded-full border-[50px] sm:border-[70px] border-[#7F4EBE]" />
        <div className="absolute inset-[100px] sm:inset-[140px] rounded-full border-[50px] sm:border-[70px] border-[#8957C9]" />
        <div className="absolute inset-[150px] sm:inset-[210px] rounded-full border-[50px] sm:border-[70px] border-[#9462D6]" />
        <div className="absolute inset-[200px] sm:inset-[280px] rounded-full bg-[#A06CE3]" />
      </div>

      <div className="w-full sm:max-w-md relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="text-white hover:opacity-75 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-white font-extrabold text-2xl ml-4 tracking-wide">Edit Profile</h1>
        </div>

        {/* Card Content */}
        <div className="bg-white w-full rounded-[3rem] p-8 pt-10 shadow-xl flex flex-col gap-5 min-h-[45vh]">
          
          <div className="flex flex-col gap-2">
            <label className="text-[#382654] font-bold text-sm ml-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4 outline-none focus:border-[#FFCB05] transition-colors font-bold text-[#6D637A] placeholder:text-[#AAA4B3]"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 font-bold text-sm px-4">{errorMsg}</p>
          )}

          <div className="flex-grow" />

          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#FFCC00] text-white font-extrabold text-[15px] tracking-wider rounded-[2rem] py-4 hover:bg-[#F2C003] transition-colors disabled:opacity-50 mt-4"
          >
            {saving ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
