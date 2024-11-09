import instagram from "@/assets/instagram.png";
import facebook from "@/assets/facebook.png";
import twitter from "@/assets/twitter.png";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between mx-auto max-w-5xl py-5">
      <div className="flex flex-row gap-4">
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
      <div className="flex flex-row items-cente ml-3">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={120}
            className="rounded-md mt-1"
          />
        </Link>
      </div>
      <div className="flex flex-row gap-4 font-medium">
        <Link href="/new-story">
          <p>Write</p>
        </Link>
        <p>Contact</p>
        <p>About</p>
        <Link href="/login/sign-up">
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
