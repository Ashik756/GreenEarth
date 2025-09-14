// সমস্ত প্রয়োজনীয় DOM উপাদান সংগ্রহ করুন
// const categories = document.getElementById("categories");
// const displayTrees = document.getElementById("displayTrees");
// const cart = document.getElementById("cart");
// const cartTotalPrice = document.getElementById("cartTotalPrice"); // মোট মূল্যের জন্য নতুন আইডি যুক্ত করা হয়েছে

// ক্যাটেগরি লোড করার ফাংশন 
const lodeCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            const categorie = data.categories;
            console.log(categorie);
            showCategory(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};
lodeCategory();

// ক্যাটেগরিগুলো ডিসপ্লে করার ফাংশন
const showCategory = (categorie) => {
    categorie.forEach(cat => {
        categories.innerHTML += `
            <li id="${cat.id}" class="font-medium text-lg hover:bg-green-500 cursor-pointer px-2.5 py-2 my-2 rounded-lg">${cat.category_name}</li>
        `
    });
    categories.addEventListener("click", (event) => {
        const AllLi = document.querySelectorAll("#categories li"); // নির্দিষ্ট করে শুধু ক্যাটেগরি লিস্টের li নির্বাচন করা হয়েছে
        AllLi.forEach(li => {
            li.classList.remove("bg-green-500", "text-white");
        });
        if (event.target.localName === "li") {
            if (event.target.id === "allTrees") {
                lodeAllTreesBycategories();
            } else {
                lodeTreesBycategories(event.target.id);
            };
            event.target.classList.add("bg-green-500", "text-white");
        };
    });
    // ডিফল্ট হিসেবে 'All Trees' নির্বাচন করুন
    document.getElementById("allTrees").classList.add("bg-green-500", "text-white");
    lodeAllTreesBycategories();
};

// সব গাছ লোড করার ফাংশন 
const lodeAllTreesBycategories = () => {
    displayTrees.innerHTML = `
        <span class="col-span-full loading loading-dots loading-lg mx-auto"></span>
    `;
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            const categorie = data.plants;
            showTreesBycategories(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};

// গাছ লোড করার ফাংশন 
const lodeTreesBycategories = (CategoryId) => {
    displayTrees.innerHTML = `
        <span class="col-span-full loading loading-dots loading-lg mx-auto"></span>
    `;
    fetch(`https://openapi.programming-hero.com/api/category/${CategoryId}`)
        .then(res => res.json())
        .then(data => {
            const categorie = data.plants;
            showTreesBycategories(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};

// গাছ ডিসপ্লে করার ফাংশন
const showTreesBycategories = (trees) => {
    // ডেটা লোড হওয়ার আগে স্কেলেটন লোডার প্রদর্শন
    displayTrees.innerHTML = ``;

    // ডেটা লোড হওয়ার পর স্কেলেটন সরিয়ে আসল ডেটা দেখানো
    setTimeout(() => {
        displayTrees.innerHTML = ``; // স্কেলেটন লোডার সরিয়ে ফেলা

        if (trees.length === 0) {
            displayTrees.innerHTML = `<h2 class="col-span-full text-center text-gray-500">এই ক্যাটেগরিতে কোনো গাছ নেই।</h2>`;
            return;
        }

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
                            <p><span class="font-bold">ক্যাটেগরি: </span> ${tree.category}</p>
                            <p><span class="font-bold">মূল্য: </span> ${tree.price}</p>
                            <p><span class="font-bold">বিবরণ: </span> ${tree.description}</p>
                        </div>
                    </div>
                </dialog>
            `;
        });
    }, 1500); // ১ সেকেন্ড বিলম্ব যোগ করা হয়েছে যাতে লোডিং ইফেক্ট দেখা যায়
};

// কার্টে আইটেম যোগ করার ফাংশন
const addPlantToCart = (plant) => {
    const li = document.createElement("div");
    li.className = "flex justify-between p-3 my-2 bg-[#F0FDF4] rounded-xl";
    li.dataset.price = plant.price; // ডেটা অ্যাট্রিবিউট হিসাবে মূল্য সংরক্ষণ করা হয়েছে
    li.innerHTML = `
        <div>
            <h3 class="text-sm font-semibold text-[#1F2937]">${plant.name}</h3>
            <p>৳ <span>${plant.price}</span> x 1</p>
        </div>
        <button type="button" class="remove-from-cart-btn cursor-pointer">❌</button>
    `;
    cart.appendChild(li);

    // মোট মূল্য আপডেট করা
    const currentPrice = parseFloat(cartTotalPrice.textContent);
    cartTotalPrice.textContent = (currentPrice + plant.price).toFixed(2);
};

// কার্ট থেকে আইটেম সরানোর ফাংশন
const removeCartItem = (button) => {
    const removeItem = button.parentElement;
    const itemPrice = parseFloat(removeItem.dataset.price);

    // মোট মূল্য আপডেট করা
    const currentPrice = parseFloat(cartTotalPrice.textContent);
    cartTotalPrice.textContent = (currentPrice - itemPrice).toFixed(2);

    // আইটেমটি DOM থেকে সরিয়ে ফেলা
    removeItem.remove();
};

// // ইভেন্ট লিসেনার সেটআপ
displayTrees.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("add-to-cart-btn")) {
        const plantInfo = JSON.parse(target.dataset.plantInfo);
        addPlantToCart(plantInfo);
    }
});

cart.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("remove-from-cart-btn")) {
        removeCartItem(target);
    }
});