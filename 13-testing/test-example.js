it('calls subscribers on publish', function () {
  var callback = sinon.spy()
  PubSub.subscribe('message', callback)

  PubSub.publishSync('message')

  assertTrue(callback.called)
})


//Stubs
it('calls all subscribers, even if there are exceptions', function (){
  var message = 'an example message'
  var error = 'an example error message'
  var stub = sinon.stub().throws()
  var spy1 = sinon.spy()
  var spy2 = sinon.spy()

  PubSub.subscribe(message, stub)
  PubSub.subscribe(message, spy1)
  PubSub.subscribe(message, spy2)

  PubSub.publishSync(message, undefined)

  assert(spy1.called)
  assert(spy2.called)
  assert(stub.calledBefore(spy1))
})

//Mocks
it('calls all subscribers when exceptions happen', function () {
  var myAPI = { 
    method: function () {} 
  }

  var spy = sinon.spy()
  var mock = sinon.mock(myAPI)
  mock.expects("method").once().throws()

  PubSub.subscribe("message", myAPI.method)
  PubSub.subscribe("message", spy)
  PubSub.publishSync("message", undefined)

  mock.verify()
  assert(spy.calledOnce)
// example taken from the sinon documentation site: http://sinonjs.org/docs/
})

//Promise
//webpage.js
const fs = require('fs')
const request = require('request')

function saveWebpage (url, filePath) {
  return getWebpage(url, filePath)
    .then(writeFile)
}

function getWebpage (url) {
  return new Promise (function (resolve, reject) {
    request.get(url, function (err, response, body) {
      if (err) {
        return reject(err)
      }
      resolve(body)
    })
  })
}

function writeFile (fileContent) {
  let filePath = 'page'
  return new Promise (function (resolve, reject) {
    fs.writeFile(filePath, fileContent, function (err) {
      if (err) {
        return reject(err)
      }

      resolve(filePath)
    })
  })
}

module.exports = {
  saveWebpage
}

//package.json
{
  "test-unit": "NODE_ENV=test mocha '/**/*.spec.js'",
}

// test-setup.spec.js
const sinon = require('sinon')
const chai = require('chai')

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})


const fs = require('fs')
const request = require('request')

const expect = require('chai').expect

const webpage = require('./webpage')

describe('The webpage module', function () {
  it('saves the content', function * () {
    const url = 'google.com'
    const content = '<h1>title</h1>'
    const writeFileStub = this.sandbox.stub(fs, 'writeFile', function (filePath, fileContent, cb) {
      cb(null)
    })

    const requestStub = this.sandbox.stub(request, 'get', function (url, cb) {
      cb(null, null, content)
    })

    const result = yield webpage.saveWebpage(url)

    expect(writeFileStub).to.be.calledWith()
    expect(requestStub).to.be.calledWith(url)
    expect(result).to.eql(content)
  })
})