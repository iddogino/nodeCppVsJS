/**
 * Created by Iddo on 5/21/2017.
 */


module.exports.sort = function (arr) {
    if (arr.length <= 1)
        return arr;

    let finished = false;

    while (!finished) {
        finished = true;
        for (let i = 0; i < arr.length-1; i++) {
            if (arr[i] > arr[i+1]) {
                finished = false;
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
    return arr;
};