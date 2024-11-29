'use client'; // Client-side rendering is required for localStorage

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AllAuthors from '@/components/AllAuthors';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {
  const [user, setUser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        router.push('/login/sign-up');
        return;
      }
  
      try {
        const response = await axios.get(`/api/authors/get-signInUser-detail`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        if(response.data.role !== 'Admin'){
          router.push('/')
        }
      }catch(e) {
        console.log(e)
      } 
    };
  
    fetchUser();
  }, [router]);

  
  
  return (
    // {user === 'Admin' ? ()}
    <div>
      <Navbar />
      <div className="flex justify-center items-center text-3xl font-bold">
        Admin Dashboard
      </div>
      <AllAuthors />
    </div>
  );
};

export default Page;
