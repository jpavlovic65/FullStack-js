function getToken() {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}
const token = getToken()

window.addEventListener("load", function(){

	fetch('http://localhost:9000/narudzbina/', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(resp => {
        if (!resp.ok) {
          this.alert("Nemate dozvolu da vidite narudzbine")
            throw new Error('Nije uspelo preuzimanje podataka.');
        }
        return resp.json();
    })
  .then(data => {
	console.log(data);
     
  for(let i=0; i<data.length; i++){
	let tr = document.createElement("tr");
	let td_vreme = document.createElement("td");
  let td_status = document.createElement("td");
  let td_cena = document.createElement("td");
  let td_adresa = this.document.createElement('td');
  let td_auto = document.createElement("td");
  let td_link = this.document.createElement('td');

  if(data[i].narudzbina.createdAt == null)
  td_vreme.innerHTML = "11.11.2011. 11:11";
  else
  td_vreme.innerHTML = data[i].narudzbina.createdAt;
  
    tr.appendChild(td_vreme);
td_status.innerHTML = data[i].narudzbina.status;
    tr.appendChild(td_status)

    td_cena.innerHTML = data[i].auto.cena;
  
    tr.appendChild(td_cena);
  td_adresa.innerHTML = data[i].narudzbina.adresa;

    tr.appendChild(td_adresa);
  td_auto.innerHTML = data[i].auto.naziv ;

    tr.appendChild(td_auto)
 
 
var link = this.document.createElement('a');
link.setAttribute('href','narudzbina.html?id=' + data[i].id + "&narudzbina=" + data[i].narudzbina.id);
link.classList.add('btn');
link.classList.add('btn-secondary');
link.innerHTML = 'Detalji';
td_link.appendChild(link);
  
tr.appendChild(td_link);


document.getElementById("spisak").appendChild(tr);
}

  })
  .catch(error => {
	console.error('Error:', error);
  });

});

