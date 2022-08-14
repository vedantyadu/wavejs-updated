
/**
 * This is somewhat like Catmull Rom spline
 */

function Oppline(p1, p2) {
    const lengthX = p2[0] - p1[0]
    const lengthY = p2[1] - p1[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}
 
function controlPoint(current, previous, next, reverse, smoothing) {
    const line = Oppline(previous, next)
    const angle = line.angle + (reverse ? Math.PI : 0)
    const length = line.length * smoothing
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length]
}

export function bezier(points, smoothing) {
    const [cpsX, cpsY] = controlPoint(points.prev1, points.prev2, points.current, false, smoothing)
    const [cpeX, cpeY] = controlPoint(points.current, points.prev1, points.next, true, smoothing)
    return `C ${cpsX}, ${cpsY} ${cpeX}, ${cpeY} ${points.current[0]}, ${points.current[1]} `
}
