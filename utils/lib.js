module.exports = {
  formatPdfTextResult: (data) => {
    let result = y = ''
    if (data.pages && data.pages.length) {
      data.pages.map(item => {
        item.content.map(c => {
          if (y != c.y) {
            result += "<br />"
            y = c.y
          }
          result += c.str
        })
      })
    }

    return result
  }
}
