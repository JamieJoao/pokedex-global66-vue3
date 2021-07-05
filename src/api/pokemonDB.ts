import axios from "axios"

export const pokemonDB = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})