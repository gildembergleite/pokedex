import Logo from '../Commons/Logo'
import Link from 'next/link'

export default function Card() {
  return (
    <header className="flex flex-col w-full justify-center items-center py-12 bg-rose-700">
      <Logo />
      <div className="text-right w-full absolute right-2 top-2">
        <Link className="text-white hover:underline" href="" target="_blanck">
          Repository in GitHub
        </Link>
      </div>
    </header>
  )
}
