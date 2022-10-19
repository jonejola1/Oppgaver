function fixText(txt) {
    let newtxt = ''
    txt = txt.trim() //removes whitespaces before and after input.
    newtxt = txt //then newtxt is the original txt without the whitespaces so now i can use substring to return the string without space.
    return newtxt = newtxt.charAt(0).toUpperCase() + newtxt.substring(1).toLowerCase() 
}