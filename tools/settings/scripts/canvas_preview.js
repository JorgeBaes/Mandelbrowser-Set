
let width_pixel_c2 = 120     
         
          
let stop_zooming = false

const pause_svg = `<svg fill="white" class="pointer svg_pause_play" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z"/></svg>`
const play_svg =  `<svg  fill="white" class="pointer svg_pause_play" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z"/></svg>`
document.querySelector("#svg_pause_play").innerHTML = pause_svg
// let pX,pX2,pY,pY2,zoom,next_zoom,hue,next_hue,
//   inmandelbrot_color,next_inmandelbrot_color,
//   R_increment,G_increment,B_increment,
//   x_increment,y_increment,hue_increment,steps,
//   r_in,g_in,b_in;
// let counter = 0

const canvas2 = document.querySelector('#canvas2')
canvas2.width = width_pixel_c2
canvas2.height = width_pixel_c2*resol
const c2 = canvas2.getContext('2d')
c2.textBaseline = 'middle'
c2.textAlign = 'center'

const cH_c2 = canvas2.height
const cW_c2 = canvas2.width 
const alfa_c2 = 4*cH_c2/cW_c2
let dx_c2 = 4/zoom
let dy_c2 = alfa_c2/zoom
let offsetX_c2 = -dx_c2/2
let offsetY_c2 = dy_c2/2
let point_offsetX_c2 = cW_c2/2
let point_offsetY_c2 = cH_c2/2

function set_dx_c2_dy_c2(){
    dx_c2 = 4/zoom
    dy_c2 = alfa_c2/zoom
    if(zoom_orientation == 'center'){
        offsetX_c2 = -dx_c2/2
        offsetY_c2 = dy_c2/2
        point_offsetX_c2_c2 = cW_c2/2
        point_offsetY_c2_c2 = cH_c2/2
    }else if(zoom_orientation == 'top-left'){
        offsetX_c2 = 0
        offsetY_c2 = 0
        point_offsetX_c2_c2 = 0
        point_offsetY_c2_c2 = 0
    }else if(zoom_orientation == 'top-right'){
        offsetX_c2 = -dx_c2
        offsetY_c2 = 0
        point_offsetX_c2_c2 = cW_c2
        point_offsetY_c2_c2 = 0
    }else if(zoom_orientation == 'bottom-left'){
        offsetX_c2 = 0
        offsetY_c2 = dy_c2
        point_offsetX_c2_c2 = 0
        point_offsetY_c2_c2 = cH_c2
    }else if(zoom_orientation == 'bottom-right'){
        offsetX_c2 = -dx_c2
        offsetY_c2= dy_c2
        point_offsetX_c2_c2 = cW_c2
        point_offsetY_c2_c2 = cH_c2
    }else if(zoom_orientation == 'mid-left'){
        offsetX_c2 = 0
        offsetY_c2 = dy_c2/2
        point_offsetX_c2_c2 = 0
        point_offsetY_c2_c2 = cH_c2/2
    }else if(zoom_orientation == 'mid-right'){
        offsetX_c2 = -dx_c2
        offsetY_c2= dy_c2/2
        point_offsetX_c2_c2 = cW_c2
        point_offsetY_c2_c2 = cH_c2/2
    }else if(zoom_orientation == 'mid-top'){
        offsetX_c2 = -dx_c2/2
        offsetY_c2 = 0
        point_offsetX_c2_c2 = cW_c2/2
        point_offsetY_c2_c2 = 0
    }else if(zoom_orientation == 'mid-bottom'){
        offsetX_c2 = -dx_c2/2
        offsetY_c2 = dy_c2
        point_offsetX_c2_c2 = cW_c2/2
        point_offsetY_c2_c2 = cH_c2
    }
}

let file_counter_preview = file_counter
function start_zoom(){
    points = points_list.slice()
    atribute_points()
    counter = 0
    file_counter_preview = file_counter
    for(let i = 1; i < file_counter; i++){
        update_mandelbrot_values()
    }
    if(document.querySelector('#enable_zoom').checked){
        interval_iteration = setInterval(function () {
            if(!stop_zooming){
                update_mandelbrot_values()
                set_dx_c2_dy_c2() 
                dx = 4/zoom
                dy = alfa/zoom
                const x1 = pX + offsetX_c2
                const y1 = pY + offsetY_c2
                for (let i = 0; i < cW_c2; i++) { 
                    for (let j = 0; j < cH_c2; j++) { 
                        const x = x1 + i*dx_c2/cW_c2
                        const y = y1 - j*dy_c2/cH_c2
                        c2.strokeStyle = inMandelbrot(x, y); 
                        c2.strokeRect(i, j, 1, 1)  
                    }
                }   
                file_counter_preview++    
                document.querySelector('#preview_file_counter').innerText = file_counter_preview
            }
        }, 0)    
    }else{        
        set_dx_c2_dy_c2() 
        dx = 4/zoom
        dy = alfa/zoom
        const x1 = pX + offsetX_c2
        const y1 = pY + offsetY_c2
        for (let i = 0; i < cW_c2; i++) { 
            for (let j = 0; j < cH_c2; j++) { 
                const x = x1 + i*dx_c2/cW_c2
                const y = y1 - j*dy_c2/cH_c2
                c2.strokeStyle = inMandelbrot(x, y); 
                c2.strokeRect(i, j, 1, 1)  
            }
        } 
        update_mandelbrot_values()  
        document.querySelector('#preview_file_counter').innerText = ''
    }
}  
function change_pause_play_state(){
    stop_zooming = !stop_zooming
    if(stop_zooming){
        document.querySelector("#svg_pause_play").innerHTML = play_svg
    }else if(!stop_zooming){        
        document.querySelector("#svg_pause_play").innerHTML = pause_svg
    }
}  
