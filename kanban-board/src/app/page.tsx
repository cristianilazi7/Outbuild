import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Kanban Board
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Organize and manage your tasks collaboratively.
        </p>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/kanban-logo.svg"
          alt="Kanban Board logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/auth/login" 
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            
              Get Started
            
          </Link>
          <Link href="/dashboard" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
            
              Go to Dashboard
         
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600">
            <p className="text-center text-gray-600">
               &copy; {new Date().getFullYear()} Cristian Castro Arias. All rights reserved.
            </p>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/cristianilazi7/Outbuild"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/github.svg" // Cambia a un ícono relevante si tienes uno.
                alt="GitHub icon"
                width={16}
                height={16}
              />
              View Repository
            </a>
      </footer>
    </div>
  );
}
