'use client'
import axios, { AxiosResponse } from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import PokeCard from './PokeCard'
import NavBar from '../Navbar'

type PokemonType = {
  data: {
    name: string
    img: string
    url: string
    types: Array<{}>
    stats: Array<{}>
    sprites: { other: { dream_world: { front_default: string } } }
  }
}

export default function ListCard() {
  const [pokeList, setPokeList] = useState<AxiosResponse<any, any>[]>()
  const [pokeTypes, setPokeTypes] = useState([''])
  const [inputSearch, setInputSearch] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [searchResults, setSearchResults] =
    useState<AxiosResponse<any, any>[]>()
  const [listByType, setListByType] = useState<AxiosResponse<any, any>[]>()

  useEffect(() => {
    getPokeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getPokeList() {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/'
      const endpoints = []
      for (let i = 1; i <= 151; i++) endpoints.push(`${url}${i}`)
      const response = await axios.all(
        endpoints.map(async (item) => await axios.get(item)),
      )
      setPokeList(response)

      const types = response.flatMap((pokemon: PokemonType) =>
        pokemon.data.types.map((pokemon: any) => pokemon.type.name),
      )

      const uniqueArray = types.filter((item, index) => {
        return types.indexOf(item) === index
      })

      setPokeTypes(uniqueArray)
    } catch (err) {
      console.log(err)
    }
  }

  function getByType(type: string) {
    setInputSearch('')
    setFilterSearch(type)

    const results: any = pokeList?.filter((pokemon: PokemonType) =>
      pokemon.data.types.some((pokeType: any) => pokeType.type.name === type),
    )

    console.log(results)

    setListByType(results)
  }

  function getSearch(pokemon: ChangeEvent<HTMLInputElement>) {
    const inputValue = pokemon.target.value
    const sanitizedInput = inputValue.replace(/[\s-]/g, '')
    setInputSearch(inputValue)

    let results: AxiosResponse<any, any>[] | undefined

    if (filterSearch !== '') {
      setInputSearch(pokemon.target.value)
      results = listByType?.filter((pokemon: PokemonType) =>
        pokemon.data.name
          .replace(/[\s-]/g, '')
          .toLowerCase()
          .includes(sanitizedInput.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      results = pokeList?.filter((pokemon: PokemonType) =>
        pokemon.data.name
          .replace(/[\s-]/g, '')
          .toLowerCase()
          .includes(sanitizedInput.toLowerCase()),
      )
      setSearchResults(inputValue === '' ? [] : results)
    }
  }

  return (
    <>
      <NavBar
        value={inputSearch}
        listTypes={pokeTypes}
        onChange={(pokemon) => getSearch(pokemon)}
        onClick={getByType}
      />
      <div className="w-full max-w-7xl px-12 md:py-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {inputSearch === '' && filterSearch === ''
          ? pokeList?.map((pokemon: PokemonType, index: number) => (
              <PokeCard
                key={index}
                name={pokemon.data.name}
                img={pokemon.data.sprites.other.dream_world.front_default}
                types={pokemon.data.types}
                stats={pokemon.data.stats}
                url=""
              />
            ))
          : inputSearch === '' && filterSearch !== ''
          ? listByType?.map((pokemon: PokemonType, index: number) => (
              <PokeCard
                key={index}
                name={pokemon.data.name}
                img={pokemon.data.sprites.other.dream_world.front_default}
                types={pokemon.data.types}
                stats={pokemon.data.stats}
                url=""
              />
            ))
          : searchResults?.map((pokemon: PokemonType, index: number) => (
              <PokeCard
                key={index}
                name={pokemon.data.name}
                img={pokemon.data.sprites.other.dream_world.front_default}
                types={pokemon.data.types}
                stats={pokemon.data.stats}
                url=""
              />
            ))}
      </div>
    </>
  )
}
