import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Space_Grotesk } from "next/font/google";

const font = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 hover:opacity-75 transition h-[68px] px-4">
        <img src="https://img.logoipsum.com/248.svg" alt="The Canvas" />
        <h1 className={cn(font.className, "text-xl font-bold")}>Canva Clone</h1>
      </div>
    </Link>
  );
}

export default Logo