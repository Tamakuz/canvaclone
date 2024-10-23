import Link from "next/link";

export default function Home() {

  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        href="/editor"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Editor
      </Link>
    </div>
  );
}
