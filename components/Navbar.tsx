"use client"

import instagram from "@/assets/instagram.png";
import facebook from "@/assets/facebook.png";
import twitter from "@/assets/twitter.png";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode, JwtPayload} from 'jwt-decode'

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token){
      setIsLoggedIn(!!token);
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token)
        setIsAdmin(decodedToken.role === 'Admin')
      } catch (error) {
        console.log(error)
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mx-auto max-w-5xl py-5 px-4">
      <div className="hidden sm:flex flex-row gap-4">
        <Image
          src={instagram}
          alt="instagram"
          width={20}
          height={20}
          className="rounded-md"
        />
        <Image
          src={facebook}
          alt="facebook"
          width={20}
          height={20}
          className="rounded-md"
        />
        <Image
          src={twitter}
          alt="twitter"
          width={20}
          height={20}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-row items-center mb-4 sm:mb-0">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="rounded-md mt-1"
          />
        </Link>
      </div>

      <div className="flex flex-row gap-4 font-medium text-center">
        <Link href="/new-story">
          <p>Write</p>
        </Link>
        <Link href="/about">
          <p>About</p>
        </Link>
        {isAdmin ? (
        <Link href='/admin'>
          Admin Dashboard
        </Link>
        ):null}
        {isLoggedIn ? (
          <p onClick={handleLogout} className="cursor-pointer text-rose-500">Logout</p>
        ) :(
          <Link href="/login/sign-in">
          <p>Login</p>
        </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
