
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
const editSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="animateSVG" height="35px" width="35px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873; margin-right:-7px" xml:space="preserve">
<title>Editar</title>
<g>
	<g>
		<path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2    c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067    S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2    c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/>
	</g>
</g>
<g>
	<g>
		<path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937    c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585    c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13    l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z"/>
	</g>
</g><g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>`
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
  var c = hsv_to_rgb(color_offset+360.0*v/steps, 1.0, 10.0*v/steps);
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
const julia_point = { x: -0.47287874088227777 , y: 0.6242402553543369 }
document.querySelector('#pX_julia_value').value = julia_point.x
document.querySelector('#pY_julia_value').value = julia_point.y
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
                return `hsl(${color_offset+(i**(1/1.11))}, ${(max_iteration - i) / max_iteration * 70 + 20}%, ${(i) / max_iteration * 50 + 50}%)`
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
document.querySelector('#inmandelbrot_color').value = `#27196b`
document.querySelector('#color_offset').value = '#94f8ff'
inmandelbrot_color = document.querySelector('#inmandelbrot_color').value
color_offset = hexToHSLIndex(document.querySelector('#color_offset').value)
let allow_click = true
canvas.addEventListener('mousedown', event =>{ 
    if(allow_click){         
        allow_click = false
        canvas.style.cursor = 'not-allowed'
        smooth_coloring = document.querySelector('#smooth_coloring').checked
        max_iteration = document.querySelector('#max_iteration_range').value
        inmandelbrot_color = document.querySelector('#inmandelbrot_color').value
        color_offset = hexToHSLIndex(document.querySelector('#color_offset').value)  
        const rect = canvas.getBoundingClientRect();     
        const mouseX = event.clientX - rect.left; 
        const mouseY = event.clientY - rect.top;     
        setTimeout( (el) => {
            pX = x1 +  mouseX/cW*dx
            pY = y1 -  mouseY/cH*dy
            if(event.button == 0 ){
                zoom *= zoom_factor        
            }else{        
                zoom = zoom/zoom_factor 
            }
            dx = 4/zoom
            dy = alfa/zoom
            x1 = pX - dx/2
            y1 = pY + dy/2
            for (let i = 0; i < cW; i++) { 
                for (let j = 0; j < cH; j++) { 
                    const x = x1 + i*dx/cW
                    const y = y1 - j*dy/cH
                    // c.fillStyle = inMandelbrot(x, y); 
                    // c.fillRect(i, j, 1, 1) 
                    c.strokeStyle = inMandelbrot(x, y); 
                    c.strokeRect(i, j, 1, 1)   
                }
            }            
            document.querySelector('#pX_value').value = pX
            document.querySelector('#pY_value').value = pY
            document.querySelector('#Zoom_value').value = zoom 
        },100) 
        
        setTimeout( (el) => {allow_click = true;canvas.style.cursor = 'zoom-in'},900)
    }      
})
function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight ;
 }
let point_editing = null
function update_point_list(){
    const table = document.querySelector('.table-hover')
    table.innerHTML = ''
    points.forEach(({pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration},index) =>{
    table.innerHTML+=
    `
    <tr>
    <td class="text-center pointer" title="pX" onclick="go_to_point(${index})">${pX}
    </td>
    <td class="text-center pointer" title="pY" onclick="go_to_point(${index})">${pY}
    </td>
    <td class="text-center pointer" title="Zoom" onclick="go_to_point(${index})">${zoom}
    </td>
    <td class="text-center pointer" title="Hue" style="text-decoration: underline overline wavy; text-decoration-color:${hue};" onclick="go_to_point(${index})">${hue}
    </td>
    <td class="text-center pointer" title="Color"style="text-decoration: underline overline wavy; text-decoration-color:${inmandelbrot_color};"  onclick="go_to_point(${index})">${inmandelbrot_color}
    </td>
    <td class="text-center pointer" title="Smooth Coloring" onclick="go_to_point(${index})">${smooth_coloring?'Enabled':'Disabled'}
    </td>
    <td class="text-center pointer" title="Max Iteration" onclick="go_to_point(${index})">${max_iteration}
    </td>
    <td class="text-center pointer"><span title="Delete Point" onclick="delete_point(${index})">${garbageSVG} </span><br><span title="Edit Point" onclick="edit_point(${index})">${editSVG} </span>
    </td>    
    </tr>
    `
    })
}
function add_point(){
    const new_point = 
    {
        pX: pX,
        pY: pY,
        zoom:zoom,
        hue: document.querySelector('#color_offset').value,
        inmandelbrot_color:document.querySelector('#inmandelbrot_color').value,
        smooth_coloring:document.querySelector('#smooth_coloring').checked,
        max_iteration:document.querySelector('#max_iteration_range').value
    }
    points.push(new_point)
    update_point_list()
    scrollToBottom('scrollable_div')
}
function delete_point(index){
    points.splice(index,1)
    update_point_list()
}
function edit_point(index){
    point_editing = index
    document.querySelector('#pX_value_editor').value = points[index].pX
    document.querySelector('#pY_value_editor').value = points[index].pY
    document.querySelector('#Zoom_value_editor').value = points[index].zoom
    document.querySelector('#inmandelbrot_color_editor').value = points[index].inmandelbrot_color
    document.querySelector('#color_offset_editor').value = points[index].hue
    document.querySelector('#smooth_coloring_editor').checked = points[index].smooth_coloring 
    document.querySelector('#max_iter_show_editor').innerText = `Max Iter ${points[index].max_iteration}`
    document.querySelector('#max_iteration_range_editor').value = points[index].max_iteration
    document.querySelector('#editor_div').style.display = 'block'
}
function save_point(){
    pX = parseFloat(document.querySelector('#pX_value_editor').value)
    pY = parseFloat(document.querySelector('#pY_value_editor').value)
    zoom = parseFloat(document.querySelector('#Zoom_value_editor').value)
    inmandelbrot_color = document.querySelector('#inmandelbrot_color_editor').value
    color_offset = hexToHSLIndex(document.querySelector('#color_offset_editor').value)
    smooth_coloring = document.querySelector('#smooth_coloring_editor').checked 
    max_iteration = document.querySelector('#max_iteration_range_editor').value
    points[point_editing].pX = pX
    points[point_editing].pY = pY
    points[point_editing].zoom = zoom
    points[point_editing].inmandelbrot_color = inmandelbrot_color
    points[point_editing].hue = document.querySelector('#color_offset_editor').value
    points[point_editing].smooth_coloring = smooth_coloring
    points[point_editing].max_iteration = max_iteration
    document.querySelector('#editor_div').style.display = 'none'
    // update_XYZ_editor()
    update_point_list()
}
function go_to_point(index){
    document.querySelector('#pX_value').value = points[index].pX
    document.querySelector('#pY_value').value = points[index].pY
    document.querySelector('#Zoom_value').value = points[index].zoom
    document.querySelector('#inmandelbrot_color').value  = points[index].inmandelbrot_color
    document.querySelector('#color_offset').value = points[index].hue
    document.querySelector('#smooth_coloring').checked = points[index].smooth_coloring
    document.querySelector('#max_iteration_range').value = points[index].max_iteration
    document.querySelector('#max_iter_show').innerText = `Max Iter ${document.querySelector('#max_iteration_range').value}`
    max_iteration = points[index].max_iteration
    update_XYZ()
}
function open_generator_config_window(){
    let hash_string = '['
    for(let {pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration} of points){        
        hash_string += '{'
        hash_string += `pX:${pX},`
        hash_string += `pY:${pY},`
        hash_string += `zoom:${zoom},`
        hash_string += `hue:'${hue}',`
        hash_string += `inmandelbrot_color:'${inmandelbrot_color}',`
        hash_string += `smooth_coloring:${smooth_coloring},`
        hash_string += `max_iteration:${max_iteration}},`
    }
    hash_string =  `fractal:'${fractal}',cX:${julia_point.x},cY:${julia_point.y},list_of_points:`+hash_string.slice(0,hash_string.length-1) + ']'
    const hash = `#${hash_string}`
    window.open(`../settings/mandelbrowser_settings.html${hash}`,'blank')
}
function update_XYZ(){
    pX = parseFloat(document.querySelector('#pX_value').value)
    pY = parseFloat(document.querySelector('#pY_value').value)
    zoom = parseFloat(document.querySelector('#Zoom_value').value)
    inmandelbrot_color = document.querySelector('#inmandelbrot_color').value
    color_offset = hexToHSLIndex(document.querySelector('#color_offset').value)
    smooth_coloring = document.querySelector('#smooth_coloring').checked
    
    dx = 4/zoom
    dy = alfa/zoom
    x1 = pX - dx/2
    y1 = pY + dy/2
    for (let i = 0; i < cW; i++) { 
        for (let j = 0; j < cH; j++) { 
            const x = x1 + i*dx/cW
            const y = y1 - j*dy/cH
            c.fillStyle = inMandelbrot(x, y); 
            c.fillRect(i, j, 1, 1)   
        }
    }   
}
function update_XYZ_editor(){
    pX = parseFloat(document.querySelector('#pX_value_editor').value)
    pY = parseFloat(document.querySelector('#pY_value_editor').value)
    zoom = parseFloat(document.querySelector('#Zoom_value_editor').value)
    inmandelbrot_color = document.querySelector('#inmandelbrot_color_editor').value
    color_offset = hexToHSLIndex(document.querySelector('#color_offset_editor').value)     
    smooth_coloring = document.querySelector('#smooth_coloring_editor').checked
    max_iteration = document.querySelector('#max_iteration_range_editor').value
    document.querySelector('#max_iteration_range').value = max_iteration
    document.querySelector('#max_iter_show').innerText = `Max Iter ${document.querySelector('#max_iteration_range').value}`
    document.querySelector('#pX_value').value = pX
    document.querySelector('#pY_value').value = pY
    document.querySelector('#Zoom_value').value = zoom
    document.querySelector('#inmandelbrot_color').value = inmandelbrot_color
    document.querySelector('#smooth_coloring').checked = smooth_coloring
    document.querySelector('#color_offset').value = document.querySelector('#color_offset_editor').value
    update_XYZ()
}
function copycode(){
    let hash_string = '['
    for(let {pX,pY,zoom,hue,inmandelbrot_color,smooth_coloring,max_iteration} of points){        
        hash_string += '{'
        hash_string += `pX:${pX},`
        hash_string += `pY:${pY},`
        hash_string += `zoom:${zoom},`
        hash_string += `hue:'${hue}',`
        hash_string += `inmandelbrot_color:'${inmandelbrot_color}',`
        hash_string += `smooth_coloring:${smooth_coloring},`
        hash_string += `max_iteration:${max_iteration}},`
    }
    hash_string = `fractal:'${fractal}',cX:${julia_point.x},cY:${julia_point.y},list_of_points:`+hash_string.slice(0,hash_string.length-1) + ']'
    let el = document.createElement('textarea')
    el.value = hash_string
    el.setAttribute('readonly', '')
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}
function get_point(hash){
    const point = {pX:null,pY:null,zoom:null,hue:null,inmandelbrot_color:null,smooth_coloring:null,max_iteration:null}
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
function check_code(){
    let code = document.querySelector('#textareacode').value
    if(code.indexOf('fractal:') != -1){
        fractal = code.slice(code.indexOf('fractal:')+9,code.indexOf(',',code.indexOf('fractal:')+9)-1)
    }
    if(code.indexOf('cX:') != -1){
        julia_point.x = parseFloat(code.slice(code.indexOf('cX:')+3,code.indexOf(',',code.indexOf('cX')+3)))
    }
    if(code.indexOf('cY:') != -1){
        julia_point.y = parseFloat(code.slice(code.indexOf('cY:')+3,code.indexOf(',',code.indexOf('cY')+3)))
    }
    let candidate_code = code.slice(code.indexOf('list_of_points:')+'list_of_points:'.length+1,code.indexOf(']',code.indexOf('list_of_points:')+'list_of_points:'.length))
        
    while(candidate_code[0] == ' '){
        candidate_code = candidate_code.slice(1)
    }
    candidate_code = candidate_code.slice(candidate_code.indexOf('pX')-1)
    let candidate_points = []
    let possible_string = true

    while(possible_string){
        const candidate = get_point(candidate_code)
        possible_string = !isNaN(candidate[0].pX) && !isNaN(candidate[0].pY) && !isNaN(candidate[0].zoom) && typeof candidate[0].hue == typeof 'as'&& typeof candidate[0].inmandelbrot_color == typeof 'as'
        if(possible_string){
            candidate_code = candidate[1]
            candidate_points.push(candidate[0])            
        }else{
            possible_string = false
        }
    }
    if(candidate_points.every(candidate => !isNaN(candidate.pX) && !isNaN(candidate.pX) && !isNaN(candidate.zoom) && typeof candidate.hue == typeof 'as'&& typeof candidate.inmandelbrot_color == typeof 'as') && candidate_points.length>0 && window.confirm('Are you sure about loading another set of points?')){
        points = candidate_points
        update_point_list()
    }
    document.querySelector('#textareacode').value = ''
    document.querySelector('#pX_julia_value').value = julia_point.x
    document.querySelector('#pY_julia_value').value = julia_point.y
    document.querySelector('#fractal').value = fractal
    if(fractal == 'Julia Set'){
        document.querySelector('#pY_julia_value').style.display = 'block'
        document.querySelector('#pX_julia_value').style.display = 'block'
        document.querySelector('#julia_pY_text').style.display = 'inline'
        document.querySelector('#julia_pX_text').style.display = 'inline'
    }else{
        document.querySelector('#pY_julia_value').style.display = 'none'
        document.querySelector('#pX_julia_value').style.display = 'none'
        document.querySelector('#julia_pY_text').style.display = 'none'
        document.querySelector('#julia_pX_text').style.display = 'none'
    }
    update_XYZ()
}
function change_smooth_color_value(){
    smooth_coloring = document.querySelector('#smooth_coloring').checked
}
for (let i = 0; i < cW; i++) { 
    for (let j = 0; j < cH; j++) { 
        const x = x1 + i*dx/cW
        const y = y1 - j*dy/cH
        c.strokeStyle = inMandelbrot(x, y); 
        c.strokeRect(i, j, 1, 1)   
    }
}
document.querySelector('#pX_value').value = pX
document.querySelector('#pY_value').value = pY
document.querySelector('#Zoom_value').value = zoom
update_point_list()
////
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
function change_max_iter(){
    max_iteration = document.querySelector('#max_iteration_range').value
    document.querySelector('#max_iter_show').innerText = `Max Iter ${max_iteration}`
}
function change_max_iter_editor(){
    document.querySelector('#max_iter_show_editor').innerText = `Max Iter ${document.querySelector('#max_iteration_range_editor').value}`
}
function change_range_range(){
    const current_max_value = document.querySelector('#max_iteration_range').max
    if(current_max_value == 10000){
        document.querySelector('#max_iteration_range').max = 100000
        document.querySelector('#max_iteration_range').min = 1000
        document.querySelector('#max_iteration_range').step = 1000
    }else if(current_max_value == 100000){
        document.querySelector('#max_iteration_range').max = 1000000
        document.querySelector('#max_iteration_range').min = 1000
        document.querySelector('#max_iteration_range').step = 1000
    }else if (current_max_value == 1000000){
        document.querySelector('#max_iteration_range').max = 1000
        document.querySelector('#max_iteration_range').min = 50
        document.querySelector('#max_iteration_range').step = 50
        document.querySelector('#max_iteration_range').value = 100        
    }else if (current_max_value == 1000){
        document.querySelector('#max_iteration_range').max = 10000
        document.querySelector('#max_iteration_range').min = 1000
        document.querySelector('#max_iteration_range').step = 1000
    }
    max_iteration = document.querySelector('#max_iteration_range').value
    document.querySelector('#max_iter_show').innerText = `Max Iter ${document.querySelector('#max_iteration_range').value}`
}
function change_range_range_editor(){
    const current_max_value = document.querySelector('#max_iteration_range_editor').max
    if(current_max_value == 10000){
        document.querySelector('#max_iteration_range_editor').max = 100000
        document.querySelector('#max_iteration_range_editor').min = 1000
        document.querySelector('#max_iteration_range_editor').step = 1000
    }else if(current_max_value == 100000){
        document.querySelector('#max_iteration_range_editor').max = 1000000
        document.querySelector('#max_iteration_range_editor').min = 1000
        document.querySelector('#max_iteration_range_editor').step = 1000
    }else if (current_max_value == 1000000){
        document.querySelector('#max_iteration_range_editor').max = 1000
        document.querySelector('#max_iteration_range_editor').min = 50
        document.querySelector('#max_iteration_range_editor').step = 50
        document.querySelector('#max_iteration_range_editor').value = 0
    }else if (current_max_value == 1000){
        document.querySelector('#max_iteration_range_editor').max = 10000
        document.querySelector('#max_iteration_range_editor').min = 1000
        document.querySelector('#max_iteration_range_editor').step = 1000
    }
    document.querySelector('#max_iter_show_editor').innerText = `Max Iter ${document.querySelector('#max_iteration_range_editor').value}`
}
function change_fractal(){
    fractal = document.querySelector('#fractal').value
    pX = 0
    pY = 0
    if(fractal == 'Mandelbrot' || fractal == 'Julia Set'){
        zoom = 1
    }else if(fractal == 'Burning Ship'){
        zoom = 0.6
    }
    document.querySelector('#max_iteration_range').max = 1000
    document.querySelector('#max_iteration_range').min = 50
    document.querySelector('#max_iteration_range').step = 50
    document.querySelector('#max_iteration_range').value = 500
    max_iteration = document.querySelector('#max_iteration_range').value
    document.querySelector('#max_iter_show').innerText = `Max Iter ${document.querySelector('#max_iteration_range').value}`
    inmandelbrot_color = standart_inside_color
    color_offset = standart_hue
    smooth_coloring = false
    document.querySelector('#smooth_coloring').checked = smooth_coloring
    document.querySelector('#inmandelbrot_color').value = inmandelbrot_color
    document.querySelector('#color_offset').value = color_offset
    document.querySelector('#pX_value').value = pX
    document.querySelector('#pY_value').value = pY
    document.querySelector('#Zoom_value').value = zoom
    if(fractal == 'Julia Set'){
        document.querySelector('#pY_julia_value').style.display = 'block'
        document.querySelector('#pX_julia_value').style.display = 'block'
        document.querySelector('#julia_pY_text').style.display = 'inline'
        document.querySelector('#julia_pX_text').style.display = 'inline'
    }else{
        document.querySelector('#pY_julia_value').style.display = 'none'
        document.querySelector('#pX_julia_value').style.display = 'none'
        document.querySelector('#julia_pY_text').style.display = 'none'
        document.querySelector('#julia_pX_text').style.display = 'none'
    }
    update_XYZ()
}
function update_julia_values(){
    julia_point.x = parseFloat(document.querySelector('#pX_julia_value').value)
    julia_point.y = parseFloat(document.querySelector('#pY_julia_value').value)
}
