const standart_inside_color = "#27196b"
const standart_hue = "#94f8ff"

const width_pixel = 620
const canvas = document.querySelector('canvas')
const resol = 0.5625
canvas.width = width_pixel
canvas.height = width_pixel*resol
const c = canvas.getContext('2d')
c.textBaseline = 'middle'
c.textAlign = 'center'
const cH = canvas.height
const cW = canvas.width 
let zoom = 0.9
let max_iteration = 1000
document.querySelector('#max_iteration_range').value = max_iteration
document.querySelector('#max_iter_show').innerText = `Max Iter ${max_iteration}`
let zoom_factor = (1.008)**115
let pX = -0.5
let pY = 0
let smooth_coloring = false
document.querySelector('#smooth_coloring').checked = smooth_coloring
let points = [
    {
        pX: -0.5,
        pY: 0,
        zoom: 0.9,
        hue: "#94f8ff",
        inmandelbrot_color: "#27196b",
        smooth_coloring:smooth_coloring,
        max_iteration:1000
    }
]
let fractal = 'Mandelbrot'
let inmandelbrot_color = `#000000`
let color_offset = 330
const alfa = 4*cH/cW
let dx = 4/zoom
let dy = alfa/zoom
let x1 = pX -dx/2
let y1 = pY + dy/2
c.font = `${15}px Verdana`
