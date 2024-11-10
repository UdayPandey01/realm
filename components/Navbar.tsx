import instagram from "@/assets/instagram.png";
import facebook from "@/assets/facebook.png";
import twitter from "@/assets/twitter.png";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";

const Navbar = () => {
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

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 font-medium text-center">
        <Link href="/new-story">
          <p>Write</p>
        </Link>
        <Link href="/contact">
          <p>Contact</p>
        </Link>
        <Link href="/about">
          <p>About</p>
        </Link>
        <Link href="/login/sign-up">
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
