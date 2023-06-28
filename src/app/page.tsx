import Header from '@/components/Header'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-[calc(100vh+1px)] justify-start items-center bg-zinc-200">
      <Header />
      <LandingPage />
    </main>
  )
}
