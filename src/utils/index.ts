/**
 * ### Shuffle and return the array
 * @param array Array<T>
 */
const shuffle = <T>(array: T[]): T[] => {
    const newArray = array.slice();
    let ctr = newArray.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = newArray[ctr];
        newArray[ctr] = newArray[index];
        newArray[index] = temp;
    }
    return newArray;
}

export {
    shuffle
}