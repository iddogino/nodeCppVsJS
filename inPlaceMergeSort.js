/**
 * Created by Iddo on 5/28/2017.
 */

function sort(arr) {
    const scratch = new Array(Math.ceil(arr.length/2));
    return _sort(arr, scratch, 0, arr.length);
}

function pushToScratch(scratch, i, val) {
    scratch[i] = val;
    i+=1;
    return i;
}

/**
 * Sort a part of an array within a given range
 * @param arr the array
 * @param start start index to be sorted
 * @param end end index + 1 (will sort everything with lower index)
 * @private
 */
function _sort(arr, scratch, start, end) {
    // Empty array / length 0 -> tail for recursion
    if (start+1 >= end) {
        return arr;
    }

    const pivot = Math.floor((end-start)/2.0)+start;
    _sort(arr, scratch, start, pivot);
    _sort(arr, scratch, pivot, end);

    let l = start,
        r = pivot,
        i = 0;

    while (l < pivot || r < end) {
        if (l < pivot && r < end) {
            if (arr[l] < arr[r]) {
                i = pushToScratch(scratch, i, arr[l]);
                l++;
            } else {
                i = pushToScratch(scratch, i, arr[r]);
                r++;
            }
        } else if (l < pivot) {
            i = pushToScratch(scratch, i, arr[l]);
            l++;
        } else if (r < end) {
            i = pushToScratch(scratch, i, arr[r]);
            r++;
        } else {
            throw "Fuck.";
        }
    }

    //Copy back from scratch to main
    for (i=0; i < end-start; i++) {
        arr[i+start] = scratch[i];
    }

    return arr;
}

module.exports.sort = sort;