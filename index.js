// c50618214ad2422e87e91a4eb059d7a3 new api key
const API_KEY = "c50618214ad2422e87e91a4eb059d7a3" ;
const url = "https://newsapi.org/v2/everything?q=";

//When the Window Loads we need to fetch the new
// we add a load event listner on window object

window.addEventListener("load" , ()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.querySelector("#cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach(element => {
        if(!element.urlToImage ) return;

        // how to clone an html element completely
        const cardClone = newsCardTemplate.content.cloneNode("true");

        //filling the card template 
        fillDataInCards(cardClone , element);
        cardContainer.appendChild(cardClone)
    });
}

function fillDataInCards(cardClone , element){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // setting the values of the template
    newsImg.src = element.urlToImage;
    newsTitle.innerHTML = element.title;
    newsDesc.innerHTML = element.description;

    const date = new Date(element.publishedAt).toLocaleString("en-US" , {
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML = `${element.source.name} . ${date}`;

    //whenever card is clicked then we should redirect to the website where news article is puclished

    cardClone.firstElementChild.addEventListener("click" , ()=>{
        window.open(element.url , "_blank");
    })

}
