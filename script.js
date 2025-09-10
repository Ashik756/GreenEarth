const categories = document.getElementById("categories");
const displayTrees = document.getElementById("displayTrees");


// ক্যাটেগরি লোড করার ফাংশন 
const lodeCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            const categorie = data.categories;
            // console.log(categorie);
            showCategory(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};

// ক্যাটেগরিগুলো ডিসপ্লে করার ফাংশন
const showCategory = (categorie) => {
    categorie.forEach(cat => {
        categories.innerHTML += `
            <li id="${cat.id}" class="font-medium text-lg hover:bg-green-500 cursor-pointer px-2.5 py-2 rounded-lg">${cat.category_name}</li>
        `
    });
    categories.addEventListener("click", (event) => {
        document.querySelectorAll("li").forEach(li => {
            li.classList.remove("bg-green-500", "text-white")
        })
        if (event.target.localName === "li") {
            ("bg-green-500", "text-white")
            if (event.target.id === "allTrees") {
                lodeAllTreesBycategories();
            } else {
                lodeTreesBycategories(event.target.id);
            };
            event.target.classList.add("bg-green-500", "text-white")
            // console.log(event.target.localName);
        }
    })

}

// সব গাছ লোড করার ফাংশন 
const lodeAllTreesBycategories = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            const categorie = data.plants;
            console.log(categorie);
            showTreesBycategories(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};


// গাছ লোড করার ফাংশন 
const lodeTreesBycategories = (CategoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${CategoryId}`)
        .then(res => res.json())
        .then(data => {
            const categorie = data.plants;
            // console.log(categorie);
            showTreesBycategories(categorie);
        })
        .catch(err => {
            console.log(err);
        });
};


// গাছ ডিসপ্লে করার ফাংশন
const showTreesBycategories = (trees) => {
    console.log(trees);
    categories.addEventListener(("click"), () => {
        displayTrees.innerHTML = ``;
    });
    trees.forEach(tree => {
        displayTrees.innerHTML += `
            <div class="p-4 rounded-xl shadow-xl object-contain">
                    <img src="${tree.image}" alt="" class="w-full aspect-3/2 object-cover bg-[#EDEDED] rounded-2xl">
                    <div class="my-3">
                        <h1 class="text-sm font-semibold">${tree.name}</h1>
                        <p class="text-[#1F2937] text-xs my-2 text-justify">${tree.description}</p>
                        <div class="flex justify-between">
                            <h2 class="text-[#15803D] bg-[#DCFCE7] px-3 py-2 rounded-full">${tree.category}</h2>
                            <p class="text-[#1F2937] text-lg font-semibold">৳ ${tree.price}</p>
                        </div>
                    </div>
                    <button type="button" class="bg-[#15803D] text-white w-full py-3 rounded-full">Add to Cart</button>
                </div>
        `

    });
};



lodeCategory();