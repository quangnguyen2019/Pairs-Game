// const fs = require('fs');

// var arrImages = [];
// var imgPath = './images/';
// var i = 0;

// fs.readdir(imgPath, (err, files) => {
//     files.forEach(file => {
//         arrImages[i] = imgPath + file;
//         i++;
//     });
// });

var row = 4, column = 4;
var arrImages = [];
var imgPath = 'images_1/';
var index = 0;

// row = document.getElementById("row-input").value;
// column = document.getElementById("column-input").value;

for (var i = 0; i < 16; i += 2) {
    arrImages[i] = imgPath + "image_" + (index + 1) + ".png";
    arrImages[i + 1] = imgPath + "image_" + (index + 1) + ".png";
    index++;
}

function Cell_Click (id) {
    var element = document.getElementById(id);

    if (!element.style.backgroundImage) 
    {
        index = Math.floor(Math.random() * arrImages.length);
        var imgRandom = arrImages[index];

        element.style.backgroundImage = "url(" + imgRandom + ")";
        element.style.backgroundSize = "cover";

        arrImages.splice(index, 1);
    }
}

function Create_Grid() {
    // for (var i = 1; i <= row * column; i++) {
    //     var cell = document.createElement("div");
    //     cell.id = i;
    //     cell.className = "cell";
    //     cell.click = "Cell_Click";
    //     document.getElementById("grid-cells").appendChild(cell);
    // }
}