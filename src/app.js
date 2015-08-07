var angular = require('angular')
var React = require('react')
var List = require('./List.jsx')

module.exports = angular.module('app', [])
  .controller('test', function($scope){
    $scope.component = List
    $scope.test = ['React', 'and', 'Angular', 'are', 'friends!']

    $scope.remove = function(){
      console.log('WORK')
      $scope.test.splice(0, 1)
    }

    $scope.add = function(){
      $scope.test.push($scope.new)
    }
  }).directive('react', function(){
    return{
      restrict: 'EA',
      require: '^ngController',
      link: function(scope, element, attrs){

        var _scope = {}

        var t = function() { scope.remove.apply(scope) }

        function proxyObject(proxy, src, decorator){
          for(var i in src){
            if(src.hasOwnProperty(i)){
              if(typeof src[i] === 'function'){
                proxy[i] = (function(cb){
                  return function(){
                    decorator()
                    cb.apply(src, Array.prototype.slice.call(arguments))
                  }
                })(src[i])
              }else{
                proxy[i] = src[i]
              }
            }
          }
        }

        proxyObject(_scope, scope, function(){scope.$apply()})

        render()

        function render(){
          setTimeout(function() {
            _scope.remove()
          }, 1000)
          console.log(_scope)
          // React.render(React.createElement(scope.component, {scope: _scope}), element[0])
        }
      }
    }
  })
