//Creamos la varibale map de forma global
let map;

//FUNCION PARA CARGAR EL MAPA
function initMap() {
  console.log("cargando mapa");
  const myLatLng = {
    lat: 43.32,
    lng: -2.9,
  };
  // Crea un mapa y lo muestra en el elemento con ID "map"
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myLatLng,
  });
  console.log("MAP");
  console.log(map);

  google.maps.event.addListener(map, "click", (event) => {
    console.log(event.latLng.lat(), event.latLng.lng());
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    const positionMarker = { lat: lat, lng: lng };
    console.log(positionMarker);

    const marker = new google.maps.Marker({
      position: positionMarker,
      map,
      title: "Click to see the weather",
    });
    const infowindow = new google.maps.InfoWindow();

    //EJECUTAMOS UNA FUNCION PARA OBTENER EL TIEMPO QUE CUANDO SE RESUELVA GENERARA LA VENTANA
    //QUE DEBE APARECER AL HACER CLICK EN EL MARCADOR
    obtenerTiempo(positionMarker).then((tiempo) => {
      //CONTROLAMOS QUE SEA LA VARIABLE SEA LA ADECUADA
      console.log(tiempo, typeof tiempo);
      //GENERAMOS EL EVENTO QUE RECOGERA QUE CUANDO SE HAGA CLICK EN EL MARCADOR
      //DESPLIEGUE UNA VENTANA CON EL NOMBRE DEL ESTABLECIMIENTO Y EL TIEMPO EN LA ZONA
      marker.addListener("click", () => {
        infowindow.setContent(
          `<h3>Weather</h3><img src="http://openweathermap.org/img/w/${tiempo}.png" class="weather-icon"/>`
        );
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
  });
}

//EJECUTAMOS LA FUNCION PARA CARGAR EL MAPA EN EL HTML
window.init = initMap;

//FUNCION PARA OBTENER EL TIEMPO DE UN LUGAR EN UNAS COORDENADAS ESPECIFICAS
async function obtenerTiempo(coordenadas) {
  console.log("API OPENWEATHER");
  console.log(coordenadas.lat);
  console.log(coordenadas.lng);

  //RECOGEMOS LAS COORDENADAS DE LAT Y LNG CADA UNA EN UNA VARIABLE
  let lat = coordenadas.lat;
  let lng = coordenadas.lng;

  //DEFINIMOS LA KEY DE LA APO
  let API_KEY = "fdcc2a6f6dfa2b49d6ea1a168cd08d5c";

  //Y LA URL PARA HACER LA PETICION
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

  //HACEMOS LA PETICION
  let promesa = fetch(URL);

  //DECLARAMOS UNA VARIABLE QUE CONTENDRA EL TIEMPO EN CASO DE REALIZARSE ADECUADAMENTE LA PETICION
  let tiempo = "";
  try {
    const response = await promesa;
    if (response.ok) {
      console.log("Peticion a la API Open Weather realizada correctamente");
      const objetoJSON = await response.json();
      //GUARDAMOS LA DESCRIPCION APORTADA POR LA API EN LA VARIABLE TIEMPO
      tiempo = objetoJSON.weather[0].icon;
    }
  } catch (error) {
    console.log("Error al hacer la peticion. " + error.message);
  }

  //DEVOLVEMOS LA VARIABLE
  return tiempo;
}

//RESETEAMOS LA PAGINA PARA BORRAR LOS MARCADORES
function borrarMarcadores() {
  window.location.reload();
}

//FUNCION PARA CONVETIR LA VARIABLE STRING CON LAS COORDENADAS EN UN OBJETO
function getLatLngFromString(coordinates) {
  // Elimina las palabras clave lat y lng del string
  coordinates = coordinates
    .replace("{lat: ", "")
    .replace(" lng: ", "")
    .replace("}", "");
  // Divide el string en dos partes, una para la latitud y otra para la longitud
  var latlng = coordinates.split(",");
  // Convierte cada parte a un número utilizando parseFloat
  var lat = parseFloat(latlng[0]);
  var lng = parseFloat(latlng[1]);
  console.log(lng);
  // Crea un objeto con las propiedades lat y lng
  var latLng = { lat: lat, lng: lng };
  console.log(latLng);
  return latLng;
}
