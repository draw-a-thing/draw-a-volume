var fs = require('fs')
var path = require('path')
var css = require('dom-css')
var viewer = require('lightning-dendrite')

var dropzone = document.createElement('div')
document.body.appendChild(dropzone)

dropzone.addEventListener('drop', function (event) {
  var location = event.dataTransfer.files[0].path
  var files = fs.readdirSync(location)
  var offsets = files.filter(function (file) {
    return file === 'offsets.json'
  })
  var images = files.filter(function (file) {
    return file.indexOf('png') > -1
  }).map(function (file) {
    return path.join(location, file)
  })
  var blob = fs.readFileSync(path.join(location, offsets[0]))
  var data = {offsets: JSON.parse(String(blob)), windowDimensions: [72, 36]}
  css(dropzone, {display: 'none'})
  css(label, {display: 'none'})
  new viewer('#main', data, images)
})

document.addEventListener('dragover', function (event) {
  event.preventDefault()
  return false
}, false)

document.addEventListener('drop', function (event,data) {
  event.preventDefault()
  return false
}, false)

css(dropzone, {
  width: '20%',
  height: '200px',
  border: 'dotted 4px black',
  position: 'absolute',
  marginLeft: '40%',
  marginRight: '40%',
  top: '35%'
})

var label = document.createElement('div')
label.innerHTML = 'drop data here'
document.body.appendChild(label)
css(label, {
  width: '16%',
  fontSize: '200%',
  height: '200px',
  position: 'absolute',
  marginLeft: '42%',
  marginRight: '42%',
  top: '40%',
  textAlign: 'center',
  pointerEvents: 'none'
})
