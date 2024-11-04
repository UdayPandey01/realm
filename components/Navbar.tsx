import instagram from "@/assets/instagram.png"
import facebook from "@/assets/facebook.png"
import twitter from "@/assets/twitter.png"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between mx-auto max-w-5xl py-5">
        <div className="flex flex-row gap-4">
            <Image src={instagram} alt="instagram" width={20} height={20} className="rounded-md"/>
            <Image src={facebook} alt="facebook" width={20} height={20} className="rounded-md"/>
            <Image src={twitter} alt="twitter" width={20} height={20} className="rounded-md"/>
        </div>
        <div className="flex flex-row text-2xl font-serif font-bold ml-3">
            Realm
        </div>
        <div className="flex flex-row gap-4 font-medium">
            <p>Homepage</p>
            <p>Contact</p>
            <p>About</p>
            <p>Login</p>
        </div>
    </div>
  )
}

export default Navbar