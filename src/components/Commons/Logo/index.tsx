import Image from 'next/image'
import logo from '../../../../public/logo-pokeapi.png'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className="flex flex-col">
      <Link href="">
        <Image src={logo} alt="PokéAPI" width={300} />
      </Link>
      <p className="text-sm text-right text-zinc-300 pr-2">v 1.0.0</p>
    </div>
  )
}
