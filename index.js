import { Oscillator, TWO_PI } from "./src/wave.js"
import { bezier } from "./src/curve.js"


class Blob {
    constructor(radius, center, points, options) {
        this.radius = radius
        this.center = center
        this.options = options
        this.points = points
        this.oscillators = []
        this.initialize()
    }
    tick() {
        const translatedPoints = []

        for (let i = 0; i < this.points; i++) {
            this.oscillators[i].tick()
            translatedPoints.push(this.translatePoint(i))
        }

        let pathString = `M ${translatedPoints[0][0]}, ${translatedPoints[0][1]} `

        pathString += bezier({
            prev2: translatedPoints[translatedPoints.length - 1],
            prev1: translatedPoints[0],
            current: translatedPoints[1],
            next: translatedPoints[2]
        }, 0.2)

        for (let i = 2; i < this.points - 1; i++) {
            pathString += bezier({
                prev2: translatedPoints[i - 2],
                prev1: translatedPoints[i - 1],
                current: translatedPoints[i],
                next: translatedPoints[i + 1]
            }, 0.2)
        }

        pathString += bezier({
            prev2: translatedPoints[translatedPoints.length - 3],
            prev1: translatedPoints[translatedPoints.length - 2],
            current: translatedPoints[translatedPoints.length - 1],
            next: translatedPoints[0]
        }, 0.2)

        pathString += bezier({
            prev2: translatedPoints[translatedPoints.length - 2],
            prev1: translatedPoints[translatedPoints.length - 1],
            current: translatedPoints[0],
            next: translatedPoints[1]
        }, 0.2)
        
        pathString += "Z"

        return pathString
    }
    initialize() {
        const increment = TWO_PI / this.points
        let angle = 0
        for (let i = 0; i < this.points; i++) {
            this.oscillators.push(new Oscillator(
                [Math.cos(angle) * this.radius, Math.sin(angle) * this.radius], angle,
                this.options.minSpeed, this.options.maxSpeed, this.options.minHeight, this.options.maxHeight
            ))
            angle += increment        
        }
    }
    translatePoint(index) {
        const oscillator = this.oscillators[index]
        const position = oscillator.position
        const offsetAngle = oscillator.offset
        const height = oscillator.height
        const circleAngle = oscillator.angle
        return [
            this.center[0] + position[0] + (Math.sin(offsetAngle) * height) * Math.cos(circleAngle),
            this.center[1] + position[1] + (Math.sin(offsetAngle) * height) * Math.sin(circleAngle)
        ]
    }
}


const path = document.getElementById("path")

const blob = new Blob(30, [50, 50], 15, {
    minHeight: 4,
    maxHeight: 4,
    minSpeed: 0.02,
    maxSpeed: 0.03
})


function animate() {
    path.setAttribute("d", blob.tick())
    window.requestAnimationFrame(animate)
}

animate()
