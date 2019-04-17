const path = require('path')
const express = require('express')
const multer = require('multer')
const PDFExtract = require('pdf.js-extract').PDFExtract
const pdfExtract = new PDFExtract()

const Lib = require('./utils/lib')

const app = express()
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './uploads')
  },
  filename: function (res, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/upload', upload.single('file'), (req, res) => {
  // 获取文件名，拿到文字的相对路径
  const filePath = `./uploads/${req.file.originalname}`
  const options = {}
  pdfExtract.extract(filePath, options, (error, data) => {
    if (error) return console.log(error)
    const result = Lib.formatPdfTextResult(data)
    return res.render('result', { result })
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})