let POSICIONANTERIOR = 0;
const Start = () =>{
    let temporizador = 1;
    buttonStop(true);
    OcultaTodos();
    EventoClic();

    time$$ = document.querySelector(".tiempo");
    time$$.style.color = "black";
    time$$.innerText="00:30";
    points$$ = document.querySelector(".points");
    points$$.innerText = 0;
    points$$.style.color = "red";
    
    for(let i=29; i>=0; i--){
        setTimeout( () =>{
            ActualizaContador(i);
            if(i===0) Stop();
        }
        ,1000*temporizador)

        setTimeout( () =>{
            OcultaActivo();
            MuestraAleatorio();
        },1000*temporizador)
        
        temporizador++
    }
    
}

const buttonStop = (active) =>{

    if (active){
        const buttonStop$$ = document.createElement('button');
        buttonStop$$.innerHTML= "Stop";
        buttonStop$$.classList="stop";
        buttonStop$$.onclick = () => Stop();
        const insertButton$$ = document.querySelector(".buttons");
        insertButton$$.appendChild(buttonStop$$);
        const startButton$$ = document.querySelector("#start");
        startButton$$.onclick=""
    }else{
        const buttonStop$$ = document.querySelector('.stop');
        const insertButton$$ = document.querySelector(".buttons");
        if (buttonStop$$) insertButton$$.removeChild(buttonStop$$);
        const startButton$$ = document.querySelector("#start");
        startButton$$.onclick= () => Start();
    }
}

const Stop = () =>{
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    MostrarTodos();
    buttonStop(false);

}

const ActualizaContador = (segundo) => {
    time$$ = document.querySelector(".tiempo");
    if (segundo<10){
        segundo = '0'+segundo
        time$$.style.color = "red";
    }
    time$$.innerText= `00:${segundo}`
}

const OcultaActivo = () =>{
    let images = document.querySelectorAll('.active');
    Array.from(images).forEach((element)=>{
        element.classList.remove("active")
        element.style.visibility= "hidden";
    })
}

const OcultaTodos = () =>{
    let images = document.querySelectorAll('.game img');
    Array.from(images).forEach((element)=>{
        element.classList.remove("active")
        element.style.visibility= "hidden";
        element.ondragstart = () => {
            return false;
          };
    })
}

const EventoClic = () =>{
    let images = document.querySelectorAll('.game img');
    Array.from(images).forEach((element)=>{
        element.addEventListener("click",() =>{
            if(element.classList.contains("active")){
                points$$ = document.querySelector(".points");
                let puntos = parseInt(points$$.innerText) +5
                points$$.innerText = puntos
                console.log(puntos);
                if (puntos>100) points$$.style.color = "green";
                OcultaTodos();
            }
        })
    })
}

const MostrarTodos = () =>{
    let images = document.querySelectorAll('.game img');
    Array.from(images).forEach((element)=>{
        element.classList.remove("active")
        element.style.visibility= "visible";
    })
}

const MuestraAleatorio = () =>{
    let random = Math.floor(Math.random() * 9)+1;
    if (random ===POSICIONANTERIOR && random<9) random++
    else if (random ===POSICIONANTERIOR && random===9) random--
    let image = document.querySelector(`#img${random}`);
    image.classList.add("active");
    image.style.visibility= "visible";
    POSICIONANTERIOR = random;
}