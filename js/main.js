'use strict';

/* TODO :
 * 1. Dans le champ select d'id concerts, créer les différentes options
 * basées sur le tableau des concerts ci-dessus
 * Utiliser document.createElement, document.createTextNode, appendChild etc.
 * 2. A chaque fois que l'on change la valeur du select (on sélectionne une autre option)
 * on met à jour le prix unitaire (celui dans les span) du tarif normal et du tarif réduit
 * 3. A chaque fois que je change la valeur du nombre de billets au tarif normal et tarif réduit (les 2 input)
 * on met à jour le prix total de la commande
 */

const concerts = [
	{
		title: 'Jessie James Decker',
		tickets: {
			normal: 119.9,
			reduced: 80,
		},
	},
	{
		title: 'Disney',
		tickets: {
			normal: 60,
			reduced: 45,
		},
	},
	{
		title: '2pac',
		tickets: {
			normal: 200,
			reduced: 150,
		},
	},
	{
		title: 'Beyonce',
		tickets: {
			normal: 150,
			reduced: 100,
		},
	},
	{
		title: 'Tim McGraw',
		tickets: {
			normal: 90,
			reduced: 50,
		},
	},
	{
		title: 'Kanye West',
		tickets: {
			normal: 250,
			reduced: 200,
		},
	},
];

// Constante contenant les éléments
const elements = {
	concerts: document.querySelector('#concerts'),
	normalPrice: document.querySelector('label[for="normal-price"] span'),
	reducedPrice: document.querySelector('label[for="reduced-price"] span'),
	normalQuantity: document.querySelector('#normal-price'),
	reducedQuantity: document.querySelector('#reduced-price'),
	totalPrice: document.querySelector('#total'),
};

/**
 * Création d'un élément html option
 *
 * @param string text Le texte de l'option
 * @param HTMLElement select Le champ select auquel on veut rattacher l'option
 * @param int value La valeur de l'option
 */
function createOption(text, select, value) {
	// Création d'un élément html option
	let option = document.createElement('option');

	// Création d'un texte pour un élément html
	let content = document.createTextNode(text);

	// Ajout du texte à l'option
	option.appendChild(content);

	// Ajouter le numéro du concert dans l'attribut value de l'option
	option.value = value;
	// option.setAttribute('value', value);

	// Ajout de l'option dans le select
	select.appendChild(option);
}

// Fonction qui met à jour le contenu textuel des spans
function updateUnitPrice() {
	// Modification du span : on récupère la valeur du select (numéro du concert)
	// et avec ça on récupère l'objet concert et les informations sur les tarifs
	elements.normalPrice.textContent =
		concerts[elements.concerts.value].tickets.normal.toFixed(2);
	elements.reducedPrice.textContent =
		concerts[elements.concerts.value].tickets.reduced.toFixed(2);
}

// Fonction qui est appelée lorsque l'on change la valeur du select
function onSelectConcert() {
	// Mise à jour du prix unitaire
	updateUnitPrice();

	// Mise à jour du prix total
	onChangeTicket();
}

function onChangeTicket() {
	// Le nombre de tickets
	const normalQuantity = Number(elements.normalQuantity.value);
	const reducedQuantity = Number(elements.reducedQuantity.value);

	// Les prix unitaires
	const normalPrice = concerts[elements.concerts.value].tickets.normal;
	const reducedPrice = concerts[elements.concerts.value].tickets.reduced;

	// Faire le calcul du prix total et mettre à jour le html
	const total = normalQuantity * normalPrice + reducedQuantity * reducedPrice;
	elements.totalPrice.textContent = total.toFixed(2);
}

// Code principal, appelé dès le chargement de la page
elements.concerts.addEventListener('change', onSelectConcert);
elements.normalQuantity.addEventListener('change', onChangeTicket);
elements.reducedQuantity.addEventListener('change', onChangeTicket);

// Parcourir la liste des concerts et créer autant d'options qu'il n'y a de concerts
for (let i = 0; i < concerts.length; i++) {
	// Création d'une option pour le concert parcouru
	// La valeur de l'option sera le numéro du concert
	createOption(concerts[i].title, elements.concerts, i);
}

// Au chargement de la page on récupère la valeur du concert sélectionné
updateUnitPrice();
