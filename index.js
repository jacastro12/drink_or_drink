const users = [
]
let results = []
const newArray = []
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
    { name: "Salvado", src: "./src/img/win.svg", description: "se salvó esta vez" },
    { name: "Salvado", src: "./src/img/win.svg", description: "se salvó esta vez" },
    { name: "Salvado", src: "./src/img/win.svg", description: "se salvó esta vez" },
]
class User {
    constructor(index, name, genre) {
        this.name = name
        this.index = index
        this.genre = genre
        this.type = "USER"
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
        document.getElementById("usersList").appendChild(li)
        users.push(this)
    }
}
class Gift {
    constructor(index, name, src, description) {
        this.index = index
        this.name = name
        this.src = src
        this.description = description
        this.type = "GIFT"
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
    document.getElementById("addUser").addEventListener("click", () => {
        const index = users.length + 1
        const name = document.getElementById("userName")
        const genre = document.getElementById("userGenre")
        const user = new User(index, name.value, genre.value)
        if (users.length > 1) document.getElementById("startGame").style.display = "block"
        user.renderUser()
    })
}


function startGame() {
    document.getElementById("startGame").addEventListener("click", () => {
        document.getElementById("initForm").remove()
        document.getElementById("game").style.display = "flex"
        renderElementsInCircle()
    })
}
function setCircleItems(list) {
    // calcular el numero de grados para cada item
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
        newArray.push(circleItem)
    })
    return newArray
}

function randomizeArray(list) {
    list.sort((a, b) => {
        return Math.random() - 0.5
    })
    return list
}

function renderElementsInCircle() {

    const n = 16;  // numero de circulos
    // let r = 320 // radio
    let r = 220 // radio
    if (screen.width <= 600) {
        r = 160 // radio
    }


    let angulo = 0;

    const div = document.createElement("div")
    const circleItems = setCircleItems(users)
    circleItems.forEach(element => {
        if (element.type == "USER") {
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
    document.getElementById("circle").appendChild(div)

    const circles = document.querySelectorAll('.element')

    let originX = circles[0].offsetLeft
    let originY = circles[0].offsetTop

    angulo += 0.01
    circles.forEach((element, i) => {
        element.style.left = `${originX + r * Math.cos(angulo + 2 * Math.PI / n * i)}px`
        element.style.top = `${originY + r * Math.sin(angulo + 2 * Math.PI / n * i)}px`
    })

}


const bottle = document.getElementById("bottle")
let counter = 0;
bottle.addEventListener("click", event => {
    console.log(event.detail)
    whiteBlackImage()
    rotateBottle()
});

function rotateBottle() {
    const duration = randomIntFromInterval(1.00, 5.00) * 1000;
    const interval_id = setInterval(function () {
        counter += 1
        bottle.style.webkitTransform = `rotate(${counter}deg)`;
        const bottleGrades = getBottleTopGrades(bottle.style.webkitTransform)
        getResults(bottleGrades)
    }, 5);

    setTimeout(() => {
        clearInterval(interval_id)
        const bottleGrades = getBottleTopGrades(bottle.style.webkitTransform)
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
    // console.log(newArray)

    newArray.forEach(element => {
        const min = element.initDegree
        const max = element.endDegree

        const oppositeBottleDegree = get360Grades(bottleDegree + 180)
        if (bottleDegree >= min && bottleDegree <= max || oppositeBottleDegree >= min && oppositeBottleDegree <= max) {
            document.getElementById(`img${element.index}`).style.filter = "grayscale(0%)"
            animateCSS(`#img${element.index}`, 'bounce');
            if (last) {
                results.push(element)
            }
        } else {
            document.getElementById(`img${element.index}`).style.filter = "grayscale(100%)"
        }
    })
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
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
    console.log("results", results)
    let resultDescription = ""
    if (results[0].type === results[1].type) {
        resultDescription = "Punto muerto, todos toman"
    } else {
        if (results[0].type === "USER") {
            resultDescription = `${results[0].name} ${results[1].description}`
        } else {
            resultDescription = `${results[1].name} ${results[0].description}`
        }
    }
    if (results[0] === results[1]) { }
    Swal.fire({
        title: '<strong>Legaaaal!</strong>',
        // icon: 'info',
        html:
            '<br><div class="alertWindow">' +
            `<div><img src="${results[0].src}"><p>${results[0].name}</p></div>` +
            `<div><img src="${results[1].src}"><p>${results[1].name}</p></div>` +
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
    results = []
}