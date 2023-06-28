'use client'
import { AxiosResponse } from 'axios'
import PokeCard from './PokeCard'
import { PokemonType } from '../Commons/Types/PokemonType'

interface ListCardProps {
  pokeList: AxiosResponse<any, any>[] | undefined
  inputSearch: string
  filterSearch: string
  searchList: AxiosResponse<any, any>[] | undefined
  listByType: AxiosResponse<any, any>[] | undefined
}

export default function ListCard(props: ListCardProps) {
  return (
    <section className="w-full max-w-[1800px] px-12 md:py-12 grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-6">
      {props.inputSearch === '' && props.filterSearch === ''
        ? props.pokeList?.map((pokemon: PokemonType, index: number) => (
            <PokeCard
              key={index}
              name={pokemon.data.name}
              img={
                pokemon.data.sprites.other?.['official-artwork'].front_default
              }
              types={pokemon.data.types}
              stats={pokemon.data.stats}
              url=""
            />
          ))
        : props.inputSearch === '' && props.filterSearch !== ''
        ? props.listByType?.map((pokemon: PokemonType, index: number) => (
            <PokeCard
              key={index}
              name={pokemon.data.name}
              img={
                pokemon.data.sprites.other?.['official-artwork'].front_default
              }
              types={pokemon.data.types}
              stats={pokemon.data.stats}
              url=""
            />
          ))
        : props.searchList?.map((pokemon: PokemonType, index: number) => (
            <PokeCard
              key={index}
              name={pokemon.data.name}
              img={
                pokemon.data.sprites.other?.['official-artwork'].front_default
              }
              types={pokemon.data.types}
              stats={pokemon.data.stats}
              url=""
            />
          ))}
    </section>
  )
}
