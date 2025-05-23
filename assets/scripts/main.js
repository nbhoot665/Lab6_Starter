// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	const store = localStorage.getItem('recipes');
    return store ? JSON.parse(store) : [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	if (!recipes.length) 
	return;
  	
	const main = document.querySelector('main');
	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	recipes.forEach(obj => {
		const card = document.createElement('recipe-card');
		card.data = obj;              // assumes your partner’s setter
		main.appendChild(card);
	  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	const serialized = JSON.stringify(recipes);
	localStorage.setItem('recipes', serialized);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	const form = document.getElementById('new-recipe');
	form.addEventListener('submit', e => {            // B3
		e.preventDefault();                             
	
	
		const fd = new FormData(form);                  // B4
	
		
		const recipeObject = {};                        // B5
		fd.forEach((val, key) => { recipeObject[key] = val });  // B5
	
		
		const card = document.createElement('recipe-card');     // B6
	
		
		card.data = recipeObject;                       // B7
	
		
		document.querySelector('main').appendChild(card);        // B8
	
		
		const recipe = getRecipesFromStorage();                  // B9
		recipe.push(recipeObject);
		saveRecipesToStorage(recipe);                            // Save updated list
	  });

	// B10. TODO - Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('button.danger');
	
	// B11. TODO - Add a click event listener to clear local storage button
	clearButton.addEventListener('click', function () {
		// Steps B12 & B13 will occur inside the event listener from step B11
		// B12. TODO - Clear the local storage
		// B13. TODO - Delete the contents of <main>
		localStorage.clear();
		document.querySelector('main').innerHTML = '';
	});
}
