let API = 'https://rickandmortyapi.com/api/character/'

// funcion que servira para obtener a todos los personajes
async function getCharacters(id) {
	const newAPI = id ? `${API}${id}` : API

	const response = await fetch(newAPI)
	const characters = await response.json()

	return characters
}

async function showCharacters() {
	// contenedor donde iran los personajes
	const $characters = document.querySelector('#characters')
	// llamamos al json con los personajes
	const jsonCharacters = await getCharacters()
	// guardamos los personajes en esta const
	const characters = jsonCharacters['results']

	let template = `<div class="container-characters">`

	characters.forEach((character) => {
		template += `
			<div class="character">
				<div class="head">
					<img src="${character.image}" alt="${character.name}" />
				</div>

				<div class="body">
					<h2>${character.name}</h2>
					<button class="btn-outline" onclick="showDetails(${character.id})">
						Ver Detalles
					</button>
				</div>
			</div>
		`
	})

	template += `</div>`

	$characters.innerHTML = template
}

async function showDetails(id) {
	const $details = document.querySelector('#details')
	const jsonCharacter = await getCharacters(id)
	const template = `
		<h2>Detalles</h2>

		<div class="content-detail">
			<div class="detail-left">
				<img src="${jsonCharacter.image}" alt="${jsonCharacter.name}" />

				<h3>${jsonCharacter.name}</h3>
			</div>

			<div class="detail-right">
				<p><strong>Episodios:</strong> ${jsonCharacter.episode.length}</p>
				<p><strong>Status:</strong> ${jsonCharacter.status}</p>
				<p><strong>Species:</strong> ${jsonCharacter.species}</p>
				<p><strong>Gender:</strong> ${jsonCharacter.gender}</p>
				<p><strong>Origin:</strong> ${jsonCharacter.origin.name}</p>
				<p><strong>Last Location:</strong> ${jsonCharacter.location.name}</p>
			</div>
		</div>
	`

	$details.innerHTML = ''
	$details.innerHTML = template
}

window.addEventListener('load', showCharacters)
