alert("responsive en construccion ver en pc unicamente");

//constantes de la pokedex
const pokeInput = document.getElementById("pokename");
const pokeId = document.getElementById("idname");
const pokeimg =document.getElementById("pokeimg");

const tipo1 = document.getElementById("tipo1");
const tipo2 = document.getElementById("tipo2");
const habilidad1 = document.getElementById("habilidad1");
const habilidad2 = document.getElementById("habilidad2");


const hp =document.getElementById("hp");
const attack =document.getElementById("attack");
const defence =document.getElementById("defence");
const special =document.getElementById("special");
const speed =document.getElementById("speed");

const altura =document.getElementById("altura");
const peso =document.getElementById("peso");

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
//funcion para sacar json de los pokemon y si no es valido soltar alerta que no es valido osea no 200
let respuesta;
const pokeJson = () =>{
    let entrada = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${entrada}`;
    fetch(url).then((res)=>{
        if(res.status != "200"){
            console.log(res);
            cambiarimg("./pokebola.png");
            alert("pokemon no valido");
        }
        else{
            return res.json();
        }

    }).then((data) =>{
        respuesta=data;
        cambiarNombre(respuesta.order,respuesta.name);
        cambiarimg(respuesta.sprites.other["official-artwork"].front_default);
        if(respuesta.types.includes(1)){
            cambiartipo(respuesta.types[0].type.name,respuesta.types[1].type.name);

        }
        else{
            cambiartipo(respuesta.types[0].type.name);

        }
        if(respuesta.abilities.includes(1)){
            cambiarHabilidades(respuesta.abilities[0].ability.name,respuesta.abilities[1].ability.name);
        }
        else{
            cambiarHabilidades(respuesta.abilities[0].ability.name);
        }
        cambiarEstadisticas(respuesta.stats[0].base_stat,respuesta.stats[1].base_stat,respuesta.stats[2].base_stat,respuesta.stats[3].base_stat,respuesta.stats[4].base_stat,respuesta.stats[5].base_stat);
        cambiarfinalestadist(respuesta.height,respuesta.weight);
    })
}


//funcion cambiar nombre
function cambiarNombre(id,name){
    pokeId.innerHTML = `#${id} ${name}`;
}
//funcion cambiar foto

function cambiarimg(url){
    pokeimg.src = url;
}
//funcion cambiar tipo
function cambiartipo(type1,type2){
    tipo1.innerHTML= type1;
    tipo1.style.color = typeColors[type1];
    if(type2==undefined){
        tipo2.innerHTML= "";    
    }
    else{
        tipo2.innerHTML= type2;
        tipo2.style.color= typeColors[type2];
    }
    
}

//funcion cambiar habilidades
function cambiarHabilidades(hb1,hb2){
    habilidad1.innerHTML = hb1;
    if(hb2!=undefined){
        habilidad2.innerHTML = hb2;
    }
    else{
        habilidad2.innerHTML = "";
    }
}

//funcion cambiar otras estadisticas
function cambiarEstadisticas(e1,e2,e3,e4,e5,e6){
    hp.innerHTML = e1;
    attack.innerHTML = e2;
    defence.innerHTML = e3;
    speciala.innerHTML = e4;
    speciald.innerHTML = e5;
    speed.innerHTML = e6;

}
function cambiarfinalestadist(n1,n2){
    altura.innerHTML =n1;
    peso.innerHTML =n2;
}
function limpiarimput(){
    pokeInput.value = "";
    cambiarimg("./pokebola.png");
    cambiarNombre("","");
    cambiartipo("");
    cambiarHabilidades("");
    cambiarEstadisticas(0,0,0,0,0,0);
    cambiarfinalestadist(0,0);
}