// ##############################
// VARIABLES Y SELECTORES
// ##############################

const contenedorAutos = document.querySelector("#contenedorAutos");
const contenedorAnioActual = document.querySelector("#anioActual span");

// Campos select
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const color = document.querySelector("#color");
const transmision = document.querySelector("#transmision");
const puertas = document.querySelector("#puertas");

// Para el campo de año
const anioActual = new Date().getFullYear() - 1;
const anioMinimo = anioActual - 10;

// Objeto de búsqueda
const busqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  color: "",
  transmision: "",
  puertas: "",
};

// ##############################
// EVENTOS
// ##############################

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarSelectAnio();
  contenedorAnioActual.textContent = new Date().getFullYear();
});

marca.addEventListener("change", (e) => {
  busqueda.marca = e.target.value;
  filtrarAutos();
});
year.addEventListener("change", (e) => {
  busqueda.year = Number(e.target.value);
  filtrarAutos();
});
minimo.addEventListener("change", (e) => {
  busqueda.minimo = e.target.value;
  filtrarAutos();
});
maximo.addEventListener("change", (e) => {
  busqueda.maximo = e.target.value;
  filtrarAutos();
});
color.addEventListener("change", (e) => {
  busqueda.color = e.target.value;
  filtrarAutos();
});
transmision.addEventListener("change", (e) => {
  busqueda.transmision = e.target.value;
  filtrarAutos();
});
puertas.addEventListener("change", (e) => {
  busqueda.puertas = Number(e.target.value);
  filtrarAutos();
});

// ##############################
// FUNCIONES
// ##############################
function mostrarAutos(autos) {
  //Muestra el resultado de los autos al usuario

  limpiarHTML(); //Antes de crear, hay que limpiar

  autos.forEach((auto) => {
    const { marca, modelo, year, transmision, color, puertas, imagen, precio } =
      auto;

    const div = document.createElement("DIV");
    div.classList.add("auto");
    div.innerHTML = `
      <div>
        <img
          src="${imagen}"
          alt="Audi A4 negro"
          class="auto__imagen"
        />
      </div>

      <div class="auto__info">
        <p>Auto: <span>${marca} ${modelo}</span></p>
        <p>Color: <span>${color}</span></p>
        <p>Puertas: <span>${puertas}</span></p>
        <p>Año: <span>${year}</span></p>
        <p>Transmision: <span>${transmision}</span></p>
        <p class="auto-precio">Precio: <span>$ ${precio}</span></p>
      </div>
    `;

    contenedorAutos.appendChild(div);
  });
}

function limpiarHTML() {
  //Limpia el contenedor para poder crear en él
  while (contenedorAutos.firstElementChild) {
    contenedorAutos.removeChild(contenedorAutos.firstElementChild);
  }
}

function llenarSelectAnio() {
  //Llenar el campo de select con los diez últimos años
  for (let i = anioActual; i >= anioMinimo; i--) {
    const option = document.createElement("OPTION");
    option.textContent = i;
    option.value = i;
    year.appendChild(option);
  }
}

function filtrarAutos() {
  const autosFiltrados = autos
    .filter(filtrarMarca)
    .filter(filtrarAnio)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarTransmision)
    .filter(filtrarPuertas)
    .filter(filtrarColor);

  if (autosFiltrados.length) {
    mostrarAutos(autosFiltrados);
  } else {
    mostrarMensaje();
  }
}

function filtrarMarca(auto) {
  const { marca } = busqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarAnio(auto) {
  const { year } = busqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = busqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = busqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = busqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = busqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = busqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

function mostrarMensaje() {
  limpiarHTML();

  //Muestra un mensaje cuando no se encuentra nada en la búsqueda
  const p = document.createElement("P");
  p.textContent = "No se encontraron autos. Intenta con otras opciones.";
  p.classList.add("mensaje");

  // Insertar
  contenedorAutos.appendChild(p);
}
