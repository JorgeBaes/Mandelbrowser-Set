let now_date = new Date()
let past_date = new Date()
let image_time = new Date()
setTimeout(() => {
    if(enable_zoom){
        interval_iteration = setInterval(function () {
            if(!stop_zooming){
                past_date = new Date()
                const x1 = pX + offsetX
                const y1 = pY + offsetY
                for (let i = 0; i < cW; i++) { 
                    for (let j = 0; j < cH; j++) { 
                        const x = x1 + i*dx/cW
                        const y = y1 - j*dy/cH
                        c.strokeStyle = inMandelbrot(x, y); 
                        c.strokeRect(i, j, 1, 1)   
                    }
                }  
                now_date = new Date()
                image_time = (now_date.getTime() - past_date.getTime())/1000
                document.querySelector('#image_time').innerText = `Image Generating Time : ${image_time}`
                update_values()
                set_dx_dy() 
                set_values_to_span()
                if(enable_center_point){
                    c.fillStyle = center_point_color
                    c.beginPath()
                    c.arc(point_offsetX,point_offsetY,center_point_radius,0,2*Math.PI)
                    c.fill()    
                }    
                if(enable_zoom_text){
                    c.fillStyle = zoom_text_color
                    c.fillText(`Zoom = ${zoom.toFixed(3)}`, cW / 2, cW>1400?25:cW>900?20:15)
                }        
                if(enable_download_files){
                    let canvasDataURL = canvas.toDataURL()
                    let a = document.createElement('a')
                    a.href = canvasDataURL
                    a.download = `${file_name}_${file_counter}`
                    a.click()
                    file_counter++
                }
            }else{
                document.querySelector('#porcentage_process').style.width = `calc(14px + 25vw)`
                document.querySelector('#porcentage_span').innerText = `Process 100%`
                clearInterval(interval_iteration)
            }
        }, 0)
    }else{
        console.log(points) 
console.log('width_pixel',width_pixel)
console.log('zoom',zoom)
console.log('max_iteration',max_iteration)
console.log('zoom_orientation',zoom_orientation)
console.log('enable_zoom_text',enable_zoom_text)
console.log('zoom_text_color',zoom_text_color)
console.log('converted_font_size',font_size)
console.log('file_counter',file_counter)
console.log('file_name',file_name)
console.log('enable_download_files',enable_download_files)
console.log('enable_zoom',enable_zoom)
console.log(points)
console.log(enable_center_point)
console.log(center_point_color)
console.log(enable_center_point)
console.log(center_point_radius) 
        set_values_to_span()
        const x1 = pX + offsetX
        const y1 = pY + offsetY    
        for (let i = 0; i < cW; i++) { 
            for (let j = 0; j < cH; j++) { 
                const x = x1 + i*dx/cW
                const y = y1 - j*dy/cH
                c.strokeStyle = inMandelbrot(x, y); 
                c.strokeRect(i, j, 1, 1)    
            }
        }
        document.querySelector('#porcentage_process').style.width = `calc(14px + 25vw)`
        document.querySelector('#porcentage_span').innerText = `Process 100%`
        if(enable_center_point){
            c.fillStyle = center_point_color
            c.beginPath()
            c.arc(point_offsetX,point_offsetY,center_point_radius,0,2*Math.PI)
            c.fill()    
        }
        if(enable_zoom_text){
            c.fillStyle = zoom_text_color
            c.fillText(`Zoom = ${zoom.toFixed(3)}`, cW / 2, cW>1400?25:cW>900?20:15)
        }    
        if(enable_download_files){
            let canvasDataURL = canvas.toDataURL()
            let a = document.createElement('a')
            a.href = canvasDataURL
            a.download = `${file_name}`
            a.click()
            file_counter++
        }

    }    
}, 500);

