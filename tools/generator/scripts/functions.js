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


// Some constants used with smoothColor
const logBase = 1.0 / Math.log(2.0);
const logHalfBase = Math.log(0.5)*logBase;
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
function set_values_to_span(){
    if(!enable_center_point){
        document.querySelector('#point_section').style.display = 'none'
    }
    if(!enable_zoom_text){
        document.querySelector('#text_section').style.display = 'none'
    }
    document.querySelector('#span_file_counter').innerText = `File Counter : ${file_counter_track}`   
    document.querySelector('#span_zoom').innerText = `Zoom : ${zoom.toFixed(15)}`   
    document.querySelector('#span_pX').innerText = `pX : ${pX.toFixed(15)}`  
    document.querySelector('#span_pY').innerText = `pY : ${pY.toFixed(15)}` 
    document.querySelector('#span_enable_download').innerText = `Enable Download : ${enable_download_files}` 
    document.querySelector('#span_enable_zoom').innerText = `Enable Zoom : ${enable_zoom}` 
    document.querySelector('#span_file_name').innerText = `File Name : ${file_name}` 
    document.querySelector('#span_width_pixel').innerText = `Width Pixel : ${width_pixel}` 
    document.querySelector('#span_zoom_orientation').innerText = `Zoom Orientation : ${zoom_orientation}` 
    document.querySelector('#span_enable_text').innerText = `Enable Text : ${enable_zoom_text}` 
    document.querySelector('#span_text_size').innerText = `Text Size : ${font_size}`  
    document.querySelector('#span_text_color').innerHTML = `<span style="color:${zoom_text_color}">Text Color : ${zoom_text_color}</span>` 
    document.querySelector('#span_enable_point').innerText = `Enable Point : ${enable_center_point}` 
    document.querySelector('#span_point_size').innerText = `Point Size : ${center_point_radius}`  
    document.querySelector('#span_point_color').innerHTML = `<span style="color:${center_point_color}">Point Color : ${center_point_color}</span>`              
    document.querySelector('#max_iteration').innerText = `Max Iteration : ${max_iteration}`              
    
    if(enable_download_files){
        document.querySelector('#enable_download_files_div').style.backgroundColor = "#baffc6" 
    }else{
        document.querySelector('#enable_download_files_div').style.backgroundColor = "#ffc8c8" 
    }
    if(enable_zoom){
        document.querySelector('#enable_zoom_div').style.backgroundColor = "#baffc6" 
    }else{
        document.querySelector('#enable_zoom_div').style.backgroundColor = "#ffc8c8" 
    }
    document.querySelector('#porcentage_process').style.width = `calc(14px + ${((file_counter_track)/max_file_counter*25)}vw)`
    document.querySelector('#porcentage_span').innerText = `Process ${((file_counter_track)/max_file_counter*100).toFixed(1)}%`
}
set_dx_dy()