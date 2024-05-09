import { getPokemon, getSpecies } from './api.js'

const $image = document.querySelector('#image')
function setImage(image_url) {
	$image.src = image_url
}

const $description = document.querySelector('#description')
function setDescription(text) {
	$description.textContent = text
}

function loader(isLoading = false) {
    const $screen = document.querySelector('#screen')
    const img = isLoading ? 'url(./images/loading.gif)' : '' 
    $screen.style.backgroundImage = img
}

export async function findPokemon(id) {
	const pokemon = await getPokemon(id)
	const species = await getSpecies(id)
	const description = species.flavor_text_entries.find(
		(flavor) => flavor.language.name === 'es'
	)
    return {
        sprites: pokemon.sprites.front_default,
        description: description.flavor_text,
        id: pokemon.id
    }
}

export async function setPokemon (id){
    //Encender loader
    loader(true)
    const pokemon = await findPokemon(id)
    //Apagar Loader
    loader(false)
    setImage(pokemon.sprites)
    setDescription(pokemon.description)
    return pokemon
}
