import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react'
import { NavBarState } from '.'

interface MenuMobileProps {
  state: NavBarState
  onClick: Function
  handleSelectType: Function
  listTypes: string[]
}

export default function MenuMobile(props: MenuMobileProps) {
  return (
    <div className="w-full md:w-auto md:hidden uppercase py-6">
      <Menu>
        <MenuButton
          colorScheme="red"
          className="w-full md:w-auto uppercase"
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {props.state.selectedtype || 'Select type'}
        </MenuButton>
        <MenuList zIndex="dropdown" maxHeight={'30vh'} overflowY={'scroll'}>
          <MenuItem
            className="uppercase"
            onClick={() => {
              props.onClick('')
              props.handleSelectType('Select type', -1)
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
                props.handleSelectType(type, id)
              }}
            >
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}
