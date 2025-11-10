// fetching the api Category
// category API
const categoryApi = "https://www.themealdb.com/api/json/v1/1/categories.php";

// search  and filter 
// const mealByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const filterByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

// meal by id
const mealById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


// for index.html fetching 
// fetching the meal category api

async function indexHtml() {
    try {
        const response = await fetch(categoryApi);
        const data = await response.json();

        // display section of category
        const categorySection = document.getElementById('categorySection');

        console.log(data.categories);
        const categoryData = data.categories;

        if (categorySection) {
            // displaying on html document categories
            categorySection.innerHTML = categoryData.map((e) => {
                return `
        <div class="relative inline-block">
            <a href="./filter.html?id=${e.strCategory}"><img src="${e.strCategoryThumb}" alt="${e.strCategory}" class ="rounded p-2 bg-white cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-95"></a> 
            <p class="absolute top-2 right-2 p-2 bg-orange-400 rounded-lg text-sm">${e.strCategory}</p>
        </div>
        `
            }).join("");
        }


        // to display menu 
        const menuList = document.getElementById('menuList');
        if (menuList) {

            menuList.insertAdjacentHTML("beforeend",
                categoryData.map((e) => {
                    return `
            <li class="ml-2 border-b-2 w-[90%] text-start p-2 border-gray-200 cursor-pointer hover:text-orange-400" ><a href="./filter.html?id=${e.strCategory}">${e.strCategory}</a></li>
            `
                }).join('')
            );
        }

        let categoryDescription = document.getElementById('categoryDescription');
        if (categoryDescription) {
            for (let i = 0; i < categoryData.length; i++) {
                if (category == categoryData[i].strCategory) {
                    categoryDescription.innerHTML = `
                    <div>
                        <p class="text-orange-400 text-2xl my-2 font-semibold">${category}</p>
                        <p class="mb-2 text-base">${categoryData[i].strCategoryDescription}</p>
                    </div>
        `}
            }
        }
    }

    catch (error) {
        console.log("failed, fetching api", error);
    }
}

// show menu bar 
function sidebar() {
    const nav = document.getElementById('navBar');
    nav.classList.add('flex');
    nav.classList.remove('hidden');
}

document.getElementById('menuBar').addEventListener('click', sidebar);

// hide menu bar 
function hidebar() {
    const nav = document.getElementById('navBar');
    nav.classList.add('hidden');
    nav.classList.remove('flex');
}
document.getElementById('cross').addEventListener('click', hidebar);




// for filter.html fetching
// get id from link 
const url = new URLSearchParams(window.location.search);

let category = url.get('id');
let individualApi = filterByCategory + category;
console.log(individualApi);

const filterTitle = document.getElementById('filterTitle');
if (filterTitle) {
    filterTitle.innerText = `${category} & its Meals`;
}

async function filterHtml() {
    try {
        const response = await fetch(individualApi);
        const data = await response.json();

        const mealsOfCategory = document.getElementById('mealsOfCategory');

        if (mealsOfCategory) {
            mealsOfCategory.innerHTML = data.meals.map((e) => {
                return `
        <div class="bg-white rounded-lg w-50 h-65">
            <a href="./meal.html?mealid=${e.idMeal}"><img src="${e.strMealThumb}" alt="${e.strMeal}" class="w-50 h-50 rounded-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-95"></a>
            <p class="p-2 text-center content-center w-full h-15">${e.strMeal}</p>
        </div>
        `
            }).join('')
        }
    }

    catch (error) {
        console.log("failed, fetching api", error);
    }
}


//  for meal.html
// to get meal id from url of meal 
let mealId = url.get('mealid');
let individualMealApi = mealById + mealId;

async function mealHtml() {
    try {
        const response = await fetch(individualMealApi);
        const data = await response.json();

        // meal title
        const mealTitle = document.getElementById('mealTitle');
        if (mealTitle) {
            mealTitle.innerText = `${data.meals[0].strMeal}`;
        }

        // home icon and name of the meal
        const MealNameOnMealPage = document.getElementById('MealNameOnMealPage');
        if (MealNameOnMealPage) {
            MealNameOnMealPage.innerText = `>>${data.meals[0].strMeal}`;
        }

        // displaying individual meal details 
        const individualMeal = document.getElementById('individualMeal');

        if (individualMeal) {
            individualMeal.innerHTML = `
        <div class="flex justify-evenly">
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" class="w-150 h-150">
            <div class="flex justify-evenly flex-col w-150 h-150">
                <p class="text-3xl text-orange-400 font-semibold mb-5">${data.meals[0].strMeal}</p>
                <hr class="text-orange-400 border-2 mb-5">
                <p class="text-lg tracking-widest"><span class="font-semibold">CATEGORY: </span>${data.meals[0].strCategory.toUpperCase()}</p>
                <p class="text-lg"><span class="font-semibold">Source: </span>${data.meals[0].strSource}</p>
                <p class="text-lg tracking-widest"><span class="font-semibold">Tags: </span>${data.meals[0].strTags}</p>
                <div class="w-100 h-auto ml-10 bg-orange-400 p-2"><span class="font-semibold pl-2 text-white    ">Ingredients</span> <ol id="ingredients" start="1" class="grid grid-cols-2 text-white gap-4 mt-2"></ol></div>
            </div>
        </div>
        <div ><p class="font-semibold my-5">Measure:</p><ol id="measure" class="w-full border-2 border-gray-100 grid grid-cols-2 p-5 justify-evenly bg-gray-100"></ol></div>
        <div><p class="font-semibold mt-5">Instructions:</p><ol id="instructions" class="p-2"></ol></div>`
        }

        // ingredients
        const ingredients = document.getElementById('ingredients');
        if (ingredients) {
            let meal = data.meals[0];
            for (let i = 0; i <= 20; i++) {
                let ingre = meal[`strIngredient` + i];

                if (ingre && ingre != '' && ingre != " ") {
                    ingredients.innerHTML += `<li><span class="border-2 rounded-3xl w-7 h-7 inline-block text-center bg-blue-400">${i}</span> ${ingre}</li>`
                }
            }
        }

        // for measure 
        const measure = document.getElementById('measure');
        if (measure) {
            let meal = data.meals[0];
            for (let i = 0; i <= 20; i++) {
                let meas = meal[`strMeasure` + i];

                if (meas && meas != '' && meas != " ") {
                    measure.innerHTML += `<li class="py-1"><img src="../Assests/key-solid-full.svg" alt="" class="w-5 inline-block">${meas}</li>`
                }
            }
        }

        // for instructions
        const instructions = document.getElementById('instructions');
        if (instructions) {
            let instru = data.meals[0].strInstructions;
            let sets = instru.split('\r\n');

            for (let i = 0; i < sets.length; i++) {
                if (sets[i] != " " && sets[i] != '') {
                    instructions.innerHTML += `<li class="p-2"><img src="../Assests/square-check-regular-full.svg" alt="" class="w-5 inline-block">${sets[i]}</li>`
                }
            }
        }


    }
    catch (error) {
        console.log("failed, fetching api", error);
    }
}



// calling functions 

indexHtml();
filterHtml();
mealHtml();


// search function 
function searchCategory() {
    let search = document.getElementById('searchInput').value.trim();
    if (!search) { return; }

    // redirect to index page with query parameter
    window.location.href = `./index.html?search=${(search)}`;
}

// Detect if search query exists
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');

if (searchQuery) {
    document.getElementById('mealsBySearchSection').classList.remove('hidden');
    searchMeal(searchQuery);
}

// async function to fetch the searhed category meals
async function searchMeal(searchQuery) {
    let apiSearch = mealByName + searchQuery;
    try {
        const response = await fetch(apiSearch);
        const data = await response.json();
        
        console.log(data);
        const mealsOfCategory = document.getElementById('mealsOfCategory');
        
        if (mealsOfCategory) {
            mealsOfCategory.innerHTML = data.meals.map((e) => {
                return `
                <div class="bg-white rounded-lg w-50 h-65">
                <a href="./meal.html?mealid=${e.idMeal}"><img src="${e.strMealThumb}" alt="${e.strMeal}" class="w-50 h-50 rounded-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-95"></a>
                <p class="p-2 text-center content-center w-full h-15">${e.strMeal}</p>
                </div>`
            }).join('')
        }
    }
    catch (err) {
        console.log("failed,api fetching", err);
    }
}

// event handling on search 
const searching = document.getElementById('searchImg');
const searchingInpt = document.getElementById('searchInput');
if (searching) {
    searching.addEventListener('click', searchCategory);
}

if(searchingInpt){
    searchingInpt.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            searchCategory();
        }
    });
}