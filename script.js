const AllCategories = document.getElementById("Categories");
const AllProduct = document.getElementById("displayTrees");



const lodeCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((response) => response.json())
        .then((data) => {
            const categorie = data.categories;
            displayCategories(categorie);
            // console.log(categorie);
        })
        .catch((err) => (console.log(err)));


};
lodeCategories();
const displayCategories = (categories) => {
    categories.forEach(element => {
        AllCategories.innerHTML += `
                <p id="${element.id}" class="active font-medium text-lg hover:bg-green-500 cursor-pointer px-2.5 py-2 rounded-lg">${element.category_name}</p>
                `
    });
    AllCategories.addEventListener(("click"), (event) => {
        document.querySelectorAll(".active").forEach(active => active.classList.remove("bg-green-500", "text-white"));
        if (event.target.localName === "p") {
            lodeTreesByCategories(event.target.id);
            event.target.classList.add("bg-green-500","text-white")
        };
    });
};



const lodeTreesByCategories = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((response) => response.json())
        .then((data) => {
            const plants = data.plants;
            console.log(plants);

            displayTrees(plants);
        })
        .catch((err) => (console.log(err)));
};

const displayTrees = (trees) => {
    trees.forEach(element => {
        AllProduct.innerHTML += `
                <div class="p-4 rounded-xl shadow-xl">
                    <img src="${element.image}" alt="" class="w-full bg-[#EDEDED] rounded-2xl">
                    <div class="my-3">
                        <h1 class="text-sm font-semibold">${element.name}</h1>
                        <p class="text-[#1F2937] text-xs my-2">${element.description}</p>
                        <div class="flex justify-between">
                            <h2 class="text-[#15803D] bg-[#DCFCE7] px-3 py-2 rounded-full">${element.category}</h2>
                            <p class="text-[#1F2937] text-lg font-semibold">৳ ${element.price}</p>
                        </div>
                    </div>
                    <button type="button" class="bg-[#15803D] text-white w-full py-3 rounded-full">Add to Cart</button>
                </div>
                `
    });
    // AllCategories.addEventListener(("click"), (event) => {
    //     document.querySelectorAll(".active").forEach(active => active.classList.remove("bg-green-500", "text-white"));
    //     if (event.target.localName === "p") {
    //         lodeTreesByCategories(event.target.id);
    //         event.target.classList.add("bg-green-500", "text-white")
    //     };
    // });
};