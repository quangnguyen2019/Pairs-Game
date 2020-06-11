// const fs = require('fs');

// let arrImages = [];
// let imgPath = './images/';
// let i = 0;

// fs.readdir(imgPath, (err, files) => {
//     files.forEach(file => {
//         arrImages[i] = imgPath + file;
//         i++;
//     });
// });

let arrImages = [];
let imgPath = 'images_1/';
let index = 0;
let row, column;
let time = 2;
let coupleRemaining;
let idInterval;
let gridCells = document.getElementsByClassName("grid-cells")[0];
let notification = document.getElementsByClassName("notification")[0];

function Create_Grid() {
    gridCells.innerHTML = "";
    notification.innerText = "";
    gridCells.classList.remove("disable-grid");
    
    // remove interval if it exists
    if (idInterval) clearInterval(idInterval);

    row = document.getElementById("row-input").value;
    column = document.getElementById("col-input").value;

    if (row * column % 2 != 0) {
        alert("The total cells must be an EVEN number!!")
        return;
    }

    // Số cặp còn lại
    coupleRemaining = row * column / 2;
    let count = 0;

    for (let i = 0; i < column; i++) 
    {
        let divRow = document.createElement("div");

        for (let j = 0; j < row; j++) 
        {
            let cell = document.createElement("div");
            cell.id = count;
            cell.className = "cell";
            cell.setAttribute("style", 
                "width:" + CellSize() + "px;" +
                "height:" + CellSize() + "px;" +
                "margin-right: 5px;"
            );
            cell.addEventListener("click", (e) => {
                Cell_Click(e.target.id);
            });
            divRow.appendChild(cell);

            count++;
        }

        gridCells.appendChild(divRow);
    }

    AddImagesToArr();

    idInterval = CountdownTime();
}

function CellSize() {
    let cellSizeByColumn = Math.floor((gridCells.offsetWidth - 5 * (column - 1)) / column);
    let cellSizeByRow = Math.floor((gridCells.offsetHeight - 5 * (row - 1)) / row);
    return Math.min(cellSizeByColumn, cellSizeByRow);
}

function AddImagesToArr() {
    for (let i = 0; i < row * column; i += 2) {
        arrImages[i] = imgPath + "image_" + index + ".png";
        arrImages[i + 1] = imgPath + "image_" + index + ".png";
        index++;
    }
};


let cellOpenedFirst;
let cellOpenedSecond;

function Cell_Click (id) 
{
    let element = document.getElementById(id);
    element.style.backgroundPosition = "center";

    if (!element.style.backgroundImage) {
        //
        index = Math.floor(Math.random() * arrImages.length);
        let imgRandom = arrImages[index];
        arrImages.splice(index, 1);

        element.style.backgroundImage = "url(" + imgRandom + ")";
        element.style.backgroundSize = "90px";
        element.style.backgroundRepeat = "no-repeat";
    }

    if (!cellOpenedFirst)
    {
        cellOpenedFirst = element;
    }
    else {
        if (element !== cellOpenedFirst) {
            cellOpenedSecond = element;
            CheckSameImages();
        }
    }
}

function CheckSameImages() 
{
    if (cellOpenedFirst.style.backgroundImage !== 
        cellOpenedSecond.style.backgroundImage) 
    {
        // ẩn hình sau 0.5s
        setTimeout((cellOpenedFirst, cellOpenedSecond) => {
            cellOpenedFirst.style.backgroundPosition = "-9999px";
            cellOpenedSecond.style.backgroundPosition = "-9999px";
        }, 400, cellOpenedFirst, cellOpenedSecond);
    }
    else {
        // disable 2 ô mở ra giống nhau
        setTimeout((cellOpenedFirst, cellOpenedSecond) => {
            cellOpenedFirst.classList.add("disable");
            cellOpenedSecond.classList.add("disable");
        }, 300, cellOpenedFirst, cellOpenedSecond);

        coupleRemaining--;
    }

    cellOpenedFirst = null;
}


function CountdownTime() 
{
    let minutes, seconds;

    minutes = Math.floor(time);
    seconds = (time - minutes) * 60;

    let temp = setInterval(() => {
        let strMinutes = "0" + minutes;
        let strSeconds = (seconds < 10) ? '0' + seconds : seconds;
        document.getElementsByClassName("timer")[0].innerText =  strMinutes + ":" + strSeconds;

        if (seconds === 0) {
            if (minutes > 0) {
                minutes -= 1;
            }
            seconds = 59;
        }
        else {
            seconds -= 1;
        }

        if (minutes === 0 && seconds === 0) {
            clearInterval(temp);

            if (coupleRemaining > 0) {
                gridCells.classList.add("disable-grid");
                notification.innerText = "Game Over!!";
                notification.scrollTop = notification.scrollHeight;

            }
            else {
                notification.innerText = "You Win!!";
            }
        }
        else if (coupleRemaining === 0) {
            clearInterval(temp);
            notification.innerText = "You Win!!";
        }
    }, 1000);

    return temp;
}