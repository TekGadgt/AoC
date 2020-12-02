var fs = require('fs')

function solutions(arr) {
    let solutionPairs = []
    arr.map(itemOne => {
        arr.map(itemTwo => {
            if (itemOne !== itemTwo && itemOne + itemTwo == 2020) {
                solutionPairs.push([itemOne, itemTwo]);
            }
        })
    })

    return solutionPairs;
}

function solution(arr) {
    let solutionArr = arr[0].filter(item => typeof item ==='number');
    let solution = solutionArr[0] * solutionArr[1];
    return solution;
}

fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) throw err
    let dataArr = data.split('\n').sort((a, b) => a - b).slice(1).map(
        function (x) {
            return parseInt(x, 10);
        }
    )
    console.log(solution(solutions(dataArr)));
})
