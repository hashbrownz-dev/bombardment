// KEYBOARD

const trackKeys = (keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ','z']) => {
    let down = Object.create(null);
    const track = (event) => {
        if(keys.includes(event.key)){
            event.preventDefault();
            down[event.key] = event.type == 'keydown';
        }
    }
    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);
    return down;
}

// MOUSE

const trackMouse = () => {
    const mouse = { x:0, y:0, clicked:false };
    document.querySelector('canvas').addEventListener('mousemove', e => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    })
    document.querySelector('canvas').addEventListener('click', e => {
        mouse.clicked = true;
        console.log(mouse);
    })
    return mouse;
}