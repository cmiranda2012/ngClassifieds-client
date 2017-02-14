(function () {

"use strict";

angular
	.module('ngClassifieds') //referencing pre-existing module, 2nd
	//argument ommited since we are not creating a new module
	.controller('classifiedsCtrl', function($http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
		//capture variable
		var vm = this;

		//points to functions
		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;
		vm.editClassified = editClassified;
		vm.saveEdit = saveEdit;
		vm.deleteClassified = deleteClassified;

		vm.classifieds;
		vm.categories;
		vm.editing;
		vm.classified;

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			vm.classifieds = classifieds.data;
			vm.categories = getCategories(vm.classifieds);
		});

		function openSidebar() {
			// $mdSidenav('left').open();
			$state.go('classifieds.new');
		}

		function closeSidebar() {
			$mdSidenav('left').close();
		}

		function saveClassified(classified) {
			if(classified) {
				vm.classifieds.push(classified);
				vm.classified = {};
				closeSidebar();
				showToast('Classified saved.');
			}
		}

		function editClassified(classified) {
			vm.editing = true;
			openSidebar();
			vm.classified = classified;
		}

		function saveEdit() {
			vm.editing = false;
			vm.classified = {};
			closeSidebar();
			showToast('Edit saved.');

		}

		function deleteClassified(event, classified) {
			//remove from memory not from source in this case from list
			var confirm = $mdDialog.confirm()
				.title('Are you sure you want to delete ' + classified.title + '?')
				.ok('Yes')
				.cancel('No')
				.targetEvent(event);
				//resolution of it, what happens if it resolves
			$mdDialog.show(confirm).then(function() {
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index, 1);
			}, function() {
				//second parameter to then method
				//whatever we want to happen if qwe click on no, we dont want to delete
				//leave it blank for now
			});
		}

		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(3000)
			);
		}

		function getCategories(classifieds) {

			var categories = [];

			angular.forEach(classifieds, function(item) {
				angular.forEach(item.categories, function(category) {
					categories.push(category);
				});
			});

			return _.uniq(categories);
		}

	});
})();