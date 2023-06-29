'use client'
import { PokemonType } from '../Commons/Types/PokemonType'
import { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useToast } from '@chakra-ui/react'
import NavBar from '../Navbar'
import ListCard from '../ListCard'
import Loading from '../Loading'

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [pokeList, setPokeList] = useState<AxiosResponse<any, any>[]>()
  const [pokeTypes, setPokeTypes] = useState([''])
  const [inputSearch, setInputSearch] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [searchList, setSearchList] = useState<AxiosResponse<any, any>[]>()
  const [listByType, setListByType] = useState<AxiosResponse<any, any>[]>()
  const toast = useToast()

  useEffect(() => {
    getPokeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getPokeList() {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/'
      const endpoints = []
      for (let i = 1; i <= 386; i++) endpoints.push(`${url}${i}`)
      const response = await axios.all(endpoints.map((item) => axios.get(item)))
      setPokeList(response)

      const types = response.flatMap((pokemon: PokemonType) =>
        pokemon.data.types.map((pokemon: any) => pokemon.type.name),
      )

      const uniqueArray = types.filter((item, index) => {
        return types.indexOf(item) === index
      })

      setPokeTypes(uniqueArray)
      setLoading(false)
    } catch (err) {
      const error = err as AxiosError
      toast({
        title: `${error.code}`,
        description:
          'Could not connect to the API, please try refreshing the page or try again later.',
        status: 'error',
        duration: 7000,
      })
    }
  }

  function getByType(type: string) {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
    setInputSearch('')
    setFilterSearch(type)

    const results: AxiosResponse<any, any>[] | undefined = pokeList?.filter(
      (pokemon: PokemonType) =>
        pokemon.data.types.some((pokeType: any) => pokeType.type.name === type),
    )

    setListByType(results)
  }

  function getSearch(pokemon: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
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
      setSearchList(results)
    } else {
      results = pokeList?.filter((pokemon: PokemonType) =>
        pokemon.data.name
          .replace(/[\s-]/g, '')
          .toLowerCase()
          .includes(sanitizedInput.toLowerCase()),
      )
      setSearchList(inputValue === '' ? [] : results)
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
      {loading ? (
        <Loading />
      ) : (
        <ListCard
          pokeList={pokeList}
          inputSearch={inputSearch}
          filterSearch={filterSearch}
          searchList={searchList}
          listByType={listByType}
        />
      )}
    </>
  )
}
