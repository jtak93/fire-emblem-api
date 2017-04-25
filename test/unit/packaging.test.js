var should = require('chai').should()

describe('packaging', function(){
  it('includes passport-http in devDependencies for tests', function(){
    var packageJson = require('../../package')
    packageJson.devDependencies.should.include.key('passport-http');
    packageJson.dependencies.should.not.include.key('passport-http');
  })
})
