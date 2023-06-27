import Header from '@/components/Header'
import ListCard from '@/components/ListCard'

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen justify-start items-center bg-zinc-200">
      <Header />
      <ListCard />
    </main>
  )
}
