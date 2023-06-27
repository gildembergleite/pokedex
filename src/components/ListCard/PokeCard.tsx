'use client'
import { Image, Switch, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface PokeCardProps {
  name: string
  img: string
  url: string
  types: Array<{}>
  stats: Array<{ base_stat?: number }>
}

export default function PokeCard(props: PokeCardProps) {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="flex flex-col sm:h-48 sm:flex-row justify-between items-center bg-white shadow-lg shadow-zinc-400">
      <div className="flex flex-1 h-full flex-col justify-around p-4 gap-3">
        <h2 className="capitalize text-2xl font-semibold">
          {isChecked ? props.name : 'I choose you!'}
        </h2>
        <div className={`flex pr-2 gap-3 ${isChecked ? '' : 'hidden'}`}>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-[2px] border-red-400">
              <p>{props.stats[1].base_stat}</p>
            </div>
            <p>Attack</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-[2px] border-blue-400">
              <p>{props.stats[2].base_stat}</p>
            </div>
            <p>Defense</p>
          </div>
        </div>
        {isChecked ? (
          <div className="flex uppercase text-white gap-1">
            {props.types.map((item: any, index) => (
              <p className="px-2 bg-zinc-500 rounded-md" key={index}>
                {item.type.name}
              </p>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-1 justify-start items-center gap-2 ${
              isChecked ? 'hidden' : ''
            }`}
          >
            <Text className="text-lg">Catch?</Text>
            <Switch
              size="md"
              isChecked={isChecked}
              onChange={() => setIsChecked(true)}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center items-start sm:items-center w-full flex-1 sm:w-[50%] h-full bg-blue-500 overflow-hidden">
        <Image
          className={`p-2 ${isChecked ? '' : 'brightness-0'}`}
          src={props.img}
          alt=""
        />
      </div>
    </div>
  )
}
