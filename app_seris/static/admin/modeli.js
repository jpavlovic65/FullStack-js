const url = new URL(window.location.href);
    const queryParams = url.searchParams;
    const id = queryParams.get('id');

    function getToken() {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(row => row.startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
      }
      const token = getToken()
window.addEventListener("load", function(){


fetch("http://localhost:9000/model/" + id, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then(resp => {
        if (!resp.ok) {
            this.alert("Nemate dozvolu da vidite Model!");
            throw new Error('Nije uspelo preuzimanje podataka.');
        }
        return resp.json();
    }).then( data=>{
	console.log(data); //proverite sta ste dobili
    document.getElementById("id").innerHTML = data.id;
    document.getElementById("naziv").innerHTML = data.naziv;
    document.getElementById("opis").innerHTML = data.opis;
    if(data.createdAt == null)
        document.getElementById("dodato").innerHTML = "11.11.2011";      
    else
        document.getElementById("dodato").innerHTML = data.createdAt;
    document.getElementById("karoserija").innerHTML = data.karoserija;
    })
    .catch(err=>console.log(err));
});