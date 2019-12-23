process.nextTick(function func() {
	console.log('nextTick 1');
	process.nextTick(function() {
		console.log('nectTick 2');
	});
});


setImmediate(function() {
	console.log('setImmediate1');
});

setTimeout(() => {
	console.log('setTimeout');
});