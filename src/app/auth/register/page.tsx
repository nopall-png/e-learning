'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase/client';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!username || !email || !password) {
      setErrorMsg('Username, Email, and Password are required');
      return;
    }

    setLoading(true);
    
    // Supabase SignUp
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        }
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Success. Redirect to Login.
      router.push('/auth/login');
    }
  };

  return (
    <div className="h-screen bg-[#6D40AA] flex flex-col justify-end relative font-sans overflow-hidden">

      {/* Background Ellipses */}
      <div className="absolute top-[-50px] sm:top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border-[50px] sm:border-[70px] border-[#7646B5]" />
        <div className="absolute inset-[50px] sm:inset-[70px] rounded-full border-[50px] sm:border-[70px] border-[#7F4EBE]" />
        <div className="absolute inset-[100px] sm:inset-[140px] rounded-full border-[50px] sm:border-[70px] border-[#8957C9]" />
        <div className="absolute inset-[150px] sm:inset-[210px] rounded-full border-[50px] sm:border-[70px] border-[#9462D6]" />
        <div className="absolute inset-[200px] sm:inset-[280px] rounded-full bg-[#A06CE3]" />
      </div>

      {/* Main Content Card */}
      <div className="w-full sm:max-w-md mx-auto relative z-10 flex flex-col">
        <div className="w-full">

          {/* Tabs */}
          <div className="flex px-10 relative z-20 translate-y-[2px]">
            {/* INACTIVE: SING IN tab */}
            <Link
              href="/auth/login"
              className="bg-[#CFCBD4] text-[#938D9A] font-extrabold text-[13px] tracking-widest px-8 py-4 rounded-t-3xl shadow-sm block hover:bg-[#c2bdc6] transition-colors"
            >
              SIGN IN
            </Link>

            {/* ACTIVE: SING UP tab */}
            <div className="bg-white text-[#382654] font-extrabold text-[13px] tracking-widest px-8 py-4 rounded-t-3xl ml-1 z-10">
              SIGN UP
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white w-full rounded-t-[3rem] p-8 pt-12 flex flex-col gap-4 relative z-10 min-h-[70vh]">

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4 outline-none focus:border-[#FFCB05] transition-colors font-bold text-[#6D637A] placeholder:text-[#AAA4B3]"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4 outline-none focus:border-[#FFCB05] transition-colors font-bold text-[#6D637A] placeholder:text-[#AAA4B3]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4 outline-none focus:border-[#FFCB05] transition-colors font-bold text-[#6D637A] placeholder:text-[#AAA4B3]"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-2 border-[#F3F3F3] rounded-[2rem] px-6 py-4 outline-none focus:border-[#FFCB05] transition-colors font-bold text-[#6D637A] placeholder:text-[#AAA4B3]"
            />
            
            {errorMsg && (
              <p className="text-red-500 font-bold text-sm px-4">{errorMsg}</p>
            )}

            <button 
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#FFCC00] text-white font-extrabold text-[15px] tracking-wider rounded-[2rem] py-4 mt-4 hover:bg-[#F2C003] transition-colors disabled:opacity-50"
            >
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
