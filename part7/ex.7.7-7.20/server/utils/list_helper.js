var _ = require('lodash');

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

const favoriteBlog = (arr) => {
    if (!arr || arr.length === 0) {
        return null
    }
    const likesArr = arr.map(a => a?.likes)
    return arr.find(a => a.likes === Math.max(...likesArr))
}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author')
    
    const newObject = Object.entries(authors).map(([author, blogs]) => {
        return {author, blogs}
    })
    const maxNumbers = _.maxBy(newObject, 'blogs')
    // console.log(maxNumbers)
    return maxNumbers
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    // console.log(authors)
    const totalLikes = _.mapValues(authors, function(o) {
        return o
            .map(x => {
                return x.likes
            })
            .reduce((sum, n) => {
                return sum + n
            }, 0)
        }
    )
    
    const newObject = Object.entries(totalLikes).map(([author, likes]) => {
        return {author, likes}
    })
    
    const maxNumbers = _.maxBy(newObject, 'likes')
    // console.log(maxNumbers)
    return maxNumbers
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}