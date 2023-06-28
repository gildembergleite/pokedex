import { NavBarState } from '.'
import { bgColors } from '../Commons/Colors/bgColors'
import { focusColors } from '../Commons/Colors/focusColors'
import { hoverColors } from '../Commons/Colors/hoverColors'

interface ListTypesProps {
  state: NavBarState
  onClick: Function
  handleSelectType: Function
  listTypes: string[]
}

export default function ListTypes(props: ListTypesProps) {
  return (
    <ul className="w-full justify-center items-center hidden md:flex flex-wrap gap-4 pt-12">
      <li>
        <button
          className={`rounded-md py-2 px-4 uppercase text-white 
            ${bgColors.all} 
            ${props.state.selectedtypeIndex === -1 ? `${focusColors.all}` : ''}
          `}
          onClick={() => {
            props.onClick('')
            props.handleSelectType('Select type', -1)
          }}
        >
          All
        </button>
      </li>
      {props.listTypes.map((type, id) => (
        <li key={id}>
          <button
            className={`rounded-md py-2 px-4 uppercase text-white 
              ${bgColors[type]}
              ${hoverColors[type]}
              ${
                props.state.selectedtypeIndex === id
                  ? `${focusColors[type]} underline text-white`
                  : ''
              }
            `}
            onClick={() => {
              props.onClick(type)
              props.handleSelectType(type, id)
            }}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  )
}
