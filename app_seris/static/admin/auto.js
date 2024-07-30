function getToken() {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}
window.addEventListener("load", function(){
	fetch('http://localhost:9000/auto/').then(Response => Response.json())
  .then(data => {
	console.log(data);
  const token = getToken();
  for(let i=0; i<data.length; i++){
	let tr = document.createElement("tr");
	let td_slika = document.createElement("td");
  let td_model = document.createElement("td");
  let td_opis = document.createElement("td");
  let td_cena = document.createElement("td");
  let td_link = document.createElement("td");
	td_model.innerHTML = data[i].model.naziv;
  td_model.classList.add('text-center');

  td_opis.innerHTML = data[i].opis;
  td_opis.classList.add('text-center');
  td_cena.innerHTML = data[i].cena;
  td_cena.classList.add('text-center');
  td_slika.innerHTML = data[i].naziv;
  td_slika.classList.add('text-center');
  tr.appendChild(td_slika);
	tr.appendChild(td_model);
	tr.appendChild(td_opis);
  tr.appendChild(td_cena);

  td_link.classList.add('text-center');
var btn = document.createElement('button');
btn.type = "button";
btn.classList.add("btn");
btn.classList.add("btn-color");
btn.innerHTML = "Promena Cene";




tr.dataset.id = data[i].id;
td_link.appendChild(btn);
btn.addEventListener("click", function(){
	var c = prompt("Unesi novu cenu:");
  var id = this.parentNode.parentNode.dataset.id;
  fetch("http://localhost:9000/auto/promeni-cenu/" + id, {
    method: 'PUT',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ cena: c })	
  })
  .then( response=>{
    if (response.status === 403) {
      // Obrada greške 403 (Forbidden)
      throw new Error('Nemate dozvolu za pristup ovim resursima.');
  }
    
    return response.json() })
  .then( data=>{
    
    alert("Cena je azurirana");
    td_cena.innerHTML = data.cena;  
  })
  .catch( err=>{
    console.log()
    alert("Desila se greska");
    console.log(err);		/*ispisujemo gresku u konzoli browsera*/
  });
  

});

td_link.appendChild(this.document.createElement('br'));
tr.appendChild(td_link);


var link = this.document.createElement('a');
link.setAttribute('href','auto.html?id=' + data[i].id);
link.classList.add('btn');
link.classList.add('btn-secondary');
link.innerHTML = 'Izmeni';
td_link.appendChild(link);
document.getElementById("spisak").appendChild(tr);
}

  })
  .catch(error => {
	console.error('Error:', error);
  });

});





