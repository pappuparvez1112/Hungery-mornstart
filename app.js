// search all meal function
const getTheMealList = () => {
    let searchInput = document.getElementById('search-input').value;
    if (searchInput == "") {
        document.getElementById('meal-item').innerHTML = `
        <h2>Sorry Yaar! Put Something.</h2>
        `;
    }
    else {
        // console.log(searchInput);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                let allMeal = "";
                if (data.meals) {
                    data.meals.forEach(meal => {
                        allMeal += `                    
                    <div onclick="mealIngredientsAll('${meal.strMeal}')" class="col-md-3 cursor-view">
                        <div class="meal-container text-center my-3 p-4 bg-dark text-white data-id="${meal.IdMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded">
                            <p class="mt-3">${meal.strMeal}</p>
                        </div>
                    </div>                    
                `;
                    });
                } else {
                    allMeal = `
                <div class="row text-center">
                    <div class="col-md-12 text-warning">
                        <h2>Sorry! we could not find any meal.Please Search Again.</h2>
                    </div>
                </div> 
            `;
                }
                const mealList = document.getElementById('meal-item');
                mealList.innerHTML = allMeal;
            });
        hidingOnClick();
    }
}

//display meal details function
const mealIngredientsAll = (mealName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealAll(meal);
            // console.log(data.meals[0])
        })
    // console.log(url);
}
const addMealAll = meal => {
    const mealDetails = `
        <div id="mealDetailsId" class="col-md-6 offset-md-3">
            <div class="meal-details my-3 p-4 bg-dark text-white data-id="${meal.IdMeal}"">
                <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded">
                <h2 class="mt-3">${meal.strMeal}</h2>
                <div class="ingredients">
                    <p>Ingredients: </p>
                    <ul id="ingredients-list">
                        <li class="measure">${meal.strIngredient1} ${meal.strMeasure1}</li>
                        <li class="measure">${meal.strIngredient2} ${meal.strMeasure2}</li>
                        <li class="measure">${meal.strIngredient3} ${meal.strMeasure3}</li>
                        <li class="measure">${meal.strIngredient4} ${meal.strMeasure4}</li>
                        <li class="measure">${meal.strIngredient5} ${meal.strMeasure5}</li>
                        <li class="measure">${meal.strIngredient6} ${meal.strMeasure6}</li>
                        <li class="measure">${meal.strIngredient7} ${meal.strMeasure7}</li>
                        <li class="measure">${meal.strIngredient8} ${meal.strMeasure8}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('meal-ingredients').innerHTML = mealDetails;
}

// mealDetails hide on search click function
const hidingOnClick = () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
        const mealDetails = document.getElementById('mealDetailsId');
        mealDetails.style = 'display:none';
    })
}