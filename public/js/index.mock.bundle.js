/* publish time Tuesday, March 28th, 2017, 6:18:02 PM */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockComponent = _react2.default.createClass({
    displayName: 'MockComponent',

    getInitialState: function getInitialState() {
        return { initData: {} };
    },
    componentWillMount: function componentWillMount() {
        var _this = this;
        _mockjs2.default.setup({ timeout: '200-600' });
        _mockjs2.default.mock(/\.json/, {
            'list|1-10': [{
                'id|+1': 1,
                'email': '@EMAIL'
            }]
        });

        _jquery2.default.ajax({ url: 'hello.json', dataType: 'json' }).done(function (data, status, jqXHR) {
            _this.setState({ initData: data });
        });
    },
    render: function render() {
        //more than one child
        var _this = this;
        var childrenWithProps = _react2.default.Children.map(this.props.children, function (child) {
            return _react2.default.cloneElement(child, { initData: _this.state.initData });
        });
        return _react2.default.createElement(
            'div',
            null,
            childrenWithProps
        );
    }

});

exports.default = MockComponent;

},{"jquery":"jquery","mockjs":"mockjs","react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyComponent = _react2.default.createClass({
    displayName: 'MyComponent',

    propTypes: {
        initData: _react2.default.PropTypes.array
    },
    render: function render() {
        var _this = this;
        var listItems = [];

        if (_this.props.initData && _this.props.initData.list) {
            listItems = _this.props.initData.list.map(function (item, i) {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'span',
                        null,
                        item.id
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        item.email
                    )
                );
            });
        }

        return _react2.default.createElement(
            'ul',
            null,
            listItems,
            ' lalalkkkkkkkuo1'
        );
    }
});

exports.default = MyComponent;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var _RootComponent = require('./components/index/RootComponent');

var _RootComponent2 = _interopRequireDefault(_RootComponent);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MockComponent = require('./components/index/MockComponent');

var _MockComponent2 = _interopRequireDefault(_MockComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_reactDom2.default.createElement(
	_MockComponent2.default,
	null,
	_reactDom2.default.createElement(_RootComponent2.default, null)
), document.getElementById('login'));

},{"./components/index/MockComponent":1,"./components/index/RootComponent":2,"react-dom":"react-dom"}]},{},[3])

//# sourceMappingURL=../js/maps/index.mock.bundle.js.map
