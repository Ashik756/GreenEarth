const categories = document.getElementById("categories");
const displayTrees = document.getElementById("displayTrees");
const cart = document.getElementById("cart");
const cartTotalPrice = document.getElementById("cartTotalPrice");

// ক্যাটেগরি লোড করার ফাংশন 
const lodeCategory = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/categories");
        const data = await response.json();
        showCategory(data.categories);
        // console.log(data.categories);
    } catch (err) {
        console.error(err);
    };
};
lodeCategory();

// ক্যাটেগরিগুলো ডিসপ্লে করার ফাংশন
const showCategory = (categorie) => {
    categorie.forEach(cat => {
        // console.log(cat);
        categories.innerHTML += `
        <li id="${cat.id}" class="font-medium text-lg hover:bg-green-500 hover:text-gray-300 cursor-pointer px-2.5 py-2 my-2 rounded-lg">${cat.category_name}</li>
        `
    });
    categories.addEventListener("click", (event) => {
        // console.log(event);
        const AllLi = document.querySelectorAll("#categories li");
        AllLi.forEach(li => { li.classList.remove("bg-green-500", "text-white") });

        if (event.target.localName === "li") {
            event.target.classList.add("bg-green-500", "text-white")
            if (event.target.id === "allTrees") {
                lodeAllTrees();
            } else {
                lodeTreesBycategorie(event.target.id);
                // console.log(event.target.id);
            }
        };
    });
};

// সব গাছ লোড করার ফাংশন
const lodeAllTrees = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await response.json();
        // console.log(data.plants);
        showTrees(data.plants);

    } catch (err) {
        console.log(err);
    }
};
lodeAllTrees();
// গাছ লোড করার ফাংশন by category
const lodeTreesBycategorie = async (CategoryId) => {
    displayTrees.innerHTML = `
        <span class="col-span-full loading loading-dots loading-lg mx-auto"></span>
    // `;
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/category/${CategoryId}`);
        const data = await response.json();
        showTrees(data.plants);
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
};

// গাছ ডিসপ্লে করার ফাংশন
const showTrees = (trees) => {
    displayTrees.innerHTML = ``;
    // console.log(trees);
    trees.forEach(tree => {
        displayTrees.innerHTML += `
            <div class="p-4 rounded-xl shadow-xl object-contain">
                    <img src="${tree.image}" alt="" class="w-full aspect-3/2 object-cover bg-[#EDEDED] rounded-2xl">
                    <div class="my-3">
                        <h1 class="text-lg font-semibold">${tree.name}</h1>
                        <p class="text-[#1F2937] text-xs my-2 text-justify">${tree.description}</p>
                        <div class="flex justify-between">
                            <button class="bg-[#DCFCE7] text-[#15803D] px-3 py-2 rounded-full font-semibold cursor-pointer" onclick="document.getElementById('modal_${tree.id}').showModal()">
                                ${tree.category}
                            </button>
                            <p class="text-[#1F2937] text-lg font-semibold">৳ ${tree.price}</p>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        class="bg-[#15803D] text-white w-full py-3 rounded-full cursor-pointer add-to-cart-btn"
                        data-plant-info='${JSON.stringify(tree)}'
                    >
                        Add to Cart 
                    </button>
                </div>
                
                <dialog id="modal_${tree.id}" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div class="space-y-4">
                            <h4 class="text-lg font-bold">${tree.name}</h4>
                            <img src="${tree.image}" alt="${tree.name}" class="aspect-video object-cover rounded-lg bg-gray-200" />
                            <p><span class="font-bold">Category : </span> ${tree.category}</p>
                            <p><span class="font-bold">Price : </span> ${tree.price}</p>
                            <p><span class="font-bold">Description : </span> ${tree.description}</p>
                        </div>
                    </div>
                </dialog>
        `
    });

};


// কার্টে আইটেম যোগ করা
const addToCart = (plant) => {
    const li = document.createElement("div");
    li.className = "flex justify-between p-3 my-2 bg-[#F0FDF4] rounded-xl";
    li.dataset.price = plant.price;
    li.innerHTML = `
        <div>
            <h3 class="text-sm font-semibold text-[#1F2937]">${plant.name}</h3>
            <p>৳ <span>${plant.price}</span> x 1</p>
        </div>
        <button type="button" class="remove-from-cart-btn cursor-pointer">❌</button>
    `;
    cart.appendChild(li);
    const currentPrice = parseFloat(cartTotalPrice.textContent);
    cartTotalPrice.textContent = (currentPrice + plant.price).toFixed(2);
};

// কার্ট থেকে আইটেম সরানোর ফাংশন
const removeCartItem = (button)=>{
    const removeItem = button.parentElement;
    const itemPrice = parseFloat(removeItem.dataset.price);
    const currentPrice = parseFloat(cartTotalPrice.textContent);
    cartTotalPrice.textContent = (currentPrice - itemPrice).toFixed(2);
    removeItem.remove();
};

displayTrees.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("add-to-cart-btn")) {
        const plantInfo = JSON.parse(target.dataset.plantInfo);
        addToCart(plantInfo);
    }
});
cart.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("remove-from-cart-btn")) {
        removeCartItem(target);
    }
});