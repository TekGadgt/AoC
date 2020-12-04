#!/usr/bin/env node

var fs = require('fs')
var file = 'input.txt'

function checkValidPassports(passportObjs, regexObj) {
    let validPasses = 0;
    for (let i = 0; i < passportObjs.length; i++) {
        let conditionsArray = [
            (Object.keys(regexObj).every(k => Object.keys(passportObjs[i]).includes(k))),
            (regexObj.byr.test(passportObjs[i].byr)),
            (regexObj.iyr.test(passportObjs[i].iyr)),
            (regexObj.eyr.test(passportObjs[i].eyr)),
            (regexObj.hgt.test(passportObjs[i].hgt)),
            (regexObj.hcl.test(passportObjs[i].hcl)),
            (regexObj.ecl.test(passportObjs[i].ecl)),
            (regexObj.pid.test(passportObjs[i].pid))
        ]
        if (!conditionsArray.includes(false)) {
            validPasses++
        }
    }
    return validPasses
}

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    let passportObjs = data.split('\n\n').map((el) => {
        return Object.assign(
            ...el.replace(/\n/g, ' ').trim()
                .split(' ')
                .map((s) => s.split(':'))
                .map(([k, v]) => ({ [k]: v }))
        )
    })
    let regexObj = {
        byr: new RegExp('^19[2-9][0-9]$|^200[0-2]$'),
        iyr: new RegExp('^201[0-9]$|^2020$'),
        eyr: new RegExp('^202[0-9]$|^2030$'),
        hgt: new RegExp('^1[5-8][0-9]cm$|^19[0-3]cm$|^59in$|^6[0-9]in$|^7[0-6]in$'),
        hcl: new RegExp('^#[0-9a-f]{6}$'),
        ecl: new RegExp('^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$'),
        pid: new RegExp('^[0-9]{9}$')
    }
    console.dir(checkValidPassports(passportObjs, regexObj), { maxArrayLength: null })
})