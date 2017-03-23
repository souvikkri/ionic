(function(){
var app = angular.module('starter', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider.state('add', {
	url: '/add',
	templateUrl: 'templates/add.html',
	controller: 'AddCtrl'
	});
	
	$stateProvider.state('list', {
	url: '/list',
	templateUrl: 'templates/list.html',
	cache: false,
	controller: 'AppCtrl'
	});
	
	$stateProvider.state('edit', {
	url: '/edit/:userId',
	templateUrl: 'templates/edit.html',
	controller: 'EditCtrl'
	});
	
	$stateProvider.state('adduser', {
	url: '/adduser',
	//template: 'Hi',
	cache: false,
	controller: 'ShowPop'
	});
	
$urlRouterProvider.otherwise('/list');
});

app.controller('AppCtrl', function($scope, $ionicPopup, $http,$state,$stateParams){

$http({
method: "GET",
url: " /contactlists",
//crossDomain : true,
headers: {'Content-Type': 'application/x-www-form-urlencoded'},
}).success(function(data){
//fconsole.log(data);
$scope.contactlist = data;
});

// A confirm dialog
$scope.delete = function(id) {
var confirmPopup = $ionicPopup.confirm({
title: 'Record Will be Delete',
template: 'Are you sure you want to delete this Record?'
});

confirmPopup.then(function(res) {
if(res) {
console.log(id);
//console.log('You are sure');
$http.delete(' /contactlists/'+id).then(function(response){
$state.transitionTo($state.current, $stateParams,{reload: true});
//A Alert Popup
var alertPopup = $ionicPopup.alert({
title: 'User Deleted Successfully',
template: 'Please Click OK'
});
alertPopup.then(function(res) {
console.log('Thank you for not eating my delicious ice cream cone');
});
})
} else {
console.log('You are not sure');
}
});
};
});

app.controller('ShowPop', function($scope, $ionicPopup, $http,$state,$stateParams){
// Triggered on a button click, or some other target// $scope.showPopup = function() {
$scope.contact = {};
// An elaborate, custom popup
var myPopup = $ionicPopup.show({
template: '<label class="item item-input item-stacked-label"><span class="inputlabel">Name</span>'
+'<input type="text" ng-model="contact.name"></label><label class="item item-input item-stacked-label">'+
'<span class="input-label">Email</span><input type="text" ng-model="contact.email"></label>'+
'<label class="item item-input item-stacked-label"><span class="inputlabel">Number</span>'+
'<input type="number" ng-model="contact.number"></label>',
title: 'Add User',
subTitle: 'Please Give User Informations',
scope: $scope,
buttons: [
{ text: 'Cancel',
onTap: function(e) {
$state.go('list');
}
},
{
text: '<b>Save</b>',
type: 'button-positive',
onTap: function(e) {
if (!$scope.contact.name || !$scope.contact.email || !$scope.contact.number) {
//don't allow the user to close unless he enters wifi password
e.preventDefault();
} else{
return $scope.contact;
}
}
}
]
});

myPopup.then(function(res) {
console.log('Tapped!', res);
if(res){
$http.post(' /contactlists',$scope.contact).then(function(response){
$scope.contact = "";
$state.go('list');
//A Alert Popup
var alertPopup = $ionicPopup.alert({
title: 'User Added Successfully',
template: 'Please Click OK'
});
alertPopup.then(function(res) {
console.log('Thank you for not eating my delicious ice cream cone');});
});
}
});
//$timeout(function() {
// myPopup.close(); //close the popup after 3 seconds for some reason
//}, 3000);
//};
});
app.controller('AddCtrl', function($scope, $stateParams, $http, $state){
$scope.adduser = function(contact){
console.log(contact);
$http.post(' /contactlists',contact).then(function(response){
$scope.contact = "";
$state.go('list');
});
};
});

app.controller('EditCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
var id = $stateParams.userId;
console.log(id);
$http.get('/contactlists/'+id).success(function(response){
$scope.contact = response;
});

$scope.update = function(){
console.log($scope.contact._id);
$http.put(' /contactlists/' + $scope.contact._id, $scope.contact).success(function(response){
$state.go('list');
//A Alert Popup
var alertPopup = $ionicPopup.alert({
title: 'User Updated Successfully',
template: 'Please Click OK'
});

alertPopup.then(function(res) {
console.log('Thank you for not eating my delicious ice cream cone');
});
});
};
});

	app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
	if(window.cordova && window.cordova.plugins.Keyboard) {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	// for form inputs)
	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	// Don't remove this line unless you know what you are doing. It stops the viewport
	// from snapping when text inputs are focused. Ionic handles this internally for
	// a much nicer keyboard experience.
	cordova.plugins.Keyboard.disableScroll(true);
	}
	if(window.StatusBar) {
	StatusBar.styleDefault();
   }
  });
 });
}());