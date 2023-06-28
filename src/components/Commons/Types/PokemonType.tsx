export type PokemonType = {
  data: {
    name: string
    img: string
    url: string
    types: Array<{}>
    stats: Array<{ base_stat: number; stat: { name: string } }>
    sprites: { other: { ['official-artwork']: { front_default: string } } }
  }
}
