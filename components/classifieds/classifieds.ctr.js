(function () {

"use strict";

angular
	.module("ngClassifieds") //referencing pre-existing module, 2nd
	//argument ommited since we are not creating a new module
	.controller("classifiedsCtrl", function($http, $scope, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state) {
		//capture variable
		var vm = this;

		//points to functions
		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;
		vm.editClassified = editClassified;
		vm.saveEdit = saveEdit;
		vm.deleteClassified = deleteClassified;
		vm.toggleFilterShow = toggleFilterShow;

		vm.classifieds;
		vm.categories;
		vm.editing;
		vm.classified;
		vm.showFilters = false;

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			vm.classifieds = classifieds.data;
			vm.categories = getCategories(vm.classifieds);
		});

		$scope.$on('newClassified', function(event, classified) {
			classified.id = vm.classifieds.length + 1;
			vm.classifieds.push(classified);
			showToast('Classified saved');
		});

		$scope.$on('editSaved', function(event, message) {
			showToast(message);
		});

		function openSidebar() {
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
			$state.go('classifieds.edit', {
				id:classified.id,
				classified: classified
			});
		}

		function saveEdit() {
			vm.editing = false;
			vm.classified = {};
			closeSidebar();
			showToast('Edit saved.');

		}

		function deleteClassified(event, classified) {
			var confirm = $mdDialog.confirm()
				.title('Are you sure you want to delete ' + classified.title + '?')
				.ok('Yes')
				.cancel('No')
				.targetEvent(event);
			$mdDialog.show(confirm).then(function() {
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index, 1);
				showToast('Classified Deleted');
			}, function() {
				
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

			_.forEach(classifieds, function(item) {
				_.forEach(item.categories, function(category) {
					categories.push(category);
				});
			});

			return _.uniq(categories);
		}

		function toggleFilterShow() {
			vm.showFilters = !vm.showFilters;
		}

	});
})();