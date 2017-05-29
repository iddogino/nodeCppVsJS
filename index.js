/**
 * Created by Iddo on 5/21/2017.
 */

function copyArray(arr) {
    return Array.from(arr);
}

function genRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function genArray(len) {
    let a = [];

    for (let i = 0; i < len; i++) {
        a.push(genRandomInt(-10000,10000));
    }

    return a;
}

const bubbleSort = require('./bubbleSort');
const mergeSort = require('./mergeSort');
const inPlaceMergeSort = require('./inPlaceMergeSort');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

function cycle(event) {
    console.log(String(event.target));
}

const ARR_SIZE = 100000;

function complete(a, b) {
    console.log('Fastest: ' + this.filter('fastest').map('name'));
    console.log('Slowest: ' + this.filter('slowest').map('name'));
}
suite.add('JS Bubble', () => {
    bubbleSort.sort(genArray(ARR_SIZE));
})
    .add('JS Merge', () => {
        mergeSort.sort(genArray(ARR_SIZE));
    })
    .add('JS Merge in place', () => {
        inPlaceMergeSort.sort(genArray(ARR_SIZE));
    })
    .on('cycle',cycle)
    .on('complete',complete)
    .run({async:true});
