import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChangeEventHandler, useState } from 'react'

interface NavBarProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick: Function
  listTypes: string[]
}

interface NavBarState {
  selectedtype: string
  selectedtypeIndex: number
}

export default function NavBar(props: NavBarProps) {
  const [state, setState] = useState<NavBarState>({
    selectedtype: '',
    selectedtypeIndex: -1,
  })

  function handleSelectType(type: string, index: number) {
    setState({ selectedtype: type, selectedtypeIndex: index })
  }

  return (
    <div className="w-full max-w-7xl pt-8 px-12 flex flex-col justify-center items-center">
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
      <div className="flex w-full md:flex-col justify-center items-center gap-6 md:gap-0 py-8">
        <h3 className="text-xl text-center font-medium hidden md:flex">
          Filter by type
        </h3>
        <div className="w-full md:w-auto md:hidden uppercase">
          <Menu>
            <MenuButton
              className="w-full md:w-auto uppercase"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {state.selectedtype || 'Select type'}
            </MenuButton>
            <MenuList zIndex="dropdown" maxHeight={'30vh'} overflowY={'scroll'}>
              <MenuItem
                className="uppercase"
                onClick={() => {
                  props.onClick('')
                  handleSelectType('Select type', -1)
                }}
              >
                All
              </MenuItem>
              {props.listTypes.map((type, id) => (
                <MenuItem
                  key={id}
                  className="uppercase"
                  onClick={() => {
                    props.onClick(type)
                    handleSelectType(type, id)
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <ul className="w-full justify-center items-center hidden md:flex flex-wrap gap-4 pt-8">
          <li>
            <Button
              className={`uppercase focus:bg-rose-700 focus:text-white ${
                state.selectedtypeIndex === -1 ? 'bg-rose-700 text-white' : ''
              }`}
              colorScheme="red"
              variant="outline"
              onClick={() => {
                props.onClick('')
                handleSelectType('Select type', -1)
              }}
            >
              All
            </Button>
          </li>
          {props.listTypes.map((type, id) => (
            <li key={id}>
              <Button
                className={`uppercase focus:bg-rose-700 focus:text-white ${
                  state.selectedtypeIndex === id ? 'bg-rose-700 text-white' : ''
                }`}
                colorScheme="red"
                variant="outline"
                onClick={() => {
                  props.onClick(type)
                  handleSelectType(type, id)
                }}
              >
                {type}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
