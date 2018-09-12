/*global angular*/

angular.module('studentControllers', [])
  .controller('studentController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    const SERVER = ' https://proiect-cimpeanuionut.c9users.io'

    let $constructor = () => {
      $http.get(SERVER + '/students')
        .then((response) => $scope.students = response.data)
        .catch((error) => console.log(error))
    }

    $scope.addStudent = (student) => {
      $http.post(SERVER + '/students', student)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }

    $scope.deleteStudent = (student) => {
      $http.delete(SERVER + '/students/' + student.id)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }

    $scope.saveStudent = (student) => {
      $http.put(SERVER + '/students/' + student.id, student)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }
    
    $scope.selected = {}
    
    $scope.getTemplate = (student) => {
      if (student.id == $scope.selected.id){
        return 'edit'
      }
      return 'display'
    }
    
    $scope.editStudent = (student) => {
      $scope.selected = student
    }
    
    $scope.cancelEditing = () => {
      $scope.selected = {}
    }
    
    $constructor()
  }])
