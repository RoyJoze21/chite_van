const carrito = document.querySelector("#carrito");
const listaComidas = document.querySelector("#lista-comidas") ;
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector("vaciar-carrito");
let articulosCarrito = []
const totalAPagarElement = document.querySelector("#total-a-pagar")//Elemento a pagar
let totalAPagar = 0; //Variable para el total a pagar 
const btnPagar = document.querySelector("#paga-pedido");
//Funcion para cargar todos los EventListener

function cargarEventListener(){
    //Agregar evento para agregar comida al carrito
    listaComidas.addEventListener("click", agregarComida);
    //Agregar evento para eliminar comida al carrito
    // carrito.addEventListener("click", eliminarComida);
    //Agregar evento para vaciar el carrito 
    // btnVaciarCarrito.addEventListener("click", vaciarCarrito);

}

function agregarComida(event){
    event.preventDefault();
    if(event.target.classList.contains("agregar-carrito")){
        const comidaSeleccionada = event.target.parentElement.parentElement
       
        leerDatosComida(comidaSeleccionada);
    

    }
}

//leer HTML de la comida seleccionada 
function leerDatosComida(comida){
    //obtener informacion de la comida seleccionada 
    const imagen = comida.querySelector("img").src  
    const titulo = comida.querySelector("h4").textContent
    const precioTexto = comida.querySelector(".precio span").textContent
    const precio = parseFloat(precioTexto.replace("S/", "").trim());
    const idComida = comida.querySelector("a").getAttribute("data-id");
    
    //verificar si la comida ya esa en el carrito 
    const comidaEnCarrito = articulosCarrito.find(comida => comida.idComida === idComida);
    
if(comidaEnCarrito){
    //si ya esta en el carrito incrementar la cantidad 
    comidaEnCarrito.cantidad++
}else{
    articulosCarrito.push({
        idComida,
        imagen, 
        titulo,
        precio,
        cantidad:1

    })
}

    carritoHTML()

}

 function  carritoHTML(){

    limpiarHTML()

    totalAPagar = 0
    articulosCarrito.forEach(comida => {
        const {imagen,titulo,precio,cantidad,idComida} = comida
    const precioTotal = precio * cantidad //Calcula el precio total por la cantidad 
        totalAPagar += precioTotal
    const row = document.createElement ("tr")
    row.innerHTML = 
    
    
    `
    <td> <img src='${imagen}' width="100" </td>
    <td> ${titulo} </td>
    <td> ${precio.toFixed(2)} </td>
    <td> ${cantidad} </td>
    <td> ${precioTotal.toFixed(2)} </td>
    `
    contenedorCarrito.appendChild(row)



    })

    actualizarTotalAPagar()
    actualizarNumElementosCarrito()
 }


 

 function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

 }

 
 function actualizarTotalAPagar(){
    totalAPagarElement.textContent = `${totalAPagar.toFixed(2)}`
 }
 
 function actualizarNumElementosCarrito(){

    const numElementos = articulosCarrito.reduce((total,comida) => total + comida.cantidad,0 );
    const numElementosSpan = document.querySelector( `.num-elementos`)
    numElementosSpan.textContent=numElementos

 }
  

 const vaciarCarrito =document.getElementById('vaciar-carrito')
 vaciarCarrito.addEventListener('click',(ev)=>{
    ev.preventDefault()
    articulosCarrito = []
    carritoHTML()
 })



 

 //buscar productos con la barra 

function buscarComida() {
    const textoBusqueda = document.querySelector("#buscador").value.toLowerCase();
    const comidas = document.querySelectorAll('.card');

    comidas.forEach(comida => {
        const titulo = comida.querySelector('.info-card h4').textContent.toLowerCase();
        //condicionamos para mostrar o no el resultado que se busca 
        if (titulo.includes(textoBusqueda)) {
            comida.style.display = 'block'; 
        } else {
            comida.style.display = 'none';   
        }
    });
}


const buscador = document.querySelector("#buscador");
buscador.addEventListener("input", buscarComida);



// Función para editar la cantidad de comida en el carrito
function editarCantidad(event) {
    const inputCantidad = event.target;
    const nuevaCantidad = parseInt(inputCantidad.value);

    // Validamnos que la nueva cantidad sea un número válido y mayor o igual a 1
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        inputCantidad.value = 1; 
        return;
    }

    const idComida = inputCantidad.getAttribute('data-id');
    const comida = articulosCarrito.find(comida => comida.idComida === idComida);

    // Actualizar la cantidad en el carrito
    if (comida) {
        comida.cantidad = nuevaCantidad;
    }
    //actualizar
    carritoHTML(); 
}

function carritoHTML() {
    limpiarHTML();

    totalAPagar = 0;
    articulosCarrito.forEach(comida => {
        const { imagen, titulo, precio, cantidad, idComida } = comida;
        const precioTotal = precio * cantidad;
        totalAPagar += precioTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src='${imagen}' width="100"></td>
            <td>${titulo}</td>
            <td>${precio.toFixed(2)}</td>
            <td><input type="number" min="1" value="${cantidad}" data-id="${idComida}" class="input-cantidad"></td>
            <td>${precioTotal.toFixed(2)}</td>
        `;

        contenedorCarrito.appendChild(row);
    });

    

    actualizarTotalAPagar();
    actualizarNumElementosCarrito();

    // editar la cantidad de comida en el carrito
    const inputsCantidad = document.querySelectorAll('.input-cantidad');
    inputsCantidad.forEach(input => {
        input.addEventListener('input', editarCantidad);
    });
}

 cargarEventListener()
 



 