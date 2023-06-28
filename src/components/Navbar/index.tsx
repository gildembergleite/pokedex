import { ChangeEventHandler, useState } from 'react'
import InputSearch from './InputSearch'
import MenuMobile from './MenuMobile'
import ListTypes from './ListTypes'

interface NavBarProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick: Function
  listTypes: string[]
}

export interface NavBarState {
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
    <section className="w-full max-w-7xl pt-8 px-12 flex flex-col justify-center items-center">
      <InputSearch value={props.value} onChange={props.onChange} />
      <div className="flex w-full md:flex-col justify-center items-center gap-6 md:gap-0">
        <MenuMobile
          state={state}
          onClick={props.onClick}
          handleSelectType={handleSelectType}
          listTypes={props.listTypes}
        />
        <ListTypes
          state={state}
          onClick={props.onClick}
          handleSelectType={handleSelectType}
          listTypes={props.listTypes}
        />
      </div>
    </section>
  )
}
