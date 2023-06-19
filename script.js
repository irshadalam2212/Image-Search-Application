const accessKey = "YVd0kBsz7Pb7KVTbS1uvgRARgxpv6ST5BTn7JVnpvio";

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResult = document.querySelector(".search-result")
const showMore = document.getElementById("show-more-btn")

let inputData = "";
let page = 1;

async function searchImage (){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page ===1) {
        searchResult.innerHTML = "";
    }
    
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

    formElement.addEventListener("submit", (event) => {
        event.preventDefault()
        page = 1;
        searchImage();
    })

    showMore.addEventListener("click", () => {
        searchImage();
    })
