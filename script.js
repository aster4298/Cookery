
const ingredient = document.getElementById("ingrdient");
    const result = document.getElementById("result");


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");


    btn.addEventListener("click", recipefun);


    function recipefun(){
        let ingredienttext = ingredient.value.trim();

        if( ingredienttext === ''){
            result.innerHTML = `<p> Plesase Enter Your an Ingredient </p>`;
            return;
        }

        let mainingredient = ingredienttext.split(',')[0].trim();

    result.innerHTML = `<span> Searching for Recipes ... </span>`;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainingredient}`).then(response =>  response.json()).then(data => {

        showrecipes(data.meals);


    }).catch(error => {
        console.error('error fetching recipes', error);

        result.innerHTML = `<p> could not able to fetch Try Again </p>`;
    });

    }

        function showrecipes(recipies){
            result.innerHTML = '';



            if(!recipies){
                result.innerHTML = `<p> No Recipies Found with this ingrident Try Another one</p>`;
                return;
            }
            recipies.forEach(recipie => {
               const recipecard = document.createElement('div') ;

               recipecard.innerHTML = `<img src="${recipie.strMealThumb}">
               <h4> ${recipie.strMeal} </h4>
               <button class="detailrecipe" data-id="${recipie.idMeal}">
               <a href="https://themealdb.com/meal/${recipie.idMeal}" target="_blank"> View Recipe Details </a></button>

               <div class ="recipe-details" style="display:none;"</div>
               `;

               result.appendChild(recipecard);


               const showrecipesdetails = recipecard.querySelector('.detailrecipe');
                const recipedetails = recipecard.querySelector('.recipe-details');
               showrecipesdetails.addEventListener('click', () => {
                if(recipedetails.style.display === "none"){
                    fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${recipie.idMeal}`).then(response => response.json()).then(data => {

                        const meal = data.meals[0];
                        recipedetails.style.display = "block";
                        recipedetails.innerHTML = `<h4> How to Make: </h4>
                        <p>${meal.strInstructions} </p>`;

                        showrecipesdetails.textContent = "Hide Recipe";
                    });

                }
                else{

                    recipedetails.style.display = "none";
                    recipedetails.textContent = "show Recipe";

                }
               });
            });
            
            }

    });

  