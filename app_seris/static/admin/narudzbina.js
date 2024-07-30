
function getToken() {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  const token = getToken()
const url = new URL(window.location.href);
const queryParams = url.searchParams;
const id = queryParams.get('id');
const narudzbina = queryParams.get('narudzbina')

window.addEventListener("load", function(){
fetch("http://localhost:9000/narudzbina/" + id, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then(resp => {
        if (!resp.ok) {
            this.alert("Nemate dozvolu da vidite narudzbinu!");
            throw new Error('Nije uspelo preuzimanje podataka.');
        }
        return resp.json();
    })
    .then( data=>{
	console.log(data); //proverite sta ste dobili
    document.getElementById("ime").innerHTML = data.narudzbina.ime;
    document.getElementById("auto").innerHTML = data.auto.naziv;
    if(data.narudzbina.createdAt == null)
        document.getElementById("vreme").innerHTML = "11.11.2011";      
    else
        document.getElementById("vreme").innerHTML = data.createdAt;

        
    var select =document.getElementById("status");

    var opcije = ["Novo", "U dolazku", "Isporuceno", "Odbijeno","U obradi","U salonu"];
    var status = document.createElement("option");
    status.value = data.narudzbina.status;
    status.text = data.narudzbina.status;
    select.add(status);
    // Iteriramo kroz niz opcija i dodajemo ih u select element
    for(let i = 0; i<opcije.length;i++){
        if(opcije[i] == data.narudzbina.status)
            continue;
        var option = document.createElement("option");
        option.text = opcije[i];
        option.value = opcije[i]; // Opciono, postavljanje vrednosti
        select.add(option);
        }
    })
    .catch(err=>console.log(err));


});

// document.getElementById("forma_n").addEventListener("submit", function(event){
   
// });

function submituj(){
    //event.preventDefault();
    let s = document.getElementById("status").value;
    alert(s);
    fetch("http://localhost:9000/narudzbina/" + narudzbina, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: s })	
  })
  .then( response=>{
    if (response.status === 403) {
      // Obrada greške 403 (Forbidden)
      throw new Error('Nemate dozvolu za pristup ovim resursima.');
  }
    
    return response.json() })
  .then( data=>{
    alert("Status je promenjen"); 
  })
  .catch( err=>{
    console.log()
    alert("Desila se greska");
    console.log(err);		/*ispisujemo gresku u konzoli browsera*/
  });
}