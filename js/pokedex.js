import { getPokemon, getSpecies } from './api.js'
import { createChart } from './charts.js'

const $image = document.querySelector('#image')
export function setImage(image_url) {
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

const $light = document.querySelector('#light')
function speech(text) {
	const utterance = new SpeechSynthesisUtterance(text)
	// utterance.lang = 'es'
	utterance.lang = 'es-US'

	speechSynthesis.speak(utterance)
	$light.classList.add('is-animated')

	utterance.addEventListener('end', () => {
		$light.classList.remove('is-animated')
	})
}

export async function findPokemon(id) {
	const pokemon = await getPokemon(id)
	const species = await getSpecies(id)
	const description = species.flavor_text_entries.find(
		(flavor) => flavor.language.name === 'es'
	)
	const sprites = [pokemon.sprites.front_default]

	const stats = pokemon.stats.map((item) => item.base_stat)

	for (const item in pokemon.sprites) {
		//Not null
		if (
			item !== 'front_default' &&
			item !== 'other' &&
			item !== 'versions' &&
			pokemon.sprites[item]
		) {
			sprites.push(pokemon.sprites[item]) // push all sprites to array
		}
	}

	// console.log(sprites)

	return {
		sprites,
		description: description.flavor_text,
		id: pokemon.id,
		name: pokemon.name,
		stats,
	}
}

let activeChart = null

export async function setPokemon(id) {
	//Encender loader
	loader(true)
	const pokemon = await findPokemon(id)
	//Apagar Loader
	loader(false)
	setImage(pokemon.sprites[0])
	setDescription(pokemon.description)
	speech(`${pokemon.name}. ${pokemon.description}`)
	if (activeChart instanceof Chart) {
		activeChart.destroy()
	}
	activeChart = createChart(pokemon.stats)
	return pokemon
}
