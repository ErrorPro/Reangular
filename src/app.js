var angular = require('angular')
var React = require('react')
var List = require('./List.jsx')

module.exports = angular.module('app', [])
  .controller('test', function($scope){
    $scope.component = List
    $scope.test = ['React', 'and', 'Angular', 'are', 'friends!']

    $scope.remove = function(id){
      $scope.test.splice($scope.test.indexOf(id), 1)
    }

    $scope.add = function(){
      $scope.test.push($scope.new)
    }
  }).directive('react', function(){
    return{
      restrict: 'E',
      require: '^ngController',
      link: function(scope, element, attrs){

        render()

        function render(){
          var _scope = {}

          decorate(_scope, scope, function(){scope.$apply()})

          scope.$watchCollection('test', function(){
              React.render(React.createElement(scope.component, {scope: _scope}), element[0])
            }
          )
        }

        function decorate(proxy, src, decorator){
          for(var i in src){
            if(src.hasOwnProperty(i)){
              if(typeof src[i] === 'function'){
                proxy[i] = (function(cb){
                  return function(){
                    cb.apply(src, Array.prototype.slice.call(arguments))
                    decorator()
                  }
                })(src[i])
              }else{
                proxy[i] = src[i]
              }
            }
          }
        }

      }
    }
  })
