function getClientes() {

    var request = new XMLHttpRequest();
    //Accede a la session de la pagina
    username= sessionStorage.getItem("username");
    password= sessionStorage.getItem("password");
    

    request.open('GET', "https://8000-ingridnatal-aplicacionw-uo942ndzvue.ws-us51.gitpod.io/clientes/"); //pasamos el metodo y luego el endpoint que es la url
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password))
    request.setRequestHeader("content-type", "application/json");
    
    const  tabla   = document.getElementById("tabla_clientes");  //quiere decir que ya existe una tabla le decimos a la api que tome lo que se ya existe y que pueda eliminarlo y todo lo que necesitamos

    var tblBody = document.createElement("tbody");  //quiere decir que ya existe una tabla le decimos a la api que tome lo que se ya existe y que pueda eliminarlo y todo lo que necesitamos
    var tblHead = document.createElement("thead"); //creamos una variable para el encabezado de la tabla

    tblHead.innerHTML = `
        <tr>
            <th>ID DEL CLIENTE</th>
            <th>NOMBRE DEL CLIENTE</th>
            <th>EMAIL</th>
        </tr>`;

    request.send();

   
    request.onload = () => { 
        const response = request.responseText;
        const json = JSON.parse(response);
        if (request.status === 401 || request.status === 403) { //si me muestras un 301 o un 403 muestrame el siguiente mensaje
            alert(json.detail);
        }
        else if (request.status == 202){
            const response = request.responseText;
            const json = JSON.parse(response);
            for (let i = 0; i < json.length; i++) {
                var tr = document.createElement('tr');
                var id_cliente = document.createElement('td');
                var nombre = document.createElement('td');
                var email = document.createElement('td');

                id_cliente.innerHTML = json[i].id_cliente;
                nombre.innerHTML = json[i].nombre;
                email.innerHTML = json[i].email;

                tr.appendChild(id_cliente);
                tr.appendChild(nombre);
                tr.appendChild(email);
                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    
}