import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'

interface InputSearchProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputSearch(props: InputSearchProps) {
  return (
    <InputGroup className="w-full text-zinc-900">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.700" />
      </InputLeftElement>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder="Search pokémon name..."
        size="md"
        type="search"
        bgColor="white"
      />
    </InputGroup>
  )
}
