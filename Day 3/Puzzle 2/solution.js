#!/usr/bin/env node

var fs = require('fs')
var file = 'input.txt'

function getTrees(array, startingIndex, right, down = 1) {
    let currentIndex = startingIndex;
    let totalTrees = 0
    for (let i = 0; i < array.length; i = i + down) {
        if (array[i][currentIndex] == '#') {
            totalTrees++
        }
        currentIndex = currentIndex + right
    }
    return totalTrees
}

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    let dataArr = data.split("\n").filter(el => {
        return el != ''
    }).map(el => {
        return el.repeat(100)
    })
    let treeArr = [getTrees(dataArr, 0, 1), getTrees(dataArr, 0, 3), getTrees(dataArr, 0, 5), getTrees(dataArr, 0, 7), getTrees(dataArr, 0, 1, 2)]
    console.dir(treeArr.reduce( (a, b) => a * b ), {'maxArrayLength': null})
})