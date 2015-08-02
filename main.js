window.onload = function() {


    var templateStr = ' <ul> \
            [[ each item in array ]] \
        <li> [[item]] </li> \
        [[/each]] \
    </ul>'

    var result = $('#result').html(template(templateStr,  {array:[1,2,3,4]}))

}

function template(templateStr, obj) {
    var str = templateStr
        .replace(/[\r\t\n]/gim, "")
        .split(' ')
        .filter(function (item) {
            return item != ''
        })
        .join('')

    if (str.indexOf('[[each') != -1) {
        var start = str.indexOf('[[each', 0)
        var end = str.lastIndexOf('[[/each')

        var newStr = str.substr(0, start)

        var firstSymbol = str.substring(str.indexOf(']]', start) + 2, str.indexOf('[[item]]'))
        var lastSymbol = str.substring(str.indexOf('[[item]]') + 8, end)

        var nameOfArray = str.substring(str.indexOf('in', start) + 2, str.indexOf(']]', start))

        obj[nameOfArray].forEach(function (item, i, arr) {
            newStr += firstSymbol + item + lastSymbol
        })

        newStr += str.substr(str.indexOf(']]', end) + 2)

        return newStr
    }
}