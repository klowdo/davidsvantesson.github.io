var app = angular.module('VastTid',[]);
    app.controller('MyCtrl',function($scope){
          $scope.favoritedata = [];
          var data = {};
          var getURLVariable = function (name) {
                  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                  var regexS = "[\\?&]"+name+"=([^&#]*)",
                  regex = new RegExp(regexS),
                  results = regex.exec(window.location.href);
                  if (results == null) return "";
                  else return results[1];
            }
          
          var init = function () {
                for (var index = 0; index < 10; index++) {
                      var favoritestop = getURLVariable("favoritestop_"+index);
                      if (favoritestop.length != 0) {
                            var stop = {
                              favoritestop:favoritestop,
                              Directions:[]
                             }
                             for (var index2 = 0; index2 < 3; index2++) {
                                  var favoritedirection = getURLVariable("favoritedirection_"+index+"_"+index2) 
                                  if (favoritedirection.length != 0) {
                                        stop.Directions.push(favoritedirection);
                                  }
                             }
                             $scope.favoritedata.push(stop);
                      }
                }
          }
          var getQueryParam = function(variable, defaultValue) {
      // Find all URL parameters
            var query = location.search.substring(1);
                  var vars = query.split('&');
                  for (var i = 0; i < vars.length; i++) {
                  var pair = vars[i].split('=');
                  // If the query variable parameter is found, decode it to use and return it for use
                  if (pair[0] === variable) {
                  return decodeURIComponent(pair[1]);
                  }
            }
      return defaultValue || false;
    }
          
          $scope.addStop = function(newStop){
                if ($scope.favoritedata.length > 9) {
                      alert('Maximum ten favorite stops')
                }else{
                   
                  $scope.favoritedata.push({favoritestop:newStop,Directions:[]});
                  $scope.newStop = "";   
                }
          };
          $scope.addDirection = function(index,NewDirection){
                if ($scope.favoritedata[index].Directions.length > 2) {
                  alert("Maximum three directions per favorite");   
                }else{
                  $scope.favoritedata[index].Directions.push(NewDirection);    
                  $scope.newDirection ="";  
                }
          };
          $scope.Save = function () {
                angular.forEach( $scope.favoritedata, function(value, key) {
                        data["favoritestop_" +key] =  value.favoritestop;
                         angular.forEach( value.Directions, function(favoritedirection, key2) {
                              data["favoritedirection_" +key+"_"+key2] =  favoritedirection;
                        });
               });
                var return_to = getQueryParam('return_to', 'pebblejs://close#');
                document.location = return_to + encodeURIComponent(JSON.stringify(data)); 
          };
          $scope.RemoveStop = function (index) {
                $scope.favoritedata.splice(index, 1);
          };
          $scope.RemoveDirectory = function (thing,dir) {
                var indexOfStop = $scope.favoritedata.indexOf(thing);
                var indexOfdir = $scope.favoritedata[indexOfStop].Directions.indexOf(dir);
                $scope.favoritedata[indexOfStop].Directions.splice(indexOfdir, 1);  
          }
          init();
    });