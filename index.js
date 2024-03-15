const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')

const app = express()
const PORT = 3006


const createPath = (folder, page, ext) =>
	path.resolve(__dirname, folder, `${page}.${ext}`)


app.use(express.static(__dirname + '/pages'))
app.use((req, res, next) => {
	console.log(req.path)
	console.log(req.method)
	next()
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
	res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page1', (req, res) => {
	res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page2', (req, res) => {
	res.sendFile(createPath('pages', 'page2', 'html'))
})

//json
app.post('/addData', (req, res) => {
    let data = JSON.parse(fs.readFileSync(createPath('data', 'data', 'json')))
    data.push(req.body)
    fs.writeFileSync(createPath('data', 'data', 'json'), JSON.stringify(data, null, 2))
    console.log(req.body)
    res.send({ message: 'Data successfully added' })
})

//app.patch('/patchData', (req, res) => {
//    let data = JSON.parse(fs.readFileSync(createPath('data', 'data', 'json')))
//
//    const index = data.findIndex(item => item.id === req.body.id)
//
//    if (index !== -1) {а
//        data[index] = { ...data[index], ...req.body }
//        fs.writeFileSync(createPath('data', 'data', 'json'), JSON.stringify(data, null, 2))
//        console.log(req.body)
//        res.send({ message: 'Data successfully updated' })
//    } else {
//        res.status(404).send({ message: 'Data not found' })
//    }
//});

app.get('/getData', (req, res) => {
	let data = fs.readFileSync(createPath('data', 'data', 'json'))
	data = JSON.parse(data)
	console.log(data)
	res.send(data)
})


app.use((req, res) => {
    res.status(404).sendFile(createPath('pages', 'error', 'html'))
  })
app.listen(PORT, error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`)
})
//http://localhost:3006/page1
// <meta http-equiv="refresh" content="7;url=/main"> 