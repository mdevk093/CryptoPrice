let suggestions = [];
let data;
let price = [];

let USD = document.querySelector('#USD');
let convert = document.querySelector('#answer');
let searchResult = document.querySelector('.autocom-box');
const searchBar = document.querySelector('.search-input input');

function getSuggestions(){
    var request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () =>{
        if(request.readyState === 4 && request.status === 200){
            data = JSON.parse(request.responseText)

            for(var i =0; i < 40; i++){
                price.push(data[i].current_price);
                suggestions.push(data[i].name);
            }
                
        } else if (request.status !== 200 && request.readyState === 4) {
            console.log("Error");
        }
            
    });
        
    request.open('GET','https://api.coingecko.com/api/v3//coins/markets?vs_currency=usd');
    request.send();
}


searchBar.addEventListener('keyup', () =>{
    searchResult.innerHTML = "";
    let name = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1)
    const filtered = suggestions.filter(suggest =>{
        if(suggest.includes(name)){
            return suggest;
        }
    });
    
    
    searchResult.style.display = "block";
    filtered.forEach(name =>{
        searchResult.innerHTML += `<li>${name}</li>`
    })
    
});

searchResult.addEventListener('click', e =>{
    searchBar.value = e.target.textContent;
    searchResult.style.display = "none";
})


USD.addEventListener("keyup", () =>{
    let index = filter();
    convert.value = USD.value/price[index];
})


convert.addEventListener("keyup", () =>{
    let index = filter();
    USD.value = price[index]*convert.value
})

function filter(){
    suggestions.filter((name,pos) =>{
        if(name === searchBar.value){
            return index;
        }
    })
}

getSuggestions();