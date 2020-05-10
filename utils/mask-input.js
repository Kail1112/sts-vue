/*
* Функция для работы с масками в формах
* */

/**
 * @param {string} text
 * @param {object} filter
 * @param {string} mask
 *
 * @return {string}
 * */

const maskInput = (text, filter, mask) => {
    let charIndex = 0;
    const mapMask = [...mask].reduce((acc, item) => {
        if (filter[item] === undefined) acc[item] = true
        return acc
    }, {})
    const clearText = [...text].reduce((acc, item) => {
        if (mapMask[item] === undefined) acc += item
        return acc
    }, '')
    const result = [...mask].reduce((acc, item) => {
        if (filter[item] !== undefined) {
            const char = clearText[charIndex]
            if (item !== char) {
                if (char !== undefined && filter[item](char)) {
                    acc.push(char)
                }
                charIndex++
            }
        } else {
            if (clearText[charIndex] !== undefined) acc.push(item)
        }
        return acc
    }, [])
    const resultJson = JSON.stringify(result.reduce((acc, item) => {
        if (filter[item] === undefined) acc[item] = true
        return acc
    }, {}))
    if (resultJson === JSON.stringify(mapMask)) return ''
    return result.join('')
}

export default maskInput
