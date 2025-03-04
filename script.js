const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal-list');

// Fetch meals by search term
async function fetchMeals(searchTerm) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  const data = await response.json();
  return data.meals;
}

// Display meals in the meal list
function displayMeals(meals) {
  mealList.innerHTML = '';
  if (meals) {
    meals.forEach((meal) => {
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      mealItem.addEventListener('click', () => {
        // Redirect to meal details page with meal ID
        window.location.href = `meal-details.html?id=${meal.idMeal}`;
      });
      mealList.appendChild(mealItem);
    });
  } else {
    mealList.innerHTML = '<p>No meals found. Try another search!</p>';
  }
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const meals = await fetchMeals(searchTerm);
    displayMeals(meals);
  }
});