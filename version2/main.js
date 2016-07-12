//preleft



//(function (window, document) {
//})(window, document)


var deviceType = {
	userAgent 	: navigator.userAgent,
	categories 	: {},
	init 		: function () {
		this.categories = {
			iphone 		: this.userAgent.match(/(iPhone|iPod|iPad)/),
			blackberry 	: this.userAgent.match(/BlackBerry/),
			android 	: this.userAgent.match(/Android/)
		};
		//delete this.init;
		return this;
	}
}.init();


var elementUtils = {
	addClass: function (element, newClassName) {
		element.className += ' ' + newClassName;
	},
	setElementLeftPX: function (element, left) {
		var leftString = left + 'px';
		element.style.left = leftString;
	},
	setElementLeftString: function (element, leftString) {
		element.style.left = leftString;
	},
	getComputedLeftPX: function (element) {
		var leftString = window
			.getComputedStyle(element, null)
			.getPropertyValue('left');
		return parseInt(leftString, 10);
	}
}

var VectorModule =  function () {
	var Vector = function () {
		this.head 			= [0,0];
		this.tail 			= [0,0];
	}
	Vector.prototype.init = function (headxy) {
		this.head = headxy;
		this.tail = headxy;
	}
	Vector.prototype.newHead = function (newxy) {
		this.head = newxy;
	}
	Vector.prototype.diff = function () {
		return [this.head[0] - this.tail[0],
				this.head[1] - this.tail[1]];
	}
	Vector.prototype.delta = function (d) {
		return [Math.abs(this.head[0] - this.tail[0]),
				Math.abs(this.head[1] - this.tail[1])];
	}
	Vector.prototype.angle = function () {
		delta = this.delta();
		return Math.atan2(delta[1], delta[0]);
	}
	Vector.prototype.length = function () {
		delta = this.delta();
		return Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
	}
	return Vector;
}


if (deviceType.categories.iphone) {
	var platform = document.getElementById('platform');
	var platform = document.getElementById('platform');
	var fixedpane = document.getElementById('fixedpane');
	var contentpane = document.getElementById('contentpane');
	platform.appendChild(fixedpane);
	addClass(fixedpane, 'iphone');
	addClass(contentpane, 'iphone');



var sweep = function () {
	console.log('sweep');
	var config =  {
		elementID: 'platform'
	};
	var touchEnabled = ('ontouchstart' in window ||
						navigator.maxTouchPoints);
	if (!touchEnabled) {
		return;
	}
	var state = {
		dragAction 		: false,
		slideAction 	: false,
		slideStart 		: true,
		slideBase 		: 0,
		moveVector 		: {},
		index 			: 0
	};
	var PointerOptions = {
		mouse: {
			events: {
				start: 	'mousedown',
				move: 	'mousemove',
				end: 	'mouseup'
				},
			eventProc: function (event) {
				return [event.pageX,
						event.pageY];
			}
		},
		touch: {
			events: {
				start: 	'touchstart',
				move: 	'touchmove',
				end: 	'touchend'
			},
			eventProc: function (event) {
				return [event.touches[0].pageX,
						event.touches[0].pageY];
			}
		},
		getPointer: function (touchEnabled) {
			return touchEnabled ? this.touch : this.mouse;
		}
	};
	var utils = {
		indexToStyleVW: function (index) {
			return '-' + index * 100 + 'vw';
		},
		setTransition: function () {
			slideElement.addEventListener('transitionend', this.unsetTransition);
			slideElement.style.transition = 'left .4s ease';
		},
		unsetTransition: function () {
			slideElement.removeEventListener(
				'transitionend',
				this.unsetTransition, false);
			slideElement.style.transition = null;
		},
		getLeftPX: function () {
			elementUtils.getComputedLeftPX(slideElement);
		},
		setLeftPX: function (left) {
			elementUtils.setElementLeftPX(slideElement, left);
		},
		setLeftString: function (leftString) {
			elementUtils.setElementLeftString(slideElement, leftString);
		},
		applyIndex: function () {
			this.setLeftString(this.indexToStyleVW(state.index));
			this.setTransition();
		},
		swipeDir: function (offset) {
			return Math.sign(offset);
		},
		getIndexOffset: function (offset) {
			return (- this.swipeDir(offset));
		},
		validIndex: function (index) {
			return ((0 <= index) && (index <= 1));
		}
	}
	var debug = false;
	var callback = {
		start: function (event) {
			var xy = pointer.eventProc(event);
			state.moveVector.init(xy);
			state.dragAction 		= true;
			state.slideAction 		= false;
			state.slideStart 		= false;
		},
		move: function (event) {
			if (state.dragAction) {
				var moveVector = state.moveVector;
				var xy = pointer.eventProc(event);
				moveVector.newHead(xy);
				var length = moveVector.length();
				if (state.slideAction) {
					if (state.slideStart) {
						state.slideBase = utils.getLeftPX();
						state.slideStart = false;
					}
					var offsetX = moveVector.diff()[0];
					var indexOffset = utils.getIndexOffset(offsetX);
					var indexNext = state.index + indexOffset;
					if (utils.validIndex(indexNext)) {
						utils.setLeftPX(state.slideBase + offsetX);
					}
				}
				else if (length < 20) {
					var angle = moveVector.angle();
					if (angle < (20 * (Math.PI / 180.0))) {
						state.slideAction = true;
						state.slideStart = true;
					}
				}
			}
		},
		end: function (event) {
			if (state.slideAction) {
				var moveVector = state.moveVector;
				var length = moveVector.length();
				var offsetX = moveVector.diff()[0];
				var indexOffset = utils.getIndexOffset(offsetX);
				var indexNext = state.index + indexOffset;
				if ((length > 100) && utils.validIndex(indexNext)) {
					state.index = indexNext;
				}
				utils.setLeftString(utils.indexToStyleVW(state.index));
				utils.setTransition();
			}
			state.dragAction = false;
		}
	}
	var pointer = PointerOptions.getPointer(touchEnabled);
	var slideElement = document.getElementById(config.elementID);
	var Vector = VectorModule();
	state.moveVector = new Vector();
	slideElement.addEventListener(pointer.events.start, 	callback.start, false);
	slideElement.addEventListener(pointer.events.move, 	callback.move, 	false);
	slideElement.addEventListener(pointer.events.end, 		callback.end, 	false);

	this.utils = utils;
	this.state = state;
	this.pointer = pointer;
	this.callback = callback;
	this.slideElement = slideElement;
	this.debug = debug;
	this.Vector = Vector;
}

var t = new sweep();


