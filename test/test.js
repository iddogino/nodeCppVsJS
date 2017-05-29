/**
 * Created by Iddo on 5/21/2017.
 */

let sorters = ['bubbleSort', "mergeSort", "inPlaceMergeSort"];
let assert = require('assert');
require('mocha-testcheck').install();

for (let sorter in sorters) {
    let s = require(`./../${sorters[sorter]}`);

    describe(sorters[sorter], ()=> {
        it('Should sort len 1 array', () => {
            assert.deepEqual(s.sort([1]), [1]);
        });

        it('Should sort empty array', () => {
           assert.deepEqual(s.sort([]), []);
        });

        it('Should not change sorted array', () => {
            assert.deepEqual(s.sort([1,2,3]), [1,2,3]);
        });

        it('Should sort array', () => {
            assert.deepEqual(s.sort([3,2,1]), [1,2,3]);
        });

        // PROPERTY TESTING

        check.it('Should work if sorting twice', gen.array(gen.int), (arr) => {
            return assert.deepEqual(s.sort(s.sort(arr)), s.sort(arr));
        });

    });
}