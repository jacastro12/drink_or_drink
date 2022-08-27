// GLOBAL VARIABLE
let NEWARRAY = []
let RESULTS = []
let BOTTLEFLAG = 0
// GLOBAL CONSTANTS
const USERS = []
const USER = "USER"
const GIFT = "GIFT"
const GIFTS = [
    { name: "Desafío", src: "./src/img/desafio.svg", description: "tiene que realizar un desafío" },
    { name: "Verdad", src: "./src/img/truth.svg", description: "tiene que decir una verdad" },
    { name: "Tomar una vez", src: "./src/img/one.svg", description: "tiene que tomar una vez" },
    { name: "Tomar x2", src: "./src/img/two.svg", description: "tiene que tomar dos veces" },
    { name: "Trago Fuerte", src: "./src/img/strongOne.svg", description: "tiene que tomar el trago más fuerte" },
    { name: "Trago Suave", src: "./src/img/softOne.svg", description: "tiene que tomar el trago más suave" },
    { name: "Verdad", src: "./src/img/truth.svg", description: "tiene que decir una verdad" },
    { name: "Trago Fuerte x2", src: "./src/img/strongTwo.svg", description: "tiene que tomar el trago más fuerte 2 veces" },
    { name: "Trago Suave x2", src: "./src/img/softTwo.svg", description: "tiene que tomar el trago más suave 2 veces" },
    { name: "Salvado", src: "./src/img/win.svg", description: "se salvó esta vez" },
    { name: "Salvado", src: "./src/img/win.svg", description: "se salvó esta vez" },
]


const USERSLIST = document.getElementById("usersList")
const ADDUSERELEMENT = document.getElementById("addUser")
const USERNAME = document.getElementById("userName")
const USERGENRE = document.getElementById("userGenre")
const STARTGAME = document.getElementById("startGame")
const INITFORM = document.getElementById("initForm")
const GAME = document.getElementById("game")
const REORDERBTN = document.getElementById("reorderItems")
const CIRCLEDIV = document.getElementById("circle")
const BOTTLE = document.getElementById("bottle")


class User {
    constructor(index, name, genre) {
        this.name = name
        this.index = index
        this.genre = genre
        this.type = USER
        let src = ""
        if (genre == "male") {
            src = "./src/img/male.svg"
        } else {
            src = "./src/img/female.svg"
        }
        this.src = src
    }
    renderUser() {
        const li = document.createElement("li")
        li.innerText = this.name
        const button = document.createElement("button")
        button.innerText = "x"
        button.id = this.index
        li.appendChild(button)
        button.addEventListener("click", event => {
            event.target.parentNode.remove()
            const index = USERS.find(element => element.index == event.target.id).index
            this.removeUser(index)
        })
        USERSLIST.appendChild(li)
        USERS.push(this)
    }
    removeUser(index) {
        USERS.splice(index - 1, 1)
    }
}
class Gift {
    constructor(index, name, src, description) {
        this.index = index
        this.name = name
        this.src = src
        this.description = description
        this.type = GIFT
        this.genre = "None"
    }
}

class CirlcleItem {
    constructor(index, initDegree, endDegree, type, name, genre, src, description = "") {
        this.index = index
        this.type = type
        this.name = name
        this.genre = genre
        this.initDegree = initDegree
        this.endDegree = endDegree
        this.src = src
        this.description = description
    }
}



document.addEventListener("DOMContentLoaded", () => {
    addUser()
    startGame()
})

function addUser() {
    ADDUSERELEMENT.addEventListener("click", () => {
        if (USERNAME.value != "") {
            const index = USERS.length + 1
            const user = new User(index, USERNAME.value, USERGENRE.value)
            if (USERS.length > 1) STARTGAME.style.display = "block"
            if (user.length > 3) USERSLIST.style.flexWrap = "wrap !important"
            user.renderUser()
            USERNAME.value = ""
            USERNAME.focus()
        }
    })
}


function startGame() {
    STARTGAME.addEventListener("click", () => {
        INITFORM.remove()
        GAME.style.display = "flex"
        renderElementsInCircle()
    })
}
REORDERBTN.addEventListener("click", () => {
    renderElementsInCircle()
})
function setCircleItems(list) {
    // calcular el numero de grados para cada item
    NEWARRAY = []
    const totalCircleitems = 16
    const missingCircleItems = totalCircleitems - list.length
    let newArrayIndex = 0
    for (newArrayIndex; newArrayIndex < missingCircleItems; newArrayIndex++) {
        const index = Math.floor(randomIntFromInterval(0, GIFTS.length - 1))
        const circleItem = new Gift(newArrayIndex, GIFTS[index].name, GIFTS[index].src, GIFTS[index].description)
        list.push(circleItem)
    }

    const itemGrade = 360 / totalCircleitems
    let counter = 90
    const randomList = randomizeArray(list)
    randomList.forEach((element, index) => {
        const circleItem = new CirlcleItem(index + 1, counter, counter + itemGrade - 1, element.type, element.name, element.genre, element.src, element.description)
        counter = counter + itemGrade
        if (counter >= 360) {
            counter = counter % 360
        }
        NEWARRAY.push(circleItem)
    })
    return NEWARRAY
}

function randomizeArray(list) {
    list.sort((a, b) => {
        return Math.random() - 0.5
    })
    return list
}

function renderElementsInCircle() {
    CIRCLEDIV.innerHTML = ""
    const n = 16;  // numero de circulos
    const screenWidth = screen.width
    // let r = 320 // radio
    let r = 200 // radio
    if (screenWidth <= 600) {
        r = 160 // radio
    } else if (screenWidth > 600 && screenWidth <= 1000) {
        r = 200 // radio
    } else if (screenWidth > 1000 && screenWidth <= 1376) {
        r = 260
    }
    else if (screenWidth > 1376) {
        r = 320;
    }

    let angulo = 0;

    const div = document.createElement("div")
    const circleItems = setCircleItems(USERS)
    circleItems.forEach(element => {
        if (element.type == USER) {
            div.innerHTML += `<div class="element" initDegree="${element.init_degree}" endDegree="${element.end_degree}">
                            <img id="img${element.index}" class="obj" src="${element.src}">
                            <p>${element.name}</p>
                          <div>`
        } else {
            div.innerHTML += `<div class="element" initDegree="${element.init_degree}" endDegree="${element.end_degree}">
                                <img id="img${element.index}" class="obj" src="${element.src}">
                            <div>`
        }

    })
    CIRCLEDIV.appendChild(div)
    const circles = document.querySelectorAll('.element')
    let originX = circles[0].offsetLeft
    let originY = circles[0].offsetTop

    angulo += 0.01
    circles.forEach((element, i) => {
        element.style.left = `${originX + r * Math.cos(angulo + 2 * Math.PI / n * i)}px`
        element.style.top = `${originY + r * Math.sin(angulo + 2 * Math.PI / n * i)}px`
    })

}


let counter = 0;
BOTTLE.addEventListener("click", async () => {
    whiteBlackImage()
    rotateBottle()
});

function rotateBottle() {
    const duration = randomIntFromInterval(1.00, 5.00) * 1000;
    const interval_id = setInterval(function () {
        counter += 1
        BOTTLE.style.webkitTransform = `rotate(${counter}deg)`;
        const bottleGrades = getBottleTopGrades(BOTTLE.style.webkitTransform)
        getResults(bottleGrades)
    }, 5);

    setTimeout(() => {
        clearInterval(interval_id)
        const bottleGrades = getBottleTopGrades(BOTTLE.style.webkitTransform)
        getResults(bottleGrades, last = true)
        setTimeout(() => {
            gameAlert()
        }, 1200)
    }, duration);

}

function whiteBlackImage() {
    [...document.getElementsByClassName("obj")].forEach(element => {
        element.style.filter = "grayscale(100%)"
    })
}

function randomIntFromInterval(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(2)
}

function getBottleTopGrades(grades_received) {
    const regex = /\d+/; // Obtener numero dentro de una cadena de texto
    const grades_number = grades_received.match(regex)[0]
    const grades = Math.floor(Number(grades_number) % 360)
    // console.log("bottle grades", grades)
    return grades
}

function getResults(bottleDegree, last = false) {
    // console.log("Evaluando resultados...")
    // console.log(NEWARRAY)

    NEWARRAY.forEach(element => {
        const min = element.initDegree
        const max = element.endDegree

        const oppositeBottleDegree = get360Grades(bottleDegree + 180)
        if (bottleDegree >= min && bottleDegree <= max || oppositeBottleDegree >= min && oppositeBottleDegree <= max) {
            document.getElementById(`img${element.index}`).style.filter = "grayscale(0%)"
            animateCSS(`#img${element.index}`, 'bounce');
            if (last) {
                RESULTS.push(element)
            }
        } else {
            document.getElementById(`img${element.index}`).style.filter = "grayscale(100%)"
        }
    })
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);
        node.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

function get360Grades(grades) {
    return (grades >= 360) ? grades % 360 : grades
}

function gameAlert() {
    let resultDescription = ""
    if (RESULTS[0].type === RESULTS[1].type) {
        if (RESULTS[0].type == USER) {
            resultDescription = `${RESULTS[0].name} tiene que proponer un desafío a ${RESULTS[1].name}`
        } else {
            resultDescription = "Punto muerto, todos toman"
        }
    } else {
        if (RESULTS[0].type === USER) {
            resultDescription = `${RESULTS[0].name} ${RESULTS[1].name}`
        } else {
            resultDescription = `${RESULTS[1].name} ${RESULTS[0].description}`
        }
    }
    if (RESULTS[0] === RESULTS[1]) { }
    Swal.fire({
        title: '<img src="./src/img/logo-color.svg" width="80%">',
        html:
            '<br><div class="alertWindow">' +
            `<div><img class="img-swal" src="${RESULTS[0].src}"><p>${RESULTS[0].name}</p></div>` +
            `<div><img class="img-swal" src="${RESULTS[1].src}"><p>${RESULTS[1].name}</p></div>` +
            '</div>' +
            `<p class="results">${resultDescription}</p>`,
        showCloseButton: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDownBig'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Continuar',
        confirmButtonAriaLabel: 'Thumbs up, great!',

    })
    RESULTS = []
}