import React from 'react'

interface StatsProps {
  stats: Array<{ base_stat: number; stat: { name: string } }>
  type:
    | 'hp'
    | 'attack'
    | 'defense'
    | 'special-attack'
    | 'special-defense'
    | 'speed'
}

const statsColors = {
  hp: 'border-green-400',
  attack: 'border-red-400',
  defense: 'border-blue-400',
  'special-attack': 'border-purple-400',
  'special-defense': 'border-yellow-400',
  speed: 'border-orange-400',
}

export default function Stats(props: StatsProps) {
  let statIndex: number

  switch (props.type) {
    case 'hp':
      statIndex = 0
      break
    case 'attack':
      statIndex = 1
      break
    case 'defense':
      statIndex = 2
      break
    case 'special-attack':
      statIndex = 3
      break
    case 'special-defense':
      statIndex = 4
      break
    case 'speed':
      statIndex = 5
      break
    default:
      statIndex = -1
  }

  const statColor = statsColors[props.type]

  return (
    <section className="flex flex-col justify-center items-center gap-1">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-[4px] ${statColor}`}
      >
        <span className="font-semibold">
          {props.stats[statIndex].base_stat}
        </span>
      </div>
      <legend className="capitalize">{props.stats[statIndex].stat.name}</legend>
    </section>
  )
}
