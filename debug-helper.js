function emulate(depth=100, scale=10, percentage=5) {
    const burst = [];
    const range = scale;
    const percent = (((range / 2) / 100) * percentage) // 5%
    for (let i = 0; i < 10; i++) {
        let g = Math.random() * range;
        if (g > (range / 2) - percent && g < (range / 2) + percent) {
            burst.push((depth - g) / 100)
        } else {
            burst.push((depth + (((range / 2) / 100) * (Math.random(1) * 1))) / 100) // devidint by 100 from CM to M
        }
    }
    accurate = Math.floor(burst.reduce((a, b) => +a + +b) / 10);
    return burst
}