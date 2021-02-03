// const limit_zoom = 129518343566309890
const garbageSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="animateSVG" height="35px" width="35px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<title>Deletar</title>
<g>
	<g>
		<path d="M436,60h-90V45c0-24.813-20.187-45-45-45h-90c-24.813,0-45,20.187-45,45v15H76c-24.813,0-45,20.187-45,45v30    c0,8.284,6.716,15,15,15h16.183L88.57,470.945c0.003,0.043,0.007,0.086,0.011,0.129C90.703,494.406,109.97,512,133.396,512    h245.207c23.427,0,42.693-17.594,44.815-40.926c0.004-0.043,0.008-0.086,0.011-0.129L449.817,150H466c8.284,0,15-6.716,15-15v-30    C481,80.187,460.813,60,436,60z M196,45c0-8.271,6.729-15,15-15h90c8.271,0,15,6.729,15,15v15H196V45z M393.537,468.408    c-0.729,7.753-7.142,13.592-14.934,13.592H133.396c-7.792,0-14.204-5.839-14.934-13.592L92.284,150h327.432L393.537,468.408z     M451,120h-15H76H61v-15c0-8.271,6.729-15,15-15h105h150h105c8.271,0,15,6.729,15,15V120z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C271,186.716,264.284,180,256,180z"/>
	</g>
</g>
<g>
	<g>
		<path d="M346,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C361,186.716,354.284,180,346,180z"/>
	</g>
</g>
<g>
	<g>
		<path d="M166,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C181,186.716,174.284,180,166,180z"/>
	</g>
</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>/g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`



function replace_all(string,c,r){
    let s = string
    while(s.indexOf(c) != -1){
        s = s.replace(c,r)
    }
    return s
}
function return_value(name,string){
    console.log(string,'22222222232321')
    let value = string.slice(string.indexOf(name))
    console.log(value)
    while(value[0] != ':'){
        value = value.slice(1)
        console.log('firstWhile')
    }
    value = value.slice(1)
    while(value[0] == ' '){
        value = value.slice(1)
        console.log('secondWHILE')
    }
    value = value.slice(0,value.indexOf(','))
    while(value[value.length-1] == ' '){
        value = value.slice(0,value.length-1)
        console.log('TIERHSWhile')
    }
    return value
}
function get_point_array(str){
    let string = str.slice(str.indexOf('[')+1,(str.indexOf(']')+1))
    string = replace_all(string,' ','')
    let array = []
    console.log(string)
    while(string.indexOf('}')!=-1){
        let string_to_push = string.slice(string.indexOf('{'),string.indexOf('}',string.indexOf('{'))) + ','
        array.push(string_to_push)
        string = string.slice(string.indexOf('}')+1)
    }
    array = array.map( el => {
        const point = {pX:null,pY:null,zoom:null,hue:null,inmandelbrot_color:null,smooth_coloring:null,max_iteration:null}
        point.pX = parseFloat(return_value('pX',el))
        point.pY = parseFloat(return_value('pY',el))
        point.zoom = parseFloat(return_value('zoom',el))
        point.hue = return_value('hue',el)
        point.inmandelbrot_color = return_value('inmandelbrot_color',el)
        point.smooth_coloring = return_value('smooth_coloring',el) == 'true'
        point.max_iteration = parseFloat(return_value('max_iteration',el))
        return point
    })
    return array
}


let hash_code = window.location.hash.slice(1)
hash_code = replace_all(hash_code,'%22','"')
hash_code = replace_all(hash_code,'"','')
hash_code = replace_all(hash_code,"'",'')
hash_code = replace_all(hash_code,"`",'')
hash_code = replace_all(hash_code,'%20',' ')



let points = get_point_array(hash_code)

const julia_point = { x: -0.47287874088227777 , y: 0.6242402553543369 }
let fractal = 'Mandelbrot'

if(hash_code.indexOf('fractal') != -1){
    fractal = return_value('fractal',hash_code)
}
if(hash_code.indexOf('cX') != -1){
    julia_point.x = parseFloat(return_value('cX',hash_code))
}
if(hash_code.indexOf('cY') != -1){
    julia_point.y = parseFloat(return_value('cY',hash_code))
}

if(points.length == 0 ){
    points = [
        {pX:0,pY:0,zoom:0.4,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:5000},
        {pX:-0.5693565694919585,pY:0.6258026753606527,zoom:2.500243900802678,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},
        {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},
        {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:5000},
        {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:3000},
        {pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
        {pX:-0.4700714292566631,pY:0.6225923237926176,zoom:244.22399969899936,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
        {pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},
        {pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#b094ff',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:3000},
        {pX:-0.4728824174579407,pY:0.6242424830733859,zoom:59642.45273151413,hue:'#94ffa6',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:3000},
        {pX:-0.4728784996493322,pY:0.6242404321795244,zoom:932049.7039007312,hue:'#94ffa6',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},
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
        {pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:15000}
    ]
}
for(let i in points){
    points[i].hue = hexToHSLIndex(points[i].hue)
}
let points_list = points.slice()
const width_pixel = 720
let width_pixel_zoom = 1080
let height_pixel_zoom = 608
const canvas = document.querySelector('#canvas1')
const resol = 0.5625
canvas.width = width_pixel
canvas.height = width_pixel*resol
const c = canvas.getContext('2d')
c.textBaseline = 'middle'
c.textAlign = 'center'

let cH = canvas.height
let cW = canvas.width 

let smooth_coloring = points_list[0].smooth_coloring
let pX = points_list[0].pX
let pY = points_list[0].pY
let zoom = points_list[0].zoom
let max_iteration = points_list[0].max_iteration
let zoom_factor = 1.008
let inmandelbrot_color = points_list[0].inmandelbrot_color
let hue = points_list[0].hue
let zoom_orientation = 'center' 
let enable_zoom_text = false 
let zoom_text_color = '#002688'
let center_point_color = '#FFFFFF'
let center_point_size = 2
let font_size = 18
let converted_font_size = font_size/width_pixel*width_pixel_zoom
let enable_center_point = false
let file_counter = 1  
let file_name = 'mandelbrot_zoom' 
let enable_download_files = false 
let enable_zoom = true
c.font = `${font_size}px Verdana`
let max_file_counter = max_file_counter_finder(points_list)
// for(let i=0; i < points_list.length-1;i++){
//     max_file_counter+=Math.abs(Math.round(Math.log(points_list[i].zoom/points_list[parseInt(i)+1].zoom)/Math.log(1.008)))
// }

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
    return max_file_counter_aux
  }

// document.querySelector('#zoom').value = zoom
document.querySelector('#text_color').value = zoom_text_color
document.querySelector('#allow_zoom_text').checked = enable_zoom_text
document.querySelector('#zoom_text_font_size').value = font_size
document.querySelector('#file_counter').value = file_counter
document.querySelector('#file_name').value = file_name
document.querySelector('#pixel_width').value = width_pixel_zoom
document.querySelector('#pixel_height').value = height_pixel_zoom
document.querySelector('#enable_download').checked = enable_download_files
document.querySelector('#enable_zoom').checked = enable_zoom
document.querySelector('#allow_zoom_point').checked = enable_center_point 
document.querySelector('#zoom_point_color').value = center_point_color
document.querySelector('#zoom_point_size').value = center_point_size
    
const alfa = 4*cH/cW
let dx = 4/zoom
let dy = alfa/zoom
let offsetX = -dx/2
let offsetY = dy/2
let point_offsetX = cW/2
let point_offsetY = cH/2

let x1 = pX +offsetX
let y1 = pY + offsetY
// Some constants used with smoothColor
var logBase = 1.0 / Math.log(2.0);
var logHalfBase = Math.log(0.5)*logBase;
function hsv_to_rgb(h, s, v){
  if ( v > 1.0 ) v = 1.0;
  var hp = h/60.0;
  var c = v * s;
  var x = c*(1 - Math.abs((hp % 2) - 1));
  var rgb = [0,0,0];

  if ( 0<=hp && hp<1 ) rgb = [c, x, 0];
  if ( 1<=hp && hp<2 ) rgb = [x, c, 0];
  if ( 2<=hp && hp<3 ) rgb = [0, c, x];
  if ( 3<=hp && hp<4 ) rgb = [0, x, c];
  if ( 4<=hp && hp<5 ) rgb = [x, 0, c];
  if ( 5<=hp && hp<6 ) rgb = [c, 0, x];

  var m = v - c;
  rgb[0] += m;
  rgb[1] += m;
  rgb[2] += m;

  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;
  return rgb;
}
function smoothColor(steps, n, Tr, Ti){
  return 5 + n - logHalfBase - Math.log(Math.log(Tr+Ti))*logBase;
}
function pickColorHSV(steps, n, Tr, Ti){
  var v = smoothColor(steps, n, Tr, Ti);
  var c = hsv_to_rgb(hue+360.0*v/steps, 1.0, 10.0*v/steps);
  return c;
}
function addRGB(v, w)
{
  v[0] += w[0];
  v[1] += w[1];
  v[2] += w[2];
  v[3] += w[3];
  return v;
}
function f_mandelbrot(x, y, cx, cy) {
    return { x: x ** 2 - y ** 2 + cx, y: 2.0 * x * y + cy }
}
function f_julia(x, y) {
    return { x: x ** 2 - y ** 2 + julia_point.x, y: 2.0 * x * y + julia_point.y }
}
function f_burning_ship(x, y, cx, cy) {
    return { x: x ** 2 - y ** 2 - cx, y: (Math.abs(2*y*x) -cy) }
}

function in_main_cardioid(x,y){
    const teta = Math.atan2(Math.abs(y),x)
    return (x**2+y**2) <= (1/2*Math.cos(teta) - 1/4*Math.cos(2*teta))**2 + (1/2*Math.sin(teta) - 1/4*Math.sin(2*teta))**2
}
function inMandelbrot(x, y) {    
    if(fractal == 'Mandelbrot'){
        if(in_main_cardioid(x,y)){
            return inmandelbrot_color
        } 
    }
    const cy = y    
    const cx = x
    let zx = x
    let zy = y
    let xOld = 0
    let yOld = 0
    let period = 0
    for (let i = 0; i < max_iteration; i++) {
        let vet
        if(fractal == 'Mandelbrot'){
            vet = f_mandelbrot(zx, zy, cx, cy)
        }else if(fractal == 'Burning Ship'){
            vet = f_burning_ship(zx, zy, cx, cy)
        }else if(fractal == 'Julia Set'){
            vet = f_julia(zx, zy)
        }
        zx = vet.x
        zy = vet.y
        if (zx ** 2 + zy ** 2 >= 4) {
            if(smooth_coloring){
                var color = [0, 0, 0];
                color = addRGB(color, pickColorHSV(max_iteration, i, zx ** 2, zy ** 2));
                return `rgb(${color[0]},${color[1]},${color[2]})`      
            }else{
                return `hsl(${hue+(i**(1/1.11))}, ${(max_iteration - i) / max_iteration * 70 + 20}%, ${(i) / max_iteration * 50 + 50}%)`
            }
        }
        if (zx == xOld && zy == yOld){            
            return inmandelbrot_color
        }
        period++
        if(period>20){
            xOld = zx
            yOld = zy
            period = 0
        }
    }
    return inmandelbrot_color
}
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
function check_for_valid_file_name(){
    const allowed_caracters = 'abcdefghijklmnopqrstuvwxyz_1234567890'
    for(let c of file_name.toLowerCase()){
        if(allowed_caracters.indexOf(c) == -1){
            window.alert('Invalid file name. Only letters, numbers and "_" are allowed.')
            file_name = 'zoom_mandelbrot'
            document.querySelector('#file_name').value = 'zoom_mandelbrot'
            break;
        }
    }
}
function update_values(){
    zoom_orientation = document.querySelector('#zoom_orientation').value
    zoom_text_color = document.querySelector('#text_color').value  
    center_point_color = document.querySelector('#zoom_point_color').value

    enable_center_point = document.querySelector('#allow_zoom_point').checked
    enable_zoom_text = document.querySelector('#allow_zoom_text').checked
    enable_download_files = document.querySelector('#enable_download').checked
    enable_zoom = document.querySelector('#enable_zoom').checked

    center_point_size = Math.abs(parseInt(document.querySelector('#zoom_point_size').value))
    font_size = Math.abs(parseInt(document.querySelector('#zoom_text_font_size').value))
    width_pixel_zoom = parseInt(document.querySelector('#pixel_width').value)
    converted_font_size = font_size/width_pixel*width_pixel_zoom
    file_counter = Math.abs(parseInt(document.querySelector('#file_counter').value))
    file_name = document.querySelector('#file_name').value
    if(file_counter == 0){
        file_counter = 1
    }else if(file_counter > max_file_counter){
        file_counter = max_file_counter
    }
    if(file_counter <= 1){
        file_counter = 1
    }
    document.querySelector('#file_counter').value = file_counter
    document.querySelector('#preview_file_title').innerText = document.querySelector('#file_name').value

    if(width_pixel < 50){
        width_pixel = 100
    }
    check_for_valid_file_name()
}
function update_width(){
    width_pixel_zoom = parseInt(document.querySelector('#pixel_width').value)
    if(width_pixel_zoom < 50){
        width_pixel_zoom = 50
    }
    height_pixel_zoom = parseInt(width_pixel_zoom*resol)
    document.querySelector('#pixel_height').value = height_pixel_zoom
    document.querySelector('#pixel_width').value = width_pixel_zoom
    update_values()
}
function update_height(){
    height_pixel_zoom = parseInt(document.querySelector('#pixel_height').value)
    if(height_pixel_zoom < 28){
        height_pixel_zoom = 28
    }
    document.querySelector('#pixel_height').value = height_pixel_zoom
    document.querySelector('#pixel_width').value = width_pixel_zoom
    update_values()
}
function set_dx_dy(){
    dx = 4/zoom
    dy = alfa/zoom
    if(zoom_orientation == 'center'){
        offsetX = -dx/2
        offsetY = dy/2
        point_offsetX = cW/2
        point_offsetY = cH/2
    }else if(zoom_orientation == 'top-left'){
        offsetX = 0
        offsetY = 0
        point_offsetX = 0
        point_offsetY = 0
    }else if(zoom_orientation == 'top-right'){
        offsetX = -dx
        offsetY = 0
        point_offsetX = cW
        point_offsetY = 0
    }else if(zoom_orientation == 'bottom-left'){
        offsetX = 0
        offsetY = dy
        point_offsetX = 0
        point_offsetY = cH
    }else if(zoom_orientation == 'bottom-right'){
        offsetX = -dx
        offsetY= dy
        point_offsetX = cW
        point_offsetY = cH
    }else if(zoom_orientation == 'mid-left'){
        offsetX = 0
        offsetY = dy/2
        point_offsetX = 0
        point_offsetY = cH/2
    }else if(zoom_orientation == 'mid-right'){
        offsetX = -dx
        offsetY= dy/2
        point_offsetX = cW
        point_offsetY = cH/2
    }else if(zoom_orientation == 'mid-top'){
        offsetX = -dx/2
        offsetY = 0
        point_offsetX = cW/2
        point_offsetY = 0
    }else if(zoom_orientation == 'mid-bottom'){
        offsetX = -dx/2
        offsetY = dy
        point_offsetX = cW/2
        point_offsetY = cH
    }
}
function apply_effects(){
    update_values()
    set_dx_dy()
    // for(let i = 1; i < file_counter; i++){
    //     update_mandelbrot_values()
    // }
    // console.log('pX',pX)
    // console.log('pY',pY)
    // console.log('zoom',zoom)
    // console.log('hue',hue)
    // console.log('pX2',pX2)
    // console.log('pY2',pY2)
    // console.log('next_zoom',next_zoom)
    // console.log('next_hue',next_hue)
    // console.log('counter',counter)
    
    dx = 4/zoom
    dy = alfa/zoom
    
    x1 = pX + offsetX
    y1 = pY + offsetY

    for (let i = 0; i < cW; i++) { 
        for (let j = 0; j < cH; j++) { 
            const x = x1 + i*dx/cW
            const y = y1 - j*dy/cH
            c.strokeStyle = inMandelbrot(x, y); 
            c.strokeRect(i, j, 1, 1)   
        }
    }  
    if(enable_zoom_text){
        c.fillStyle = zoom_text_color
        c.font = `${font_size}px Verdana`
        c.fillText(`Zoom = ${zoom}`, cW / 2, 15)
    }
    if(enable_center_point){
        c.fillStyle = center_point_color
        c.beginPath()
        c.arc(point_offsetX,point_offsetY,center_point_size,0,2*Math.PI)
        c.fill()    
    }  
}
function apply_effects_according_to_file_counter(){
    points = points_list.slice()
    atribute_points()
    counter = 0
    for(let i = 1; i < file_counter; i++){
        update_mandelbrot_values()
    }
    set_dx_dy()
    // console.log('pX',pX)
    // console.log('pY',pY)
    // console.log('zoom',zoom)
    // console.log('hue',hue)
    // console.log('pX2',pX2)
    // console.log('pY2',pY2)
    // console.log('next_zoom',next_zoom)
    // console.log('next_hue',next_hue)
    // console.log('counter',counter)
    
    dx = 4/zoom
    dy = alfa/zoom
    
    x1 = pX + offsetX
    y1 = pY + offsetY

    for (let i = 0; i < cW; i++) { 
        for (let j = 0; j < cH; j++) { 
            const x = x1 + i*dx/cW
            const y = y1 - j*dy/cH
            c.fillStyle = inMandelbrot(x, y); 
            c.fillRect(i, j, 1, 1)   
        }
    }  
    if(enable_zoom_text){
        c.fillStyle = zoom_text_color
        c.font = `${font_size}px Verdana`
        c.fillText(`Zoom = ${zoom}`, cW / 2, 15)
    }
    if(enable_center_point){
        c.fillStyle = center_point_color
        c.beginPath()
        c.arc(point_offsetX,point_offsetY,center_point_size,0,2*Math.PI)
        c.fill()    
    } 
}
function update_point_list(){
    const table = document.querySelector('.table-hover')
    table.innerHTML = ''
    points_list.forEach(({pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration},index) =>{
        // console.log(hue)
    table.innerHTML+=
    `
    <tr>
    <td class="text-center pointer" title="pX" onclick="go_to_point(${index})">${pX}
    </td>
    <td class="text-center pointer" title="pY" onclick="go_to_point(${index})">${pY}
    </td>
    <td class="text-center pointer" title="Zoom" onclick="go_to_point(${index})">${zoom}
    </td>
    <td class="text-center pointer" title="Hue" style="text-decoration: underline overline wavy; text-decoration-color:${hslToHex(hue,100,79)};" onclick="go_to_point(${index})">${hslToHex(hue,100,79)}
    </td>
    <td class="text-center pointer" title="Color"style="text-decoration: underline overline wavy; text-decoration-color:${inmandelbrot_color};"  onclick="go_to_point(${index})">${inmandelbrot_color}
    </td>
    <td class="text-center pointer" title="Smooth Coloring" onclick="go_to_point(${index})">${smooth_coloring?'Enabled':'Disabled'}
    </td>
    <td class="text-center pointer" title="Max Iteration" onclick="go_to_point(${index})">${max_iteration}
    </td>
    <td class="text-center pointer" title="Delete Point" onclick="delete_point(${index})">${garbageSVG}
    </td>    
    </tr>
    `
    })
    max_file_counter = max_file_counter_finder(points_list)
}
function delete_point(index){ 
    if(window.confirm('Are you sure you want to delete that point?')){
        points_list.splice(index,1)
        points = points_list.slice()
        update_point_list()
    }
}
function go_to_point(index){
    pX = points_list[index].pX
    pY = points_list[index].pY
    zoom = points_list[index].zoom
    inmandelbrot_color = points_list[index].inmandelbrot_color
    hue = points_list[index].hue
    smooth_coloring = points_list[index].smooth_coloring
    max_iteration = points_list[index].max_iteration
    apply_effects()
}
let pX2,pY2,next_zoom,next_hue,
  next_inmandelbrot_color, next_max_iter, max_iteration_increment,
  R_increment,G_increment,B_increment,
  x_increment,y_increment,hue_increment,steps,
  r_in,g_in,b_in;
let counter = 0
let max_iteration_incr = null
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
        stop_zooming = true
        pX = points[0].pX
        pY = points[0].pY
        zoom = points[0].zoom
        hue = points[0].hue
        inmandelbrot_color = points[0].inmandelbrot_color
        smooth_coloring = points[0].smooth_coloring
        max_iteration = points[0].max_iteration
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

}
function hexToDecimal(string){
    const hex_digits_list = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
    return string.split('')
    .map((el, index, arr) => {
      return parseInt(hex_digits_list.indexOf(el.toLowerCase())*16**(arr.length - 1 - index))
    })
    .reduce((acc, el)=> acc + el,0)
}
function convert_to_two_digit(string){
return string.length == 1?'0'+string:string
}
function update_mandelbrot_values(){
    if(next_zoom < zoom){
        zoom /= zoom_factor
    }else if (next_zoom > zoom){
        zoom *= zoom_factor
    }
    max_iteration += max_iteration_incr
    counter++
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
    inmandelbrot_color =  `#${convert_to_two_digit(parseInt(r_in).toString(16))}${convert_to_two_digit(parseInt(g_in).toString(16))}${convert_to_two_digit(parseInt(b_in).toString(16))}`
}
let interval_iteration = null
function close_preview(){
    document.querySelector('#popup-preview').style.display = 'none'
    document.querySelector("#svg_pause_play").innerHTML = pause_svg
    stop_zooming = false
    if(interval_iteration){
        clearInterval(interval_iteration)
    }
}
// let stop_zooming = false
function preview(){
    document.querySelector('#popup-preview').style.display = 'block'
    document.querySelector('#preview_file_title').innerText = document.querySelector('#file_name').value
    // console.log(file_counter)
    start_zoom()
}
set_dx_dy()
apply_effects()
update_point_list()
atribute_points()

function open_generator(){
    converted_font_size = font_size/width_pixel*width_pixel_zoom
    const hash_string_2 = `fractal:'${fractal}',file_counter:${file_counter},width:${width_pixel_zoom},height:${height_pixel_zoom},file_name:'${file_name}',enable_zoom:${enable_zoom},enable_download:${enable_download_files},zoom_orientation:'${zoom_orientation}',enable_point:${enable_center_point},point_color:'#${center_point_color.slice(1)}',point_size:${center_point_size},enable_text:${enable_zoom_text},text_color:'#${zoom_text_color.slice(1)}',text_size:${converted_font_size},cX:${julia_point.x},cY:${julia_point.y}`

    for(let i in points_list){
        points_list[i].hue = hslToHex(points_list[i].hue,100,79)
    }
    let hash_string_1 = '['
    for(let {pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration} of points_list){        
        hash_string_1 += '{'
        hash_string_1 += `pX:${pX},`
        hash_string_1 += `pY:${pY},`
        hash_string_1 += `zoom:${zoom},`
        hash_string_1 += `hue:'${hue}',`
        hash_string_1 += `inmandelbrot_color:'${inmandelbrot_color}',`
        hash_string_1 += `smooth_coloring:${smooth_coloring},`
        hash_string_1 += `max_iteration:${max_iteration}},`
    }
    hash_string_1 = hash_string_1.slice(0,hash_string_1.length-1) + ']'
    const hash = `{${hash_string_2},list_of_points:${hash_string_1}}`
    for(let i in points_list){
        points_list[i].hue = hexToHSLIndex(points_list[i].hue)
    }
    window.open(`../generator/mandelbrowser_generator.html#${hash}`,'blank_')
}
function copycode(){
    converted_font_size = font_size/width_pixel*width_pixel_zoom
    const hash_string_2 = `fractal:'${fractal}',file_counter:${file_counter},width:${width_pixel_zoom},height:${height_pixel_zoom},file_name:'${file_name}',enable_zoom:${enable_zoom},enable_download:${enable_download_files},zoom_orientation:'${zoom_orientation}',enable_point:${enable_center_point},point_color:'#${center_point_color.slice(1)}',point_size:${center_point_size},enable_text:${enable_zoom_text},text_color:'#${zoom_text_color.slice(1)}',text_size:${converted_font_size},cX:${julia_point.x},cY:${julia_point.y}`
    for(let i in points_list){
        points_list[i].hue = hslToHex(points_list[i].hue,100,79)
    }
    let hash_string1 = '['
    for(let {pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration} of points_list){        
        hash_string1 += '{'
        hash_string1 += `pX:${pX},`
        hash_string1 += `pY:${pY},`
        hash_string1 += `zoom:${zoom},`
        hash_string1 += `hue:'${hue}',`
        hash_string1 += `inmandelbrot_color:'${inmandelbrot_color}',`
        hash_string1 += `smooth_coloring:${smooth_coloring},`
        hash_string1 += `max_iteration:${max_iteration}},`
    }
    hash_string1 = hash_string1.slice(0,hash_string1.length-1) + ']'
    const hash = `{${hash_string_2},list_of_points:${hash_string1}}`
    for(let i in points_list){
        points_list[i].hue = hexToHSLIndex(points_list[i].hue)
    }
    let el = document.createElement('textarea')
    el.value = hash
    el.setAttribute('readonly', '')
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

function replace_all(string,c,r){
    let s = string
    while(s.indexOf(c) != -1){
        s = s.replace(c,r)
    }
    return s
} 

function check_code(){
    let string = document.querySelector('#textareacode').value
    string = replace_all(string,'%22','"')
    string = replace_all(string,'"','')
    string = replace_all(string,"'",'')
    string = replace_all(string,"`",'')
    string = replace_all(string,'%20',' ')
    console.log(string)
    //LIST OF POINTS
    let candidate_points = []
    if(string.indexOf('list_of_points') != -1){
        candidate_points = get_point_array(string)
        if(candidate_points.every(candidate => !isNaN(candidate.pX) && !isNaN(candidate.pX) && !isNaN(candidate.zoom) && typeof candidate.hue == typeof 'as'&& typeof candidate.inmandelbrot_color == typeof 'as') && candidate_points.length>0 && window.confirm('Are you sure about loading another set of points?')){
            points_list = candidate_points.slice()
            for(let i in points_list){
                points_list[i].hue = hexToHSLIndex(points_list[i].hue)
            }
            update_point_list()
        } 
    }

    //OTHER ATRIBUTES
    if(string.indexOf(',')!=-1){
        if(string.indexOf('fractal') != -1){
            fractal = return_value('fractal',string)
        }
        // string = replace_all(string,' ','')
        if(string.indexOf('cX') != -1){
            julia_point.x = parseFloat(return_value('cX',string))
        }
        if(string.indexOf('cY') != -1){
            julia_point.y = parseFloat(return_value('cY',string))
        }    
        if(string.indexOf('width')!=-1){
            width_pixel_zoom = parseInt(return_value('width',string))
        }
        if(string.indexOf('height')!=-1){
            height_pixel_zoom = parseInt(return_value('height',string))
        }
        if(string.indexOf('text_size')!=-1){
            font_size = parseFloat(return_value('text_size',string))
            font_size = font_size*width_pixel/width_pixel_zoom
        }    
        if(string.indexOf('point_size')!=-1){
            center_point_size = parseInt(return_value('point_size',string))
        }
        if(string.indexOf('file_counter')!=-1){
            file_counter = parseInt(return_value('file_counter',string))
        }
        if(string.indexOf('zoom_orientation')!=-1){
            zoom_orientation = return_value('zoom_orientation',string)
        }
        if(string.indexOf('file_name')!=-1){
            file_name = return_value('file_name',string)
        }
        if(string.indexOf('text_color')!=-1){
            zoom_text_color = return_value('text_color',string)
        }
        if(string.indexOf('point_color')!=-1){
            center_point_color = return_value('point_color',string)
        }
        if(string.indexOf('enable_download')!=-1){
            enable_download_files = return_value('enable_download',string) == 'true'
        }
        if(string.indexOf('enable_text')!=-1){
            enable_zoom_text = return_value('enable_text',string) == 'true'
        }
        if(string.indexOf('enable_zoom')!=-1){
            enable_zoom = return_value('enable_zoom',string) == 'true'
        }
        if(string.indexOf('enable_point')!=-1){
            enable_center_point = return_value('enable_point',string) == 'true'
        }
    }
    document.querySelector('#text_color').value = zoom_text_color
    document.querySelector('#allow_zoom_text').checked = enable_zoom_text
    document.querySelector('#zoom_text_font_size').value = font_size
    document.querySelector('#file_counter').value = file_counter
    document.querySelector('#file_name').value = file_name
    document.querySelector('#pixel_width').value = width_pixel_zoom
    document.querySelector('#pixel_height').value = height_pixel_zoom
    document.querySelector('#enable_download').checked = enable_download_files
    document.querySelector('#enable_zoom').checked = enable_zoom
    document.querySelector('#allow_zoom_point').checked = enable_center_point 
    document.querySelector('#zoom_point_color').value = center_point_color
    document.querySelector('#zoom_point_size').value = center_point_size 
    document.querySelector('#zoom_orientation').value = zoom_orientation

    apply_effects_according_to_file_counter()  
    document.querySelector('#textareacode').value = ''
}


window.addEventListener('mousemove', (event) => {
    
    if(event.clientY < window.innerHeight*0.3){
        document.querySelector('#tutorial_button').style.opacity = '1'
    }else{
        document.querySelector('#tutorial_button').style.opacity = '0'
    }
})

function open_tutorial(){
    document.querySelector('#popup-tutorial').style.display = 'block'
}
const poputTutorial = document.querySelector('#popup-tutorial')
poputTutorial.addEventListener('click', event => {
    const classNameOfClickedElement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-wrapper']
    const shouldClosePopup = classNames.some(className => className === classNameOfClickedElement)
    if (shouldClosePopup) {
        poputTutorial.style.display = 'none'
    }
})
function showTutorial() {
    poputTutorial.style.display = 'block'
}
// file:///E:/Data/Área%20de%20Trabalho/programacao/progamacoes_em_javascript/Mandelbrowser_Set/tools/generator/mandelbrowser_generator.html#{file_counter:1425,width:1080,file_name:'dark_purple',enable_zoom:true,enable_download:true,zoom_orientation:'center',enable_point:false,point_color:'#ffffff',point_size:2,enable_text:false,text_color:'#002688',text_size:27,list_of_points:[{pX:0,pY:0,zoom:0.4,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:5000},{pX:-0.5693565694919585,pY:0.6258026753606527,zoom:2.500243900802678,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},{pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#94f8ff',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},{pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:5000},{pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:3000},{pX:-0.4815798468789574,pY:0.6231206369409762,zoom:39.07202807223627,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},{pX:-0.4700714292566631,pY:0.6225923237926176,zoom:244.22399969899936,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:1000},{pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#a0ff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:2000},{pX:-0.47286473510817717,pY:0.6242238209323686,zoom:3816.5584441940478,hue:'#b094ff',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:2000},{pX:-0.4728824174579407,pY:0.6242424830733859,zoom:59642.45273151413,hue:'#94ffa6',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:2000},{pX:-0.4728784996493322,pY:0.6242404321795244,zoom:932049.7039007312,hue:'#94ffa6',inmandelbrot_color:'#27196b',smooth_coloring:false,max_iteration:10000},{pX:-0.4728785792502104,pY:0.6242403629605768,zoom:5825878.968556862,hue:'#ffe294',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},{pX:-0.47287873949064896,pY:0.6242402555424178,zoom:36415295.894872226,hue:'#ffe294',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},{pX:-0.47287874078399195,pY:0.6242402553298096,zoom:227617803.6426977,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:4000},{pX:-0.4728787408787868,pY:0.6242402553559475,zoom:3557048658.658094,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:6000},{pX:-0.4728787408823051,pY:0.6242402553544527,zoom:138974326020.80273,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:6000},{pX:-0.4728787408822726,pY:0.624240255354295,zoom:868674277504.1874,hue:'#9bff94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},{pX:-0.4728787408822726,pY:0.624240255354295,zoom:868674277504.1874,hue:'#ffaf94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},{pX:-0.47287874088227777,pY:0.6242402553543369,zoom:2171791626353.6013,hue:'#ffaf94',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},{pX:-0.47287874088227777,pY:0.6242402553543369,zoom:2171791626353.6013,hue:'#b494ff',inmandelbrot_color:'#27196b',smooth_coloring:true,max_iteration:8000},{pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:8000},{pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:10000},{pX:-0.47287874088227777,pY:0.6242402553543369,zoom:3234780078181.737,hue:'#b494ff',inmandelbrot_color:'#ffffff',smooth_coloring:true,max_iteration:15000}]}