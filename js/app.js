import {API} from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit',(e) =>{
    e.preventDefault();
   // obtener datos del formlario
   const artista = document.querySelector('#artista').value,  
         cancion = document.querySelector('#cancion').value;

         console.log(artista);
         console.log(cancion);

    if(artista ===  ' ' || cancion === ''){   
        //si el usuario deja los campos vacios mostrar error 
        UI.divMensajes.className = 'error';
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        setTimeout(()=>{
            UI.divMensajes.classList.remove('error');
            UI.divMensajes.innerHTML = '';
        },3000)
    }else{
           //si los campos  esta completo, relixar consulta a la API
           const api = new API(artista , cancion);
           
           api.consultarAPI() 
             .then(data => {
                   if(data.respuesta.lyrics){
                      console.log(data.respuesta.lyrics);
                      const letra = data.respuesta.lyrics;
                      
                      UI.divResultado.textContent = letra ;
                    }else{
                        console.log('No EXCISTE');
                        //la CANCION NO EXISTE
                                UI.divMensajes.className = 'error';
                                UI.divMensajes.innerHTML = 'La cancion no  existe, prueba con otra busqueda';
                                setTimeout(()=>{
                                    UI.divMensajes.classList.remove('error');
                                    UI.divMensajes.innerHTML = '';
                                },3000)
                    }
                    
                    
             });
    }
});