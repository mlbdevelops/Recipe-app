const mealDetails = document.getElementById('meal-details');

// Fetch meal details by ID
async function fetchMealDetails(mealId) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  return data.meals[0];
}

// Display meal details
function displayMealDetails(meal) {
  mealDetails.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
  `;
}

// Load meal details on page load
window.addEventListener('load', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get('id');
  if (mealId) {
    const meal = await fetchMealDetails(mealId);
    displayMealDetails(meal);
  }
});