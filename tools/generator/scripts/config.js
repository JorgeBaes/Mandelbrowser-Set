/*
  This is the configuration for the Mandelbrot Generator (mandelbrot_generator.html)
  Once you have your complex point C coordinates, you must configure pX and pY to 
  its coordinates. You may also choose the width of the images, the max iterations, 
  the initial zoom and other parameters. You can experiment to zoom in with 
  different zoom orientations, and play around with some colors and hues.
  You can also divide the process of generating the images. Once you have the 'zoom'
  (initial zoom) set, the parameter 'file counter' keeps track of where you have stopped.
  You don't need to worry about the zoom that the last image had, but you need to
  configure the initial zoom as it was and the 'file counter' as the number of the
  last picture. Configure your browser to download the images to a specific directory
  and give this zoom a name in 'file_name'. Once you have all configurations in place,
  you can open mandelbrot_generator.html and wait for the images to popup. The complete
  zoom may take a few days, or not that much, it deppends on the point chosen and
  on the machine hardware. Nevertheless, some optmizations have been implemented so
  the time have been reduced.
*/
  const mandelbrot = {
  points:
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
    ],

  enable_zoom:true,            // enable zooming into the set
  zoom_orientation:'center',   // orientation of the zoom point (where the coordinate pX pY is located in the screen)
  // 'top-left' || 'top-right' || 'bottom-left' || 'bottom-right' 
  // || 'center' || 'mid-left' || 'mid-right' || 'mid-top' || 'mid-bottom'

  width_pixel:720,            // image Width in pixels 

  enable_download_files:false,  // enable the download of the images
  file_name:'mandelbrowser', // name of the file that will be saved
  file_counter:1,              // this is the file counter but also keep track of the zoom.
  
  enable_center_point:false,   // enable point that indicate zoom direction
  center_point_color:'#ffffff',// point color
  center_point_radius:1,       // point radius

  enable_zoom_text:false,      // enable the drawing of the zoom in the image
  zoom_text_color:'#ffffff',   // font color of the zoom text
  font_size:25,                // font size of the zoom text
}





  
