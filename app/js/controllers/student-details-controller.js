/*global angular*/

angular.module('studentControllers')
  .controller('studentDetailsController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state, $stateParams) {
    const SERVER = 'https://proiect-cimpeanuionut.c9users.io'

    let $constructor = () => {
      $http.get(SERVER + '/students/' + $stateParams.studentId)
        .then((response) => {
          $scope.student = response.data
          return $http.get(SERVER + '/students/' + $stateParams.studentId + '/projects')
        })
        .then((response) => $scope.projects = response.data)
        .catch((error) => console.log(error))
    }

    $scope.addProject = (project) => {
      $http.post(SERVER + '/students/' + $stateParams.studentId + '/projects', project)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }

    $scope.deleteProject = (project) => {
      $http.delete(SERVER + '/students/' + $stateParams.studentId + '/projects/' + project.id)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }

    $scope.saveProject = (project) => {
      $http.put(SERVER + '/students/' + $stateParams.studentId + '/projects/' + project.id,project)
        .then((response) => $state.go($state.current, {}, {
          reload: true
        }))
        .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (project) => {
      if (project.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }

    $scope.editProject = (project) => {
      $scope.selected = project
    }

    $scope.cancelEditing = () => {
      $scope.selected = {}
    }

    $constructor()
  }])
