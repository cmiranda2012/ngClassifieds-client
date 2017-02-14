(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.directive('classifiedCard', function() {
			return {
				templateUrl: "components/classifieds/card/classified-card.tpl.html",
				scope: {
					/* if names are the same, no need to 
					specify what is binding to ex) classifieds: "=" */
					classifieds: "=classifieds",
					classifiedsFilter: "=classifiedsFilter",
					category: "=category",
				},
				controller: classifiedCardController,
				controllerAs: 'vm'
			}

			function classifiedCardController ($state, $scope, $mdDialog) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;
				
				function editClassified(classified) {
					$state.go('classifieds.edit', {
						id:classified.id,
						classified: classified
					});
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
						console.log('vm.classifieds', vm.classifieds);
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

			}
		})
})();