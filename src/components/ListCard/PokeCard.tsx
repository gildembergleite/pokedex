'use client'
import { Button, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { bgColors } from '../Commons/Colors/bgColors'
import Stats from './../Stats'

interface PokeCardProps {
  name: string
  img: string
  url: string
  types: Array<{}>
  stats: Array<{ base_stat: number; stat: { name: string } }>
}

export default function PokeCard(props: PokeCardProps) {
  const [isCatch, setIsCatch] = useState(false)

  return (
    <article className="flex flex-col h-96 sm:h-48 sm:flex-row justify-between items-center bg-white shadow-md shadow-zinc-400">
      <div className="flex flex-1 h-full flex-col justify-center items-center p-4 gap-4">
        <h2 className="capitalize text-xl font-semibold">{props.name}</h2>
        <div
          className={`flex  justify-center items-center pr-2 gap-3 ${
            isCatch ? '' : 'hidden'
          }`}
        >
          <Stats stats={props.stats} type="hp" />
          <Stats stats={props.stats} type="attack" />
          <Stats stats={props.stats} type="defense" />
        </div>
        {isCatch ? (
          <div className="flex uppercase text-sm text-white gap-2">
            {props.types.map((item: any, index) => (
              <p
                key={index}
                className={`
              ${bgColors[item.type.name]}
              py-1 px-2 bg-zinc-500 rounded-md
              `}
              >
                {item.type.name}
              </p>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-col flex-1 h-full justify-center items-center gap-2 ${
              isCatch ? 'hidden' : ''
            }`}
          >
            <p className="text-lg font-medium">Catch?</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500"
              onClick={() => setIsCatch(true)}
            >
              I choose you!
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-start items-center w-full flex-1 sm:w-[50%] h-full bg-blue-500 overflow-hidden">
        <Image
          className={`p-12 sm:p-10 lg:p-2 xl:p-0 xl:scale-125 ${
            isCatch ? '' : 'brightness-0'
          }`}
          src={props.img}
          alt=""
        />
      </div>
    </article>
  )
}
