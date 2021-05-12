let tijelo=document.querySelector('.tijelo');
let naslov=document.querySelector('.nazivKriptovalute');
let text=document.querySelector('.textKriptovalute');
let cirkulacija=document.querySelector('.predvidenaCirkulacija');
let cijena=document.querySelector('.cijena_24_h');
let euri=document.querySelector('.euri');
let dollari=document.querySelector('.dollari');
let promjenaEuri=document.querySelector('.promjenaEuri');
let promjenaDollari=document.querySelector('.promjenaDollari');

function dohvati(){

  fetch('https://api.coingecko.com/api/v3/search/trending')
      .then(function(response){
        return response.json();
      }).then(function(obj){
        for(let i=0;i<=obj.coins.length;i++){
          let id=obj.coins[i].item.id;
          //prikaziNovu(id);
          let red=document.createElement('tr');
          red.innerHTML=`
          <td>${obj.coins[i].item.name}</td>
          <td class="id" style="display:none;">${obj.coins[i].item.id}</td>
          <td>${obj.coins[i].item.market_cap_rank}.</td>
          <td><img src=${obj.coins[i].item.thumb}/></td>
          <td><button class="open">Više</button></td>
          `;
          red.style.textAlign="center";
          tijelo.appendChild(red);
        }
      })
}

dohvati();

let kontejner=document.querySelector('.kontejner');
let open=document.querySelector('.open');
let close=document.querySelector('.close');



document.body.addEventListener('click',otvoriPopup);

function otvoriPopup(e){
  if(e.target.classList.contains('open')){
    kontejner.classList.add('prikazi');
    let vrijednost=e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    prikaziNovu(vrijednost);
    }

e.preventDefault();
}

document.body.addEventListener('click',zatvoriPopup);

function zatvoriPopup(e){
  if(e.target.classList.contains('close')){
    kontejner.classList.remove('prikazi');
}

e.preventDefault();
}


function prikaziNovu(podatak){

      fetch(`https://api.coingecko.com/api/v3/coins/${podatak}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
            .then(function(response){
              return response.json();
            }).then(function(obj){
              console.log(obj);
              naslov.innerHTML=`${obj.name}<span class="slika"><img src=${obj.image.small}/></span>`;
              text.innerHTML=`${obj.description.en}`;
              cirkulacija.innerHTML=`Komada: ${obj.market_data.circulating_supply}`;
              euri.innerHTML=`Euri: ${obj.market_data.current_price.eur}`;
              dollari.innerHTML=`Dolari: ${obj.market_data.current_price.usd}`;
              promjenaEuri.innerHTML=`Euri: ${obj.market_data.price_change_24h_in_currency.eur}`;
              promjenaDollari.innerHTML=`Dolari: ${obj.market_data.price_change_24h_in_currency.usd}`;
            })
  }
