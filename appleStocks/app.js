(() => {
	'use strict';

	//let stockPriceYesterday = [10, 7, 5, 8, 11, 9, 2, 1, 5];
	//let stockPriceYesterday = [10, 7, 5, 8, 11, 9, 2, 5, 1];
	//let stockPriceYesterday = [3, 7, 2, 8, 2, 11, 1, 5, 2];
	let stockPriceYesterday = [3, 7, 2, 8, 2, 11, 1, 11, 2];
	//let stockPriceYesterday = [5, 4, 3, 2, 1];

	function findIndex(data, compare) {
		return data.reduce((lowest, next, index) => compare(data[lowest], lowest, next, index), 0);
	}

	function smallest(lowestValue, lowestIndex, nextValue, nextIndex) {
		return nextValue < lowestValue ? nextIndex : lowestIndex;
	}

	function highest(highestValue, highestIndex, nextValue, nextIndex) {
		return highestValue < nextValue ? nextIndex : highestIndex;
	}

	function buySellResult(s, h) {
		let buy = stockPriceYesterday[s],
			sell = stockPriceYesterday[h],
			profit = sell - buy;

		return { buy, sell, profit };
	}

	function smallestToHighest(data, s, h) {
		if (data.length === 0) {
			return null;
		} else if (s < h) {
			return buySellResult(s, h);
		}

		data = data.slice(0, s);
		let smallIndex = findIndex(data, smallest);
		let highIndex = findIndex(data.slice(smallIndex), highest) + smallIndex;

		return smallestToHighest(data, smallIndex, highIndex);
	}

	function highestToSmallest(data, s, h) {
		if (data.length === 0) {
			return null;
		} else if (s < h) {
			return buySellResult(s, h);
		}

		data = data.slice(0, h);
		let highIndex = findIndex(data, highest);
		let smallIndex = findIndex(data.slice(0, highIndex), smallest);

		return highestToSmallest(data, smallIndex, highIndex);
	}

	function output(smallestResult, highestResult) {
		if (smallestResult && highestResult) {
			let result = smallestResult.profit > highestResult.profit ? smallestResult : highestResult;
			console.log(result);
		} else if (!smallestResult && !highestResult) {
			console.log("There is no result. No buy no sell");
		} else {
			console.log(smallestResult || highestResult);
		}
	}

	let highestToSmallestResult = highestToSmallest(stockPriceYesterday, stockPriceYesterday.length, stockPriceYesterday.length);
	let smallestToHighestResult = smallestToHighest(stockPriceYesterday, stockPriceYesterday.length, stockPriceYesterday.length);

	console.log(highestToSmallestResult);
	console.log(smallestToHighestResult);	
	
	output(smallestToHighestResult, highestToSmallestResult); 	
})();