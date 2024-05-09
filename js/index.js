import { setPokemon } from './pokedex.js'

const $form = document.querySelector('#form')
const $prev = document.querySelector('#prev-pokemon')
const $next = document.querySelector('#next-pokemon')
const $pokedex = document.querySelector('#pokedex')

$form.addEventListener('submit', handleSubmit)
$prev.addEventListener('click', handlePrevPokemon)
$next.addEventListener('click', handleNextPokemon)

let activePokemon = null

async function handleSubmit(event) {
	event.preventDefault()
	$pokedex.classList.add('is-open')
	const form = new FormData($form)
	const id = form.get('id')
	activePokemon = await setPokemon(id)
}

async function handleNextPokemon() {
	const id =
		(activePokemon === null || activePokemon.id === 898)
			? 1
			: activePokemon.id + 1
	activePokemon = await setPokemon(id)
}

async function handlePrevPokemon() {
	const id =
		(activePokemon === null || activePokemon.id === 1)
			? 898
			: activePokemon.id - 1
	activePokemon = await setPokemon(id)
}
