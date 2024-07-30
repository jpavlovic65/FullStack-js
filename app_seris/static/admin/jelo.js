const url = new URL(window.location.href);
    const queryParams = url.searchParams;
    const id = queryParams.get('id');
function getToken() {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(row => row.startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
}
const token = getToken()
function obrisiElement(){
    
    alert("http://localhost:9000/auto/"+ id)
    if( confirm("Potvrdi brisanje") ){
        fetch("http://localhost:9000/auto/"+ id, {
             method:"DELETE" ,
             headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then( response=>{
            if (response.status === 401) {
                alert('Nemate dozvolu za pristup ovim resursima.');
              throw new Error('Nemate dozvolu za pristup ovim resursima.');
          }
            
            return response.json() }).then(data=>{
    
        alert("Obrisan je zapis "+data);
        window.location.replace("/admin/auta.html"); //predji na spisak
    })
        .catch( err=>console.log(err));
    
    } else {
        return;
    }
}

function ucitajModel(){
   model_select =  document.getElementById("model");

   fetch('http://localhost:9000/model/').then(Response => Response.json())
  .then(data => {

    for(let i=0; i<data.length; i++){
        var option = document.createElement("option");
        option.text = data[i].naziv;
        option.value = data[i].id;
        model_select.add(option);
    }
  });
}
function ucitaj(){
   
    alert(id);
    ucitajModel();
    fetch("http://localhost:9000/auto/" + id).then( resp=>resp.json() )
    .then( data=>{
	console.log(data); //proverite sta ste dobili
    document.getElementById("naziv").value = data.naziv;
    document.getElementById("opis").value = data.opis;
    document.getElementById("cena").value = data.cena;
    document.getElementById("model").value = data.model_id;
    document.getElementById("snaga").value = data.snaga;
    document.getElementById("godiste").value = data.godiste;
    document.getElementById("kubikaza").value = data.kubikaza;
    })
    .catch(err=>console.log(err));

    


}
// window.addEventListener("load",function(){
//     document.getElementById("dodaj-opremu").addEventListener("click", function(){
//         var id = document.getElementById("spisak-opreme").value;
//         if(!id){
//             alert("Izaberi opremu");
//             return;
//         }
//         dodajSastojak( id );
//     });

// })

function dodajSastojak(id){
    document.querySelector(`#spisak-opreme > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-opreme").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-opreme > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;
    
    document.getElementById("oprema").appendChild(document.createTextNode(" "));
    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "&times;";

    button.addEventListener("click", function(){
    var id = this.parentNode.dataset.id;
    this.parentNode.parentNode.removeChild( this.parentNode );
    document.querySelector(`#spisak-opreme > option[value='${id}']`).disabled = false;
    });
    span.appendChild(button);
    document.getElementById("oprema").appendChild(span);
}

document.getElementById("forma").addEventListener("submit", function(event){
    event.preventDefault();	//sprecimo default ponasanje
    var validno = true;
    if(document.getElementById("naziv").value.length < 3){
        validno = false;
        document.getElementById("naziv").classList.add("error");
        document.getElementById("naziv").classList.remove("success");
    } else{
        document.getElementById("naziv").classList.add("success");
        document.getElementById("naziv").classList.remove("error");
       
    }
    if(!validno){ return; }		//ako nije validno - kraj
	
            
            
            // var spanovi = document.querySelectorAll("#oprema > span.badge");
            // var niz = [];

            // for(let i = 0; i< spanovi.length;i++){
            //     niz.push(spanovi[i].dataset.id);
            // }
            // let JSONniz = JSON.stringify(niz);

            // document.getElementById('oprema-input').value = JSONniz;
            // console.log(validno);
     
            var auto = {};

                auto.naziv = document.getElementById("naziv").value;
                auto.opis = document.getElementById("opis").value;
                auto.cena = document.getElementById("cena").value;
                auto.model_id = document.getElementById("model").value;
                auto.snaga =  document.getElementById("snaga").value;
                auto.godiste = document.getElementById("godiste").value;
                auto.kubikaza =document.getElementById("kubikaza").value;
            fetch("http://localhost:9000/auto/" + id, {
                method:"PUT",
                        headers: { 'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                 },
                body: JSON.stringify(auto)
            })
            .then( response=>{
                if (response.status === 401) {
                    alert('Nemate dozvolu za promenu ovog resursa.');
                  throw new Error('Nemate dozvolu za pristup ovim resursima.');
              }
                
                return response.json() })
            .then(data=>{
                //dobili smo objekat novounesenog jela, koje ima svoj id, super
                //mozemo nazad na spisak, a mozemo i na izmenu tog jela
                window.location.href=`/admin/auta.html`;
            })
            .catch(err => console.log(err));	
          

            
});

document.getElementById("naziv").addEventListener("keypress", function(){

    this.classList.remove('success'); 
    this.classList.remove('error'); 

});

