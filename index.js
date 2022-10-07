
const score = document.querySelector(".score");
const score1 = document.querySelector(".score1");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);

startScreen.addEventListener('click', start)

let Keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    score1: 0, speed: 6
}



function KeyDown(e) {
    e.preventDefault()
    Keys[e.key] = true
}


function KeyUp(e) {
    e.preventDefault()
    Keys[e.key] = false
}

function game_end() {
    player.start1 = false;

    startScreen.classList.remove('hide')


}

function gameplay() {
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect();
    if (player.start1) {

        if (Keys.ArrowUp && player.x < road.bottom - 200) { player.x += player.speed }
        if (Keys.ArrowDown && player.x > road.top + 50) { player.x -= player.speed }
        if (Keys.ArrowLeft && player.y > 0) { player.y -= player.speed }
        if (Keys.ArrowRight && player.y < (road.width - 50)) { player.y += player.speed }
        car.style.left = player.y + "px"
        car.style.bottom = player.x + "px"
        mulline()
        enemycar(car)
        // mmaincar()
        window.requestAnimationFrame(gameplay)

    }
    player.score1++
    score1.innerText = player.score1
}
// moving line code 
function mulline() {
    let rpline = document.querySelectorAll('.line');
    let road = gameArea.getBoundingClientRect();
    rpline.forEach((el, index) => {
        if (el.y > road.bottom - 120) {
            el.y -= road.bottom + 100
        }
        el.y += 5
        el.style.top = el.y + "px"
    })

}


// moving car code
function enemycar(car) {
    let enycar = document.querySelectorAll('.enycar');
    let road = gameArea.getBoundingClientRect();
    console.log(road)
    let cars = car.getBoundingClientRect();
    enycar.forEach((el, index) => {
        if (coiled_car(car, el)) {
            console.log("hit")
            game_end()
        }
        if (el.y > road.bottom - 130) {
            el.y = road.top + 30
            el.style.left = Math.floor(Math.random() * 270) + "px"
        }
        el.y += player.speed
        el.style.top = el.y + "px"

    })
}

//  coligen car
function coiled_car(a, b) {
    let acar = a.getBoundingClientRect()
    let benyCar = b.getBoundingClientRect()
    return !((acar.top > benyCar.bottom) || (acar.bottom < benyCar.top) || (acar.left > benyCar.right) || (acar.right < benyCar.left))
}

// moving car code end


function start() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    gameArea.classList.remove('hide')
    startScreen.classList.add('hide')
    gameArea.innerHTML = ' '
    player.score1 = 0

    player.start1 = true
    let car = document.createElement('backgroundImage');
    car.setAttribute('class', 'car')
    gameArea.appendChild(car)



    // line genration code

    for (let x = 0; x < 6; x++) {

        let roadline = document.createElement('div')
        roadline.setAttribute('class', 'line')
        roadline.y = (x * 165)
        roadline.style.top = roadline.y + "px"
        gameArea.appendChild(roadline)
    }

    // line genration code end loop


    // enycar genration code
    for (let x = 0; x < 3; x++) {

        let enycar = document.createElement('div')
        enycar.setAttribute('class', 'enycar')
        // enycar.y = ((x + 1) + 250) * -1;
        enycar.y = (x * 200)
        enycar.style.top = enycar.y + "px"
        gameArea.appendChild(enycar)


        let enycc = document.querySelectorAll('.enycar');
        enycc.forEach((el) => {
            el.style.backgroundColor = "#" + randomColor
        })
        enycar.style.left = Math.floor(Math.random() * 250) + "px"

    }
    // enycar genration code end


    player.x = car.offsetTop;
    player.y = car.offsetLeft;   //set value to the player object
    // console.log(car.offsetTop)
    // console.log(car.offsetLeft)
    window.requestAnimationFrame(gameplay)  //repetion of function
}
