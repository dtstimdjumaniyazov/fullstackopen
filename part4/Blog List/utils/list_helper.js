const dummy = (blogs) => {
    return 1
}

const totalLikes = (arr) => {
    if (arr.length === 0) {
        return 0
    }
    const newArray = arr?.map(a => a?.likes)
    const sum = newArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    )
    return sum
}

module.exports = {
    dummy,
    totalLikes
}