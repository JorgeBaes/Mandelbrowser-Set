
let points = mandelbrot.points
let width_pixel = mandelbrot.width_pixel        
const zoom_factor = 1.008 /// DO NOT CHANGE

let enable_zoom_text = mandelbrot.enable_zoom_text     
let font_size = mandelbrot.font_size                 
let zoom_text_color = mandelbrot.zoom_text_color     
let zoom_orientation = mandelbrot.zoom_orientation    

let enable_center_point = mandelbrot.enable_center_point  
let center_point_radius = mandelbrot.center_point_radius     
let center_point_color = mandelbrot.center_point_color
         
let file_counter = mandelbrot.file_counter       
let file_name = mandelbrot.file_name   

let enable_download_files = mandelbrot.enable_download_files  
let enable_zoom = mandelbrot.enable_zoom  
let stop_zooming = false
let smooth_coloring = false


function hexToHSLIndex(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return h
}
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
function hexToDecimal(string){
  const hex_digits_list = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
  return string.split('')
  .map((el, index, arr) => {
    return parseInt(hex_digits_list.indexOf(el.toLowerCase())*16**(arr.length - 1 - index))
  })
  .reduce((acc, el)=> acc + el,0)
}
function check_NaN_greater_than_1(number){
  const parsed_number = parseInt(number)
  if(isNaN(parsed_number)){
    return false
  }else if(parsed_number < 1){
    return false
  }
  return true
}
function replace_all(string,c,r){
  let s = string
  while(s.indexOf(c) != -1){
      s = s.replace(c,r)
  }
  return s
} 
if(window.location.hash.length>2){
  let hash = window.location.hash.slice(2)
  while(hash[0] == ' '){
    hash = hash.slice(1)
  }
  hash = replace_all(hash,'%22','"')
 
  function get_point(hash){
    const point = {pX:null,pY:null,zoom:null,hue:null,inmandelbrot_color:null,smooth_coloring:null}
    point.pX = parseFloat(hash.slice(4,hash.indexOf(',')))
    hash = hash.slice(hash.indexOf(',')+1)
    point.pY = parseFloat(hash.slice(3,hash.indexOf(',')))
    hash = hash.slice(hash.indexOf(',')+1)
    point.zoom = parseFloat(hash.slice(5,hash.indexOf(',')))
    hash = hash.slice(hash.indexOf(',')+1)
    point.hue = String(hash.slice(5,hash.indexOf(',')-1))
    hash = hash.slice(hash.indexOf(',')+1)
    point.inmandelbrot_color = String(hash.slice(20,hash.indexOf(',')-1))
    hash =hash.slice(hash.indexOf(',')+1)
    point.smooth_coloring =  String(hash.slice(16,20)) == 'true'
    hash =hash.slice(hash.indexOf(',')+1)
    point.max_iteration = parseInt(hash.slice(hash.indexOf('max_iteration:')+14,hash.indexOf('}')))    
    hash = hash.slice((hash.indexOf(',')==-1?hash.indexOf('}')-1:hash.indexOf('pX'))-1) 
    return [point,hash]
}
  
  points = []
  let possible_string = true
  let hash_1 = hash.slice(hash.indexOf('list_of_points:')+'list_of_points:'.length,hash.indexOf(']',hash.indexOf('list_of_points:')+'list_of_points:'.length))
  hash_1 = hash_1.slice(hash_1.indexOf('pX')-1)
  points = []
  while(possible_string){
      const candidate = get_point(hash_1)
      possible_string = !isNaN(candidate[0].pX) && !isNaN(candidate[0].pX) && !isNaN(candidate[0].zoom) && typeof candidate[0].hue == typeof 'as'&& typeof candidate[0].inmandelbrot_color == typeof 'as'
    
      if(possible_string){
          hash_1 = candidate[1]
          points.push(candidate[0])            
      }else{
          possible_string = false
      }
  }
// console.log(points.slice())
  if(points.length == 0 ){
      points = 
        [
            {pX:0,pY:0,zoom:0.4,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:5000},
            {pX:-0.5693565694919585,pY:0.6258026753606527,zoom:2.500243900802678,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},
            {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},
            {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:5000},
            {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:3000},
            {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
            {pX:-0.4700714292566631,pY:0.6225923237926176,zoom:244.22399969899936,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
            {pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
            {pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#b094ff',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
            {pX:-0.4728824174579407,pY:0.6242424830733859,zoom:59642.45273151413,hue:'#94ffa6',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:2000},
            {pX:-0.4728784996493322,pY:0.6242404321795244,zoom:932049.7039007312,hue:'#ffdd94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:2000},
            {pX:-0.4728785792502104,pY:0.6242403629605768,zoom:5825878.968556862,hue:'#ffe294',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},
            {pX:-0.47287873949064896,pY:0.6242402555424178,zoom:36415295.894872226,hue:'#ffe294',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},
            {pX:-0.47287874078399195,pY:0.6242402553298096,zoom:227617803.6426977,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},
            {pX:-0.4728787408787868,pY:0.6242402553559475,zoom:3557048658.658094,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:6000},
            {pX:-0.4728787408823051,pY:0.6242402553544527,zoom:138974326020.80273,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:6000},
            {pX:-0.4728787408822726,pY:0.624240255354295,zoom:868674277504.1874,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},
            {pX:-0.4728787408822726,pY:0.624240255354295,zoom:868674277504.1874,hue:'#ffaf94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:2171791626353.6013,hue:'#ffaf94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:2171791626353.6013,hue:'#b494ff',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:8000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:10000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:15000},
            {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:20000}
        ]
  }
  ////////////////
  function return_int(string,searched){
    const start_index = string.indexOf(searched+':')+searched.length+1
    const end_index = string.indexOf(',',start_index)
    let number = string.slice(start_index,end_index)
    if(number[0]=="'" || number[0]=='"'){
        number = number.slice(1)
    }
    if(number[number.length-1]=="'" || number[number.length-1] =='"'){
        number = number.slice(0,number.length-1)
    }
    return parseInt(number)
  }
  function return_text(string,searched){
      const start_index = string.indexOf(searched+':')+searched.length+1
      const end_index = string.indexOf(',',start_index)
      let text = string.slice(start_index,end_index)
      if(text[0]=="'" || text[0]=='"'){
          text = text.slice(1)
      }
      if(text[text.length-1]=="'" || text[text.length-1] =='"'){
          text = text.slice(0,text.length-1)
      }
      return text
  }
  function return_boolean(string,searched){
      const start_index = string.indexOf(searched+':')+searched.length+1
      const end_index = string.indexOf(',',start_index)
      let boolean = string.slice(start_index,end_index)
      if(boolean[0]=="'" || boolean[0]=='"'){
          boolean = boolean.slice(1)
      }
      if(boolean[boolean.length-1] =="'" || boolean[boolean.length-1] =='"'){
          boolean = boolean.slice(0,boolean.length-1)
      }
      return boolean == 'true'
  }

  let hashCode = hash.slice(0,hash.indexOf('list_of_points:'))

  width_pixel = return_int(hashCode,'width')
  font_size = return_int(hashCode,'text_size')
  center_point_radius = return_int(hashCode,'point_size')
  file_counter = return_int(hashCode,'file_counter')

  zoom_orientation = return_text(hashCode,'zoom_orientation')
  file_name = return_text(hashCode,'file_name')
  zoom_text_color = return_text(hashCode,'text_color')
  center_point_color = return_text(hashCode,'point_color')

  enable_download_files = return_boolean(hashCode,'enable_download')
  enable_zoom_text = return_boolean(hashCode,'enable_text')
  enable_zoom = return_boolean(hashCode,'enable_zoom')
  enable_center_point = return_boolean(hashCode,'enable_point')

  
  if(isNaN(file_counter)){
    file_counter = parseInt(window.prompt('Type the file counter to begin the animation: '))
    if(isNaN(file_counter)){
      file_counter = 1           
    }
    if(file_counter < 1){
      file_counter = 1
    }
  }
}

for(let i in points){
  points[i].hue = hexToHSLIndex(points[i].hue)
}

let pX,pX2,pY,pY2,zoom,next_zoom,hue,next_hue,next_max_iter,
  inmandelbrot_color,next_inmandelbrot_color,
  R_increment,G_increment,B_increment,
  x_increment,y_increment,hue_increment,steps,
  r_in,g_in,b_in;
let max_iteration_incr = null
let max_file_counter = 0
let counter = 0
let file_counter_track = 0
function convert_to_two_digit(string){
  return string.length == 1?'0'+string:string
}
function atribute_points(){
    if(points.length > 1){
        pX = points[0].pX
        pY = points[0].pY
        zoom = points[0].zoom
        hue = points[0].hue
        inmandelbrot_color = points[0].inmandelbrot_color
        smooth_coloring = points[0].smooth_coloring
        max_iteration = points[0].max_iteration
      
        pX2 = points[1].pX
        pY2 = points[1].pY
        next_zoom = points[1].zoom
        next_hue = points[1].hue
        next_inmandelbrot_color = points[1].inmandelbrot_color
        next_max_iter = points[1].max_iteration
        if(next_zoom === 0 && next_zoom === Infinity){
            steps = Infinity
            x_increment = 0
            y_increment = 0
            hue_increment = 0
            inmandelbrot_color_increment = 0
            R_increment = 0
            G_increment = 0
            B_increment = 0
        }else{
            if(next_zoom != zoom){
              steps = Math.round(Math.abs(Math.log((next_zoom*zoom_factor/zoom))/Math.log(zoom_factor)))
            }else if (next_hue != hue){
              steps = Math.abs(next_hue-hue)
            }else if (points[1].max_iteration!=max_iteration){
              steps = 100
            }else{
              steps = Math.round(Math.abs(Math.log((next_zoom*zoom_factor/zoom))/Math.log(zoom_factor)))
            }
            x_increment = (pX2-pX)/steps
            y_increment = (pY2-pY)/steps
            hue_increment = (next_hue-hue)/steps
            max_iteration_incr = (next_max_iter - max_iteration)/steps
            
            const R_Nextinmand = hexToDecimal(next_inmandelbrot_color.slice(1,3))
            const G_Nextinmand = hexToDecimal(next_inmandelbrot_color.slice(3,5))
            const B_Nextinmand = hexToDecimal(next_inmandelbrot_color.slice(5))
            const R_inmand = hexToDecimal(inmandelbrot_color.slice(1,3))
            const G_inmand = hexToDecimal(inmandelbrot_color.slice(3,5))
            const B_inmand = hexToDecimal(inmandelbrot_color.slice(5))  
            R_increment = (R_Nextinmand-R_inmand)/steps
            G_increment = (G_Nextinmand-G_inmand)/steps
            B_increment = (B_Nextinmand-B_inmand)/steps
            r_in = hexToDecimal(inmandelbrot_color.slice(1,3)),
            g_in = hexToDecimal(inmandelbrot_color.slice(3,5)),
            b_in = hexToDecimal(inmandelbrot_color.slice(5))
          }
        points = points.slice(1)
    }else{
        pX = points[0].pX
        pY = points[0].pY
        zoom = points[0].zoom
        hue = points[0].hue
        inmandelbrot_color = points[0].inmandelbrot_color
        smooth_coloring = points[0].smooth_coloring
        max_iteration = points[0].max_iteration

        stop_zooming = true
    }
    counter = 0
    // console.log('pX',pX)
    // console.log('pY',pY)
    // console.log('zoom',zoom)
    // console.log('hue',hue)
    // console.log('pX2',pX2)
    // console.log('pY2',pY2)
    // console.log('next_zoom',next_zoom)
    // console.log('next_hue',next_hue)
    // console.log('counter',counter)
    // console.log('max_iteration_incr',max_iteration_incr)
    
}
function update_values(){
  if(next_zoom < zoom){
      zoom /= zoom_factor
  }else if (next_zoom > zoom){
      zoom *= zoom_factor
  }
  max_iteration += max_iteration_incr
  counter++
  file_counter_track++
  
  if(counter >= steps){
      atribute_points()
  }
  
  if(!(pX2 - Math.abs(x_increment) < pX && pX < pX2 + Math.abs(x_increment))){
      pX += x_increment
  }
  if(!(pY2 - Math.abs(y_increment) < pY && pY < pY2 + Math.abs(y_increment))){
      pY += y_increment
  }
  hue += hue_increment 
  r_in += R_increment
  g_in += G_increment
  b_in += B_increment
  inmandelbrot_color = `#${convert_to_two_digit(parseInt(r_in).toString(16))}${convert_to_two_digit(parseInt(g_in).toString(16))}${convert_to_two_digit(parseInt(b_in).toString(16))}`
} 
function max_file_counter_finder(point_list){
  let max_file_counter_aux = 0
  const points = point_list.slice()
  for(let i=0; i < points.length-1;i++){
      if(points[i].zoom != points[parseInt(i)+1].zoom){
          max_file_counter_aux+=Math.abs(Math.round(Math.log(points[i].zoom/points[parseInt(i)+1].zoom)/Math.log(1.008)))
      }else if (points[i].hue != points[parseInt(i)+1].hue){
          max_file_counter_aux += Math.abs(points[parseInt(i)+1].hue-points[i].hue)
      }else if (points[i].max_iteration!=points[parseInt(i)+1].max_iteration){
          max_file_counter_aux += 100
      }else{
          max_file_counter_aux+=Math.abs(Math.round(Math.log(points[i].zoom/points[parseInt(i)+1].zoom)/Math.log(1.008)))
      }
  }
  return max_file_counter_aux + point_list.length
}
max_file_counter = max_file_counter_finder(points)
atribute_points()
if(points.length == 1){
  enable_zoom = false
}else{
  for(let i = 1; i < file_counter; i++){
    update_values()
  }
}



const canvas = document.querySelector('canvas')
const resol = 0.5625
canvas.width = width_pixel
canvas.height = width_pixel*resol
const c = canvas.getContext('2d')
c.textBaseline = 'middle'
c.textAlign = 'center'
c.font = `${font_size}px Verdana`

const cH = canvas.height
const cW = canvas.width 
const alfa = 4*cH/cW
let dx = 4/zoom
let dy = alfa/zoom
let offsetX = -dx/2
let offsetY = dy/2
let point_offsetX = cW/2
let point_offsetY = cH/2



// console.log(points) 
// console.log('width_pixel',width_pixel)
// console.log('zoom',zoom)
// console.log('max_iteration',max_iteration)
// console.log('zoom_orientation',zoom_orientation)
// console.log('enable_zoom_text',enable_zoom_text)
// console.log('zoom_text_color',zoom_text_color)
// console.log('converted_font_size',font_size)
// console.log('file_counter',file_counter)
// console.log('file_name',file_name)
// console.log('enable_download_files',enable_download_files)
// console.log('enable_zoom',enable_zoom)
// console.log(points)
// console.log(enable_center_point)
// console.log(center_point_color)
// console.log(enable_center_point)
// console.log(center_point_radius)   