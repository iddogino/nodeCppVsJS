function sort(arr) {
    if (arr.length <= 1)
        return arr;

    //Split array & sort
    let left = sort(arr.slice(0, Math.floor(arr.length/2.0)));
    let right = sort(arr.slice(Math.floor(arr.length/2.0), arr.length));

    // Merge
    let l = 0;
    let r = 0;
    let res = [];

    while (l < left.length || r < right.length) {
        if (l < left.length && r < right.length) {
            if (left[l] < right[r]) {
                res.push(left[l]);
                l++;
            } else {
                res.push(right[r]);
                r++;
            }
        } else if (l < left.length) {
            res.push(left[l]);
            l++;
        } else if (r < right.length) {
            res.push(right[r]);
            r++;
        } else {
            throw "Fuck.";
        }
    }

    return res;
}

module.exports.sort = sort;