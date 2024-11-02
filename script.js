const API_KEY = "c39ca50190284c8494692ce754902129";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);

  // const res = await fetch(
  //   "https://newsapi.org/v2/everything?q=India&apiKey=c39ca50190284c8494692ce754902129"
  // );

  const data = await res.json();
  // const data = await res.text();
  // console.log(data);
  console.log(data.articles);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  //clone og Card

  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    // console.log(cardClone);
    
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsource = cardClone.querySelector("#news-source");
  const NewsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  NewsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsource.innerHTML = `${article.source.name}. ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let  currentSelectNav = null;
function mohit(id) {
  fetchNews(id)
  const navItem=document.getElementById(id);
  currentSelectNav?.classList.remove('active');
  currentSelectNav = navItem ;
  currentSelectNav.classList.add('active');

}


//search button
const serchBtn=document.getElementById('search-btn')
const serchText=document.getElementById('search-text')

serchBtn.addEventListener("click",()=> {
  const query=serchText.value ;
  if(!query) return ;
  fetchNews(query);
  currentSelectNav?.classList.remove('active');
  currentSelectNav = null ;
});
