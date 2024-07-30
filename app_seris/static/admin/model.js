 
 
 window.addEventListener("load", function(){

	fetch('http://localhost:9000/model/').then(Response => Response.json())
  .then(data => {
	console.log(data);
     
  for(let i=0; i<data.length; i++){
	let tr = document.createElement("tr");
	let td_id = document.createElement("td");
  let td_naziv = document.createElement("td");
  let td_opis = document.createElement("td");
  let td_link = this.document.createElement('td');

  td_id.innerHTML = "#" + data[i].id;
  td_id.classList.add('text-center');

  td_opis.innerHTML = data[i].opis;
  td_opis.classList.add('text-center');

  td_naziv.innerHTML = data[i].naziv;
  td_naziv.classList.add('text-center');
 
  var link = this.document.createElement('a');
  link.setAttribute('href','model.html?id=' + data[i].id); 
  link.classList.add('btn');
  link.classList.add('btn-secondary');
  link.innerHTML = 'Detalji';
  td_link.appendChild(link);
  
    tr.appendChild(td_id);
    tr.appendChild(td_naziv);
	tr.appendChild(td_opis);
    tr.appendChild(td_link);

document.getElementById("spisak").appendChild(tr);
}

  })
  .catch(error => {
	console.error('Error:', error);
  });

});

