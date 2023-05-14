const container=document.querySelector(".container");
const optionsContainer=document.querySelector(".options-container");
const country="in"; // in for india
const options=[
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology"
];

let requestURL;
const generateUI=(articles)=>{
  for(let item of articles){
    let card=document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML=`
    <div class="news-image-container">
    <img src="${item.image || "./news.jpg"}" alt="" />
    </div>
    <div class="news-content">
       <div class="news-title">
         ${item.title}
       </div>
       <div class="news-description">
       ${item.description || item.content || ""}
       </div>
       <a href="${item.url}" target="_blank" class="view-button">Read More</a>
     </div>
    `;
    container.appendChild(card);
  }
};

const getNews=async()=>{
  container.innerHTML="";
  let response=await fetch(requestURL);
  if(!response.ok){
    alert("Data is not available at the moment. PLease try again later.");
    return false;
  }
  let data=await response.json();
  generateUI(data.articles);
};

const selectCategory=(e,category)=>{
  let options=document.querySelectorAll(".option");
  options.forEach((element)=>{
    element.classList.remove("active");
  });
  requestURL = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=10&apikey=57d6b9d0b79c5d48eefa8add73877948`;
  e.target.classList.add("active");
  getNews();
}

const createOptions=()=>{
  for(let i of options){
    optionsContainer.innerHTML+=`
    <button class="option ${
            i == "general" ? "active" : ""
          }" onclick="selectCategory(event,'${i}')">${i}</button>
    `;
  }
};



const init=()=>{
  optionsContainer.innerHTML="";
  getNews();
  createOptions();
}

window.onload=()=>{
  requestURL = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=57d6b9d0b79c5d48eefa8add73877948`;
  init();
}
