const users = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
    "User 9",
    "User 10",
    "User 11",
    "User 12",
    "User 13",
    "User 14",
    "User 15",
    "User 16",
    // "User 17",
    // "User 18",
    // "User 19",
    // "User 20",
]
class User {
    constructor(index, name, init_degree, end_degree) {
        this.name = name
        this.index = index
        this.init_degree = init_degree
        this.end_degree = end_degree
    }
}

const newArray = []
// function formatArray() {
//     const order = [5, 7, 9, 11, 16]
//     let subArray = []
//     let counter = 0;
//     users.forEach((element, index) => {
//         subArray.push(element)
//         if (index + 1 == order[counter]) {
//             counter += 1
//             newArray.push(subArray)
//             subArray = []
//         }
//     })
//     return newArray
// }
document.addEventListener("DOMContentLoaded", () => {
    // formatArray()
    // newArray.forEach(element => {
    //     const div = document.createElement("div")
    //     div.classList.add("row")
    //     element.forEach(user => {
    //         div.innerHTML += `<div><img src="./src/img/user.png" width="100px"><p>${user}</p><div>`
    //     })
    //     document.getElementById("body").appendChild(div)
    // })
    elementsInCircle()

})

function setUsers(list) {
    // calcular el numero de grados para cada item
    const itemGrade = 360 / list.length
    let counter = 90
    list.forEach((element, index) => {
        const user = new User(index + 1, element, counter, counter + itemGrade - 1)
        if (counter >= 360) {
            counter = counter % 360
        }
        counter = counter + itemGrade
        newArray.push(user)
    })
    return newArray
}

function elementsInCircle() {


    const n = 16;  // numero de circulos
    const r = 320 // radio

    let angulo = 0;

    const div = document.createElement("div")
    const users_list = setUsers(users)
    users_list.forEach(user => {
        div.innerHTML += `<div class="element" initDegree="${user.init_degree}" endDegree="${user.end_degree}">
                            <img id="${user.index}" class="obj" src="./src/img/user.png" width="100px">
                            <p>${user.name}</p>
                          <div>`
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
bottle.addEventListener("click", () => {
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
        // const bottleGrades = getBottleTopGrades(bottle.style.webkitTransform)
        // getResults(bottleGrades)
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
    console.log("bottle grades", grades)
    return grades
}

function getResults(bottleDegree) {
    console.log("Evaluando resultados...")
    console.log(newArray)

    newArray.forEach(element => {
        const min = element.init_degree
        const max = element.end_degree
        if (bottleDegree >= min && bottleDegree <= max) {
            console.log(element.index)
            document.getElementById(`${element.index}`).style.filter = "grayscale(0%)"
            animateCSS(`#${element.index}`, 'bounce');
            // document.getElementById(`${element.index}`).classList.add("animate__pulse")
        } else {
            document.getElementById(`${element.index}`).style.filter = "grayscale(100%)"
            // document.getElementById(`${element.index}`).classList.remove("animate__pulse")
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
