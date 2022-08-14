
export const TWO_PI = Math.PI * 2

function random(min, max) {
    return min + (max - min) * Math.random()
}

export class Oscillator {
    constructor(position, angle, minSpeed, maxSpeed, minHeight, maxHeight) {
        this.position = position
        this.speed = random(minSpeed, maxSpeed)
        this.height = random(minHeight, maxHeight)
        this.angle = angle
        this.offset = random(0, TWO_PI)
    }
    tick() {
        this.offset += this.speed
        if (this.offset > TWO_PI) {
            this.offset -= TWO_PI
        }
    }
}
