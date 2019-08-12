$(document).ready(function () {

    var url = "https://randomuser.me/api/?results=50";
    var p = "";
    var loadMore = "";

    fetchInfo(url);

    function fetchInfo(url) {
        fetch(url)
            .then(response => response.json())
            .then(function (data) {
                data.results.forEach(person => {
                    let country = checkCountry(person.nat);
                    p = `
                    <div class="col-md-4 col-lg-3  col-sm-6  my-5">
                      <a onclick="personSelected('${person.email}','${data.info.seed}')" href="person.html">
                       <div class="card text-center">
                             <div class="card-body">
                                 <img src="${person.picture.medium}" class=" rounded-circle mb-3">
                                     <h3> ${person.name.first} ${person.name.last}</h3>
                                    <h5>${person.location.city}</h5> 
                                    <p><strong> ${country} </strong> </p>
                             </div>
                         </div>
                         </a>
                      </div>    
                    `;
                    $("#results").append(p);
                });
                loadMore =
                    `<div class="col-md-3">
                        <div class="btn btn-primary mb-5 mt-5 " id="buttonM"> Load More </div> </div> 
                     `;
                $("#buttonMore").empty();
                $("#buttonMore").append(loadMore);

                $("#buttonM").on("click", function () {
                    fetchInfo(url);
                    $(this).remove();
                });
            });

    };
});

function personSelected(email, seed) {
    let datos = { 'email': email, 'seed': seed };
    let datosString = JSON.stringify(datos);
    sessionStorage.setItem('datos', datosString);
    window.location = 'person.html';
    return false;
};

function checkCountry(code) {
    switch (code) {
        case 'AU':
            return 'Australia';
        case 'BR':
            return 'Brasil';
        case 'CA':
            return 'Canada';
        case 'CH':
            return 'China';
        case 'DE':
            return 'Germany';
        case 'DK':
            return 'Denmark';
        case 'ES':
            return 'Spain';
        case 'FI':
            return 'Finland';
        case 'FR':
            return 'France';
        case 'GB':
            return 'United Kingdom';
        case 'IE':
            return 'Ireland';
        case 'IR':
            return 'Iran';
        case 'NO':
            return 'Norway';
        case 'NL':
            return 'Netherland';
        case 'NZ':
            return 'New Zealand	';
        case 'TR':
            return 'Turkey';
        case 'US':
            return 'United States';
        default:
            return 'No info';
    }
}

function getPerson() {
    let datos = JSON.parse(sessionStorage.getItem('datos'));
    let seed = datos.seed;
    let email = datos.email;
    fetchPerson(seed, email);

    function fetchPerson(seed, email) {
        let urlPerson = "https://randomuser.me/api/?results=50&seed=" + seed;
        fetch(urlPerson)
            .then(response => response.json())
            .then(function (data) {
                for (let i = 0; i < data.results.length; i++) {
                    if (data.results[i].email === email) {
                        let person = data.results[i];
                        let output = `
                        <div class="row">
                        <div class="col-md-5 mx-auto">
                        <div class="card text-center"> 
                            <div class="card-body">
                                <img src="${person.picture.large}" class=" rounded-circle mb-3">
                                <ul class="list-group text-center">
                                <li class="list-group-item"><strong>Username: </strong>${person.login.username}</li> 
                                   <li class="list-group-item"><strong>First Name: </strong>${person.name.first} </li> 
                                  <li class="list-group-item"><strong>Last Name: </strong>${person.name.last}</li> 
                                 <li class="list-group-item"><strong>Email: </strong>${person.email}</li> 
                                <li class="list-group-item"><strong>Nationality: </strong>${person.nat}</li> 
                          </ul>
                          <div class="btn btn-primary mt-5 buttonback"  onclick='(function(){ window.location = "index.html" })() ;' > Back </div> 
                            </div>
                        </div>
                        </div>
                        </div>
                        `;
                        $("#person").append(output);
                    }
                }
            })
    }
};   