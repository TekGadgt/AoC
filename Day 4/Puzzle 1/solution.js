#!/usr/bin/env node

var fs = require('fs')
var file = 'input.txt'

function checkValidObjs(arr, expectedKeys) {
    let validPasses = 0;
    for (let i = 0; i < arr.length; i++) {
        if (expectedKeys.every(k => Object.keys(arr[i]).includes(k))) {
            validPasses++
        }
    }
    return validPasses
}

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    let dataArr = data.split('\n\n').map((el) => {
        return el.replace(/\n/g, ' ').trim()
    })
    let objArr = dataArr.map((el) => {
        return Object.assign(
            ...el
                .split(' ')
                .map((s) => s.split(':'))
                .map(([k, v]) => ({ [k]: v }))
        )
    })
    console.dir(checkValidObjs(objArr, [
        'byr', 'ecl',
        'eyr', 'hcl',
        'hgt', 'iyr',
        'pid'
    ]), { maxArrayLength: null })
})
