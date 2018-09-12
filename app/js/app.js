'use strict'

/*global angular*/
const app = angular.module('projectApp', [
    'ui.router',
    'studentControllers',
    'ngProjects'
  ])
  
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/students')
  $stateProvider
    .state('students', {
      url : '/students',
      templateUrl : 'views/students.html',
      controller: 'studentController'
    })
    .state('studentDetails', {
      url : '/students/:studentId',
      templateUrl : 'views/student-details.html',
      controller : 'studentDetailsController'
    })
}])
