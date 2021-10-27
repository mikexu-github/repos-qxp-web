System.register(['@formily/shared', 'react', '@formily/core'], (function (exports) {
	'use strict';
	var _starExcludes = {
		Field: 1,
		FieldList: 1,
		Form: 1,
		FormConsumer: 1,
		FormEffectHooks: 1,
		FormProvider: 1,
		FormSpy: 1,
		Layout: 1,
		LayoutItem: 1,
		VirtualField: 1,
		createAsyncFormActions: 1,
		createEffectHook: 1,
		createEffectsProvider: 1,
		createFormActions: 1,
		createQueryEffects: 1,
		useField: 1,
		useFieldState: 1,
		useForm: 1,
		useFormEffects: 1,
		useFormQuery: 1,
		useFormSpy: 1,
		useFormState: 1,
		useLayout: 1,
		useLayoutItem: 1,
		useVirtualField: 1,
		'default': 1,
		BigData: 1,
		FormPath: 1,
		FormPathPattern: 1,
		registerValidationFormats: 1,
		registerValidationMTEngine: 1,
		registerValidationRules: 1,
		setValidationLanguage: 1,
		setValidationLocale: 1
	};
	var toArr, isStr, Subscribable, isFn$1, each, isEqual, isValid, FormPath, globalThisPolyfill, merge$4, isArr, deprecate, React, createContext, useRef, useState, useCallback, useEffect, useContext, useMemo, useReducer, Fragment, LifeCycleTypes, FormLifeCycle, createForm, isField, isStateModel;
	return {
		setters: [function (module) {
			toArr = module.toArr;
			isStr = module.isStr;
			Subscribable = module.Subscribable;
			isFn$1 = module.isFn;
			each = module.each;
			isEqual = module.isEqual;
			isValid = module.isValid;
			FormPath = module.FormPath;
			globalThisPolyfill = module.globalThisPolyfill;
			merge$4 = module.merge;
			isArr = module.isArr;
			deprecate = module.deprecate;
		}, function (module) {
			React = module["default"];
			createContext = module.createContext;
			useRef = module.useRef;
			useState = module.useState;
			useCallback = module.useCallback;
			useEffect = module.useEffect;
			useContext = module.useContext;
			useMemo = module.useMemo;
			useReducer = module.useReducer;
			Fragment = module.Fragment;
		}, function (module) {
			LifeCycleTypes = module.LifeCycleTypes;
			FormLifeCycle = module.FormLifeCycle;
			createForm = module.createForm;
			isField = module.isField;
			isStateModel = module.isStateModel;
			var setter = { BigData: module.BigData, FormPath: module.FormPath, FormPathPattern: module.FormPathPattern, registerValidationFormats: module.registerValidationFormats, registerValidationMTEngine: module.registerValidationMTEngine, registerValidationRules: module.registerValidationRules, setValidationLanguage: module.setValidationLanguage, setValidationLocale: module.setValidationLocale };
			for (var name in module) {
				if (!_starExcludes[name]) setter[name] = module[name];
			}
			exports(setter);
		}],
		execute: (function () {

			exports('useFormEffects', useFormEffects);

			var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

			var filter$3 = {};

			var Subscriber$1 = {};

			var isFunction$1 = {};

			Object.defineProperty(isFunction$1, "__esModule", { value: true });
			function isFunction(x) {
			    return typeof x === 'function';
			}
			isFunction$1.isFunction = isFunction;

			var Observer = {};

			var config = {};

			Object.defineProperty(config, "__esModule", { value: true });
			var _enable_super_gross_mode_that_will_cause_bad_things = false;
			config.config = {
			    Promise: undefined,
			    set useDeprecatedSynchronousErrorHandling(value) {
			        if (value) {
			            var error = new Error();
			            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
			        }
			        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
			            console.log('RxJS: Back to a better error behavior. Thank you. <3');
			        }
			        _enable_super_gross_mode_that_will_cause_bad_things = value;
			    },
			    get useDeprecatedSynchronousErrorHandling() {
			        return _enable_super_gross_mode_that_will_cause_bad_things;
			    },
			};

			var hostReportError$1 = {};

			Object.defineProperty(hostReportError$1, "__esModule", { value: true });
			function hostReportError(err) {
			    setTimeout(function () { throw err; }, 0);
			}
			hostReportError$1.hostReportError = hostReportError;

			Object.defineProperty(Observer, "__esModule", { value: true });
			var config_1$3 = config;
			var hostReportError_1$2 = hostReportError$1;
			Observer.empty = {
			    closed: true,
			    next: function (value) { },
			    error: function (err) {
			        if (config_1$3.config.useDeprecatedSynchronousErrorHandling) {
			            throw err;
			        }
			        else {
			            hostReportError_1$2.hostReportError(err);
			        }
			    },
			    complete: function () { }
			};

			var Subscription$1 = {};

			var isArray = {};

			Object.defineProperty(isArray, "__esModule", { value: true });
			isArray.isArray = (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

			var isObject$1 = {};

			Object.defineProperty(isObject$1, "__esModule", { value: true });
			function isObject(x) {
			    return x !== null && typeof x === 'object';
			}
			isObject$1.isObject = isObject;

			var UnsubscriptionError = {};

			Object.defineProperty(UnsubscriptionError, "__esModule", { value: true });
			var UnsubscriptionErrorImpl = (function () {
			    function UnsubscriptionErrorImpl(errors) {
			        Error.call(this);
			        this.message = errors ?
			            errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
			        this.name = 'UnsubscriptionError';
			        this.errors = errors;
			        return this;
			    }
			    UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
			    return UnsubscriptionErrorImpl;
			})();
			UnsubscriptionError.UnsubscriptionError = UnsubscriptionErrorImpl;

			Object.defineProperty(Subscription$1, "__esModule", { value: true });
			var isArray_1$d = isArray;
			var isObject_1$2 = isObject$1;
			var isFunction_1$4 = isFunction$1;
			var UnsubscriptionError_1$1 = UnsubscriptionError;
			var Subscription = (function () {
			    function Subscription(unsubscribe) {
			        this.closed = false;
			        this._parentOrParents = null;
			        this._subscriptions = null;
			        if (unsubscribe) {
			            this._ctorUnsubscribe = true;
			            this._unsubscribe = unsubscribe;
			        }
			    }
			    Subscription.prototype.unsubscribe = function () {
			        var errors;
			        if (this.closed) {
			            return;
			        }
			        var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
			        this.closed = true;
			        this._parentOrParents = null;
			        this._subscriptions = null;
			        if (_parentOrParents instanceof Subscription) {
			            _parentOrParents.remove(this);
			        }
			        else if (_parentOrParents !== null) {
			            for (var index = 0; index < _parentOrParents.length; ++index) {
			                var parent_1 = _parentOrParents[index];
			                parent_1.remove(this);
			            }
			        }
			        if (isFunction_1$4.isFunction(_unsubscribe)) {
			            if (_ctorUnsubscribe) {
			                this._unsubscribe = undefined;
			            }
			            try {
			                _unsubscribe.call(this);
			            }
			            catch (e) {
			                errors = e instanceof UnsubscriptionError_1$1.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
			            }
			        }
			        if (isArray_1$d.isArray(_subscriptions)) {
			            var index = -1;
			            var len = _subscriptions.length;
			            while (++index < len) {
			                var sub = _subscriptions[index];
			                if (isObject_1$2.isObject(sub)) {
			                    try {
			                        sub.unsubscribe();
			                    }
			                    catch (e) {
			                        errors = errors || [];
			                        if (e instanceof UnsubscriptionError_1$1.UnsubscriptionError) {
			                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
			                        }
			                        else {
			                            errors.push(e);
			                        }
			                    }
			                }
			            }
			        }
			        if (errors) {
			            throw new UnsubscriptionError_1$1.UnsubscriptionError(errors);
			        }
			    };
			    Subscription.prototype.add = function (teardown) {
			        var subscription = teardown;
			        if (!teardown) {
			            return Subscription.EMPTY;
			        }
			        switch (typeof teardown) {
			            case 'function':
			                subscription = new Subscription(teardown);
			            case 'object':
			                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
			                    return subscription;
			                }
			                else if (this.closed) {
			                    subscription.unsubscribe();
			                    return subscription;
			                }
			                else if (!(subscription instanceof Subscription)) {
			                    var tmp = subscription;
			                    subscription = new Subscription();
			                    subscription._subscriptions = [tmp];
			                }
			                break;
			            default: {
			                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
			            }
			        }
			        var _parentOrParents = subscription._parentOrParents;
			        if (_parentOrParents === null) {
			            subscription._parentOrParents = this;
			        }
			        else if (_parentOrParents instanceof Subscription) {
			            if (_parentOrParents === this) {
			                return subscription;
			            }
			            subscription._parentOrParents = [_parentOrParents, this];
			        }
			        else if (_parentOrParents.indexOf(this) === -1) {
			            _parentOrParents.push(this);
			        }
			        else {
			            return subscription;
			        }
			        var subscriptions = this._subscriptions;
			        if (subscriptions === null) {
			            this._subscriptions = [subscription];
			        }
			        else {
			            subscriptions.push(subscription);
			        }
			        return subscription;
			    };
			    Subscription.prototype.remove = function (subscription) {
			        var subscriptions = this._subscriptions;
			        if (subscriptions) {
			            var subscriptionIndex = subscriptions.indexOf(subscription);
			            if (subscriptionIndex !== -1) {
			                subscriptions.splice(subscriptionIndex, 1);
			            }
			        }
			    };
			    Subscription.EMPTY = (function (empty) {
			        empty.closed = true;
			        return empty;
			    }(new Subscription()));
			    return Subscription;
			}());
			Subscription$1.Subscription = Subscription;
			function flattenUnsubscriptionErrors(errors) {
			    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1$1.UnsubscriptionError) ? err.errors : err); }, []);
			}

			var rxSubscriber = {};

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.rxSubscriber = (function () {
			    return typeof Symbol === 'function'
			        ? Symbol('rxSubscriber')
			        : '@@rxSubscriber_' + Math.random();
			})();
			exports.$$rxSubscriber = exports.rxSubscriber;

			}(rxSubscriber));

			var __extends$1m = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(Subscriber$1, "__esModule", { value: true });
			var isFunction_1$3 = isFunction$1;
			var Observer_1$1 = Observer;
			var Subscription_1$h = Subscription$1;
			var rxSubscriber_1$2 = rxSubscriber;
			var config_1$2 = config;
			var hostReportError_1$1 = hostReportError$1;
			var Subscriber = (function (_super) {
			    __extends$1m(Subscriber, _super);
			    function Subscriber(destinationOrNext, error, complete) {
			        var _this = _super.call(this) || this;
			        _this.syncErrorValue = null;
			        _this.syncErrorThrown = false;
			        _this.syncErrorThrowable = false;
			        _this.isStopped = false;
			        switch (arguments.length) {
			            case 0:
			                _this.destination = Observer_1$1.empty;
			                break;
			            case 1:
			                if (!destinationOrNext) {
			                    _this.destination = Observer_1$1.empty;
			                    break;
			                }
			                if (typeof destinationOrNext === 'object') {
			                    if (destinationOrNext instanceof Subscriber) {
			                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
			                        _this.destination = destinationOrNext;
			                        destinationOrNext.add(_this);
			                    }
			                    else {
			                        _this.syncErrorThrowable = true;
			                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
			                    }
			                    break;
			                }
			            default:
			                _this.syncErrorThrowable = true;
			                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
			                break;
			        }
			        return _this;
			    }
			    Subscriber.prototype[rxSubscriber_1$2.rxSubscriber] = function () { return this; };
			    Subscriber.create = function (next, error, complete) {
			        var subscriber = new Subscriber(next, error, complete);
			        subscriber.syncErrorThrowable = false;
			        return subscriber;
			    };
			    Subscriber.prototype.next = function (value) {
			        if (!this.isStopped) {
			            this._next(value);
			        }
			    };
			    Subscriber.prototype.error = function (err) {
			        if (!this.isStopped) {
			            this.isStopped = true;
			            this._error(err);
			        }
			    };
			    Subscriber.prototype.complete = function () {
			        if (!this.isStopped) {
			            this.isStopped = true;
			            this._complete();
			        }
			    };
			    Subscriber.prototype.unsubscribe = function () {
			        if (this.closed) {
			            return;
			        }
			        this.isStopped = true;
			        _super.prototype.unsubscribe.call(this);
			    };
			    Subscriber.prototype._next = function (value) {
			        this.destination.next(value);
			    };
			    Subscriber.prototype._error = function (err) {
			        this.destination.error(err);
			        this.unsubscribe();
			    };
			    Subscriber.prototype._complete = function () {
			        this.destination.complete();
			        this.unsubscribe();
			    };
			    Subscriber.prototype._unsubscribeAndRecycle = function () {
			        var _parentOrParents = this._parentOrParents;
			        this._parentOrParents = null;
			        this.unsubscribe();
			        this.closed = false;
			        this.isStopped = false;
			        this._parentOrParents = _parentOrParents;
			        return this;
			    };
			    return Subscriber;
			}(Subscription_1$h.Subscription));
			Subscriber$1.Subscriber = Subscriber;
			var SafeSubscriber = (function (_super) {
			    __extends$1m(SafeSubscriber, _super);
			    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
			        var _this = _super.call(this) || this;
			        _this._parentSubscriber = _parentSubscriber;
			        var next;
			        var context = _this;
			        if (isFunction_1$3.isFunction(observerOrNext)) {
			            next = observerOrNext;
			        }
			        else if (observerOrNext) {
			            next = observerOrNext.next;
			            error = observerOrNext.error;
			            complete = observerOrNext.complete;
			            if (observerOrNext !== Observer_1$1.empty) {
			                context = Object.create(observerOrNext);
			                if (isFunction_1$3.isFunction(context.unsubscribe)) {
			                    _this.add(context.unsubscribe.bind(context));
			                }
			                context.unsubscribe = _this.unsubscribe.bind(_this);
			            }
			        }
			        _this._context = context;
			        _this._next = next;
			        _this._error = error;
			        _this._complete = complete;
			        return _this;
			    }
			    SafeSubscriber.prototype.next = function (value) {
			        if (!this.isStopped && this._next) {
			            var _parentSubscriber = this._parentSubscriber;
			            if (!config_1$2.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
			                this.__tryOrUnsub(this._next, value);
			            }
			            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
			                this.unsubscribe();
			            }
			        }
			    };
			    SafeSubscriber.prototype.error = function (err) {
			        if (!this.isStopped) {
			            var _parentSubscriber = this._parentSubscriber;
			            var useDeprecatedSynchronousErrorHandling = config_1$2.config.useDeprecatedSynchronousErrorHandling;
			            if (this._error) {
			                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
			                    this.__tryOrUnsub(this._error, err);
			                    this.unsubscribe();
			                }
			                else {
			                    this.__tryOrSetError(_parentSubscriber, this._error, err);
			                    this.unsubscribe();
			                }
			            }
			            else if (!_parentSubscriber.syncErrorThrowable) {
			                this.unsubscribe();
			                if (useDeprecatedSynchronousErrorHandling) {
			                    throw err;
			                }
			                hostReportError_1$1.hostReportError(err);
			            }
			            else {
			                if (useDeprecatedSynchronousErrorHandling) {
			                    _parentSubscriber.syncErrorValue = err;
			                    _parentSubscriber.syncErrorThrown = true;
			                }
			                else {
			                    hostReportError_1$1.hostReportError(err);
			                }
			                this.unsubscribe();
			            }
			        }
			    };
			    SafeSubscriber.prototype.complete = function () {
			        var _this = this;
			        if (!this.isStopped) {
			            var _parentSubscriber = this._parentSubscriber;
			            if (this._complete) {
			                var wrappedComplete = function () { return _this._complete.call(_this._context); };
			                if (!config_1$2.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
			                    this.__tryOrUnsub(wrappedComplete);
			                    this.unsubscribe();
			                }
			                else {
			                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
			                    this.unsubscribe();
			                }
			            }
			            else {
			                this.unsubscribe();
			            }
			        }
			    };
			    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
			        try {
			            fn.call(this._context, value);
			        }
			        catch (err) {
			            this.unsubscribe();
			            if (config_1$2.config.useDeprecatedSynchronousErrorHandling) {
			                throw err;
			            }
			            else {
			                hostReportError_1$1.hostReportError(err);
			            }
			        }
			    };
			    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
			        if (!config_1$2.config.useDeprecatedSynchronousErrorHandling) {
			            throw new Error('bad call');
			        }
			        try {
			            fn.call(this._context, value);
			        }
			        catch (err) {
			            if (config_1$2.config.useDeprecatedSynchronousErrorHandling) {
			                parent.syncErrorValue = err;
			                parent.syncErrorThrown = true;
			                return true;
			            }
			            else {
			                hostReportError_1$1.hostReportError(err);
			                return true;
			            }
			        }
			        return false;
			    };
			    SafeSubscriber.prototype._unsubscribe = function () {
			        var _parentSubscriber = this._parentSubscriber;
			        this._context = null;
			        this._parentSubscriber = null;
			        _parentSubscriber.unsubscribe();
			    };
			    return SafeSubscriber;
			}(Subscriber));
			Subscriber$1.SafeSubscriber = SafeSubscriber;

			var __extends$1l = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(filter$3, "__esModule", { value: true });
			var Subscriber_1$L = Subscriber$1;
			function filter$2(predicate, thisArg) {
			    return function filterOperatorFunction(source) {
			        return source.lift(new FilterOperator(predicate, thisArg));
			    };
			}
			var filter_2 = filter$3.filter = filter$2;
			var FilterOperator = (function () {
			    function FilterOperator(predicate, thisArg) {
			        this.predicate = predicate;
			        this.thisArg = thisArg;
			    }
			    FilterOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
			    };
			    return FilterOperator;
			}());
			var FilterSubscriber = (function (_super) {
			    __extends$1l(FilterSubscriber, _super);
			    function FilterSubscriber(destination, predicate, thisArg) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.thisArg = thisArg;
			        _this.count = 0;
			        return _this;
			    }
			    FilterSubscriber.prototype._next = function (value) {
			        var result;
			        try {
			            result = this.predicate.call(this.thisArg, value, this.count++);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        if (result) {
			            this.destination.next(value);
			        }
			    };
			    return FilterSubscriber;
			}(Subscriber_1$L.Subscriber));

			var Subject$3 = {};

			var Subject$2 = {};

			var rxjs = {};

			var Observable$1 = {};

			var canReportError$1 = {};

			Object.defineProperty(canReportError$1, "__esModule", { value: true });
			var Subscriber_1$K = Subscriber$1;
			function canReportError(observer) {
			    while (observer) {
			        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
			        if (closed_1 || isStopped) {
			            return false;
			        }
			        else if (destination && destination instanceof Subscriber_1$K.Subscriber) {
			            observer = destination;
			        }
			        else {
			            observer = null;
			        }
			    }
			    return true;
			}
			canReportError$1.canReportError = canReportError;

			var toSubscriber$1 = {};

			Object.defineProperty(toSubscriber$1, "__esModule", { value: true });
			var Subscriber_1$J = Subscriber$1;
			var rxSubscriber_1$1 = rxSubscriber;
			var Observer_1 = Observer;
			function toSubscriber(nextOrObserver, error, complete) {
			    if (nextOrObserver) {
			        if (nextOrObserver instanceof Subscriber_1$J.Subscriber) {
			            return nextOrObserver;
			        }
			        if (nextOrObserver[rxSubscriber_1$1.rxSubscriber]) {
			            return nextOrObserver[rxSubscriber_1$1.rxSubscriber]();
			        }
			    }
			    if (!nextOrObserver && !error && !complete) {
			        return new Subscriber_1$J.Subscriber(Observer_1.empty);
			    }
			    return new Subscriber_1$J.Subscriber(nextOrObserver, error, complete);
			}
			toSubscriber$1.toSubscriber = toSubscriber;

			var observable = {};

			Object.defineProperty(observable, "__esModule", { value: true });
			observable.observable = (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

			var pipe$1 = {};

			var identity$1 = {};

			Object.defineProperty(identity$1, "__esModule", { value: true });
			function identity(x) {
			    return x;
			}
			identity$1.identity = identity;

			Object.defineProperty(pipe$1, "__esModule", { value: true });
			var identity_1$6 = identity$1;
			function pipe() {
			    var fns = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        fns[_i] = arguments[_i];
			    }
			    return pipeFromArray(fns);
			}
			pipe$1.pipe = pipe;
			function pipeFromArray(fns) {
			    if (fns.length === 0) {
			        return identity_1$6.identity;
			    }
			    if (fns.length === 1) {
			        return fns[0];
			    }
			    return function piped(input) {
			        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
			    };
			}
			pipe$1.pipeFromArray = pipeFromArray;

			Object.defineProperty(Observable$1, "__esModule", { value: true });
			var canReportError_1$2 = canReportError$1;
			var toSubscriber_1 = toSubscriber$1;
			var observable_1$5 = observable;
			var pipe_1$2 = pipe$1;
			var config_1$1 = config;
			var Observable = (function () {
			    function Observable(subscribe) {
			        this._isScalar = false;
			        if (subscribe) {
			            this._subscribe = subscribe;
			        }
			    }
			    Observable.prototype.lift = function (operator) {
			        var observable = new Observable();
			        observable.source = this;
			        observable.operator = operator;
			        return observable;
			    };
			    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
			        var operator = this.operator;
			        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
			        if (operator) {
			            sink.add(operator.call(sink, this.source));
			        }
			        else {
			            sink.add(this.source || (config_1$1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
			                this._subscribe(sink) :
			                this._trySubscribe(sink));
			        }
			        if (config_1$1.config.useDeprecatedSynchronousErrorHandling) {
			            if (sink.syncErrorThrowable) {
			                sink.syncErrorThrowable = false;
			                if (sink.syncErrorThrown) {
			                    throw sink.syncErrorValue;
			                }
			            }
			        }
			        return sink;
			    };
			    Observable.prototype._trySubscribe = function (sink) {
			        try {
			            return this._subscribe(sink);
			        }
			        catch (err) {
			            if (config_1$1.config.useDeprecatedSynchronousErrorHandling) {
			                sink.syncErrorThrown = true;
			                sink.syncErrorValue = err;
			            }
			            if (canReportError_1$2.canReportError(sink)) {
			                sink.error(err);
			            }
			            else {
			                console.warn(err);
			            }
			        }
			    };
			    Observable.prototype.forEach = function (next, promiseCtor) {
			        var _this = this;
			        promiseCtor = getPromiseCtor(promiseCtor);
			        return new promiseCtor(function (resolve, reject) {
			            var subscription;
			            subscription = _this.subscribe(function (value) {
			                try {
			                    next(value);
			                }
			                catch (err) {
			                    reject(err);
			                    if (subscription) {
			                        subscription.unsubscribe();
			                    }
			                }
			            }, reject, resolve);
			        });
			    };
			    Observable.prototype._subscribe = function (subscriber) {
			        var source = this.source;
			        return source && source.subscribe(subscriber);
			    };
			    Observable.prototype[observable_1$5.observable] = function () {
			        return this;
			    };
			    Observable.prototype.pipe = function () {
			        var operations = [];
			        for (var _i = 0; _i < arguments.length; _i++) {
			            operations[_i] = arguments[_i];
			        }
			        if (operations.length === 0) {
			            return this;
			        }
			        return pipe_1$2.pipeFromArray(operations)(this);
			    };
			    Observable.prototype.toPromise = function (promiseCtor) {
			        var _this = this;
			        promiseCtor = getPromiseCtor(promiseCtor);
			        return new promiseCtor(function (resolve, reject) {
			            var value;
			            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
			        });
			    };
			    Observable.create = function (subscribe) {
			        return new Observable(subscribe);
			    };
			    return Observable;
			}());
			Observable$1.Observable = Observable;
			function getPromiseCtor(promiseCtor) {
			    if (!promiseCtor) {
			        promiseCtor = config_1$1.config.Promise || Promise;
			    }
			    if (!promiseCtor) {
			        throw new Error('no Promise impl found');
			    }
			    return promiseCtor;
			}

			var ConnectableObservable$1 = {};

			var Subject$1 = {};

			var ObjectUnsubscribedError = {};

			Object.defineProperty(ObjectUnsubscribedError, "__esModule", { value: true });
			var ObjectUnsubscribedErrorImpl = (function () {
			    function ObjectUnsubscribedErrorImpl() {
			        Error.call(this);
			        this.message = 'object unsubscribed';
			        this.name = 'ObjectUnsubscribedError';
			        return this;
			    }
			    ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
			    return ObjectUnsubscribedErrorImpl;
			})();
			ObjectUnsubscribedError.ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

			var SubjectSubscription$1 = {};

			var __extends$1k = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(SubjectSubscription$1, "__esModule", { value: true });
			var Subscription_1$g = Subscription$1;
			var SubjectSubscription = (function (_super) {
			    __extends$1k(SubjectSubscription, _super);
			    function SubjectSubscription(subject, subscriber) {
			        var _this = _super.call(this) || this;
			        _this.subject = subject;
			        _this.subscriber = subscriber;
			        _this.closed = false;
			        return _this;
			    }
			    SubjectSubscription.prototype.unsubscribe = function () {
			        if (this.closed) {
			            return;
			        }
			        this.closed = true;
			        var subject = this.subject;
			        var observers = subject.observers;
			        this.subject = null;
			        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
			            return;
			        }
			        var subscriberIndex = observers.indexOf(this.subscriber);
			        if (subscriberIndex !== -1) {
			            observers.splice(subscriberIndex, 1);
			        }
			    };
			    return SubjectSubscription;
			}(Subscription_1$g.Subscription));
			SubjectSubscription$1.SubjectSubscription = SubjectSubscription;

			var __extends$1j = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(Subject$1, "__esModule", { value: true });
			var Observable_1$u = Observable$1;
			var Subscriber_1$I = Subscriber$1;
			var Subscription_1$f = Subscription$1;
			var ObjectUnsubscribedError_1$3 = ObjectUnsubscribedError;
			var SubjectSubscription_1$1 = SubjectSubscription$1;
			var rxSubscriber_1 = rxSubscriber;
			var SubjectSubscriber = (function (_super) {
			    __extends$1j(SubjectSubscriber, _super);
			    function SubjectSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        return _this;
			    }
			    return SubjectSubscriber;
			}(Subscriber_1$I.Subscriber));
			Subject$1.SubjectSubscriber = SubjectSubscriber;
			var Subject = (function (_super) {
			    __extends$1j(Subject, _super);
			    function Subject() {
			        var _this = _super.call(this) || this;
			        _this.observers = [];
			        _this.closed = false;
			        _this.isStopped = false;
			        _this.hasError = false;
			        _this.thrownError = null;
			        return _this;
			    }
			    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
			        return new SubjectSubscriber(this);
			    };
			    Subject.prototype.lift = function (operator) {
			        var subject = new AnonymousSubject(this, this);
			        subject.operator = operator;
			        return subject;
			    };
			    Subject.prototype.next = function (value) {
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$3.ObjectUnsubscribedError();
			        }
			        if (!this.isStopped) {
			            var observers = this.observers;
			            var len = observers.length;
			            var copy = observers.slice();
			            for (var i = 0; i < len; i++) {
			                copy[i].next(value);
			            }
			        }
			    };
			    Subject.prototype.error = function (err) {
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$3.ObjectUnsubscribedError();
			        }
			        this.hasError = true;
			        this.thrownError = err;
			        this.isStopped = true;
			        var observers = this.observers;
			        var len = observers.length;
			        var copy = observers.slice();
			        for (var i = 0; i < len; i++) {
			            copy[i].error(err);
			        }
			        this.observers.length = 0;
			    };
			    Subject.prototype.complete = function () {
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$3.ObjectUnsubscribedError();
			        }
			        this.isStopped = true;
			        var observers = this.observers;
			        var len = observers.length;
			        var copy = observers.slice();
			        for (var i = 0; i < len; i++) {
			            copy[i].complete();
			        }
			        this.observers.length = 0;
			    };
			    Subject.prototype.unsubscribe = function () {
			        this.isStopped = true;
			        this.closed = true;
			        this.observers = null;
			    };
			    Subject.prototype._trySubscribe = function (subscriber) {
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$3.ObjectUnsubscribedError();
			        }
			        else {
			            return _super.prototype._trySubscribe.call(this, subscriber);
			        }
			    };
			    Subject.prototype._subscribe = function (subscriber) {
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$3.ObjectUnsubscribedError();
			        }
			        else if (this.hasError) {
			            subscriber.error(this.thrownError);
			            return Subscription_1$f.Subscription.EMPTY;
			        }
			        else if (this.isStopped) {
			            subscriber.complete();
			            return Subscription_1$f.Subscription.EMPTY;
			        }
			        else {
			            this.observers.push(subscriber);
			            return new SubjectSubscription_1$1.SubjectSubscription(this, subscriber);
			        }
			    };
			    Subject.prototype.asObservable = function () {
			        var observable = new Observable_1$u.Observable();
			        observable.source = this;
			        return observable;
			    };
			    Subject.create = function (destination, source) {
			        return new AnonymousSubject(destination, source);
			    };
			    return Subject;
			}(Observable_1$u.Observable));
			Subject$1.Subject = Subject;
			var AnonymousSubject = (function (_super) {
			    __extends$1j(AnonymousSubject, _super);
			    function AnonymousSubject(destination, source) {
			        var _this = _super.call(this) || this;
			        _this.destination = destination;
			        _this.source = source;
			        return _this;
			    }
			    AnonymousSubject.prototype.next = function (value) {
			        var destination = this.destination;
			        if (destination && destination.next) {
			            destination.next(value);
			        }
			    };
			    AnonymousSubject.prototype.error = function (err) {
			        var destination = this.destination;
			        if (destination && destination.error) {
			            this.destination.error(err);
			        }
			    };
			    AnonymousSubject.prototype.complete = function () {
			        var destination = this.destination;
			        if (destination && destination.complete) {
			            this.destination.complete();
			        }
			    };
			    AnonymousSubject.prototype._subscribe = function (subscriber) {
			        var source = this.source;
			        if (source) {
			            return this.source.subscribe(subscriber);
			        }
			        else {
			            return Subscription_1$f.Subscription.EMPTY;
			        }
			    };
			    return AnonymousSubject;
			}(Subject));
			Subject$1.AnonymousSubject = AnonymousSubject;

			var refCount$1 = {};

			var __extends$1i = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(refCount$1, "__esModule", { value: true });
			var Subscriber_1$H = Subscriber$1;
			function refCount() {
			    return function refCountOperatorFunction(source) {
			        return source.lift(new RefCountOperator(source));
			    };
			}
			refCount$1.refCount = refCount;
			var RefCountOperator = (function () {
			    function RefCountOperator(connectable) {
			        this.connectable = connectable;
			    }
			    RefCountOperator.prototype.call = function (subscriber, source) {
			        var connectable = this.connectable;
			        connectable._refCount++;
			        var refCounter = new RefCountSubscriber(subscriber, connectable);
			        var subscription = source.subscribe(refCounter);
			        if (!refCounter.closed) {
			            refCounter.connection = connectable.connect();
			        }
			        return subscription;
			    };
			    return RefCountOperator;
			}());
			var RefCountSubscriber = (function (_super) {
			    __extends$1i(RefCountSubscriber, _super);
			    function RefCountSubscriber(destination, connectable) {
			        var _this = _super.call(this, destination) || this;
			        _this.connectable = connectable;
			        return _this;
			    }
			    RefCountSubscriber.prototype._unsubscribe = function () {
			        var connectable = this.connectable;
			        if (!connectable) {
			            this.connection = null;
			            return;
			        }
			        this.connectable = null;
			        var refCount = connectable._refCount;
			        if (refCount <= 0) {
			            this.connection = null;
			            return;
			        }
			        connectable._refCount = refCount - 1;
			        if (refCount > 1) {
			            this.connection = null;
			            return;
			        }
			        var connection = this.connection;
			        var sharedConnection = connectable._connection;
			        this.connection = null;
			        if (sharedConnection && (!connection || sharedConnection === connection)) {
			            sharedConnection.unsubscribe();
			        }
			    };
			    return RefCountSubscriber;
			}(Subscriber_1$H.Subscriber));

			var __extends$1h = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(ConnectableObservable$1, "__esModule", { value: true });
			var Subject_1$e = Subject$1;
			var Observable_1$t = Observable$1;
			var Subscriber_1$G = Subscriber$1;
			var Subscription_1$e = Subscription$1;
			var refCount_1$2 = refCount$1;
			var ConnectableObservable = (function (_super) {
			    __extends$1h(ConnectableObservable, _super);
			    function ConnectableObservable(source, subjectFactory) {
			        var _this = _super.call(this) || this;
			        _this.source = source;
			        _this.subjectFactory = subjectFactory;
			        _this._refCount = 0;
			        _this._isComplete = false;
			        return _this;
			    }
			    ConnectableObservable.prototype._subscribe = function (subscriber) {
			        return this.getSubject().subscribe(subscriber);
			    };
			    ConnectableObservable.prototype.getSubject = function () {
			        var subject = this._subject;
			        if (!subject || subject.isStopped) {
			            this._subject = this.subjectFactory();
			        }
			        return this._subject;
			    };
			    ConnectableObservable.prototype.connect = function () {
			        var connection = this._connection;
			        if (!connection) {
			            this._isComplete = false;
			            connection = this._connection = new Subscription_1$e.Subscription();
			            connection.add(this.source
			                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
			            if (connection.closed) {
			                this._connection = null;
			                connection = Subscription_1$e.Subscription.EMPTY;
			            }
			        }
			        return connection;
			    };
			    ConnectableObservable.prototype.refCount = function () {
			        return refCount_1$2.refCount()(this);
			    };
			    return ConnectableObservable;
			}(Observable_1$t.Observable));
			ConnectableObservable$1.ConnectableObservable = ConnectableObservable;
			ConnectableObservable$1.connectableObservableDescriptor = (function () {
			    var connectableProto = ConnectableObservable.prototype;
			    return {
			        operator: { value: null },
			        _refCount: { value: 0, writable: true },
			        _subject: { value: null, writable: true },
			        _connection: { value: null, writable: true },
			        _subscribe: { value: connectableProto._subscribe },
			        _isComplete: { value: connectableProto._isComplete, writable: true },
			        getSubject: { value: connectableProto.getSubject },
			        connect: { value: connectableProto.connect },
			        refCount: { value: connectableProto.refCount }
			    };
			})();
			var ConnectableSubscriber = (function (_super) {
			    __extends$1h(ConnectableSubscriber, _super);
			    function ConnectableSubscriber(destination, connectable) {
			        var _this = _super.call(this, destination) || this;
			        _this.connectable = connectable;
			        return _this;
			    }
			    ConnectableSubscriber.prototype._error = function (err) {
			        this._unsubscribe();
			        _super.prototype._error.call(this, err);
			    };
			    ConnectableSubscriber.prototype._complete = function () {
			        this.connectable._isComplete = true;
			        this._unsubscribe();
			        _super.prototype._complete.call(this);
			    };
			    ConnectableSubscriber.prototype._unsubscribe = function () {
			        var connectable = this.connectable;
			        if (connectable) {
			            this.connectable = null;
			            var connection = connectable._connection;
			            connectable._refCount = 0;
			            connectable._subject = null;
			            connectable._connection = null;
			            if (connection) {
			                connection.unsubscribe();
			            }
			        }
			    };
			    return ConnectableSubscriber;
			}(Subject_1$e.SubjectSubscriber));
			((function (_super) {
			    __extends$1h(RefCountSubscriber, _super);
			    function RefCountSubscriber(destination, connectable) {
			        var _this = _super.call(this, destination) || this;
			        _this.connectable = connectable;
			        return _this;
			    }
			    RefCountSubscriber.prototype._unsubscribe = function () {
			        var connectable = this.connectable;
			        if (!connectable) {
			            this.connection = null;
			            return;
			        }
			        this.connectable = null;
			        var refCount = connectable._refCount;
			        if (refCount <= 0) {
			            this.connection = null;
			            return;
			        }
			        connectable._refCount = refCount - 1;
			        if (refCount > 1) {
			            this.connection = null;
			            return;
			        }
			        var connection = this.connection;
			        var sharedConnection = connectable._connection;
			        this.connection = null;
			        if (sharedConnection && (!connection || sharedConnection === connection)) {
			            sharedConnection.unsubscribe();
			        }
			    };
			    return RefCountSubscriber;
			})(Subscriber_1$G.Subscriber));

			var groupBy$1 = {};

			var __extends$1g = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(groupBy$1, "__esModule", { value: true });
			var Subscriber_1$F = Subscriber$1;
			var Subscription_1$d = Subscription$1;
			var Observable_1$s = Observable$1;
			var Subject_1$d = Subject$1;
			function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
			    return function (source) {
			        return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
			    };
			}
			groupBy$1.groupBy = groupBy;
			var GroupByOperator = (function () {
			    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
			        this.keySelector = keySelector;
			        this.elementSelector = elementSelector;
			        this.durationSelector = durationSelector;
			        this.subjectSelector = subjectSelector;
			    }
			    GroupByOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
			    };
			    return GroupByOperator;
			}());
			var GroupBySubscriber = (function (_super) {
			    __extends$1g(GroupBySubscriber, _super);
			    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.keySelector = keySelector;
			        _this.elementSelector = elementSelector;
			        _this.durationSelector = durationSelector;
			        _this.subjectSelector = subjectSelector;
			        _this.groups = null;
			        _this.attemptedToUnsubscribe = false;
			        _this.count = 0;
			        return _this;
			    }
			    GroupBySubscriber.prototype._next = function (value) {
			        var key;
			        try {
			            key = this.keySelector(value);
			        }
			        catch (err) {
			            this.error(err);
			            return;
			        }
			        this._group(value, key);
			    };
			    GroupBySubscriber.prototype._group = function (value, key) {
			        var groups = this.groups;
			        if (!groups) {
			            groups = this.groups = new Map();
			        }
			        var group = groups.get(key);
			        var element;
			        if (this.elementSelector) {
			            try {
			                element = this.elementSelector(value);
			            }
			            catch (err) {
			                this.error(err);
			            }
			        }
			        else {
			            element = value;
			        }
			        if (!group) {
			            group = (this.subjectSelector ? this.subjectSelector() : new Subject_1$d.Subject());
			            groups.set(key, group);
			            var groupedObservable = new GroupedObservable(key, group, this);
			            this.destination.next(groupedObservable);
			            if (this.durationSelector) {
			                var duration = void 0;
			                try {
			                    duration = this.durationSelector(new GroupedObservable(key, group));
			                }
			                catch (err) {
			                    this.error(err);
			                    return;
			                }
			                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
			            }
			        }
			        if (!group.closed) {
			            group.next(element);
			        }
			    };
			    GroupBySubscriber.prototype._error = function (err) {
			        var groups = this.groups;
			        if (groups) {
			            groups.forEach(function (group, key) {
			                group.error(err);
			            });
			            groups.clear();
			        }
			        this.destination.error(err);
			    };
			    GroupBySubscriber.prototype._complete = function () {
			        var groups = this.groups;
			        if (groups) {
			            groups.forEach(function (group, key) {
			                group.complete();
			            });
			            groups.clear();
			        }
			        this.destination.complete();
			    };
			    GroupBySubscriber.prototype.removeGroup = function (key) {
			        this.groups.delete(key);
			    };
			    GroupBySubscriber.prototype.unsubscribe = function () {
			        if (!this.closed) {
			            this.attemptedToUnsubscribe = true;
			            if (this.count === 0) {
			                _super.prototype.unsubscribe.call(this);
			            }
			        }
			    };
			    return GroupBySubscriber;
			}(Subscriber_1$F.Subscriber));
			var GroupDurationSubscriber = (function (_super) {
			    __extends$1g(GroupDurationSubscriber, _super);
			    function GroupDurationSubscriber(key, group, parent) {
			        var _this = _super.call(this, group) || this;
			        _this.key = key;
			        _this.group = group;
			        _this.parent = parent;
			        return _this;
			    }
			    GroupDurationSubscriber.prototype._next = function (value) {
			        this.complete();
			    };
			    GroupDurationSubscriber.prototype._unsubscribe = function () {
			        var _a = this, parent = _a.parent, key = _a.key;
			        this.key = this.parent = null;
			        if (parent) {
			            parent.removeGroup(key);
			        }
			    };
			    return GroupDurationSubscriber;
			}(Subscriber_1$F.Subscriber));
			var GroupedObservable = (function (_super) {
			    __extends$1g(GroupedObservable, _super);
			    function GroupedObservable(key, groupSubject, refCountSubscription) {
			        var _this = _super.call(this) || this;
			        _this.key = key;
			        _this.groupSubject = groupSubject;
			        _this.refCountSubscription = refCountSubscription;
			        return _this;
			    }
			    GroupedObservable.prototype._subscribe = function (subscriber) {
			        var subscription = new Subscription_1$d.Subscription();
			        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
			        if (refCountSubscription && !refCountSubscription.closed) {
			            subscription.add(new InnerRefCountSubscription(refCountSubscription));
			        }
			        subscription.add(groupSubject.subscribe(subscriber));
			        return subscription;
			    };
			    return GroupedObservable;
			}(Observable_1$s.Observable));
			groupBy$1.GroupedObservable = GroupedObservable;
			var InnerRefCountSubscription = (function (_super) {
			    __extends$1g(InnerRefCountSubscription, _super);
			    function InnerRefCountSubscription(parent) {
			        var _this = _super.call(this) || this;
			        _this.parent = parent;
			        parent.count++;
			        return _this;
			    }
			    InnerRefCountSubscription.prototype.unsubscribe = function () {
			        var parent = this.parent;
			        if (!parent.closed && !this.closed) {
			            _super.prototype.unsubscribe.call(this);
			            parent.count -= 1;
			            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
			                parent.unsubscribe();
			            }
			        }
			    };
			    return InnerRefCountSubscription;
			}(Subscription_1$d.Subscription));

			var BehaviorSubject$1 = {};

			var __extends$1f = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(BehaviorSubject$1, "__esModule", { value: true });
			var Subject_1$c = Subject$1;
			var ObjectUnsubscribedError_1$2 = ObjectUnsubscribedError;
			var BehaviorSubject = (function (_super) {
			    __extends$1f(BehaviorSubject, _super);
			    function BehaviorSubject(_value) {
			        var _this = _super.call(this) || this;
			        _this._value = _value;
			        return _this;
			    }
			    Object.defineProperty(BehaviorSubject.prototype, "value", {
			        get: function () {
			            return this.getValue();
			        },
			        enumerable: true,
			        configurable: true
			    });
			    BehaviorSubject.prototype._subscribe = function (subscriber) {
			        var subscription = _super.prototype._subscribe.call(this, subscriber);
			        if (subscription && !subscription.closed) {
			            subscriber.next(this._value);
			        }
			        return subscription;
			    };
			    BehaviorSubject.prototype.getValue = function () {
			        if (this.hasError) {
			            throw this.thrownError;
			        }
			        else if (this.closed) {
			            throw new ObjectUnsubscribedError_1$2.ObjectUnsubscribedError();
			        }
			        else {
			            return this._value;
			        }
			    };
			    BehaviorSubject.prototype.next = function (value) {
			        _super.prototype.next.call(this, this._value = value);
			    };
			    return BehaviorSubject;
			}(Subject_1$c.Subject));
			BehaviorSubject$1.BehaviorSubject = BehaviorSubject;

			var ReplaySubject$1 = {};

			var queue = {};

			var QueueAction$1 = {};

			var AsyncAction$1 = {};

			var Action$1 = {};

			var __extends$1e = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(Action$1, "__esModule", { value: true });
			var Subscription_1$c = Subscription$1;
			var Action = (function (_super) {
			    __extends$1e(Action, _super);
			    function Action(scheduler, work) {
			        return _super.call(this) || this;
			    }
			    Action.prototype.schedule = function (state, delay) {
			        return this;
			    };
			    return Action;
			}(Subscription_1$c.Subscription));
			Action$1.Action = Action;

			var __extends$1d = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AsyncAction$1, "__esModule", { value: true });
			var Action_1 = Action$1;
			var AsyncAction = (function (_super) {
			    __extends$1d(AsyncAction, _super);
			    function AsyncAction(scheduler, work) {
			        var _this = _super.call(this, scheduler, work) || this;
			        _this.scheduler = scheduler;
			        _this.work = work;
			        _this.pending = false;
			        return _this;
			    }
			    AsyncAction.prototype.schedule = function (state, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (this.closed) {
			            return this;
			        }
			        this.state = state;
			        var id = this.id;
			        var scheduler = this.scheduler;
			        if (id != null) {
			            this.id = this.recycleAsyncId(scheduler, id, delay);
			        }
			        this.pending = true;
			        this.delay = delay;
			        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
			        return this;
			    };
			    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        return setInterval(scheduler.flush.bind(scheduler, this), delay);
			    };
			    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (delay !== null && this.delay === delay && this.pending === false) {
			            return id;
			        }
			        clearInterval(id);
			        return undefined;
			    };
			    AsyncAction.prototype.execute = function (state, delay) {
			        if (this.closed) {
			            return new Error('executing a cancelled action');
			        }
			        this.pending = false;
			        var error = this._execute(state, delay);
			        if (error) {
			            return error;
			        }
			        else if (this.pending === false && this.id != null) {
			            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
			        }
			    };
			    AsyncAction.prototype._execute = function (state, delay) {
			        var errored = false;
			        var errorValue = undefined;
			        try {
			            this.work(state);
			        }
			        catch (e) {
			            errored = true;
			            errorValue = !!e && e || new Error(e);
			        }
			        if (errored) {
			            this.unsubscribe();
			            return errorValue;
			        }
			    };
			    AsyncAction.prototype._unsubscribe = function () {
			        var id = this.id;
			        var scheduler = this.scheduler;
			        var actions = scheduler.actions;
			        var index = actions.indexOf(this);
			        this.work = null;
			        this.state = null;
			        this.pending = false;
			        this.scheduler = null;
			        if (index !== -1) {
			            actions.splice(index, 1);
			        }
			        if (id != null) {
			            this.id = this.recycleAsyncId(scheduler, id, null);
			        }
			        this.delay = null;
			    };
			    return AsyncAction;
			}(Action_1.Action));
			AsyncAction$1.AsyncAction = AsyncAction;

			var __extends$1c = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(QueueAction$1, "__esModule", { value: true });
			var AsyncAction_1$3 = AsyncAction$1;
			var QueueAction = (function (_super) {
			    __extends$1c(QueueAction, _super);
			    function QueueAction(scheduler, work) {
			        var _this = _super.call(this, scheduler, work) || this;
			        _this.scheduler = scheduler;
			        _this.work = work;
			        return _this;
			    }
			    QueueAction.prototype.schedule = function (state, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (delay > 0) {
			            return _super.prototype.schedule.call(this, state, delay);
			        }
			        this.delay = delay;
			        this.state = state;
			        this.scheduler.flush(this);
			        return this;
			    };
			    QueueAction.prototype.execute = function (state, delay) {
			        return (delay > 0 || this.closed) ?
			            _super.prototype.execute.call(this, state, delay) :
			            this._execute(state, delay);
			    };
			    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
			            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			        }
			        return scheduler.flush(this);
			    };
			    return QueueAction;
			}(AsyncAction_1$3.AsyncAction));
			QueueAction$1.QueueAction = QueueAction;

			var QueueScheduler$1 = {};

			var AsyncScheduler$1 = {};

			var Scheduler$1 = {};

			Object.defineProperty(Scheduler$1, "__esModule", { value: true });
			var Scheduler = (function () {
			    function Scheduler(SchedulerAction, now) {
			        if (now === void 0) { now = Scheduler.now; }
			        this.SchedulerAction = SchedulerAction;
			        this.now = now;
			    }
			    Scheduler.prototype.schedule = function (work, delay, state) {
			        if (delay === void 0) { delay = 0; }
			        return new this.SchedulerAction(this, work).schedule(state, delay);
			    };
			    Scheduler.now = function () { return Date.now(); };
			    return Scheduler;
			}());
			Scheduler$1.Scheduler = Scheduler;

			var __extends$1b = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AsyncScheduler$1, "__esModule", { value: true });
			var Scheduler_1$1 = Scheduler$1;
			var AsyncScheduler = (function (_super) {
			    __extends$1b(AsyncScheduler, _super);
			    function AsyncScheduler(SchedulerAction, now) {
			        if (now === void 0) { now = Scheduler_1$1.Scheduler.now; }
			        var _this = _super.call(this, SchedulerAction, function () {
			            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
			                return AsyncScheduler.delegate.now();
			            }
			            else {
			                return now();
			            }
			        }) || this;
			        _this.actions = [];
			        _this.active = false;
			        _this.scheduled = undefined;
			        return _this;
			    }
			    AsyncScheduler.prototype.schedule = function (work, delay, state) {
			        if (delay === void 0) { delay = 0; }
			        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
			            return AsyncScheduler.delegate.schedule(work, delay, state);
			        }
			        else {
			            return _super.prototype.schedule.call(this, work, delay, state);
			        }
			    };
			    AsyncScheduler.prototype.flush = function (action) {
			        var actions = this.actions;
			        if (this.active) {
			            actions.push(action);
			            return;
			        }
			        var error;
			        this.active = true;
			        do {
			            if (error = action.execute(action.state, action.delay)) {
			                break;
			            }
			        } while (action = actions.shift());
			        this.active = false;
			        if (error) {
			            while (action = actions.shift()) {
			                action.unsubscribe();
			            }
			            throw error;
			        }
			    };
			    return AsyncScheduler;
			}(Scheduler_1$1.Scheduler));
			AsyncScheduler$1.AsyncScheduler = AsyncScheduler;

			var __extends$1a = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(QueueScheduler$1, "__esModule", { value: true });
			var AsyncScheduler_1$3 = AsyncScheduler$1;
			var QueueScheduler = (function (_super) {
			    __extends$1a(QueueScheduler, _super);
			    function QueueScheduler() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    return QueueScheduler;
			}(AsyncScheduler_1$3.AsyncScheduler));
			QueueScheduler$1.QueueScheduler = QueueScheduler;

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var QueueAction_1 = QueueAction$1;
			var QueueScheduler_1 = QueueScheduler$1;
			exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
			exports.queue = exports.queueScheduler;

			}(queue));

			var observeOn$1 = {};

			var Notification = {};

			var empty = {};

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var Observable_1 = Observable$1;
			exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
			function empty(scheduler) {
			    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
			}
			exports.empty = empty;
			function emptyScheduled(scheduler) {
			    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
			}

			}(empty));

			var of$1 = {};

			var isScheduler$1 = {};

			Object.defineProperty(isScheduler$1, "__esModule", { value: true });
			function isScheduler(value) {
			    return value && typeof value.schedule === 'function';
			}
			isScheduler$1.isScheduler = isScheduler;

			var fromArray$1 = {};

			var subscribeToArray = {};

			Object.defineProperty(subscribeToArray, "__esModule", { value: true });
			subscribeToArray.subscribeToArray = function (array) { return function (subscriber) {
			    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
			        subscriber.next(array[i]);
			    }
			    subscriber.complete();
			}; };

			var scheduleArray$1 = {};

			Object.defineProperty(scheduleArray$1, "__esModule", { value: true });
			var Observable_1$r = Observable$1;
			var Subscription_1$b = Subscription$1;
			function scheduleArray(input, scheduler) {
			    return new Observable_1$r.Observable(function (subscriber) {
			        var sub = new Subscription_1$b.Subscription();
			        var i = 0;
			        sub.add(scheduler.schedule(function () {
			            if (i === input.length) {
			                subscriber.complete();
			                return;
			            }
			            subscriber.next(input[i++]);
			            if (!subscriber.closed) {
			                sub.add(this.schedule());
			            }
			        }));
			        return sub;
			    });
			}
			scheduleArray$1.scheduleArray = scheduleArray;

			Object.defineProperty(fromArray$1, "__esModule", { value: true });
			var Observable_1$q = Observable$1;
			var subscribeToArray_1$1 = subscribeToArray;
			var scheduleArray_1$2 = scheduleArray$1;
			function fromArray(input, scheduler) {
			    if (!scheduler) {
			        return new Observable_1$q.Observable(subscribeToArray_1$1.subscribeToArray(input));
			    }
			    else {
			        return scheduleArray_1$2.scheduleArray(input, scheduler);
			    }
			}
			fromArray$1.fromArray = fromArray;

			Object.defineProperty(of$1, "__esModule", { value: true });
			var isScheduler_1$9 = isScheduler$1;
			var fromArray_1$4 = fromArray$1;
			var scheduleArray_1$1 = scheduleArray$1;
			function of() {
			    var args = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        args[_i] = arguments[_i];
			    }
			    var scheduler = args[args.length - 1];
			    if (isScheduler_1$9.isScheduler(scheduler)) {
			        args.pop();
			        return scheduleArray_1$1.scheduleArray(args, scheduler);
			    }
			    else {
			        return fromArray_1$4.fromArray(args);
			    }
			}
			of$1.of = of;

			var throwError$1 = {};

			Object.defineProperty(throwError$1, "__esModule", { value: true });
			var Observable_1$p = Observable$1;
			function throwError(error, scheduler) {
			    if (!scheduler) {
			        return new Observable_1$p.Observable(function (subscriber) { return subscriber.error(error); });
			    }
			    else {
			        return new Observable_1$p.Observable(function (subscriber) { return scheduler.schedule(dispatch$7, 0, { error: error, subscriber: subscriber }); });
			    }
			}
			throwError$1.throwError = throwError;
			function dispatch$7(_a) {
			    var error = _a.error, subscriber = _a.subscriber;
			    subscriber.error(error);
			}

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var empty_1 = empty;
			var of_1 = of$1;
			var throwError_1 = throwError$1;
			(function (NotificationKind) {
			    NotificationKind["NEXT"] = "N";
			    NotificationKind["ERROR"] = "E";
			    NotificationKind["COMPLETE"] = "C";
			})(exports.NotificationKind || (exports.NotificationKind = {}));
			var Notification = (function () {
			    function Notification(kind, value, error) {
			        this.kind = kind;
			        this.value = value;
			        this.error = error;
			        this.hasValue = kind === 'N';
			    }
			    Notification.prototype.observe = function (observer) {
			        switch (this.kind) {
			            case 'N':
			                return observer.next && observer.next(this.value);
			            case 'E':
			                return observer.error && observer.error(this.error);
			            case 'C':
			                return observer.complete && observer.complete();
			        }
			    };
			    Notification.prototype.do = function (next, error, complete) {
			        var kind = this.kind;
			        switch (kind) {
			            case 'N':
			                return next && next(this.value);
			            case 'E':
			                return error && error(this.error);
			            case 'C':
			                return complete && complete();
			        }
			    };
			    Notification.prototype.accept = function (nextOrObserver, error, complete) {
			        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
			            return this.observe(nextOrObserver);
			        }
			        else {
			            return this.do(nextOrObserver, error, complete);
			        }
			    };
			    Notification.prototype.toObservable = function () {
			        var kind = this.kind;
			        switch (kind) {
			            case 'N':
			                return of_1.of(this.value);
			            case 'E':
			                return throwError_1.throwError(this.error);
			            case 'C':
			                return empty_1.empty();
			        }
			        throw new Error('unexpected notification kind value');
			    };
			    Notification.createNext = function (value) {
			        if (typeof value !== 'undefined') {
			            return new Notification('N', value);
			        }
			        return Notification.undefinedValueNotification;
			    };
			    Notification.createError = function (err) {
			        return new Notification('E', undefined, err);
			    };
			    Notification.createComplete = function () {
			        return Notification.completeNotification;
			    };
			    Notification.completeNotification = new Notification('C');
			    Notification.undefinedValueNotification = new Notification('N', undefined);
			    return Notification;
			}());
			exports.Notification = Notification;

			}(Notification));

			var __extends$19 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(observeOn$1, "__esModule", { value: true });
			var Subscriber_1$E = Subscriber$1;
			var Notification_1$3 = Notification;
			function observeOn(scheduler, delay) {
			    if (delay === void 0) { delay = 0; }
			    return function observeOnOperatorFunction(source) {
			        return source.lift(new ObserveOnOperator(scheduler, delay));
			    };
			}
			observeOn$1.observeOn = observeOn;
			var ObserveOnOperator = (function () {
			    function ObserveOnOperator(scheduler, delay) {
			        if (delay === void 0) { delay = 0; }
			        this.scheduler = scheduler;
			        this.delay = delay;
			    }
			    ObserveOnOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
			    };
			    return ObserveOnOperator;
			}());
			observeOn$1.ObserveOnOperator = ObserveOnOperator;
			var ObserveOnSubscriber = (function (_super) {
			    __extends$19(ObserveOnSubscriber, _super);
			    function ObserveOnSubscriber(destination, scheduler, delay) {
			        if (delay === void 0) { delay = 0; }
			        var _this = _super.call(this, destination) || this;
			        _this.scheduler = scheduler;
			        _this.delay = delay;
			        return _this;
			    }
			    ObserveOnSubscriber.dispatch = function (arg) {
			        var notification = arg.notification, destination = arg.destination;
			        notification.observe(destination);
			        this.unsubscribe();
			    };
			    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
			        var destination = this.destination;
			        destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
			    };
			    ObserveOnSubscriber.prototype._next = function (value) {
			        this.scheduleMessage(Notification_1$3.Notification.createNext(value));
			    };
			    ObserveOnSubscriber.prototype._error = function (err) {
			        this.scheduleMessage(Notification_1$3.Notification.createError(err));
			        this.unsubscribe();
			    };
			    ObserveOnSubscriber.prototype._complete = function () {
			        this.scheduleMessage(Notification_1$3.Notification.createComplete());
			        this.unsubscribe();
			    };
			    return ObserveOnSubscriber;
			}(Subscriber_1$E.Subscriber));
			observeOn$1.ObserveOnSubscriber = ObserveOnSubscriber;
			var ObserveOnMessage = (function () {
			    function ObserveOnMessage(notification, destination) {
			        this.notification = notification;
			        this.destination = destination;
			    }
			    return ObserveOnMessage;
			}());
			observeOn$1.ObserveOnMessage = ObserveOnMessage;

			var __extends$18 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(ReplaySubject$1, "__esModule", { value: true });
			var Subject_1$b = Subject$1;
			var queue_1$1 = queue;
			var Subscription_1$a = Subscription$1;
			var observeOn_1$1 = observeOn$1;
			var ObjectUnsubscribedError_1$1 = ObjectUnsubscribedError;
			var SubjectSubscription_1 = SubjectSubscription$1;
			var ReplaySubject = (function (_super) {
			    __extends$18(ReplaySubject, _super);
			    function ReplaySubject(bufferSize, windowTime, scheduler) {
			        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
			        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
			        var _this = _super.call(this) || this;
			        _this.scheduler = scheduler;
			        _this._events = [];
			        _this._infiniteTimeWindow = false;
			        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
			        _this._windowTime = windowTime < 1 ? 1 : windowTime;
			        if (windowTime === Number.POSITIVE_INFINITY) {
			            _this._infiniteTimeWindow = true;
			            _this.next = _this.nextInfiniteTimeWindow;
			        }
			        else {
			            _this.next = _this.nextTimeWindow;
			        }
			        return _this;
			    }
			    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
			        if (!this.isStopped) {
			            var _events = this._events;
			            _events.push(value);
			            if (_events.length > this._bufferSize) {
			                _events.shift();
			            }
			        }
			        _super.prototype.next.call(this, value);
			    };
			    ReplaySubject.prototype.nextTimeWindow = function (value) {
			        if (!this.isStopped) {
			            this._events.push(new ReplayEvent(this._getNow(), value));
			            this._trimBufferThenGetEvents();
			        }
			        _super.prototype.next.call(this, value);
			    };
			    ReplaySubject.prototype._subscribe = function (subscriber) {
			        var _infiniteTimeWindow = this._infiniteTimeWindow;
			        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
			        var scheduler = this.scheduler;
			        var len = _events.length;
			        var subscription;
			        if (this.closed) {
			            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
			        }
			        else if (this.isStopped || this.hasError) {
			            subscription = Subscription_1$a.Subscription.EMPTY;
			        }
			        else {
			            this.observers.push(subscriber);
			            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
			        }
			        if (scheduler) {
			            subscriber.add(subscriber = new observeOn_1$1.ObserveOnSubscriber(subscriber, scheduler));
			        }
			        if (_infiniteTimeWindow) {
			            for (var i = 0; i < len && !subscriber.closed; i++) {
			                subscriber.next(_events[i]);
			            }
			        }
			        else {
			            for (var i = 0; i < len && !subscriber.closed; i++) {
			                subscriber.next(_events[i].value);
			            }
			        }
			        if (this.hasError) {
			            subscriber.error(this.thrownError);
			        }
			        else if (this.isStopped) {
			            subscriber.complete();
			        }
			        return subscription;
			    };
			    ReplaySubject.prototype._getNow = function () {
			        return (this.scheduler || queue_1$1.queue).now();
			    };
			    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
			        var now = this._getNow();
			        var _bufferSize = this._bufferSize;
			        var _windowTime = this._windowTime;
			        var _events = this._events;
			        var eventsCount = _events.length;
			        var spliceCount = 0;
			        while (spliceCount < eventsCount) {
			            if ((now - _events[spliceCount].time) < _windowTime) {
			                break;
			            }
			            spliceCount++;
			        }
			        if (eventsCount > _bufferSize) {
			            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
			        }
			        if (spliceCount > 0) {
			            _events.splice(0, spliceCount);
			        }
			        return _events;
			    };
			    return ReplaySubject;
			}(Subject_1$b.Subject));
			ReplaySubject$1.ReplaySubject = ReplaySubject;
			var ReplayEvent = (function () {
			    function ReplayEvent(time, value) {
			        this.time = time;
			        this.value = value;
			    }
			    return ReplayEvent;
			}());

			var AsyncSubject$1 = {};

			var __extends$17 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AsyncSubject$1, "__esModule", { value: true });
			var Subject_1$a = Subject$1;
			var Subscription_1$9 = Subscription$1;
			var AsyncSubject = (function (_super) {
			    __extends$17(AsyncSubject, _super);
			    function AsyncSubject() {
			        var _this = _super !== null && _super.apply(this, arguments) || this;
			        _this.value = null;
			        _this.hasNext = false;
			        _this.hasCompleted = false;
			        return _this;
			    }
			    AsyncSubject.prototype._subscribe = function (subscriber) {
			        if (this.hasError) {
			            subscriber.error(this.thrownError);
			            return Subscription_1$9.Subscription.EMPTY;
			        }
			        else if (this.hasCompleted && this.hasNext) {
			            subscriber.next(this.value);
			            subscriber.complete();
			            return Subscription_1$9.Subscription.EMPTY;
			        }
			        return _super.prototype._subscribe.call(this, subscriber);
			    };
			    AsyncSubject.prototype.next = function (value) {
			        if (!this.hasCompleted) {
			            this.value = value;
			            this.hasNext = true;
			        }
			    };
			    AsyncSubject.prototype.error = function (error) {
			        if (!this.hasCompleted) {
			            _super.prototype.error.call(this, error);
			        }
			    };
			    AsyncSubject.prototype.complete = function () {
			        this.hasCompleted = true;
			        if (this.hasNext) {
			            _super.prototype.next.call(this, this.value);
			        }
			        _super.prototype.complete.call(this);
			    };
			    return AsyncSubject;
			}(Subject_1$a.Subject));
			AsyncSubject$1.AsyncSubject = AsyncSubject;

			var asap = {};

			var AsapAction$1 = {};

			var Immediate = {};

			Object.defineProperty(Immediate, "__esModule", { value: true });
			var nextHandle = 1;
			var RESOLVED = (function () { return Promise.resolve(); })();
			var activeHandles = {};
			function findAndClearHandle(handle) {
			    if (handle in activeHandles) {
			        delete activeHandles[handle];
			        return true;
			    }
			    return false;
			}
			Immediate.Immediate = {
			    setImmediate: function (cb) {
			        var handle = nextHandle++;
			        activeHandles[handle] = true;
			        RESOLVED.then(function () { return findAndClearHandle(handle) && cb(); });
			        return handle;
			    },
			    clearImmediate: function (handle) {
			        findAndClearHandle(handle);
			    },
			};
			Immediate.TestTools = {
			    pending: function () {
			        return Object.keys(activeHandles).length;
			    }
			};

			var __extends$16 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AsapAction$1, "__esModule", { value: true });
			var Immediate_1 = Immediate;
			var AsyncAction_1$2 = AsyncAction$1;
			var AsapAction = (function (_super) {
			    __extends$16(AsapAction, _super);
			    function AsapAction(scheduler, work) {
			        var _this = _super.call(this, scheduler, work) || this;
			        _this.scheduler = scheduler;
			        _this.work = work;
			        return _this;
			    }
			    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (delay !== null && delay > 0) {
			            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			        }
			        scheduler.actions.push(this);
			        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
			    };
			    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
			            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
			        }
			        if (scheduler.actions.length === 0) {
			            Immediate_1.Immediate.clearImmediate(id);
			            scheduler.scheduled = undefined;
			        }
			        return undefined;
			    };
			    return AsapAction;
			}(AsyncAction_1$2.AsyncAction));
			AsapAction$1.AsapAction = AsapAction;

			var AsapScheduler$1 = {};

			var __extends$15 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AsapScheduler$1, "__esModule", { value: true });
			var AsyncScheduler_1$2 = AsyncScheduler$1;
			var AsapScheduler = (function (_super) {
			    __extends$15(AsapScheduler, _super);
			    function AsapScheduler() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    AsapScheduler.prototype.flush = function (action) {
			        this.active = true;
			        this.scheduled = undefined;
			        var actions = this.actions;
			        var error;
			        var index = -1;
			        var count = actions.length;
			        action = action || actions.shift();
			        do {
			            if (error = action.execute(action.state, action.delay)) {
			                break;
			            }
			        } while (++index < count && (action = actions.shift()));
			        this.active = false;
			        if (error) {
			            while (++index < count && (action = actions.shift())) {
			                action.unsubscribe();
			            }
			            throw error;
			        }
			    };
			    return AsapScheduler;
			}(AsyncScheduler_1$2.AsyncScheduler));
			AsapScheduler$1.AsapScheduler = AsapScheduler;

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var AsapAction_1 = AsapAction$1;
			var AsapScheduler_1 = AsapScheduler$1;
			exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
			exports.asap = exports.asapScheduler;

			}(asap));

			var async = {};

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var AsyncAction_1 = AsyncAction$1;
			var AsyncScheduler_1 = AsyncScheduler$1;
			exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
			exports.async = exports.asyncScheduler;

			}(async));

			var animationFrame = {};

			var AnimationFrameAction$1 = {};

			var __extends$14 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AnimationFrameAction$1, "__esModule", { value: true });
			var AsyncAction_1$1 = AsyncAction$1;
			var AnimationFrameAction = (function (_super) {
			    __extends$14(AnimationFrameAction, _super);
			    function AnimationFrameAction(scheduler, work) {
			        var _this = _super.call(this, scheduler, work) || this;
			        _this.scheduler = scheduler;
			        _this.work = work;
			        return _this;
			    }
			    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (delay !== null && delay > 0) {
			            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			        }
			        scheduler.actions.push(this);
			        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () { return scheduler.flush(null); }));
			    };
			    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
			            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
			        }
			        if (scheduler.actions.length === 0) {
			            cancelAnimationFrame(id);
			            scheduler.scheduled = undefined;
			        }
			        return undefined;
			    };
			    return AnimationFrameAction;
			}(AsyncAction_1$1.AsyncAction));
			AnimationFrameAction$1.AnimationFrameAction = AnimationFrameAction;

			var AnimationFrameScheduler$1 = {};

			var __extends$13 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(AnimationFrameScheduler$1, "__esModule", { value: true });
			var AsyncScheduler_1$1 = AsyncScheduler$1;
			var AnimationFrameScheduler = (function (_super) {
			    __extends$13(AnimationFrameScheduler, _super);
			    function AnimationFrameScheduler() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    AnimationFrameScheduler.prototype.flush = function (action) {
			        this.active = true;
			        this.scheduled = undefined;
			        var actions = this.actions;
			        var error;
			        var index = -1;
			        var count = actions.length;
			        action = action || actions.shift();
			        do {
			            if (error = action.execute(action.state, action.delay)) {
			                break;
			            }
			        } while (++index < count && (action = actions.shift()));
			        this.active = false;
			        if (error) {
			            while (++index < count && (action = actions.shift())) {
			                action.unsubscribe();
			            }
			            throw error;
			        }
			    };
			    return AnimationFrameScheduler;
			}(AsyncScheduler_1$1.AsyncScheduler));
			AnimationFrameScheduler$1.AnimationFrameScheduler = AnimationFrameScheduler;

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var AnimationFrameAction_1 = AnimationFrameAction$1;
			var AnimationFrameScheduler_1 = AnimationFrameScheduler$1;
			exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
			exports.animationFrame = exports.animationFrameScheduler;

			}(animationFrame));

			var VirtualTimeScheduler$1 = {};

			var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(VirtualTimeScheduler$1, "__esModule", { value: true });
			var AsyncAction_1 = AsyncAction$1;
			var AsyncScheduler_1 = AsyncScheduler$1;
			var VirtualTimeScheduler = (function (_super) {
			    __extends$12(VirtualTimeScheduler, _super);
			    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
			        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
			        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
			        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
			        _this.maxFrames = maxFrames;
			        _this.frame = 0;
			        _this.index = -1;
			        return _this;
			    }
			    VirtualTimeScheduler.prototype.flush = function () {
			        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
			        var error, action;
			        while ((action = actions[0]) && action.delay <= maxFrames) {
			            actions.shift();
			            this.frame = action.delay;
			            if (error = action.execute(action.state, action.delay)) {
			                break;
			            }
			        }
			        if (error) {
			            while (action = actions.shift()) {
			                action.unsubscribe();
			            }
			            throw error;
			        }
			    };
			    VirtualTimeScheduler.frameTimeFactor = 10;
			    return VirtualTimeScheduler;
			}(AsyncScheduler_1.AsyncScheduler));
			VirtualTimeScheduler$1.VirtualTimeScheduler = VirtualTimeScheduler;
			var VirtualAction = (function (_super) {
			    __extends$12(VirtualAction, _super);
			    function VirtualAction(scheduler, work, index) {
			        if (index === void 0) { index = scheduler.index += 1; }
			        var _this = _super.call(this, scheduler, work) || this;
			        _this.scheduler = scheduler;
			        _this.work = work;
			        _this.index = index;
			        _this.active = true;
			        _this.index = scheduler.index = index;
			        return _this;
			    }
			    VirtualAction.prototype.schedule = function (state, delay) {
			        if (delay === void 0) { delay = 0; }
			        if (!this.id) {
			            return _super.prototype.schedule.call(this, state, delay);
			        }
			        this.active = false;
			        var action = new VirtualAction(this.scheduler, this.work);
			        this.add(action);
			        return action.schedule(state, delay);
			    };
			    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
			        if (delay === void 0) { delay = 0; }
			        this.delay = scheduler.frame + delay;
			        var actions = scheduler.actions;
			        actions.push(this);
			        actions.sort(VirtualAction.sortActions);
			        return true;
			    };
			    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
			        return undefined;
			    };
			    VirtualAction.prototype._execute = function (state, delay) {
			        if (this.active === true) {
			            return _super.prototype._execute.call(this, state, delay);
			        }
			    };
			    VirtualAction.sortActions = function (a, b) {
			        if (a.delay === b.delay) {
			            if (a.index === b.index) {
			                return 0;
			            }
			            else if (a.index > b.index) {
			                return 1;
			            }
			            else {
			                return -1;
			            }
			        }
			        else if (a.delay > b.delay) {
			            return 1;
			        }
			        else {
			            return -1;
			        }
			    };
			    return VirtualAction;
			}(AsyncAction_1.AsyncAction));
			VirtualTimeScheduler$1.VirtualAction = VirtualAction;

			var noop$1 = {};

			Object.defineProperty(noop$1, "__esModule", { value: true });
			function noop() { }
			noop$1.noop = noop;

			var isObservable$1 = {};

			Object.defineProperty(isObservable$1, "__esModule", { value: true });
			var Observable_1$o = Observable$1;
			function isObservable(obj) {
			    return !!obj && (obj instanceof Observable_1$o.Observable || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
			}
			isObservable$1.isObservable = isObservable;

			var ArgumentOutOfRangeError = {};

			Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
			var ArgumentOutOfRangeErrorImpl = (function () {
			    function ArgumentOutOfRangeErrorImpl() {
			        Error.call(this);
			        this.message = 'argument out of range';
			        this.name = 'ArgumentOutOfRangeError';
			        return this;
			    }
			    ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
			    return ArgumentOutOfRangeErrorImpl;
			})();
			ArgumentOutOfRangeError.ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

			var EmptyError = {};

			Object.defineProperty(EmptyError, "__esModule", { value: true });
			var EmptyErrorImpl = (function () {
			    function EmptyErrorImpl() {
			        Error.call(this);
			        this.message = 'no elements in sequence';
			        this.name = 'EmptyError';
			        return this;
			    }
			    EmptyErrorImpl.prototype = Object.create(Error.prototype);
			    return EmptyErrorImpl;
			})();
			EmptyError.EmptyError = EmptyErrorImpl;

			var TimeoutError = {};

			Object.defineProperty(TimeoutError, "__esModule", { value: true });
			var TimeoutErrorImpl = (function () {
			    function TimeoutErrorImpl() {
			        Error.call(this);
			        this.message = 'Timeout has occurred';
			        this.name = 'TimeoutError';
			        return this;
			    }
			    TimeoutErrorImpl.prototype = Object.create(Error.prototype);
			    return TimeoutErrorImpl;
			})();
			TimeoutError.TimeoutError = TimeoutErrorImpl;

			var bindCallback$1 = {};

			var map$1 = {};

			var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(map$1, "__esModule", { value: true });
			var Subscriber_1$D = Subscriber$1;
			function map(project, thisArg) {
			    return function mapOperation(source) {
			        if (typeof project !== 'function') {
			            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
			        }
			        return source.lift(new MapOperator(project, thisArg));
			    };
			}
			map$1.map = map;
			var MapOperator = (function () {
			    function MapOperator(project, thisArg) {
			        this.project = project;
			        this.thisArg = thisArg;
			    }
			    MapOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
			    };
			    return MapOperator;
			}());
			map$1.MapOperator = MapOperator;
			var MapSubscriber = (function (_super) {
			    __extends$11(MapSubscriber, _super);
			    function MapSubscriber(destination, project, thisArg) {
			        var _this = _super.call(this, destination) || this;
			        _this.project = project;
			        _this.count = 0;
			        _this.thisArg = thisArg || _this;
			        return _this;
			    }
			    MapSubscriber.prototype._next = function (value) {
			        var result;
			        try {
			            result = this.project.call(this.thisArg, value, this.count++);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.next(result);
			    };
			    return MapSubscriber;
			}(Subscriber_1$D.Subscriber));

			Object.defineProperty(bindCallback$1, "__esModule", { value: true });
			var Observable_1$n = Observable$1;
			var AsyncSubject_1$3 = AsyncSubject$1;
			var map_1$b = map$1;
			var canReportError_1$1 = canReportError$1;
			var isArray_1$c = isArray;
			var isScheduler_1$8 = isScheduler$1;
			function bindCallback(callbackFunc, resultSelector, scheduler) {
			    if (resultSelector) {
			        if (isScheduler_1$8.isScheduler(resultSelector)) {
			            scheduler = resultSelector;
			        }
			        else {
			            return function () {
			                var args = [];
			                for (var _i = 0; _i < arguments.length; _i++) {
			                    args[_i] = arguments[_i];
			                }
			                return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1$b.map(function (args) { return isArray_1$c.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
			            };
			        }
			    }
			    return function () {
			        var args = [];
			        for (var _i = 0; _i < arguments.length; _i++) {
			            args[_i] = arguments[_i];
			        }
			        var context = this;
			        var subject;
			        var params = {
			            context: context,
			            subject: subject,
			            callbackFunc: callbackFunc,
			            scheduler: scheduler,
			        };
			        return new Observable_1$n.Observable(function (subscriber) {
			            if (!scheduler) {
			                if (!subject) {
			                    subject = new AsyncSubject_1$3.AsyncSubject();
			                    var handler = function () {
			                        var innerArgs = [];
			                        for (var _i = 0; _i < arguments.length; _i++) {
			                            innerArgs[_i] = arguments[_i];
			                        }
			                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
			                        subject.complete();
			                    };
			                    try {
			                        callbackFunc.apply(context, args.concat([handler]));
			                    }
			                    catch (err) {
			                        if (canReportError_1$1.canReportError(subject)) {
			                            subject.error(err);
			                        }
			                        else {
			                            console.warn(err);
			                        }
			                    }
			                }
			                return subject.subscribe(subscriber);
			            }
			            else {
			                var state = {
			                    args: args, subscriber: subscriber, params: params,
			                };
			                return scheduler.schedule(dispatch$6, 0, state);
			            }
			        });
			    };
			}
			bindCallback$1.bindCallback = bindCallback;
			function dispatch$6(state) {
			    var _this = this;
			    var args = state.args, subscriber = state.subscriber, params = state.params;
			    var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
			    var subject = params.subject;
			    if (!subject) {
			        subject = params.subject = new AsyncSubject_1$3.AsyncSubject();
			        var handler = function () {
			            var innerArgs = [];
			            for (var _i = 0; _i < arguments.length; _i++) {
			                innerArgs[_i] = arguments[_i];
			            }
			            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
			            _this.add(scheduler.schedule(dispatchNext$3, 0, { value: value, subject: subject }));
			        };
			        try {
			            callbackFunc.apply(context, args.concat([handler]));
			        }
			        catch (err) {
			            subject.error(err);
			        }
			    }
			    this.add(subject.subscribe(subscriber));
			}
			function dispatchNext$3(state) {
			    var value = state.value, subject = state.subject;
			    subject.next(value);
			    subject.complete();
			}

			var bindNodeCallback$1 = {};

			Object.defineProperty(bindNodeCallback$1, "__esModule", { value: true });
			var Observable_1$m = Observable$1;
			var AsyncSubject_1$2 = AsyncSubject$1;
			var map_1$a = map$1;
			var canReportError_1 = canReportError$1;
			var isScheduler_1$7 = isScheduler$1;
			var isArray_1$b = isArray;
			function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
			    if (resultSelector) {
			        if (isScheduler_1$7.isScheduler(resultSelector)) {
			            scheduler = resultSelector;
			        }
			        else {
			            return function () {
			                var args = [];
			                for (var _i = 0; _i < arguments.length; _i++) {
			                    args[_i] = arguments[_i];
			                }
			                return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1$a.map(function (args) { return isArray_1$b.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
			            };
			        }
			    }
			    return function () {
			        var args = [];
			        for (var _i = 0; _i < arguments.length; _i++) {
			            args[_i] = arguments[_i];
			        }
			        var params = {
			            subject: undefined,
			            args: args,
			            callbackFunc: callbackFunc,
			            scheduler: scheduler,
			            context: this,
			        };
			        return new Observable_1$m.Observable(function (subscriber) {
			            var context = params.context;
			            var subject = params.subject;
			            if (!scheduler) {
			                if (!subject) {
			                    subject = params.subject = new AsyncSubject_1$2.AsyncSubject();
			                    var handler = function () {
			                        var innerArgs = [];
			                        for (var _i = 0; _i < arguments.length; _i++) {
			                            innerArgs[_i] = arguments[_i];
			                        }
			                        var err = innerArgs.shift();
			                        if (err) {
			                            subject.error(err);
			                            return;
			                        }
			                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
			                        subject.complete();
			                    };
			                    try {
			                        callbackFunc.apply(context, args.concat([handler]));
			                    }
			                    catch (err) {
			                        if (canReportError_1.canReportError(subject)) {
			                            subject.error(err);
			                        }
			                        else {
			                            console.warn(err);
			                        }
			                    }
			                }
			                return subject.subscribe(subscriber);
			            }
			            else {
			                return scheduler.schedule(dispatch$5, 0, { params: params, subscriber: subscriber, context: context });
			            }
			        });
			    };
			}
			bindNodeCallback$1.bindNodeCallback = bindNodeCallback;
			function dispatch$5(state) {
			    var _this = this;
			    var params = state.params, subscriber = state.subscriber, context = state.context;
			    var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
			    var subject = params.subject;
			    if (!subject) {
			        subject = params.subject = new AsyncSubject_1$2.AsyncSubject();
			        var handler = function () {
			            var innerArgs = [];
			            for (var _i = 0; _i < arguments.length; _i++) {
			                innerArgs[_i] = arguments[_i];
			            }
			            var err = innerArgs.shift();
			            if (err) {
			                _this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
			            }
			            else {
			                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
			                _this.add(scheduler.schedule(dispatchNext$2, 0, { value: value, subject: subject }));
			            }
			        };
			        try {
			            callbackFunc.apply(context, args.concat([handler]));
			        }
			        catch (err) {
			            this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
			        }
			    }
			    this.add(subject.subscribe(subscriber));
			}
			function dispatchNext$2(arg) {
			    var value = arg.value, subject = arg.subject;
			    subject.next(value);
			    subject.complete();
			}
			function dispatchError(arg) {
			    var err = arg.err, subject = arg.subject;
			    subject.error(err);
			}

			var combineLatest$3 = {};

			var OuterSubscriber$1 = {};

			var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(OuterSubscriber$1, "__esModule", { value: true });
			var Subscriber_1$C = Subscriber$1;
			var OuterSubscriber = (function (_super) {
			    __extends$10(OuterSubscriber, _super);
			    function OuterSubscriber() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
			        this.destination.next(innerValue);
			    };
			    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
			        this.destination.error(error);
			    };
			    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
			        this.destination.complete();
			    };
			    return OuterSubscriber;
			}(Subscriber_1$C.Subscriber));
			OuterSubscriber$1.OuterSubscriber = OuterSubscriber;

			var subscribeToResult$1 = {};

			var InnerSubscriber$1 = {};

			var __extends$$ = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(InnerSubscriber$1, "__esModule", { value: true });
			var Subscriber_1$B = Subscriber$1;
			var InnerSubscriber = (function (_super) {
			    __extends$$(InnerSubscriber, _super);
			    function InnerSubscriber(parent, outerValue, outerIndex) {
			        var _this = _super.call(this) || this;
			        _this.parent = parent;
			        _this.outerValue = outerValue;
			        _this.outerIndex = outerIndex;
			        _this.index = 0;
			        return _this;
			    }
			    InnerSubscriber.prototype._next = function (value) {
			        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
			    };
			    InnerSubscriber.prototype._error = function (error) {
			        this.parent.notifyError(error, this);
			        this.unsubscribe();
			    };
			    InnerSubscriber.prototype._complete = function () {
			        this.parent.notifyComplete(this);
			        this.unsubscribe();
			    };
			    return InnerSubscriber;
			}(Subscriber_1$B.Subscriber));
			InnerSubscriber$1.InnerSubscriber = InnerSubscriber;

			var subscribeTo = {};

			var subscribeToPromise = {};

			Object.defineProperty(subscribeToPromise, "__esModule", { value: true });
			var hostReportError_1 = hostReportError$1;
			subscribeToPromise.subscribeToPromise = function (promise) { return function (subscriber) {
			    promise.then(function (value) {
			        if (!subscriber.closed) {
			            subscriber.next(value);
			            subscriber.complete();
			        }
			    }, function (err) { return subscriber.error(err); })
			        .then(null, hostReportError_1.hostReportError);
			    return subscriber;
			}; };

			var subscribeToIterable = {};

			var iterator = {};

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			function getSymbolIterator() {
			    if (typeof Symbol !== 'function' || !Symbol.iterator) {
			        return '@@iterator';
			    }
			    return Symbol.iterator;
			}
			exports.getSymbolIterator = getSymbolIterator;
			exports.iterator = getSymbolIterator();
			exports.$$iterator = exports.iterator;

			}(iterator));

			Object.defineProperty(subscribeToIterable, "__esModule", { value: true });
			var iterator_1$4 = iterator;
			subscribeToIterable.subscribeToIterable = function (iterable) { return function (subscriber) {
			    var iterator = iterable[iterator_1$4.iterator]();
			    do {
			        var item = void 0;
			        try {
			            item = iterator.next();
			        }
			        catch (err) {
			            subscriber.error(err);
			            return subscriber;
			        }
			        if (item.done) {
			            subscriber.complete();
			            break;
			        }
			        subscriber.next(item.value);
			        if (subscriber.closed) {
			            break;
			        }
			    } while (true);
			    if (typeof iterator.return === 'function') {
			        subscriber.add(function () {
			            if (iterator.return) {
			                iterator.return();
			            }
			        });
			    }
			    return subscriber;
			}; };

			var subscribeToObservable = {};

			Object.defineProperty(subscribeToObservable, "__esModule", { value: true });
			var observable_1$4 = observable;
			subscribeToObservable.subscribeToObservable = function (obj) { return function (subscriber) {
			    var obs = obj[observable_1$4.observable]();
			    if (typeof obs.subscribe !== 'function') {
			        throw new TypeError('Provided object does not correctly implement Symbol.observable');
			    }
			    else {
			        return obs.subscribe(subscriber);
			    }
			}; };

			var isArrayLike = {};

			Object.defineProperty(isArrayLike, "__esModule", { value: true });
			isArrayLike.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

			var isPromise$1 = {};

			Object.defineProperty(isPromise$1, "__esModule", { value: true });
			function isPromise(value) {
			    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
			}
			isPromise$1.isPromise = isPromise;

			Object.defineProperty(subscribeTo, "__esModule", { value: true });
			var subscribeToArray_1 = subscribeToArray;
			var subscribeToPromise_1 = subscribeToPromise;
			var subscribeToIterable_1 = subscribeToIterable;
			var subscribeToObservable_1 = subscribeToObservable;
			var isArrayLike_1$1 = isArrayLike;
			var isPromise_1$1 = isPromise$1;
			var isObject_1$1 = isObject$1;
			var iterator_1$3 = iterator;
			var observable_1$3 = observable;
			subscribeTo.subscribeTo = function (result) {
			    if (!!result && typeof result[observable_1$3.observable] === 'function') {
			        return subscribeToObservable_1.subscribeToObservable(result);
			    }
			    else if (isArrayLike_1$1.isArrayLike(result)) {
			        return subscribeToArray_1.subscribeToArray(result);
			    }
			    else if (isPromise_1$1.isPromise(result)) {
			        return subscribeToPromise_1.subscribeToPromise(result);
			    }
			    else if (!!result && typeof result[iterator_1$3.iterator] === 'function') {
			        return subscribeToIterable_1.subscribeToIterable(result);
			    }
			    else {
			        var value = isObject_1$1.isObject(result) ? 'an invalid object' : "'" + result + "'";
			        var msg = "You provided " + value + " where a stream was expected."
			            + ' You can provide an Observable, Promise, Array, or Iterable.';
			        throw new TypeError(msg);
			    }
			};

			Object.defineProperty(subscribeToResult$1, "__esModule", { value: true });
			var InnerSubscriber_1 = InnerSubscriber$1;
			var subscribeTo_1$3 = subscribeTo;
			var Observable_1$l = Observable$1;
			function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
			    if (innerSubscriber === void 0) { innerSubscriber = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex); }
			    if (innerSubscriber.closed) {
			        return undefined;
			    }
			    if (result instanceof Observable_1$l.Observable) {
			        return result.subscribe(innerSubscriber);
			    }
			    return subscribeTo_1$3.subscribeTo(result)(innerSubscriber);
			}
			subscribeToResult$1.subscribeToResult = subscribeToResult;

			var __extends$_ = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(combineLatest$3, "__esModule", { value: true });
			var isScheduler_1$6 = isScheduler$1;
			var isArray_1$a = isArray;
			var OuterSubscriber_1$6 = OuterSubscriber$1;
			var subscribeToResult_1$6 = subscribeToResult$1;
			var fromArray_1$3 = fromArray$1;
			var NONE = {};
			function combineLatest$2() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    var resultSelector = undefined;
			    var scheduler = undefined;
			    if (isScheduler_1$6.isScheduler(observables[observables.length - 1])) {
			        scheduler = observables.pop();
			    }
			    if (typeof observables[observables.length - 1] === 'function') {
			        resultSelector = observables.pop();
			    }
			    if (observables.length === 1 && isArray_1$a.isArray(observables[0])) {
			        observables = observables[0];
			    }
			    return fromArray_1$3.fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
			}
			combineLatest$3.combineLatest = combineLatest$2;
			var CombineLatestOperator = (function () {
			    function CombineLatestOperator(resultSelector) {
			        this.resultSelector = resultSelector;
			    }
			    CombineLatestOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
			    };
			    return CombineLatestOperator;
			}());
			combineLatest$3.CombineLatestOperator = CombineLatestOperator;
			var CombineLatestSubscriber = (function (_super) {
			    __extends$_(CombineLatestSubscriber, _super);
			    function CombineLatestSubscriber(destination, resultSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.resultSelector = resultSelector;
			        _this.active = 0;
			        _this.values = [];
			        _this.observables = [];
			        return _this;
			    }
			    CombineLatestSubscriber.prototype._next = function (observable) {
			        this.values.push(NONE);
			        this.observables.push(observable);
			    };
			    CombineLatestSubscriber.prototype._complete = function () {
			        var observables = this.observables;
			        var len = observables.length;
			        if (len === 0) {
			            this.destination.complete();
			        }
			        else {
			            this.active = len;
			            this.toRespond = len;
			            for (var i = 0; i < len; i++) {
			                var observable = observables[i];
			                this.add(subscribeToResult_1$6.subscribeToResult(this, observable, undefined, i));
			            }
			        }
			    };
			    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
			        if ((this.active -= 1) === 0) {
			            this.destination.complete();
			        }
			    };
			    CombineLatestSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
			        var values = this.values;
			        var oldVal = values[outerIndex];
			        var toRespond = !this.toRespond
			            ? 0
			            : oldVal === NONE ? --this.toRespond : this.toRespond;
			        values[outerIndex] = innerValue;
			        if (toRespond === 0) {
			            if (this.resultSelector) {
			                this._tryResultSelector(values);
			            }
			            else {
			                this.destination.next(values.slice());
			            }
			        }
			    };
			    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
			        var result;
			        try {
			            result = this.resultSelector.apply(this, values);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.next(result);
			    };
			    return CombineLatestSubscriber;
			}(OuterSubscriber_1$6.OuterSubscriber));
			combineLatest$3.CombineLatestSubscriber = CombineLatestSubscriber;

			var concat$3 = {};

			var concatAll$1 = {};

			var mergeAll$1 = {};

			var mergeMap$1 = {};

			var from$1 = {};

			var scheduled$1 = {};

			var scheduleObservable$1 = {};

			Object.defineProperty(scheduleObservable$1, "__esModule", { value: true });
			var Observable_1$k = Observable$1;
			var Subscription_1$8 = Subscription$1;
			var observable_1$2 = observable;
			function scheduleObservable(input, scheduler) {
			    return new Observable_1$k.Observable(function (subscriber) {
			        var sub = new Subscription_1$8.Subscription();
			        sub.add(scheduler.schedule(function () {
			            var observable = input[observable_1$2.observable]();
			            sub.add(observable.subscribe({
			                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
			                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
			                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
			            }));
			        }));
			        return sub;
			    });
			}
			scheduleObservable$1.scheduleObservable = scheduleObservable;

			var schedulePromise$1 = {};

			Object.defineProperty(schedulePromise$1, "__esModule", { value: true });
			var Observable_1$j = Observable$1;
			var Subscription_1$7 = Subscription$1;
			function schedulePromise(input, scheduler) {
			    return new Observable_1$j.Observable(function (subscriber) {
			        var sub = new Subscription_1$7.Subscription();
			        sub.add(scheduler.schedule(function () { return input.then(function (value) {
			            sub.add(scheduler.schedule(function () {
			                subscriber.next(value);
			                sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
			            }));
			        }, function (err) {
			            sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
			        }); }));
			        return sub;
			    });
			}
			schedulePromise$1.schedulePromise = schedulePromise;

			var scheduleIterable$1 = {};

			Object.defineProperty(scheduleIterable$1, "__esModule", { value: true });
			var Observable_1$i = Observable$1;
			var Subscription_1$6 = Subscription$1;
			var iterator_1$2 = iterator;
			function scheduleIterable(input, scheduler) {
			    if (!input) {
			        throw new Error('Iterable cannot be null');
			    }
			    return new Observable_1$i.Observable(function (subscriber) {
			        var sub = new Subscription_1$6.Subscription();
			        var iterator;
			        sub.add(function () {
			            if (iterator && typeof iterator.return === 'function') {
			                iterator.return();
			            }
			        });
			        sub.add(scheduler.schedule(function () {
			            iterator = input[iterator_1$2.iterator]();
			            sub.add(scheduler.schedule(function () {
			                if (subscriber.closed) {
			                    return;
			                }
			                var value;
			                var done;
			                try {
			                    var result = iterator.next();
			                    value = result.value;
			                    done = result.done;
			                }
			                catch (err) {
			                    subscriber.error(err);
			                    return;
			                }
			                if (done) {
			                    subscriber.complete();
			                }
			                else {
			                    subscriber.next(value);
			                    this.schedule();
			                }
			            }));
			        }));
			        return sub;
			    });
			}
			scheduleIterable$1.scheduleIterable = scheduleIterable;

			var isInteropObservable$1 = {};

			Object.defineProperty(isInteropObservable$1, "__esModule", { value: true });
			var observable_1$1 = observable;
			function isInteropObservable(input) {
			    return input && typeof input[observable_1$1.observable] === 'function';
			}
			isInteropObservable$1.isInteropObservable = isInteropObservable;

			var isIterable$1 = {};

			Object.defineProperty(isIterable$1, "__esModule", { value: true });
			var iterator_1$1 = iterator;
			function isIterable(input) {
			    return input && typeof input[iterator_1$1.iterator] === 'function';
			}
			isIterable$1.isIterable = isIterable;

			Object.defineProperty(scheduled$1, "__esModule", { value: true });
			var scheduleObservable_1 = scheduleObservable$1;
			var schedulePromise_1 = schedulePromise$1;
			var scheduleArray_1 = scheduleArray$1;
			var scheduleIterable_1 = scheduleIterable$1;
			var isInteropObservable_1 = isInteropObservable$1;
			var isPromise_1 = isPromise$1;
			var isArrayLike_1 = isArrayLike;
			var isIterable_1 = isIterable$1;
			function scheduled(input, scheduler) {
			    if (input != null) {
			        if (isInteropObservable_1.isInteropObservable(input)) {
			            return scheduleObservable_1.scheduleObservable(input, scheduler);
			        }
			        else if (isPromise_1.isPromise(input)) {
			            return schedulePromise_1.schedulePromise(input, scheduler);
			        }
			        else if (isArrayLike_1.isArrayLike(input)) {
			            return scheduleArray_1.scheduleArray(input, scheduler);
			        }
			        else if (isIterable_1.isIterable(input) || typeof input === 'string') {
			            return scheduleIterable_1.scheduleIterable(input, scheduler);
			        }
			    }
			    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
			}
			scheduled$1.scheduled = scheduled;

			Object.defineProperty(from$1, "__esModule", { value: true });
			var Observable_1$h = Observable$1;
			var subscribeTo_1$2 = subscribeTo;
			var scheduled_1$1 = scheduled$1;
			function from(input, scheduler) {
			    if (!scheduler) {
			        if (input instanceof Observable_1$h.Observable) {
			            return input;
			        }
			        return new Observable_1$h.Observable(subscribeTo_1$2.subscribeTo(input));
			    }
			    else {
			        return scheduled_1$1.scheduled(input, scheduler);
			    }
			}
			from$1.from = from;

			var innerSubscribe$1 = {};

			var __extends$Z = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(innerSubscribe$1, "__esModule", { value: true });
			var Subscriber_1$A = Subscriber$1;
			var Observable_1$g = Observable$1;
			var subscribeTo_1$1 = subscribeTo;
			var SimpleInnerSubscriber = (function (_super) {
			    __extends$Z(SimpleInnerSubscriber, _super);
			    function SimpleInnerSubscriber(parent) {
			        var _this = _super.call(this) || this;
			        _this.parent = parent;
			        return _this;
			    }
			    SimpleInnerSubscriber.prototype._next = function (value) {
			        this.parent.notifyNext(value);
			    };
			    SimpleInnerSubscriber.prototype._error = function (error) {
			        this.parent.notifyError(error);
			        this.unsubscribe();
			    };
			    SimpleInnerSubscriber.prototype._complete = function () {
			        this.parent.notifyComplete();
			        this.unsubscribe();
			    };
			    return SimpleInnerSubscriber;
			}(Subscriber_1$A.Subscriber));
			innerSubscribe$1.SimpleInnerSubscriber = SimpleInnerSubscriber;
			var ComplexInnerSubscriber = (function (_super) {
			    __extends$Z(ComplexInnerSubscriber, _super);
			    function ComplexInnerSubscriber(parent, outerValue, outerIndex) {
			        var _this = _super.call(this) || this;
			        _this.parent = parent;
			        _this.outerValue = outerValue;
			        _this.outerIndex = outerIndex;
			        return _this;
			    }
			    ComplexInnerSubscriber.prototype._next = function (value) {
			        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
			    };
			    ComplexInnerSubscriber.prototype._error = function (error) {
			        this.parent.notifyError(error);
			        this.unsubscribe();
			    };
			    ComplexInnerSubscriber.prototype._complete = function () {
			        this.parent.notifyComplete(this);
			        this.unsubscribe();
			    };
			    return ComplexInnerSubscriber;
			}(Subscriber_1$A.Subscriber));
			innerSubscribe$1.ComplexInnerSubscriber = ComplexInnerSubscriber;
			var SimpleOuterSubscriber = (function (_super) {
			    __extends$Z(SimpleOuterSubscriber, _super);
			    function SimpleOuterSubscriber() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
			        this.destination.next(innerValue);
			    };
			    SimpleOuterSubscriber.prototype.notifyError = function (err) {
			        this.destination.error(err);
			    };
			    SimpleOuterSubscriber.prototype.notifyComplete = function () {
			        this.destination.complete();
			    };
			    return SimpleOuterSubscriber;
			}(Subscriber_1$A.Subscriber));
			innerSubscribe$1.SimpleOuterSubscriber = SimpleOuterSubscriber;
			var ComplexOuterSubscriber = (function (_super) {
			    __extends$Z(ComplexOuterSubscriber, _super);
			    function ComplexOuterSubscriber() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    ComplexOuterSubscriber.prototype.notifyNext = function (_outerValue, innerValue, _outerIndex, _innerSub) {
			        this.destination.next(innerValue);
			    };
			    ComplexOuterSubscriber.prototype.notifyError = function (error) {
			        this.destination.error(error);
			    };
			    ComplexOuterSubscriber.prototype.notifyComplete = function (_innerSub) {
			        this.destination.complete();
			    };
			    return ComplexOuterSubscriber;
			}(Subscriber_1$A.Subscriber));
			innerSubscribe$1.ComplexOuterSubscriber = ComplexOuterSubscriber;
			function innerSubscribe(result, innerSubscriber) {
			    if (innerSubscriber.closed) {
			        return undefined;
			    }
			    if (result instanceof Observable_1$g.Observable) {
			        return result.subscribe(innerSubscriber);
			    }
			    return subscribeTo_1$1.subscribeTo(result)(innerSubscriber);
			}
			innerSubscribe$1.innerSubscribe = innerSubscribe;

			var __extends$Y = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(mergeMap$1, "__esModule", { value: true });
			var map_1$9 = map$1;
			var from_1$9 = from$1;
			var innerSubscribe_1$k = innerSubscribe$1;
			function mergeMap(project, resultSelector, concurrent) {
			    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			    if (typeof resultSelector === 'function') {
			        return function (source) { return source.pipe(mergeMap(function (a, i) { return from_1$9.from(project(a, i)).pipe(map_1$9.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
			    }
			    else if (typeof resultSelector === 'number') {
			        concurrent = resultSelector;
			    }
			    return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
			}
			mergeMap$1.mergeMap = mergeMap;
			var MergeMapOperator = (function () {
			    function MergeMapOperator(project, concurrent) {
			        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			        this.project = project;
			        this.concurrent = concurrent;
			    }
			    MergeMapOperator.prototype.call = function (observer, source) {
			        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
			    };
			    return MergeMapOperator;
			}());
			mergeMap$1.MergeMapOperator = MergeMapOperator;
			var MergeMapSubscriber = (function (_super) {
			    __extends$Y(MergeMapSubscriber, _super);
			    function MergeMapSubscriber(destination, project, concurrent) {
			        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			        var _this = _super.call(this, destination) || this;
			        _this.project = project;
			        _this.concurrent = concurrent;
			        _this.hasCompleted = false;
			        _this.buffer = [];
			        _this.active = 0;
			        _this.index = 0;
			        return _this;
			    }
			    MergeMapSubscriber.prototype._next = function (value) {
			        if (this.active < this.concurrent) {
			            this._tryNext(value);
			        }
			        else {
			            this.buffer.push(value);
			        }
			    };
			    MergeMapSubscriber.prototype._tryNext = function (value) {
			        var result;
			        var index = this.index++;
			        try {
			            result = this.project(value, index);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.active++;
			        this._innerSub(result);
			    };
			    MergeMapSubscriber.prototype._innerSub = function (ish) {
			        var innerSubscriber = new innerSubscribe_1$k.SimpleInnerSubscriber(this);
			        var destination = this.destination;
			        destination.add(innerSubscriber);
			        var innerSubscription = innerSubscribe_1$k.innerSubscribe(ish, innerSubscriber);
			        if (innerSubscription !== innerSubscriber) {
			            destination.add(innerSubscription);
			        }
			    };
			    MergeMapSubscriber.prototype._complete = function () {
			        this.hasCompleted = true;
			        if (this.active === 0 && this.buffer.length === 0) {
			            this.destination.complete();
			        }
			        this.unsubscribe();
			    };
			    MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
			        this.destination.next(innerValue);
			    };
			    MergeMapSubscriber.prototype.notifyComplete = function () {
			        var buffer = this.buffer;
			        this.active--;
			        if (buffer.length > 0) {
			            this._next(buffer.shift());
			        }
			        else if (this.active === 0 && this.hasCompleted) {
			            this.destination.complete();
			        }
			    };
			    return MergeMapSubscriber;
			}(innerSubscribe_1$k.SimpleOuterSubscriber));
			mergeMap$1.MergeMapSubscriber = MergeMapSubscriber;
			mergeMap$1.flatMap = mergeMap;

			Object.defineProperty(mergeAll$1, "__esModule", { value: true });
			var mergeMap_1$3 = mergeMap$1;
			var identity_1$5 = identity$1;
			function mergeAll(concurrent) {
			    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			    return mergeMap_1$3.mergeMap(identity_1$5.identity, concurrent);
			}
			mergeAll$1.mergeAll = mergeAll;

			Object.defineProperty(concatAll$1, "__esModule", { value: true });
			var mergeAll_1$2 = mergeAll$1;
			function concatAll() {
			    return mergeAll_1$2.mergeAll(1);
			}
			concatAll$1.concatAll = concatAll;

			Object.defineProperty(concat$3, "__esModule", { value: true });
			var of_1$2 = of$1;
			var concatAll_1$1 = concatAll$1;
			function concat$2() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    return concatAll_1$1.concatAll()(of_1$2.of.apply(void 0, observables));
			}
			concat$3.concat = concat$2;

			var defer$1 = {};

			Object.defineProperty(defer$1, "__esModule", { value: true });
			var Observable_1$f = Observable$1;
			var from_1$8 = from$1;
			var empty_1$7 = empty;
			function defer(observableFactory) {
			    return new Observable_1$f.Observable(function (subscriber) {
			        var input;
			        try {
			            input = observableFactory();
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			        var source = input ? from_1$8.from(input) : empty_1$7.empty();
			        return source.subscribe(subscriber);
			    });
			}
			defer$1.defer = defer;

			var forkJoin$1 = {};

			Object.defineProperty(forkJoin$1, "__esModule", { value: true });
			var Observable_1$e = Observable$1;
			var isArray_1$9 = isArray;
			var map_1$8 = map$1;
			var isObject_1 = isObject$1;
			var from_1$7 = from$1;
			function forkJoin() {
			    var sources = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        sources[_i] = arguments[_i];
			    }
			    if (sources.length === 1) {
			        var first_1 = sources[0];
			        if (isArray_1$9.isArray(first_1)) {
			            return forkJoinInternal(first_1, null);
			        }
			        if (isObject_1.isObject(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
			            var keys = Object.keys(first_1);
			            return forkJoinInternal(keys.map(function (key) { return first_1[key]; }), keys);
			        }
			    }
			    if (typeof sources[sources.length - 1] === 'function') {
			        var resultSelector_1 = sources.pop();
			        sources = (sources.length === 1 && isArray_1$9.isArray(sources[0])) ? sources[0] : sources;
			        return forkJoinInternal(sources, null).pipe(map_1$8.map(function (args) { return resultSelector_1.apply(void 0, args); }));
			    }
			    return forkJoinInternal(sources, null);
			}
			forkJoin$1.forkJoin = forkJoin;
			function forkJoinInternal(sources, keys) {
			    return new Observable_1$e.Observable(function (subscriber) {
			        var len = sources.length;
			        if (len === 0) {
			            subscriber.complete();
			            return;
			        }
			        var values = new Array(len);
			        var completed = 0;
			        var emitted = 0;
			        var _loop_1 = function (i) {
			            var source = from_1$7.from(sources[i]);
			            var hasValue = false;
			            subscriber.add(source.subscribe({
			                next: function (value) {
			                    if (!hasValue) {
			                        hasValue = true;
			                        emitted++;
			                    }
			                    values[i] = value;
			                },
			                error: function (err) { return subscriber.error(err); },
			                complete: function () {
			                    completed++;
			                    if (completed === len || !hasValue) {
			                        if (emitted === len) {
			                            subscriber.next(keys ?
			                                keys.reduce(function (result, key, i) { return (result[key] = values[i], result); }, {}) :
			                                values);
			                        }
			                        subscriber.complete();
			                    }
			                }
			            }));
			        };
			        for (var i = 0; i < len; i++) {
			            _loop_1(i);
			        }
			    });
			}

			var fromEvent$1 = {};

			Object.defineProperty(fromEvent$1, "__esModule", { value: true });
			var Observable_1$d = Observable$1;
			var isArray_1$8 = isArray;
			var isFunction_1$2 = isFunction$1;
			var map_1$7 = map$1;
			function fromEvent(target, eventName, options, resultSelector) {
			    if (isFunction_1$2.isFunction(options)) {
			        resultSelector = options;
			        options = undefined;
			    }
			    if (resultSelector) {
			        return fromEvent(target, eventName, options).pipe(map_1$7.map(function (args) { return isArray_1$8.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
			    }
			    return new Observable_1$d.Observable(function (subscriber) {
			        function handler(e) {
			            if (arguments.length > 1) {
			                subscriber.next(Array.prototype.slice.call(arguments));
			            }
			            else {
			                subscriber.next(e);
			            }
			        }
			        setupSubscription(target, eventName, handler, subscriber, options);
			    });
			}
			fromEvent$1.fromEvent = fromEvent;
			function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
			    var unsubscribe;
			    if (isEventTarget(sourceObj)) {
			        var source_1 = sourceObj;
			        sourceObj.addEventListener(eventName, handler, options);
			        unsubscribe = function () { return source_1.removeEventListener(eventName, handler, options); };
			    }
			    else if (isJQueryStyleEventEmitter(sourceObj)) {
			        var source_2 = sourceObj;
			        sourceObj.on(eventName, handler);
			        unsubscribe = function () { return source_2.off(eventName, handler); };
			    }
			    else if (isNodeStyleEventEmitter(sourceObj)) {
			        var source_3 = sourceObj;
			        sourceObj.addListener(eventName, handler);
			        unsubscribe = function () { return source_3.removeListener(eventName, handler); };
			    }
			    else if (sourceObj && sourceObj.length) {
			        for (var i = 0, len = sourceObj.length; i < len; i++) {
			            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
			        }
			    }
			    else {
			        throw new TypeError('Invalid event target');
			    }
			    subscriber.add(unsubscribe);
			}
			function isNodeStyleEventEmitter(sourceObj) {
			    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
			}
			function isJQueryStyleEventEmitter(sourceObj) {
			    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
			}
			function isEventTarget(sourceObj) {
			    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
			}

			var fromEventPattern$1 = {};

			Object.defineProperty(fromEventPattern$1, "__esModule", { value: true });
			var Observable_1$c = Observable$1;
			var isArray_1$7 = isArray;
			var isFunction_1$1 = isFunction$1;
			var map_1$6 = map$1;
			function fromEventPattern(addHandler, removeHandler, resultSelector) {
			    if (resultSelector) {
			        return fromEventPattern(addHandler, removeHandler).pipe(map_1$6.map(function (args) { return isArray_1$7.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
			    }
			    return new Observable_1$c.Observable(function (subscriber) {
			        var handler = function () {
			            var e = [];
			            for (var _i = 0; _i < arguments.length; _i++) {
			                e[_i] = arguments[_i];
			            }
			            return subscriber.next(e.length === 1 ? e[0] : e);
			        };
			        var retValue;
			        try {
			            retValue = addHandler(handler);
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			        if (!isFunction_1$1.isFunction(removeHandler)) {
			            return undefined;
			        }
			        return function () { return removeHandler(handler, retValue); };
			    });
			}
			fromEventPattern$1.fromEventPattern = fromEventPattern;

			var generate$1 = {};

			Object.defineProperty(generate$1, "__esModule", { value: true });
			var Observable_1$b = Observable$1;
			var identity_1$4 = identity$1;
			var isScheduler_1$5 = isScheduler$1;
			function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
			    var resultSelector;
			    var initialState;
			    if (arguments.length == 1) {
			        var options = initialStateOrOptions;
			        initialState = options.initialState;
			        condition = options.condition;
			        iterate = options.iterate;
			        resultSelector = options.resultSelector || identity_1$4.identity;
			        scheduler = options.scheduler;
			    }
			    else if (resultSelectorOrObservable === undefined || isScheduler_1$5.isScheduler(resultSelectorOrObservable)) {
			        initialState = initialStateOrOptions;
			        resultSelector = identity_1$4.identity;
			        scheduler = resultSelectorOrObservable;
			    }
			    else {
			        initialState = initialStateOrOptions;
			        resultSelector = resultSelectorOrObservable;
			    }
			    return new Observable_1$b.Observable(function (subscriber) {
			        var state = initialState;
			        if (scheduler) {
			            return scheduler.schedule(dispatch$4, 0, {
			                subscriber: subscriber,
			                iterate: iterate,
			                condition: condition,
			                resultSelector: resultSelector,
			                state: state
			            });
			        }
			        do {
			            if (condition) {
			                var conditionResult = void 0;
			                try {
			                    conditionResult = condition(state);
			                }
			                catch (err) {
			                    subscriber.error(err);
			                    return undefined;
			                }
			                if (!conditionResult) {
			                    subscriber.complete();
			                    break;
			                }
			            }
			            var value = void 0;
			            try {
			                value = resultSelector(state);
			            }
			            catch (err) {
			                subscriber.error(err);
			                return undefined;
			            }
			            subscriber.next(value);
			            if (subscriber.closed) {
			                break;
			            }
			            try {
			                state = iterate(state);
			            }
			            catch (err) {
			                subscriber.error(err);
			                return undefined;
			            }
			        } while (true);
			        return undefined;
			    });
			}
			generate$1.generate = generate;
			function dispatch$4(state) {
			    var subscriber = state.subscriber, condition = state.condition;
			    if (subscriber.closed) {
			        return undefined;
			    }
			    if (state.needIterate) {
			        try {
			            state.state = state.iterate(state.state);
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			    }
			    else {
			        state.needIterate = true;
			    }
			    if (condition) {
			        var conditionResult = void 0;
			        try {
			            conditionResult = condition(state.state);
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			        if (!conditionResult) {
			            subscriber.complete();
			            return undefined;
			        }
			        if (subscriber.closed) {
			            return undefined;
			        }
			    }
			    var value;
			    try {
			        value = state.resultSelector(state.state);
			    }
			    catch (err) {
			        subscriber.error(err);
			        return undefined;
			    }
			    if (subscriber.closed) {
			        return undefined;
			    }
			    subscriber.next(value);
			    if (subscriber.closed) {
			        return undefined;
			    }
			    return this.schedule(state);
			}

			var iif$1 = {};

			Object.defineProperty(iif$1, "__esModule", { value: true });
			var defer_1$2 = defer$1;
			var empty_1$6 = empty;
			function iif(condition, trueResult, falseResult) {
			    if (trueResult === void 0) { trueResult = empty_1$6.EMPTY; }
			    if (falseResult === void 0) { falseResult = empty_1$6.EMPTY; }
			    return defer_1$2.defer(function () { return condition() ? trueResult : falseResult; });
			}
			iif$1.iif = iif;

			var interval$1 = {};

			var isNumeric$1 = {};

			Object.defineProperty(isNumeric$1, "__esModule", { value: true });
			var isArray_1$6 = isArray;
			function isNumeric(val) {
			    return !isArray_1$6.isArray(val) && (val - parseFloat(val) + 1) >= 0;
			}
			isNumeric$1.isNumeric = isNumeric;

			Object.defineProperty(interval$1, "__esModule", { value: true });
			var Observable_1$a = Observable$1;
			var async_1$d = async;
			var isNumeric_1$3 = isNumeric$1;
			function interval(period, scheduler) {
			    if (period === void 0) { period = 0; }
			    if (scheduler === void 0) { scheduler = async_1$d.async; }
			    if (!isNumeric_1$3.isNumeric(period) || period < 0) {
			        period = 0;
			    }
			    if (!scheduler || typeof scheduler.schedule !== 'function') {
			        scheduler = async_1$d.async;
			    }
			    return new Observable_1$a.Observable(function (subscriber) {
			        subscriber.add(scheduler.schedule(dispatch$3, period, { subscriber: subscriber, counter: 0, period: period }));
			        return subscriber;
			    });
			}
			interval$1.interval = interval;
			function dispatch$3(state) {
			    var subscriber = state.subscriber, counter = state.counter, period = state.period;
			    subscriber.next(counter);
			    this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
			}

			var merge$3 = {};

			Object.defineProperty(merge$3, "__esModule", { value: true });
			var Observable_1$9 = Observable$1;
			var isScheduler_1$4 = isScheduler$1;
			var mergeAll_1$1 = mergeAll$1;
			var fromArray_1$2 = fromArray$1;
			function merge$2() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    var concurrent = Number.POSITIVE_INFINITY;
			    var scheduler = null;
			    var last = observables[observables.length - 1];
			    if (isScheduler_1$4.isScheduler(last)) {
			        scheduler = observables.pop();
			        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
			            concurrent = observables.pop();
			        }
			    }
			    else if (typeof last === 'number') {
			        concurrent = observables.pop();
			    }
			    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1$9.Observable) {
			        return observables[0];
			    }
			    return mergeAll_1$1.mergeAll(concurrent)(fromArray_1$2.fromArray(observables, scheduler));
			}
			merge$3.merge = merge$2;

			var never = {};

			(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var Observable_1 = Observable$1;
			var noop_1 = noop$1;
			exports.NEVER = new Observable_1.Observable(noop_1.noop);
			function never() {
			    return exports.NEVER;
			}
			exports.never = never;

			}(never));

			var onErrorResumeNext$3 = {};

			Object.defineProperty(onErrorResumeNext$3, "__esModule", { value: true });
			var Observable_1$8 = Observable$1;
			var from_1$6 = from$1;
			var isArray_1$5 = isArray;
			var empty_1$5 = empty;
			function onErrorResumeNext$2() {
			    var sources = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        sources[_i] = arguments[_i];
			    }
			    if (sources.length === 0) {
			        return empty_1$5.EMPTY;
			    }
			    var first = sources[0], remainder = sources.slice(1);
			    if (sources.length === 1 && isArray_1$5.isArray(first)) {
			        return onErrorResumeNext$2.apply(void 0, first);
			    }
			    return new Observable_1$8.Observable(function (subscriber) {
			        var subNext = function () { return subscriber.add(onErrorResumeNext$2.apply(void 0, remainder).subscribe(subscriber)); };
			        return from_1$6.from(first).subscribe({
			            next: function (value) { subscriber.next(value); },
			            error: subNext,
			            complete: subNext,
			        });
			    });
			}
			onErrorResumeNext$3.onErrorResumeNext = onErrorResumeNext$2;

			var pairs$1 = {};

			Object.defineProperty(pairs$1, "__esModule", { value: true });
			var Observable_1$7 = Observable$1;
			var Subscription_1$5 = Subscription$1;
			function pairs(obj, scheduler) {
			    if (!scheduler) {
			        return new Observable_1$7.Observable(function (subscriber) {
			            var keys = Object.keys(obj);
			            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
			                var key = keys[i];
			                if (obj.hasOwnProperty(key)) {
			                    subscriber.next([key, obj[key]]);
			                }
			            }
			            subscriber.complete();
			        });
			    }
			    else {
			        return new Observable_1$7.Observable(function (subscriber) {
			            var keys = Object.keys(obj);
			            var subscription = new Subscription_1$5.Subscription();
			            subscription.add(scheduler.schedule(dispatch$2, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
			            return subscription;
			        });
			    }
			}
			pairs$1.pairs = pairs;
			function dispatch$2(state) {
			    var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
			    if (!subscriber.closed) {
			        if (index < keys.length) {
			            var key = keys[index];
			            subscriber.next([key, obj[key]]);
			            subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
			        }
			        else {
			            subscriber.complete();
			        }
			    }
			}
			pairs$1.dispatch = dispatch$2;

			var partition$3 = {};

			var not$1 = {};

			Object.defineProperty(not$1, "__esModule", { value: true });
			function not(pred, thisArg) {
			    function notPred() {
			        return !(notPred.pred.apply(notPred.thisArg, arguments));
			    }
			    notPred.pred = pred;
			    notPred.thisArg = thisArg;
			    return notPred;
			}
			not$1.not = not;

			Object.defineProperty(partition$3, "__esModule", { value: true });
			var not_1$1 = not$1;
			var subscribeTo_1 = subscribeTo;
			var filter_1$5 = filter$3;
			var Observable_1$6 = Observable$1;
			function partition$2(source, predicate, thisArg) {
			    return [
			        filter_1$5.filter(predicate, thisArg)(new Observable_1$6.Observable(subscribeTo_1.subscribeTo(source))),
			        filter_1$5.filter(not_1$1.not(predicate, thisArg))(new Observable_1$6.Observable(subscribeTo_1.subscribeTo(source)))
			    ];
			}
			partition$3.partition = partition$2;

			var race$3 = {};

			var __extends$X = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(race$3, "__esModule", { value: true });
			var isArray_1$4 = isArray;
			var fromArray_1$1 = fromArray$1;
			var OuterSubscriber_1$5 = OuterSubscriber$1;
			var subscribeToResult_1$5 = subscribeToResult$1;
			function race$2() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    if (observables.length === 1) {
			        if (isArray_1$4.isArray(observables[0])) {
			            observables = observables[0];
			        }
			        else {
			            return observables[0];
			        }
			    }
			    return fromArray_1$1.fromArray(observables, undefined).lift(new RaceOperator());
			}
			race$3.race = race$2;
			var RaceOperator = (function () {
			    function RaceOperator() {
			    }
			    RaceOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new RaceSubscriber(subscriber));
			    };
			    return RaceOperator;
			}());
			race$3.RaceOperator = RaceOperator;
			var RaceSubscriber = (function (_super) {
			    __extends$X(RaceSubscriber, _super);
			    function RaceSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.hasFirst = false;
			        _this.observables = [];
			        _this.subscriptions = [];
			        return _this;
			    }
			    RaceSubscriber.prototype._next = function (observable) {
			        this.observables.push(observable);
			    };
			    RaceSubscriber.prototype._complete = function () {
			        var observables = this.observables;
			        var len = observables.length;
			        if (len === 0) {
			            this.destination.complete();
			        }
			        else {
			            for (var i = 0; i < len && !this.hasFirst; i++) {
			                var observable = observables[i];
			                var subscription = subscribeToResult_1$5.subscribeToResult(this, observable, undefined, i);
			                if (this.subscriptions) {
			                    this.subscriptions.push(subscription);
			                }
			                this.add(subscription);
			            }
			            this.observables = null;
			        }
			    };
			    RaceSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
			        if (!this.hasFirst) {
			            this.hasFirst = true;
			            for (var i = 0; i < this.subscriptions.length; i++) {
			                if (i !== outerIndex) {
			                    var subscription = this.subscriptions[i];
			                    subscription.unsubscribe();
			                    this.remove(subscription);
			                }
			            }
			            this.subscriptions = null;
			        }
			        this.destination.next(innerValue);
			    };
			    return RaceSubscriber;
			}(OuterSubscriber_1$5.OuterSubscriber));
			race$3.RaceSubscriber = RaceSubscriber;

			var range$1 = {};

			Object.defineProperty(range$1, "__esModule", { value: true });
			var Observable_1$5 = Observable$1;
			function range(start, count, scheduler) {
			    if (start === void 0) { start = 0; }
			    return new Observable_1$5.Observable(function (subscriber) {
			        if (count === undefined) {
			            count = start;
			            start = 0;
			        }
			        var index = 0;
			        var current = start;
			        if (scheduler) {
			            return scheduler.schedule(dispatch$1, 0, {
			                index: index, count: count, start: start, subscriber: subscriber
			            });
			        }
			        else {
			            do {
			                if (index++ >= count) {
			                    subscriber.complete();
			                    break;
			                }
			                subscriber.next(current++);
			                if (subscriber.closed) {
			                    break;
			                }
			            } while (true);
			        }
			        return undefined;
			    });
			}
			range$1.range = range;
			function dispatch$1(state) {
			    var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
			    if (index >= count) {
			        subscriber.complete();
			        return;
			    }
			    subscriber.next(start);
			    if (subscriber.closed) {
			        return;
			    }
			    state.index = index + 1;
			    state.start = start + 1;
			    this.schedule(state);
			}
			range$1.dispatch = dispatch$1;

			var timer$1 = {};

			Object.defineProperty(timer$1, "__esModule", { value: true });
			var Observable_1$4 = Observable$1;
			var async_1$c = async;
			var isNumeric_1$2 = isNumeric$1;
			var isScheduler_1$3 = isScheduler$1;
			function timer(dueTime, periodOrScheduler, scheduler) {
			    if (dueTime === void 0) { dueTime = 0; }
			    var period = -1;
			    if (isNumeric_1$2.isNumeric(periodOrScheduler)) {
			        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
			    }
			    else if (isScheduler_1$3.isScheduler(periodOrScheduler)) {
			        scheduler = periodOrScheduler;
			    }
			    if (!isScheduler_1$3.isScheduler(scheduler)) {
			        scheduler = async_1$c.async;
			    }
			    return new Observable_1$4.Observable(function (subscriber) {
			        var due = isNumeric_1$2.isNumeric(dueTime)
			            ? dueTime
			            : (+dueTime - scheduler.now());
			        return scheduler.schedule(dispatch, due, {
			            index: 0, period: period, subscriber: subscriber
			        });
			    });
			}
			timer$1.timer = timer;
			function dispatch(state) {
			    var index = state.index, period = state.period, subscriber = state.subscriber;
			    subscriber.next(index);
			    if (subscriber.closed) {
			        return;
			    }
			    else if (period === -1) {
			        return subscriber.complete();
			    }
			    state.index = index + 1;
			    this.schedule(state, period);
			}

			var using$1 = {};

			Object.defineProperty(using$1, "__esModule", { value: true });
			var Observable_1$3 = Observable$1;
			var from_1$5 = from$1;
			var empty_1$4 = empty;
			function using(resourceFactory, observableFactory) {
			    return new Observable_1$3.Observable(function (subscriber) {
			        var resource;
			        try {
			            resource = resourceFactory();
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			        var result;
			        try {
			            result = observableFactory(resource);
			        }
			        catch (err) {
			            subscriber.error(err);
			            return undefined;
			        }
			        var source = result ? from_1$5.from(result) : empty_1$4.EMPTY;
			        var subscription = source.subscribe(subscriber);
			        return function () {
			            subscription.unsubscribe();
			            if (resource) {
			                resource.unsubscribe();
			            }
			        };
			    });
			}
			using$1.using = using;

			var zip$3 = {};

			var __extends$W = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(zip$3, "__esModule", { value: true });
			var fromArray_1 = fromArray$1;
			var isArray_1$3 = isArray;
			var Subscriber_1$z = Subscriber$1;
			var iterator_1 = iterator;
			var innerSubscribe_1$j = innerSubscribe$1;
			function zip$2() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    var resultSelector = observables[observables.length - 1];
			    if (typeof resultSelector === 'function') {
			        observables.pop();
			    }
			    return fromArray_1.fromArray(observables, undefined).lift(new ZipOperator(resultSelector));
			}
			zip$3.zip = zip$2;
			var ZipOperator = (function () {
			    function ZipOperator(resultSelector) {
			        this.resultSelector = resultSelector;
			    }
			    ZipOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
			    };
			    return ZipOperator;
			}());
			zip$3.ZipOperator = ZipOperator;
			var ZipSubscriber = (function (_super) {
			    __extends$W(ZipSubscriber, _super);
			    function ZipSubscriber(destination, resultSelector, values) {
			        var _this = _super.call(this, destination) || this;
			        _this.resultSelector = resultSelector;
			        _this.iterators = [];
			        _this.active = 0;
			        _this.resultSelector = (typeof resultSelector === 'function') ? resultSelector : undefined;
			        return _this;
			    }
			    ZipSubscriber.prototype._next = function (value) {
			        var iterators = this.iterators;
			        if (isArray_1$3.isArray(value)) {
			            iterators.push(new StaticArrayIterator(value));
			        }
			        else if (typeof value[iterator_1.iterator] === 'function') {
			            iterators.push(new StaticIterator(value[iterator_1.iterator]()));
			        }
			        else {
			            iterators.push(new ZipBufferIterator(this.destination, this, value));
			        }
			    };
			    ZipSubscriber.prototype._complete = function () {
			        var iterators = this.iterators;
			        var len = iterators.length;
			        this.unsubscribe();
			        if (len === 0) {
			            this.destination.complete();
			            return;
			        }
			        this.active = len;
			        for (var i = 0; i < len; i++) {
			            var iterator = iterators[i];
			            if (iterator.stillUnsubscribed) {
			                var destination = this.destination;
			                destination.add(iterator.subscribe());
			            }
			            else {
			                this.active--;
			            }
			        }
			    };
			    ZipSubscriber.prototype.notifyInactive = function () {
			        this.active--;
			        if (this.active === 0) {
			            this.destination.complete();
			        }
			    };
			    ZipSubscriber.prototype.checkIterators = function () {
			        var iterators = this.iterators;
			        var len = iterators.length;
			        var destination = this.destination;
			        for (var i = 0; i < len; i++) {
			            var iterator = iterators[i];
			            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
			                return;
			            }
			        }
			        var shouldComplete = false;
			        var args = [];
			        for (var i = 0; i < len; i++) {
			            var iterator = iterators[i];
			            var result = iterator.next();
			            if (iterator.hasCompleted()) {
			                shouldComplete = true;
			            }
			            if (result.done) {
			                destination.complete();
			                return;
			            }
			            args.push(result.value);
			        }
			        if (this.resultSelector) {
			            this._tryresultSelector(args);
			        }
			        else {
			            destination.next(args);
			        }
			        if (shouldComplete) {
			            destination.complete();
			        }
			    };
			    ZipSubscriber.prototype._tryresultSelector = function (args) {
			        var result;
			        try {
			            result = this.resultSelector.apply(this, args);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.next(result);
			    };
			    return ZipSubscriber;
			}(Subscriber_1$z.Subscriber));
			zip$3.ZipSubscriber = ZipSubscriber;
			var StaticIterator = (function () {
			    function StaticIterator(iterator) {
			        this.iterator = iterator;
			        this.nextResult = iterator.next();
			    }
			    StaticIterator.prototype.hasValue = function () {
			        return true;
			    };
			    StaticIterator.prototype.next = function () {
			        var result = this.nextResult;
			        this.nextResult = this.iterator.next();
			        return result;
			    };
			    StaticIterator.prototype.hasCompleted = function () {
			        var nextResult = this.nextResult;
			        return Boolean(nextResult && nextResult.done);
			    };
			    return StaticIterator;
			}());
			var StaticArrayIterator = (function () {
			    function StaticArrayIterator(array) {
			        this.array = array;
			        this.index = 0;
			        this.length = 0;
			        this.length = array.length;
			    }
			    StaticArrayIterator.prototype[iterator_1.iterator] = function () {
			        return this;
			    };
			    StaticArrayIterator.prototype.next = function (value) {
			        var i = this.index++;
			        var array = this.array;
			        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
			    };
			    StaticArrayIterator.prototype.hasValue = function () {
			        return this.array.length > this.index;
			    };
			    StaticArrayIterator.prototype.hasCompleted = function () {
			        return this.array.length === this.index;
			    };
			    return StaticArrayIterator;
			}());
			var ZipBufferIterator = (function (_super) {
			    __extends$W(ZipBufferIterator, _super);
			    function ZipBufferIterator(destination, parent, observable) {
			        var _this = _super.call(this, destination) || this;
			        _this.parent = parent;
			        _this.observable = observable;
			        _this.stillUnsubscribed = true;
			        _this.buffer = [];
			        _this.isComplete = false;
			        return _this;
			    }
			    ZipBufferIterator.prototype[iterator_1.iterator] = function () {
			        return this;
			    };
			    ZipBufferIterator.prototype.next = function () {
			        var buffer = this.buffer;
			        if (buffer.length === 0 && this.isComplete) {
			            return { value: null, done: true };
			        }
			        else {
			            return { value: buffer.shift(), done: false };
			        }
			    };
			    ZipBufferIterator.prototype.hasValue = function () {
			        return this.buffer.length > 0;
			    };
			    ZipBufferIterator.prototype.hasCompleted = function () {
			        return this.buffer.length === 0 && this.isComplete;
			    };
			    ZipBufferIterator.prototype.notifyComplete = function () {
			        if (this.buffer.length > 0) {
			            this.isComplete = true;
			            this.parent.notifyInactive();
			        }
			        else {
			            this.destination.complete();
			        }
			    };
			    ZipBufferIterator.prototype.notifyNext = function (innerValue) {
			        this.buffer.push(innerValue);
			        this.parent.checkIterators();
			    };
			    ZipBufferIterator.prototype.subscribe = function () {
			        return innerSubscribe_1$j.innerSubscribe(this.observable, new innerSubscribe_1$j.SimpleInnerSubscriber(this));
			    };
			    return ZipBufferIterator;
			}(innerSubscribe_1$j.SimpleOuterSubscriber));

			Object.defineProperty(rxjs, "__esModule", { value: true });
			var Observable_1$2 = Observable$1;
			rxjs.Observable = Observable_1$2.Observable;
			var ConnectableObservable_1$1 = ConnectableObservable$1;
			rxjs.ConnectableObservable = ConnectableObservable_1$1.ConnectableObservable;
			var groupBy_1$1 = groupBy$1;
			rxjs.GroupedObservable = groupBy_1$1.GroupedObservable;
			var observable_1 = observable;
			rxjs.observable = observable_1.observable;
			var Subject_1$9 = Subject$1;
			rxjs.Subject = Subject_1$9.Subject;
			var BehaviorSubject_1$1 = BehaviorSubject$1;
			rxjs.BehaviorSubject = BehaviorSubject_1$1.BehaviorSubject;
			var ReplaySubject_1$2 = ReplaySubject$1;
			rxjs.ReplaySubject = ReplaySubject_1$2.ReplaySubject;
			var AsyncSubject_1$1 = AsyncSubject$1;
			rxjs.AsyncSubject = AsyncSubject_1$1.AsyncSubject;
			var asap_1$1 = asap;
			rxjs.asap = asap_1$1.asap;
			rxjs.asapScheduler = asap_1$1.asapScheduler;
			var async_1$b = async;
			rxjs.async = async_1$b.async;
			rxjs.asyncScheduler = async_1$b.asyncScheduler;
			var queue_1 = queue;
			rxjs.queue = queue_1.queue;
			rxjs.queueScheduler = queue_1.queueScheduler;
			var animationFrame_1 = animationFrame;
			rxjs.animationFrame = animationFrame_1.animationFrame;
			rxjs.animationFrameScheduler = animationFrame_1.animationFrameScheduler;
			var VirtualTimeScheduler_1 = VirtualTimeScheduler$1;
			rxjs.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
			rxjs.VirtualAction = VirtualTimeScheduler_1.VirtualAction;
			var Scheduler_1 = Scheduler$1;
			rxjs.Scheduler = Scheduler_1.Scheduler;
			var Subscription_1$4 = Subscription$1;
			rxjs.Subscription = Subscription_1$4.Subscription;
			var Subscriber_1$y = Subscriber$1;
			rxjs.Subscriber = Subscriber_1$y.Subscriber;
			var Notification_1$2 = Notification;
			rxjs.Notification = Notification_1$2.Notification;
			rxjs.NotificationKind = Notification_1$2.NotificationKind;
			var pipe_1$1 = pipe$1;
			rxjs.pipe = pipe_1$1.pipe;
			var noop_1$1 = noop$1;
			rxjs.noop = noop_1$1.noop;
			var identity_1$3 = identity$1;
			rxjs.identity = identity_1$3.identity;
			var isObservable_1 = isObservable$1;
			rxjs.isObservable = isObservable_1.isObservable;
			var ArgumentOutOfRangeError_1$4 = ArgumentOutOfRangeError;
			rxjs.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1$4.ArgumentOutOfRangeError;
			var EmptyError_1$4 = EmptyError;
			rxjs.EmptyError = EmptyError_1$4.EmptyError;
			var ObjectUnsubscribedError_1 = ObjectUnsubscribedError;
			rxjs.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
			var UnsubscriptionError_1 = UnsubscriptionError;
			rxjs.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
			var TimeoutError_1$1 = TimeoutError;
			rxjs.TimeoutError = TimeoutError_1$1.TimeoutError;
			var bindCallback_1 = bindCallback$1;
			rxjs.bindCallback = bindCallback_1.bindCallback;
			var bindNodeCallback_1 = bindNodeCallback$1;
			rxjs.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
			var combineLatest_1$3 = combineLatest$3;
			rxjs.combineLatest = combineLatest_1$3.combineLatest;
			var concat_1$4 = concat$3;
			rxjs.concat = concat_1$4.concat;
			var defer_1$1 = defer$1;
			rxjs.defer = defer_1$1.defer;
			var empty_1$3 = empty;
			rxjs.empty = empty_1$3.empty;
			var forkJoin_1 = forkJoin$1;
			rxjs.forkJoin = forkJoin_1.forkJoin;
			var from_1$4 = from$1;
			rxjs.from = from_1$4.from;
			var fromEvent_1 = fromEvent$1;
			rxjs.fromEvent = fromEvent_1.fromEvent;
			var fromEventPattern_1 = fromEventPattern$1;
			rxjs.fromEventPattern = fromEventPattern_1.fromEventPattern;
			var generate_1 = generate$1;
			rxjs.generate = generate_1.generate;
			var iif_1 = iif$1;
			rxjs.iif = iif_1.iif;
			var interval_1 = interval$1;
			rxjs.interval = interval_1.interval;
			var merge_1$2 = merge$3;
			rxjs.merge = merge_1$2.merge;
			var never_1 = never;
			rxjs.never = never_1.never;
			var of_1$1 = of$1;
			rxjs.of = of_1$1.of;
			var onErrorResumeNext_1$1 = onErrorResumeNext$3;
			rxjs.onErrorResumeNext = onErrorResumeNext_1$1.onErrorResumeNext;
			var pairs_1 = pairs$1;
			rxjs.pairs = pairs_1.pairs;
			var partition_1$1 = partition$3;
			rxjs.partition = partition_1$1.partition;
			var race_1$2 = race$3;
			rxjs.race = race_1$2.race;
			var range_1 = range$1;
			rxjs.range = range_1.range;
			var throwError_1$1 = throwError$1;
			rxjs.throwError = throwError_1$1.throwError;
			var timer_1$1 = timer$1;
			rxjs.timer = timer_1$1.timer;
			var using_1 = using$1;
			rxjs.using = using_1.using;
			var zip_1$3 = zip$3;
			rxjs.zip = zip_1$3.zip;
			var scheduled_1 = scheduled$1;
			rxjs.scheduled = scheduled_1.scheduled;
			var empty_2 = empty;
			rxjs.EMPTY = empty_2.EMPTY;
			var never_2 = never;
			rxjs.NEVER = never_2.NEVER;
			var config_1 = config;
			rxjs.config = config_1.config;

			Object.defineProperty(Subject$2, "__esModule", { value: true });
			var rxjs_1 = rxjs;
			Subject$2.Subject = rxjs_1.Subject;

			(function (exports) {
			function __export(m) {
			    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
			}
			Object.defineProperty(exports, "__esModule", { value: true });
			__export(Subject$2);

			}(Subject$3));

			var filter$1 = {};

			var filter = {};

			var operators = {};

			var audit$1 = {};

			var __extends$V = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(audit$1, "__esModule", { value: true });
			var innerSubscribe_1$i = innerSubscribe$1;
			function audit(durationSelector) {
			    return function auditOperatorFunction(source) {
			        return source.lift(new AuditOperator(durationSelector));
			    };
			}
			audit$1.audit = audit;
			var AuditOperator = (function () {
			    function AuditOperator(durationSelector) {
			        this.durationSelector = durationSelector;
			    }
			    AuditOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
			    };
			    return AuditOperator;
			}());
			var AuditSubscriber = (function (_super) {
			    __extends$V(AuditSubscriber, _super);
			    function AuditSubscriber(destination, durationSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.durationSelector = durationSelector;
			        _this.hasValue = false;
			        return _this;
			    }
			    AuditSubscriber.prototype._next = function (value) {
			        this.value = value;
			        this.hasValue = true;
			        if (!this.throttled) {
			            var duration = void 0;
			            try {
			                var durationSelector = this.durationSelector;
			                duration = durationSelector(value);
			            }
			            catch (err) {
			                return this.destination.error(err);
			            }
			            var innerSubscription = innerSubscribe_1$i.innerSubscribe(duration, new innerSubscribe_1$i.SimpleInnerSubscriber(this));
			            if (!innerSubscription || innerSubscription.closed) {
			                this.clearThrottle();
			            }
			            else {
			                this.add(this.throttled = innerSubscription);
			            }
			        }
			    };
			    AuditSubscriber.prototype.clearThrottle = function () {
			        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
			        if (throttled) {
			            this.remove(throttled);
			            this.throttled = undefined;
			            throttled.unsubscribe();
			        }
			        if (hasValue) {
			            this.value = undefined;
			            this.hasValue = false;
			            this.destination.next(value);
			        }
			    };
			    AuditSubscriber.prototype.notifyNext = function () {
			        this.clearThrottle();
			    };
			    AuditSubscriber.prototype.notifyComplete = function () {
			        this.clearThrottle();
			    };
			    return AuditSubscriber;
			}(innerSubscribe_1$i.SimpleOuterSubscriber));

			var auditTime$1 = {};

			Object.defineProperty(auditTime$1, "__esModule", { value: true });
			var async_1$a = async;
			var audit_1$1 = audit$1;
			var timer_1 = timer$1;
			function auditTime(duration, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$a.async; }
			    return audit_1$1.audit(function () { return timer_1.timer(duration, scheduler); });
			}
			auditTime$1.auditTime = auditTime;

			var buffer$1 = {};

			var __extends$U = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(buffer$1, "__esModule", { value: true });
			var innerSubscribe_1$h = innerSubscribe$1;
			function buffer(closingNotifier) {
			    return function bufferOperatorFunction(source) {
			        return source.lift(new BufferOperator(closingNotifier));
			    };
			}
			buffer$1.buffer = buffer;
			var BufferOperator = (function () {
			    function BufferOperator(closingNotifier) {
			        this.closingNotifier = closingNotifier;
			    }
			    BufferOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
			    };
			    return BufferOperator;
			}());
			var BufferSubscriber = (function (_super) {
			    __extends$U(BufferSubscriber, _super);
			    function BufferSubscriber(destination, closingNotifier) {
			        var _this = _super.call(this, destination) || this;
			        _this.buffer = [];
			        _this.add(innerSubscribe_1$h.innerSubscribe(closingNotifier, new innerSubscribe_1$h.SimpleInnerSubscriber(_this)));
			        return _this;
			    }
			    BufferSubscriber.prototype._next = function (value) {
			        this.buffer.push(value);
			    };
			    BufferSubscriber.prototype.notifyNext = function () {
			        var buffer = this.buffer;
			        this.buffer = [];
			        this.destination.next(buffer);
			    };
			    return BufferSubscriber;
			}(innerSubscribe_1$h.SimpleOuterSubscriber));

			var bufferCount$1 = {};

			var __extends$T = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(bufferCount$1, "__esModule", { value: true });
			var Subscriber_1$x = Subscriber$1;
			function bufferCount(bufferSize, startBufferEvery) {
			    if (startBufferEvery === void 0) { startBufferEvery = null; }
			    return function bufferCountOperatorFunction(source) {
			        return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
			    };
			}
			bufferCount$1.bufferCount = bufferCount;
			var BufferCountOperator = (function () {
			    function BufferCountOperator(bufferSize, startBufferEvery) {
			        this.bufferSize = bufferSize;
			        this.startBufferEvery = startBufferEvery;
			        if (!startBufferEvery || bufferSize === startBufferEvery) {
			            this.subscriberClass = BufferCountSubscriber;
			        }
			        else {
			            this.subscriberClass = BufferSkipCountSubscriber;
			        }
			    }
			    BufferCountOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
			    };
			    return BufferCountOperator;
			}());
			var BufferCountSubscriber = (function (_super) {
			    __extends$T(BufferCountSubscriber, _super);
			    function BufferCountSubscriber(destination, bufferSize) {
			        var _this = _super.call(this, destination) || this;
			        _this.bufferSize = bufferSize;
			        _this.buffer = [];
			        return _this;
			    }
			    BufferCountSubscriber.prototype._next = function (value) {
			        var buffer = this.buffer;
			        buffer.push(value);
			        if (buffer.length == this.bufferSize) {
			            this.destination.next(buffer);
			            this.buffer = [];
			        }
			    };
			    BufferCountSubscriber.prototype._complete = function () {
			        var buffer = this.buffer;
			        if (buffer.length > 0) {
			            this.destination.next(buffer);
			        }
			        _super.prototype._complete.call(this);
			    };
			    return BufferCountSubscriber;
			}(Subscriber_1$x.Subscriber));
			var BufferSkipCountSubscriber = (function (_super) {
			    __extends$T(BufferSkipCountSubscriber, _super);
			    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
			        var _this = _super.call(this, destination) || this;
			        _this.bufferSize = bufferSize;
			        _this.startBufferEvery = startBufferEvery;
			        _this.buffers = [];
			        _this.count = 0;
			        return _this;
			    }
			    BufferSkipCountSubscriber.prototype._next = function (value) {
			        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
			        this.count++;
			        if (count % startBufferEvery === 0) {
			            buffers.push([]);
			        }
			        for (var i = buffers.length; i--;) {
			            var buffer = buffers[i];
			            buffer.push(value);
			            if (buffer.length === bufferSize) {
			                buffers.splice(i, 1);
			                this.destination.next(buffer);
			            }
			        }
			    };
			    BufferSkipCountSubscriber.prototype._complete = function () {
			        var _a = this, buffers = _a.buffers, destination = _a.destination;
			        while (buffers.length > 0) {
			            var buffer = buffers.shift();
			            if (buffer.length > 0) {
			                destination.next(buffer);
			            }
			        }
			        _super.prototype._complete.call(this);
			    };
			    return BufferSkipCountSubscriber;
			}(Subscriber_1$x.Subscriber));

			var bufferTime$1 = {};

			var __extends$S = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(bufferTime$1, "__esModule", { value: true });
			var async_1$9 = async;
			var Subscriber_1$w = Subscriber$1;
			var isScheduler_1$2 = isScheduler$1;
			function bufferTime(bufferTimeSpan) {
			    var length = arguments.length;
			    var scheduler = async_1$9.async;
			    if (isScheduler_1$2.isScheduler(arguments[arguments.length - 1])) {
			        scheduler = arguments[arguments.length - 1];
			        length--;
			    }
			    var bufferCreationInterval = null;
			    if (length >= 2) {
			        bufferCreationInterval = arguments[1];
			    }
			    var maxBufferSize = Number.POSITIVE_INFINITY;
			    if (length >= 3) {
			        maxBufferSize = arguments[2];
			    }
			    return function bufferTimeOperatorFunction(source) {
			        return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
			    };
			}
			bufferTime$1.bufferTime = bufferTime;
			var BufferTimeOperator = (function () {
			    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
			        this.bufferTimeSpan = bufferTimeSpan;
			        this.bufferCreationInterval = bufferCreationInterval;
			        this.maxBufferSize = maxBufferSize;
			        this.scheduler = scheduler;
			    }
			    BufferTimeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
			    };
			    return BufferTimeOperator;
			}());
			var Context = (function () {
			    function Context() {
			        this.buffer = [];
			    }
			    return Context;
			}());
			var BufferTimeSubscriber = (function (_super) {
			    __extends$S(BufferTimeSubscriber, _super);
			    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.bufferTimeSpan = bufferTimeSpan;
			        _this.bufferCreationInterval = bufferCreationInterval;
			        _this.maxBufferSize = maxBufferSize;
			        _this.scheduler = scheduler;
			        _this.contexts = [];
			        var context = _this.openContext();
			        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
			        if (_this.timespanOnly) {
			            var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
			            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
			        }
			        else {
			            var closeState = { subscriber: _this, context: context };
			            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
			            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
			            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
			        }
			        return _this;
			    }
			    BufferTimeSubscriber.prototype._next = function (value) {
			        var contexts = this.contexts;
			        var len = contexts.length;
			        var filledBufferContext;
			        for (var i = 0; i < len; i++) {
			            var context_1 = contexts[i];
			            var buffer = context_1.buffer;
			            buffer.push(value);
			            if (buffer.length == this.maxBufferSize) {
			                filledBufferContext = context_1;
			            }
			        }
			        if (filledBufferContext) {
			            this.onBufferFull(filledBufferContext);
			        }
			    };
			    BufferTimeSubscriber.prototype._error = function (err) {
			        this.contexts.length = 0;
			        _super.prototype._error.call(this, err);
			    };
			    BufferTimeSubscriber.prototype._complete = function () {
			        var _a = this, contexts = _a.contexts, destination = _a.destination;
			        while (contexts.length > 0) {
			            var context_2 = contexts.shift();
			            destination.next(context_2.buffer);
			        }
			        _super.prototype._complete.call(this);
			    };
			    BufferTimeSubscriber.prototype._unsubscribe = function () {
			        this.contexts = null;
			    };
			    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
			        this.closeContext(context);
			        var closeAction = context.closeAction;
			        closeAction.unsubscribe();
			        this.remove(closeAction);
			        if (!this.closed && this.timespanOnly) {
			            context = this.openContext();
			            var bufferTimeSpan = this.bufferTimeSpan;
			            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
			            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
			        }
			    };
			    BufferTimeSubscriber.prototype.openContext = function () {
			        var context = new Context();
			        this.contexts.push(context);
			        return context;
			    };
			    BufferTimeSubscriber.prototype.closeContext = function (context) {
			        this.destination.next(context.buffer);
			        var contexts = this.contexts;
			        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
			        if (spliceIndex >= 0) {
			            contexts.splice(contexts.indexOf(context), 1);
			        }
			    };
			    return BufferTimeSubscriber;
			}(Subscriber_1$w.Subscriber));
			function dispatchBufferTimeSpanOnly(state) {
			    var subscriber = state.subscriber;
			    var prevContext = state.context;
			    if (prevContext) {
			        subscriber.closeContext(prevContext);
			    }
			    if (!subscriber.closed) {
			        state.context = subscriber.openContext();
			        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
			    }
			}
			function dispatchBufferCreation(state) {
			    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
			    var context = subscriber.openContext();
			    var action = this;
			    if (!subscriber.closed) {
			        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
			        action.schedule(state, bufferCreationInterval);
			    }
			}
			function dispatchBufferClose(arg) {
			    var subscriber = arg.subscriber, context = arg.context;
			    subscriber.closeContext(context);
			}

			var bufferToggle$1 = {};

			var __extends$R = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(bufferToggle$1, "__esModule", { value: true });
			var Subscription_1$3 = Subscription$1;
			var subscribeToResult_1$4 = subscribeToResult$1;
			var OuterSubscriber_1$4 = OuterSubscriber$1;
			function bufferToggle(openings, closingSelector) {
			    return function bufferToggleOperatorFunction(source) {
			        return source.lift(new BufferToggleOperator(openings, closingSelector));
			    };
			}
			bufferToggle$1.bufferToggle = bufferToggle;
			var BufferToggleOperator = (function () {
			    function BufferToggleOperator(openings, closingSelector) {
			        this.openings = openings;
			        this.closingSelector = closingSelector;
			    }
			    BufferToggleOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
			    };
			    return BufferToggleOperator;
			}());
			var BufferToggleSubscriber = (function (_super) {
			    __extends$R(BufferToggleSubscriber, _super);
			    function BufferToggleSubscriber(destination, openings, closingSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.closingSelector = closingSelector;
			        _this.contexts = [];
			        _this.add(subscribeToResult_1$4.subscribeToResult(_this, openings));
			        return _this;
			    }
			    BufferToggleSubscriber.prototype._next = function (value) {
			        var contexts = this.contexts;
			        var len = contexts.length;
			        for (var i = 0; i < len; i++) {
			            contexts[i].buffer.push(value);
			        }
			    };
			    BufferToggleSubscriber.prototype._error = function (err) {
			        var contexts = this.contexts;
			        while (contexts.length > 0) {
			            var context_1 = contexts.shift();
			            context_1.subscription.unsubscribe();
			            context_1.buffer = null;
			            context_1.subscription = null;
			        }
			        this.contexts = null;
			        _super.prototype._error.call(this, err);
			    };
			    BufferToggleSubscriber.prototype._complete = function () {
			        var contexts = this.contexts;
			        while (contexts.length > 0) {
			            var context_2 = contexts.shift();
			            this.destination.next(context_2.buffer);
			            context_2.subscription.unsubscribe();
			            context_2.buffer = null;
			            context_2.subscription = null;
			        }
			        this.contexts = null;
			        _super.prototype._complete.call(this);
			    };
			    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
			        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
			    };
			    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
			        this.closeBuffer(innerSub.context);
			    };
			    BufferToggleSubscriber.prototype.openBuffer = function (value) {
			        try {
			            var closingSelector = this.closingSelector;
			            var closingNotifier = closingSelector.call(this, value);
			            if (closingNotifier) {
			                this.trySubscribe(closingNotifier);
			            }
			        }
			        catch (err) {
			            this._error(err);
			        }
			    };
			    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
			        var contexts = this.contexts;
			        if (contexts && context) {
			            var buffer = context.buffer, subscription = context.subscription;
			            this.destination.next(buffer);
			            contexts.splice(contexts.indexOf(context), 1);
			            this.remove(subscription);
			            subscription.unsubscribe();
			        }
			    };
			    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
			        var contexts = this.contexts;
			        var buffer = [];
			        var subscription = new Subscription_1$3.Subscription();
			        var context = { buffer: buffer, subscription: subscription };
			        contexts.push(context);
			        var innerSubscription = subscribeToResult_1$4.subscribeToResult(this, closingNotifier, context);
			        if (!innerSubscription || innerSubscription.closed) {
			            this.closeBuffer(context);
			        }
			        else {
			            innerSubscription.context = context;
			            this.add(innerSubscription);
			            subscription.add(innerSubscription);
			        }
			    };
			    return BufferToggleSubscriber;
			}(OuterSubscriber_1$4.OuterSubscriber));

			var bufferWhen$1 = {};

			var __extends$Q = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(bufferWhen$1, "__esModule", { value: true });
			var Subscription_1$2 = Subscription$1;
			var innerSubscribe_1$g = innerSubscribe$1;
			function bufferWhen(closingSelector) {
			    return function (source) {
			        return source.lift(new BufferWhenOperator(closingSelector));
			    };
			}
			bufferWhen$1.bufferWhen = bufferWhen;
			var BufferWhenOperator = (function () {
			    function BufferWhenOperator(closingSelector) {
			        this.closingSelector = closingSelector;
			    }
			    BufferWhenOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
			    };
			    return BufferWhenOperator;
			}());
			var BufferWhenSubscriber = (function (_super) {
			    __extends$Q(BufferWhenSubscriber, _super);
			    function BufferWhenSubscriber(destination, closingSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.closingSelector = closingSelector;
			        _this.subscribing = false;
			        _this.openBuffer();
			        return _this;
			    }
			    BufferWhenSubscriber.prototype._next = function (value) {
			        this.buffer.push(value);
			    };
			    BufferWhenSubscriber.prototype._complete = function () {
			        var buffer = this.buffer;
			        if (buffer) {
			            this.destination.next(buffer);
			        }
			        _super.prototype._complete.call(this);
			    };
			    BufferWhenSubscriber.prototype._unsubscribe = function () {
			        this.buffer = undefined;
			        this.subscribing = false;
			    };
			    BufferWhenSubscriber.prototype.notifyNext = function () {
			        this.openBuffer();
			    };
			    BufferWhenSubscriber.prototype.notifyComplete = function () {
			        if (this.subscribing) {
			            this.complete();
			        }
			        else {
			            this.openBuffer();
			        }
			    };
			    BufferWhenSubscriber.prototype.openBuffer = function () {
			        var closingSubscription = this.closingSubscription;
			        if (closingSubscription) {
			            this.remove(closingSubscription);
			            closingSubscription.unsubscribe();
			        }
			        var buffer = this.buffer;
			        if (this.buffer) {
			            this.destination.next(buffer);
			        }
			        this.buffer = [];
			        var closingNotifier;
			        try {
			            var closingSelector = this.closingSelector;
			            closingNotifier = closingSelector();
			        }
			        catch (err) {
			            return this.error(err);
			        }
			        closingSubscription = new Subscription_1$2.Subscription();
			        this.closingSubscription = closingSubscription;
			        this.add(closingSubscription);
			        this.subscribing = true;
			        closingSubscription.add(innerSubscribe_1$g.innerSubscribe(closingNotifier, new innerSubscribe_1$g.SimpleInnerSubscriber(this)));
			        this.subscribing = false;
			    };
			    return BufferWhenSubscriber;
			}(innerSubscribe_1$g.SimpleOuterSubscriber));

			var catchError$1 = {};

			var __extends$P = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(catchError$1, "__esModule", { value: true });
			var innerSubscribe_1$f = innerSubscribe$1;
			function catchError(selector) {
			    return function catchErrorOperatorFunction(source) {
			        var operator = new CatchOperator(selector);
			        var caught = source.lift(operator);
			        return (operator.caught = caught);
			    };
			}
			catchError$1.catchError = catchError;
			var CatchOperator = (function () {
			    function CatchOperator(selector) {
			        this.selector = selector;
			    }
			    CatchOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
			    };
			    return CatchOperator;
			}());
			var CatchSubscriber = (function (_super) {
			    __extends$P(CatchSubscriber, _super);
			    function CatchSubscriber(destination, selector, caught) {
			        var _this = _super.call(this, destination) || this;
			        _this.selector = selector;
			        _this.caught = caught;
			        return _this;
			    }
			    CatchSubscriber.prototype.error = function (err) {
			        if (!this.isStopped) {
			            var result = void 0;
			            try {
			                result = this.selector(err, this.caught);
			            }
			            catch (err2) {
			                _super.prototype.error.call(this, err2);
			                return;
			            }
			            this._unsubscribeAndRecycle();
			            var innerSubscriber = new innerSubscribe_1$f.SimpleInnerSubscriber(this);
			            this.add(innerSubscriber);
			            var innerSubscription = innerSubscribe_1$f.innerSubscribe(result, innerSubscriber);
			            if (innerSubscription !== innerSubscriber) {
			                this.add(innerSubscription);
			            }
			        }
			    };
			    return CatchSubscriber;
			}(innerSubscribe_1$f.SimpleOuterSubscriber));

			var combineAll$1 = {};

			Object.defineProperty(combineAll$1, "__esModule", { value: true });
			var combineLatest_1$2 = combineLatest$3;
			function combineAll(project) {
			    return function (source) { return source.lift(new combineLatest_1$2.CombineLatestOperator(project)); };
			}
			combineAll$1.combineAll = combineAll;

			var combineLatest$1 = {};

			Object.defineProperty(combineLatest$1, "__esModule", { value: true });
			var isArray_1$2 = isArray;
			var combineLatest_1$1 = combineLatest$3;
			var from_1$3 = from$1;
			function combineLatest() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    var project = null;
			    if (typeof observables[observables.length - 1] === 'function') {
			        project = observables.pop();
			    }
			    if (observables.length === 1 && isArray_1$2.isArray(observables[0])) {
			        observables = observables[0].slice();
			    }
			    return function (source) { return source.lift.call(from_1$3.from([source].concat(observables)), new combineLatest_1$1.CombineLatestOperator(project)); };
			}
			combineLatest$1.combineLatest = combineLatest;

			var concat$1 = {};

			Object.defineProperty(concat$1, "__esModule", { value: true });
			var concat_1$3 = concat$3;
			function concat() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    return function (source) { return source.lift.call(concat_1$3.concat.apply(void 0, [source].concat(observables))); };
			}
			concat$1.concat = concat;

			var concatMap$1 = {};

			Object.defineProperty(concatMap$1, "__esModule", { value: true });
			var mergeMap_1$2 = mergeMap$1;
			function concatMap(project, resultSelector) {
			    return mergeMap_1$2.mergeMap(project, resultSelector, 1);
			}
			concatMap$1.concatMap = concatMap;

			var concatMapTo$1 = {};

			Object.defineProperty(concatMapTo$1, "__esModule", { value: true });
			var concatMap_1$1 = concatMap$1;
			function concatMapTo(innerObservable, resultSelector) {
			    return concatMap_1$1.concatMap(function () { return innerObservable; }, resultSelector);
			}
			concatMapTo$1.concatMapTo = concatMapTo;

			var count$1 = {};

			var __extends$O = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(count$1, "__esModule", { value: true });
			var Subscriber_1$v = Subscriber$1;
			function count(predicate) {
			    return function (source) { return source.lift(new CountOperator(predicate, source)); };
			}
			count$1.count = count;
			var CountOperator = (function () {
			    function CountOperator(predicate, source) {
			        this.predicate = predicate;
			        this.source = source;
			    }
			    CountOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
			    };
			    return CountOperator;
			}());
			var CountSubscriber = (function (_super) {
			    __extends$O(CountSubscriber, _super);
			    function CountSubscriber(destination, predicate, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.source = source;
			        _this.count = 0;
			        _this.index = 0;
			        return _this;
			    }
			    CountSubscriber.prototype._next = function (value) {
			        if (this.predicate) {
			            this._tryPredicate(value);
			        }
			        else {
			            this.count++;
			        }
			    };
			    CountSubscriber.prototype._tryPredicate = function (value) {
			        var result;
			        try {
			            result = this.predicate(value, this.index++, this.source);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        if (result) {
			            this.count++;
			        }
			    };
			    CountSubscriber.prototype._complete = function () {
			        this.destination.next(this.count);
			        this.destination.complete();
			    };
			    return CountSubscriber;
			}(Subscriber_1$v.Subscriber));

			var debounce$1 = {};

			var __extends$N = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(debounce$1, "__esModule", { value: true });
			var innerSubscribe_1$e = innerSubscribe$1;
			function debounce(durationSelector) {
			    return function (source) { return source.lift(new DebounceOperator(durationSelector)); };
			}
			debounce$1.debounce = debounce;
			var DebounceOperator = (function () {
			    function DebounceOperator(durationSelector) {
			        this.durationSelector = durationSelector;
			    }
			    DebounceOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
			    };
			    return DebounceOperator;
			}());
			var DebounceSubscriber = (function (_super) {
			    __extends$N(DebounceSubscriber, _super);
			    function DebounceSubscriber(destination, durationSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.durationSelector = durationSelector;
			        _this.hasValue = false;
			        return _this;
			    }
			    DebounceSubscriber.prototype._next = function (value) {
			        try {
			            var result = this.durationSelector.call(this, value);
			            if (result) {
			                this._tryNext(value, result);
			            }
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			    };
			    DebounceSubscriber.prototype._complete = function () {
			        this.emitValue();
			        this.destination.complete();
			    };
			    DebounceSubscriber.prototype._tryNext = function (value, duration) {
			        var subscription = this.durationSubscription;
			        this.value = value;
			        this.hasValue = true;
			        if (subscription) {
			            subscription.unsubscribe();
			            this.remove(subscription);
			        }
			        subscription = innerSubscribe_1$e.innerSubscribe(duration, new innerSubscribe_1$e.SimpleInnerSubscriber(this));
			        if (subscription && !subscription.closed) {
			            this.add(this.durationSubscription = subscription);
			        }
			    };
			    DebounceSubscriber.prototype.notifyNext = function () {
			        this.emitValue();
			    };
			    DebounceSubscriber.prototype.notifyComplete = function () {
			        this.emitValue();
			    };
			    DebounceSubscriber.prototype.emitValue = function () {
			        if (this.hasValue) {
			            var value = this.value;
			            var subscription = this.durationSubscription;
			            if (subscription) {
			                this.durationSubscription = undefined;
			                subscription.unsubscribe();
			                this.remove(subscription);
			            }
			            this.value = undefined;
			            this.hasValue = false;
			            _super.prototype._next.call(this, value);
			        }
			    };
			    return DebounceSubscriber;
			}(innerSubscribe_1$e.SimpleOuterSubscriber));

			var debounceTime$1 = {};

			var __extends$M = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(debounceTime$1, "__esModule", { value: true });
			var Subscriber_1$u = Subscriber$1;
			var async_1$8 = async;
			function debounceTime(dueTime, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$8.async; }
			    return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
			}
			debounceTime$1.debounceTime = debounceTime;
			var DebounceTimeOperator = (function () {
			    function DebounceTimeOperator(dueTime, scheduler) {
			        this.dueTime = dueTime;
			        this.scheduler = scheduler;
			    }
			    DebounceTimeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
			    };
			    return DebounceTimeOperator;
			}());
			var DebounceTimeSubscriber = (function (_super) {
			    __extends$M(DebounceTimeSubscriber, _super);
			    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.dueTime = dueTime;
			        _this.scheduler = scheduler;
			        _this.debouncedSubscription = null;
			        _this.lastValue = null;
			        _this.hasValue = false;
			        return _this;
			    }
			    DebounceTimeSubscriber.prototype._next = function (value) {
			        this.clearDebounce();
			        this.lastValue = value;
			        this.hasValue = true;
			        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$1, this.dueTime, this));
			    };
			    DebounceTimeSubscriber.prototype._complete = function () {
			        this.debouncedNext();
			        this.destination.complete();
			    };
			    DebounceTimeSubscriber.prototype.debouncedNext = function () {
			        this.clearDebounce();
			        if (this.hasValue) {
			            var lastValue = this.lastValue;
			            this.lastValue = null;
			            this.hasValue = false;
			            this.destination.next(lastValue);
			        }
			    };
			    DebounceTimeSubscriber.prototype.clearDebounce = function () {
			        var debouncedSubscription = this.debouncedSubscription;
			        if (debouncedSubscription !== null) {
			            this.remove(debouncedSubscription);
			            debouncedSubscription.unsubscribe();
			            this.debouncedSubscription = null;
			        }
			    };
			    return DebounceTimeSubscriber;
			}(Subscriber_1$u.Subscriber));
			function dispatchNext$1(subscriber) {
			    subscriber.debouncedNext();
			}

			var defaultIfEmpty$1 = {};

			var __extends$L = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(defaultIfEmpty$1, "__esModule", { value: true });
			var Subscriber_1$t = Subscriber$1;
			function defaultIfEmpty(defaultValue) {
			    if (defaultValue === void 0) { defaultValue = null; }
			    return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
			}
			defaultIfEmpty$1.defaultIfEmpty = defaultIfEmpty;
			var DefaultIfEmptyOperator = (function () {
			    function DefaultIfEmptyOperator(defaultValue) {
			        this.defaultValue = defaultValue;
			    }
			    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
			    };
			    return DefaultIfEmptyOperator;
			}());
			var DefaultIfEmptySubscriber = (function (_super) {
			    __extends$L(DefaultIfEmptySubscriber, _super);
			    function DefaultIfEmptySubscriber(destination, defaultValue) {
			        var _this = _super.call(this, destination) || this;
			        _this.defaultValue = defaultValue;
			        _this.isEmpty = true;
			        return _this;
			    }
			    DefaultIfEmptySubscriber.prototype._next = function (value) {
			        this.isEmpty = false;
			        this.destination.next(value);
			    };
			    DefaultIfEmptySubscriber.prototype._complete = function () {
			        if (this.isEmpty) {
			            this.destination.next(this.defaultValue);
			        }
			        this.destination.complete();
			    };
			    return DefaultIfEmptySubscriber;
			}(Subscriber_1$t.Subscriber));

			var delay$1 = {};

			var isDate$1 = {};

			Object.defineProperty(isDate$1, "__esModule", { value: true });
			function isDate(value) {
			    return value instanceof Date && !isNaN(+value);
			}
			isDate$1.isDate = isDate;

			var __extends$K = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(delay$1, "__esModule", { value: true });
			var async_1$7 = async;
			var isDate_1$1 = isDate$1;
			var Subscriber_1$s = Subscriber$1;
			var Notification_1$1 = Notification;
			function delay(delay, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$7.async; }
			    var absoluteDelay = isDate_1$1.isDate(delay);
			    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
			    return function (source) { return source.lift(new DelayOperator(delayFor, scheduler)); };
			}
			delay$1.delay = delay;
			var DelayOperator = (function () {
			    function DelayOperator(delay, scheduler) {
			        this.delay = delay;
			        this.scheduler = scheduler;
			    }
			    DelayOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
			    };
			    return DelayOperator;
			}());
			var DelaySubscriber = (function (_super) {
			    __extends$K(DelaySubscriber, _super);
			    function DelaySubscriber(destination, delay, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.delay = delay;
			        _this.scheduler = scheduler;
			        _this.queue = [];
			        _this.active = false;
			        _this.errored = false;
			        return _this;
			    }
			    DelaySubscriber.dispatch = function (state) {
			        var source = state.source;
			        var queue = source.queue;
			        var scheduler = state.scheduler;
			        var destination = state.destination;
			        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
			            queue.shift().notification.observe(destination);
			        }
			        if (queue.length > 0) {
			            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
			            this.schedule(state, delay_1);
			        }
			        else {
			            this.unsubscribe();
			            source.active = false;
			        }
			    };
			    DelaySubscriber.prototype._schedule = function (scheduler) {
			        this.active = true;
			        var destination = this.destination;
			        destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
			            source: this, destination: this.destination, scheduler: scheduler
			        }));
			    };
			    DelaySubscriber.prototype.scheduleNotification = function (notification) {
			        if (this.errored === true) {
			            return;
			        }
			        var scheduler = this.scheduler;
			        var message = new DelayMessage(scheduler.now() + this.delay, notification);
			        this.queue.push(message);
			        if (this.active === false) {
			            this._schedule(scheduler);
			        }
			    };
			    DelaySubscriber.prototype._next = function (value) {
			        this.scheduleNotification(Notification_1$1.Notification.createNext(value));
			    };
			    DelaySubscriber.prototype._error = function (err) {
			        this.errored = true;
			        this.queue = [];
			        this.destination.error(err);
			        this.unsubscribe();
			    };
			    DelaySubscriber.prototype._complete = function () {
			        this.scheduleNotification(Notification_1$1.Notification.createComplete());
			        this.unsubscribe();
			    };
			    return DelaySubscriber;
			}(Subscriber_1$s.Subscriber));
			var DelayMessage = (function () {
			    function DelayMessage(time, notification) {
			        this.time = time;
			        this.notification = notification;
			    }
			    return DelayMessage;
			}());

			var delayWhen$1 = {};

			var __extends$J = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(delayWhen$1, "__esModule", { value: true });
			var Subscriber_1$r = Subscriber$1;
			var Observable_1$1 = Observable$1;
			var OuterSubscriber_1$3 = OuterSubscriber$1;
			var subscribeToResult_1$3 = subscribeToResult$1;
			function delayWhen(delayDurationSelector, subscriptionDelay) {
			    if (subscriptionDelay) {
			        return function (source) {
			            return new SubscriptionDelayObservable(source, subscriptionDelay)
			                .lift(new DelayWhenOperator(delayDurationSelector));
			        };
			    }
			    return function (source) { return source.lift(new DelayWhenOperator(delayDurationSelector)); };
			}
			delayWhen$1.delayWhen = delayWhen;
			var DelayWhenOperator = (function () {
			    function DelayWhenOperator(delayDurationSelector) {
			        this.delayDurationSelector = delayDurationSelector;
			    }
			    DelayWhenOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
			    };
			    return DelayWhenOperator;
			}());
			var DelayWhenSubscriber = (function (_super) {
			    __extends$J(DelayWhenSubscriber, _super);
			    function DelayWhenSubscriber(destination, delayDurationSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.delayDurationSelector = delayDurationSelector;
			        _this.completed = false;
			        _this.delayNotifierSubscriptions = [];
			        _this.index = 0;
			        return _this;
			    }
			    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
			        this.destination.next(outerValue);
			        this.removeSubscription(innerSub);
			        this.tryComplete();
			    };
			    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
			        this._error(error);
			    };
			    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
			        var value = this.removeSubscription(innerSub);
			        if (value) {
			            this.destination.next(value);
			        }
			        this.tryComplete();
			    };
			    DelayWhenSubscriber.prototype._next = function (value) {
			        var index = this.index++;
			        try {
			            var delayNotifier = this.delayDurationSelector(value, index);
			            if (delayNotifier) {
			                this.tryDelay(delayNotifier, value);
			            }
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			    };
			    DelayWhenSubscriber.prototype._complete = function () {
			        this.completed = true;
			        this.tryComplete();
			        this.unsubscribe();
			    };
			    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
			        subscription.unsubscribe();
			        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
			        if (subscriptionIdx !== -1) {
			            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
			        }
			        return subscription.outerValue;
			    };
			    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
			        var notifierSubscription = subscribeToResult_1$3.subscribeToResult(this, delayNotifier, value);
			        if (notifierSubscription && !notifierSubscription.closed) {
			            var destination = this.destination;
			            destination.add(notifierSubscription);
			            this.delayNotifierSubscriptions.push(notifierSubscription);
			        }
			    };
			    DelayWhenSubscriber.prototype.tryComplete = function () {
			        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
			            this.destination.complete();
			        }
			    };
			    return DelayWhenSubscriber;
			}(OuterSubscriber_1$3.OuterSubscriber));
			var SubscriptionDelayObservable = (function (_super) {
			    __extends$J(SubscriptionDelayObservable, _super);
			    function SubscriptionDelayObservable(source, subscriptionDelay) {
			        var _this = _super.call(this) || this;
			        _this.source = source;
			        _this.subscriptionDelay = subscriptionDelay;
			        return _this;
			    }
			    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
			        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
			    };
			    return SubscriptionDelayObservable;
			}(Observable_1$1.Observable));
			var SubscriptionDelaySubscriber = (function (_super) {
			    __extends$J(SubscriptionDelaySubscriber, _super);
			    function SubscriptionDelaySubscriber(parent, source) {
			        var _this = _super.call(this) || this;
			        _this.parent = parent;
			        _this.source = source;
			        _this.sourceSubscribed = false;
			        return _this;
			    }
			    SubscriptionDelaySubscriber.prototype._next = function (unused) {
			        this.subscribeToSource();
			    };
			    SubscriptionDelaySubscriber.prototype._error = function (err) {
			        this.unsubscribe();
			        this.parent.error(err);
			    };
			    SubscriptionDelaySubscriber.prototype._complete = function () {
			        this.unsubscribe();
			        this.subscribeToSource();
			    };
			    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
			        if (!this.sourceSubscribed) {
			            this.sourceSubscribed = true;
			            this.unsubscribe();
			            this.source.subscribe(this.parent);
			        }
			    };
			    return SubscriptionDelaySubscriber;
			}(Subscriber_1$r.Subscriber));

			var dematerialize$1 = {};

			var __extends$I = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(dematerialize$1, "__esModule", { value: true });
			var Subscriber_1$q = Subscriber$1;
			function dematerialize() {
			    return function dematerializeOperatorFunction(source) {
			        return source.lift(new DeMaterializeOperator());
			    };
			}
			dematerialize$1.dematerialize = dematerialize;
			var DeMaterializeOperator = (function () {
			    function DeMaterializeOperator() {
			    }
			    DeMaterializeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DeMaterializeSubscriber(subscriber));
			    };
			    return DeMaterializeOperator;
			}());
			var DeMaterializeSubscriber = (function (_super) {
			    __extends$I(DeMaterializeSubscriber, _super);
			    function DeMaterializeSubscriber(destination) {
			        return _super.call(this, destination) || this;
			    }
			    DeMaterializeSubscriber.prototype._next = function (value) {
			        value.observe(this.destination);
			    };
			    return DeMaterializeSubscriber;
			}(Subscriber_1$q.Subscriber));

			var distinct$1 = {};

			var __extends$H = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(distinct$1, "__esModule", { value: true });
			var innerSubscribe_1$d = innerSubscribe$1;
			function distinct(keySelector, flushes) {
			    return function (source) { return source.lift(new DistinctOperator(keySelector, flushes)); };
			}
			distinct$1.distinct = distinct;
			var DistinctOperator = (function () {
			    function DistinctOperator(keySelector, flushes) {
			        this.keySelector = keySelector;
			        this.flushes = flushes;
			    }
			    DistinctOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
			    };
			    return DistinctOperator;
			}());
			var DistinctSubscriber = (function (_super) {
			    __extends$H(DistinctSubscriber, _super);
			    function DistinctSubscriber(destination, keySelector, flushes) {
			        var _this = _super.call(this, destination) || this;
			        _this.keySelector = keySelector;
			        _this.values = new Set();
			        if (flushes) {
			            _this.add(innerSubscribe_1$d.innerSubscribe(flushes, new innerSubscribe_1$d.SimpleInnerSubscriber(_this)));
			        }
			        return _this;
			    }
			    DistinctSubscriber.prototype.notifyNext = function () {
			        this.values.clear();
			    };
			    DistinctSubscriber.prototype.notifyError = function (error) {
			        this._error(error);
			    };
			    DistinctSubscriber.prototype._next = function (value) {
			        if (this.keySelector) {
			            this._useKeySelector(value);
			        }
			        else {
			            this._finalizeNext(value, value);
			        }
			    };
			    DistinctSubscriber.prototype._useKeySelector = function (value) {
			        var key;
			        var destination = this.destination;
			        try {
			            key = this.keySelector(value);
			        }
			        catch (err) {
			            destination.error(err);
			            return;
			        }
			        this._finalizeNext(key, value);
			    };
			    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
			        var values = this.values;
			        if (!values.has(key)) {
			            values.add(key);
			            this.destination.next(value);
			        }
			    };
			    return DistinctSubscriber;
			}(innerSubscribe_1$d.SimpleOuterSubscriber));
			distinct$1.DistinctSubscriber = DistinctSubscriber;

			var distinctUntilChanged$1 = {};

			var __extends$G = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(distinctUntilChanged$1, "__esModule", { value: true });
			var Subscriber_1$p = Subscriber$1;
			function distinctUntilChanged(compare, keySelector) {
			    return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
			}
			distinctUntilChanged$1.distinctUntilChanged = distinctUntilChanged;
			var DistinctUntilChangedOperator = (function () {
			    function DistinctUntilChangedOperator(compare, keySelector) {
			        this.compare = compare;
			        this.keySelector = keySelector;
			    }
			    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
			    };
			    return DistinctUntilChangedOperator;
			}());
			var DistinctUntilChangedSubscriber = (function (_super) {
			    __extends$G(DistinctUntilChangedSubscriber, _super);
			    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.keySelector = keySelector;
			        _this.hasKey = false;
			        if (typeof compare === 'function') {
			            _this.compare = compare;
			        }
			        return _this;
			    }
			    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
			        return x === y;
			    };
			    DistinctUntilChangedSubscriber.prototype._next = function (value) {
			        var key;
			        try {
			            var keySelector = this.keySelector;
			            key = keySelector ? keySelector(value) : value;
			        }
			        catch (err) {
			            return this.destination.error(err);
			        }
			        var result = false;
			        if (this.hasKey) {
			            try {
			                var compare = this.compare;
			                result = compare(this.key, key);
			            }
			            catch (err) {
			                return this.destination.error(err);
			            }
			        }
			        else {
			            this.hasKey = true;
			        }
			        if (!result) {
			            this.key = key;
			            this.destination.next(value);
			        }
			    };
			    return DistinctUntilChangedSubscriber;
			}(Subscriber_1$p.Subscriber));

			var distinctUntilKeyChanged$1 = {};

			Object.defineProperty(distinctUntilKeyChanged$1, "__esModule", { value: true });
			var distinctUntilChanged_1$1 = distinctUntilChanged$1;
			function distinctUntilKeyChanged(key, compare) {
			    return distinctUntilChanged_1$1.distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
			}
			distinctUntilKeyChanged$1.distinctUntilKeyChanged = distinctUntilKeyChanged;

			var elementAt$1 = {};

			var throwIfEmpty$1 = {};

			var __extends$F = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(throwIfEmpty$1, "__esModule", { value: true });
			var EmptyError_1$3 = EmptyError;
			var Subscriber_1$o = Subscriber$1;
			function throwIfEmpty(errorFactory) {
			    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
			    return function (source) {
			        return source.lift(new ThrowIfEmptyOperator(errorFactory));
			    };
			}
			throwIfEmpty$1.throwIfEmpty = throwIfEmpty;
			var ThrowIfEmptyOperator = (function () {
			    function ThrowIfEmptyOperator(errorFactory) {
			        this.errorFactory = errorFactory;
			    }
			    ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
			    };
			    return ThrowIfEmptyOperator;
			}());
			var ThrowIfEmptySubscriber = (function (_super) {
			    __extends$F(ThrowIfEmptySubscriber, _super);
			    function ThrowIfEmptySubscriber(destination, errorFactory) {
			        var _this = _super.call(this, destination) || this;
			        _this.errorFactory = errorFactory;
			        _this.hasValue = false;
			        return _this;
			    }
			    ThrowIfEmptySubscriber.prototype._next = function (value) {
			        this.hasValue = true;
			        this.destination.next(value);
			    };
			    ThrowIfEmptySubscriber.prototype._complete = function () {
			        if (!this.hasValue) {
			            var err = void 0;
			            try {
			                err = this.errorFactory();
			            }
			            catch (e) {
			                err = e;
			            }
			            this.destination.error(err);
			        }
			        else {
			            return this.destination.complete();
			        }
			    };
			    return ThrowIfEmptySubscriber;
			}(Subscriber_1$o.Subscriber));
			function defaultErrorFactory() {
			    return new EmptyError_1$3.EmptyError();
			}

			var take$1 = {};

			var __extends$E = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(take$1, "__esModule", { value: true });
			var Subscriber_1$n = Subscriber$1;
			var ArgumentOutOfRangeError_1$3 = ArgumentOutOfRangeError;
			var empty_1$2 = empty;
			function take(count) {
			    return function (source) {
			        if (count === 0) {
			            return empty_1$2.empty();
			        }
			        else {
			            return source.lift(new TakeOperator(count));
			        }
			    };
			}
			take$1.take = take;
			var TakeOperator = (function () {
			    function TakeOperator(total) {
			        this.total = total;
			        if (this.total < 0) {
			            throw new ArgumentOutOfRangeError_1$3.ArgumentOutOfRangeError;
			        }
			    }
			    TakeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new TakeSubscriber(subscriber, this.total));
			    };
			    return TakeOperator;
			}());
			var TakeSubscriber = (function (_super) {
			    __extends$E(TakeSubscriber, _super);
			    function TakeSubscriber(destination, total) {
			        var _this = _super.call(this, destination) || this;
			        _this.total = total;
			        _this.count = 0;
			        return _this;
			    }
			    TakeSubscriber.prototype._next = function (value) {
			        var total = this.total;
			        var count = ++this.count;
			        if (count <= total) {
			            this.destination.next(value);
			            if (count === total) {
			                this.destination.complete();
			                this.unsubscribe();
			            }
			        }
			    };
			    return TakeSubscriber;
			}(Subscriber_1$n.Subscriber));

			Object.defineProperty(elementAt$1, "__esModule", { value: true });
			var ArgumentOutOfRangeError_1$2 = ArgumentOutOfRangeError;
			var filter_1$4 = filter$3;
			var throwIfEmpty_1$3 = throwIfEmpty$1;
			var defaultIfEmpty_1$4 = defaultIfEmpty$1;
			var take_1$2 = take$1;
			function elementAt(index, defaultValue) {
			    if (index < 0) {
			        throw new ArgumentOutOfRangeError_1$2.ArgumentOutOfRangeError();
			    }
			    var hasDefaultValue = arguments.length >= 2;
			    return function (source) { return source.pipe(filter_1$4.filter(function (v, i) { return i === index; }), take_1$2.take(1), hasDefaultValue
			        ? defaultIfEmpty_1$4.defaultIfEmpty(defaultValue)
			        : throwIfEmpty_1$3.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1$2.ArgumentOutOfRangeError(); })); };
			}
			elementAt$1.elementAt = elementAt;

			var endWith$1 = {};

			Object.defineProperty(endWith$1, "__esModule", { value: true });
			var concat_1$2 = concat$3;
			var of_1 = of$1;
			function endWith() {
			    var array = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        array[_i] = arguments[_i];
			    }
			    return function (source) { return concat_1$2.concat(source, of_1.of.apply(void 0, array)); };
			}
			endWith$1.endWith = endWith;

			var every$1 = {};

			var __extends$D = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(every$1, "__esModule", { value: true });
			var Subscriber_1$m = Subscriber$1;
			function every(predicate, thisArg) {
			    return function (source) { return source.lift(new EveryOperator(predicate, thisArg, source)); };
			}
			every$1.every = every;
			var EveryOperator = (function () {
			    function EveryOperator(predicate, thisArg, source) {
			        this.predicate = predicate;
			        this.thisArg = thisArg;
			        this.source = source;
			    }
			    EveryOperator.prototype.call = function (observer, source) {
			        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
			    };
			    return EveryOperator;
			}());
			var EverySubscriber = (function (_super) {
			    __extends$D(EverySubscriber, _super);
			    function EverySubscriber(destination, predicate, thisArg, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.thisArg = thisArg;
			        _this.source = source;
			        _this.index = 0;
			        _this.thisArg = thisArg || _this;
			        return _this;
			    }
			    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
			        this.destination.next(everyValueMatch);
			        this.destination.complete();
			    };
			    EverySubscriber.prototype._next = function (value) {
			        var result = false;
			        try {
			            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        if (!result) {
			            this.notifyComplete(false);
			        }
			    };
			    EverySubscriber.prototype._complete = function () {
			        this.notifyComplete(true);
			    };
			    return EverySubscriber;
			}(Subscriber_1$m.Subscriber));

			var exhaust$1 = {};

			var __extends$C = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(exhaust$1, "__esModule", { value: true });
			var innerSubscribe_1$c = innerSubscribe$1;
			function exhaust() {
			    return function (source) { return source.lift(new SwitchFirstOperator()); };
			}
			exhaust$1.exhaust = exhaust;
			var SwitchFirstOperator = (function () {
			    function SwitchFirstOperator() {
			    }
			    SwitchFirstOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SwitchFirstSubscriber(subscriber));
			    };
			    return SwitchFirstOperator;
			}());
			var SwitchFirstSubscriber = (function (_super) {
			    __extends$C(SwitchFirstSubscriber, _super);
			    function SwitchFirstSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.hasCompleted = false;
			        _this.hasSubscription = false;
			        return _this;
			    }
			    SwitchFirstSubscriber.prototype._next = function (value) {
			        if (!this.hasSubscription) {
			            this.hasSubscription = true;
			            this.add(innerSubscribe_1$c.innerSubscribe(value, new innerSubscribe_1$c.SimpleInnerSubscriber(this)));
			        }
			    };
			    SwitchFirstSubscriber.prototype._complete = function () {
			        this.hasCompleted = true;
			        if (!this.hasSubscription) {
			            this.destination.complete();
			        }
			    };
			    SwitchFirstSubscriber.prototype.notifyComplete = function () {
			        this.hasSubscription = false;
			        if (this.hasCompleted) {
			            this.destination.complete();
			        }
			    };
			    return SwitchFirstSubscriber;
			}(innerSubscribe_1$c.SimpleOuterSubscriber));

			var exhaustMap$1 = {};

			var __extends$B = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(exhaustMap$1, "__esModule", { value: true });
			var map_1$5 = map$1;
			var from_1$2 = from$1;
			var innerSubscribe_1$b = innerSubscribe$1;
			function exhaustMap(project, resultSelector) {
			    if (resultSelector) {
			        return function (source) { return source.pipe(exhaustMap(function (a, i) { return from_1$2.from(project(a, i)).pipe(map_1$5.map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
			    }
			    return function (source) {
			        return source.lift(new ExhaustMapOperator(project));
			    };
			}
			exhaustMap$1.exhaustMap = exhaustMap;
			var ExhaustMapOperator = (function () {
			    function ExhaustMapOperator(project) {
			        this.project = project;
			    }
			    ExhaustMapOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ExhaustMapSubscriber(subscriber, this.project));
			    };
			    return ExhaustMapOperator;
			}());
			var ExhaustMapSubscriber = (function (_super) {
			    __extends$B(ExhaustMapSubscriber, _super);
			    function ExhaustMapSubscriber(destination, project) {
			        var _this = _super.call(this, destination) || this;
			        _this.project = project;
			        _this.hasSubscription = false;
			        _this.hasCompleted = false;
			        _this.index = 0;
			        return _this;
			    }
			    ExhaustMapSubscriber.prototype._next = function (value) {
			        if (!this.hasSubscription) {
			            this.tryNext(value);
			        }
			    };
			    ExhaustMapSubscriber.prototype.tryNext = function (value) {
			        var result;
			        var index = this.index++;
			        try {
			            result = this.project(value, index);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.hasSubscription = true;
			        this._innerSub(result);
			    };
			    ExhaustMapSubscriber.prototype._innerSub = function (result) {
			        var innerSubscriber = new innerSubscribe_1$b.SimpleInnerSubscriber(this);
			        var destination = this.destination;
			        destination.add(innerSubscriber);
			        var innerSubscription = innerSubscribe_1$b.innerSubscribe(result, innerSubscriber);
			        if (innerSubscription !== innerSubscriber) {
			            destination.add(innerSubscription);
			        }
			    };
			    ExhaustMapSubscriber.prototype._complete = function () {
			        this.hasCompleted = true;
			        if (!this.hasSubscription) {
			            this.destination.complete();
			        }
			        this.unsubscribe();
			    };
			    ExhaustMapSubscriber.prototype.notifyNext = function (innerValue) {
			        this.destination.next(innerValue);
			    };
			    ExhaustMapSubscriber.prototype.notifyError = function (err) {
			        this.destination.error(err);
			    };
			    ExhaustMapSubscriber.prototype.notifyComplete = function () {
			        this.hasSubscription = false;
			        if (this.hasCompleted) {
			            this.destination.complete();
			        }
			    };
			    return ExhaustMapSubscriber;
			}(innerSubscribe_1$b.SimpleOuterSubscriber));

			var expand$1 = {};

			var __extends$A = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(expand$1, "__esModule", { value: true });
			var innerSubscribe_1$a = innerSubscribe$1;
			function expand(project, concurrent, scheduler) {
			    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
			    return function (source) { return source.lift(new ExpandOperator(project, concurrent, scheduler)); };
			}
			expand$1.expand = expand;
			var ExpandOperator = (function () {
			    function ExpandOperator(project, concurrent, scheduler) {
			        this.project = project;
			        this.concurrent = concurrent;
			        this.scheduler = scheduler;
			    }
			    ExpandOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
			    };
			    return ExpandOperator;
			}());
			expand$1.ExpandOperator = ExpandOperator;
			var ExpandSubscriber = (function (_super) {
			    __extends$A(ExpandSubscriber, _super);
			    function ExpandSubscriber(destination, project, concurrent, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.project = project;
			        _this.concurrent = concurrent;
			        _this.scheduler = scheduler;
			        _this.index = 0;
			        _this.active = 0;
			        _this.hasCompleted = false;
			        if (concurrent < Number.POSITIVE_INFINITY) {
			            _this.buffer = [];
			        }
			        return _this;
			    }
			    ExpandSubscriber.dispatch = function (arg) {
			        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
			        subscriber.subscribeToProjection(result, value, index);
			    };
			    ExpandSubscriber.prototype._next = function (value) {
			        var destination = this.destination;
			        if (destination.closed) {
			            this._complete();
			            return;
			        }
			        var index = this.index++;
			        if (this.active < this.concurrent) {
			            destination.next(value);
			            try {
			                var project = this.project;
			                var result = project(value, index);
			                if (!this.scheduler) {
			                    this.subscribeToProjection(result, value, index);
			                }
			                else {
			                    var state = { subscriber: this, result: result, value: value, index: index };
			                    var destination_1 = this.destination;
			                    destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
			                }
			            }
			            catch (e) {
			                destination.error(e);
			            }
			        }
			        else {
			            this.buffer.push(value);
			        }
			    };
			    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
			        this.active++;
			        var destination = this.destination;
			        destination.add(innerSubscribe_1$a.innerSubscribe(result, new innerSubscribe_1$a.SimpleInnerSubscriber(this)));
			    };
			    ExpandSubscriber.prototype._complete = function () {
			        this.hasCompleted = true;
			        if (this.hasCompleted && this.active === 0) {
			            this.destination.complete();
			        }
			        this.unsubscribe();
			    };
			    ExpandSubscriber.prototype.notifyNext = function (innerValue) {
			        this._next(innerValue);
			    };
			    ExpandSubscriber.prototype.notifyComplete = function () {
			        var buffer = this.buffer;
			        this.active--;
			        if (buffer && buffer.length > 0) {
			            this._next(buffer.shift());
			        }
			        if (this.hasCompleted && this.active === 0) {
			            this.destination.complete();
			        }
			    };
			    return ExpandSubscriber;
			}(innerSubscribe_1$a.SimpleOuterSubscriber));
			expand$1.ExpandSubscriber = ExpandSubscriber;

			var finalize$1 = {};

			var __extends$z = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(finalize$1, "__esModule", { value: true });
			var Subscriber_1$l = Subscriber$1;
			var Subscription_1$1 = Subscription$1;
			function finalize(callback) {
			    return function (source) { return source.lift(new FinallyOperator(callback)); };
			}
			finalize$1.finalize = finalize;
			var FinallyOperator = (function () {
			    function FinallyOperator(callback) {
			        this.callback = callback;
			    }
			    FinallyOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
			    };
			    return FinallyOperator;
			}());
			var FinallySubscriber = (function (_super) {
			    __extends$z(FinallySubscriber, _super);
			    function FinallySubscriber(destination, callback) {
			        var _this = _super.call(this, destination) || this;
			        _this.add(new Subscription_1$1.Subscription(callback));
			        return _this;
			    }
			    return FinallySubscriber;
			}(Subscriber_1$l.Subscriber));

			var find$1 = {};

			var __extends$y = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(find$1, "__esModule", { value: true });
			var Subscriber_1$k = Subscriber$1;
			function find(predicate, thisArg) {
			    if (typeof predicate !== 'function') {
			        throw new TypeError('predicate is not a function');
			    }
			    return function (source) { return source.lift(new FindValueOperator(predicate, source, false, thisArg)); };
			}
			find$1.find = find;
			var FindValueOperator = (function () {
			    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
			        this.predicate = predicate;
			        this.source = source;
			        this.yieldIndex = yieldIndex;
			        this.thisArg = thisArg;
			    }
			    FindValueOperator.prototype.call = function (observer, source) {
			        return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
			    };
			    return FindValueOperator;
			}());
			find$1.FindValueOperator = FindValueOperator;
			var FindValueSubscriber = (function (_super) {
			    __extends$y(FindValueSubscriber, _super);
			    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.source = source;
			        _this.yieldIndex = yieldIndex;
			        _this.thisArg = thisArg;
			        _this.index = 0;
			        return _this;
			    }
			    FindValueSubscriber.prototype.notifyComplete = function (value) {
			        var destination = this.destination;
			        destination.next(value);
			        destination.complete();
			        this.unsubscribe();
			    };
			    FindValueSubscriber.prototype._next = function (value) {
			        var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
			        var index = this.index++;
			        try {
			            var result = predicate.call(thisArg || this, value, index, this.source);
			            if (result) {
			                this.notifyComplete(this.yieldIndex ? index : value);
			            }
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			    };
			    FindValueSubscriber.prototype._complete = function () {
			        this.notifyComplete(this.yieldIndex ? -1 : undefined);
			    };
			    return FindValueSubscriber;
			}(Subscriber_1$k.Subscriber));
			find$1.FindValueSubscriber = FindValueSubscriber;

			var findIndex$1 = {};

			Object.defineProperty(findIndex$1, "__esModule", { value: true });
			var find_1$1 = find$1;
			function findIndex(predicate, thisArg) {
			    return function (source) { return source.lift(new find_1$1.FindValueOperator(predicate, source, true, thisArg)); };
			}
			findIndex$1.findIndex = findIndex;

			var first$1 = {};

			Object.defineProperty(first$1, "__esModule", { value: true });
			var EmptyError_1$2 = EmptyError;
			var filter_1$3 = filter$3;
			var take_1$1 = take$1;
			var defaultIfEmpty_1$3 = defaultIfEmpty$1;
			var throwIfEmpty_1$2 = throwIfEmpty$1;
			var identity_1$2 = identity$1;
			function first(predicate, defaultValue) {
			    var hasDefaultValue = arguments.length >= 2;
			    return function (source) { return source.pipe(predicate ? filter_1$3.filter(function (v, i) { return predicate(v, i, source); }) : identity_1$2.identity, take_1$1.take(1), hasDefaultValue ? defaultIfEmpty_1$3.defaultIfEmpty(defaultValue) : throwIfEmpty_1$2.throwIfEmpty(function () { return new EmptyError_1$2.EmptyError(); })); };
			}
			first$1.first = first;

			var ignoreElements$1 = {};

			var __extends$x = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(ignoreElements$1, "__esModule", { value: true });
			var Subscriber_1$j = Subscriber$1;
			function ignoreElements() {
			    return function ignoreElementsOperatorFunction(source) {
			        return source.lift(new IgnoreElementsOperator());
			    };
			}
			ignoreElements$1.ignoreElements = ignoreElements;
			var IgnoreElementsOperator = (function () {
			    function IgnoreElementsOperator() {
			    }
			    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
			    };
			    return IgnoreElementsOperator;
			}());
			var IgnoreElementsSubscriber = (function (_super) {
			    __extends$x(IgnoreElementsSubscriber, _super);
			    function IgnoreElementsSubscriber() {
			        return _super !== null && _super.apply(this, arguments) || this;
			    }
			    IgnoreElementsSubscriber.prototype._next = function (unused) {
			    };
			    return IgnoreElementsSubscriber;
			}(Subscriber_1$j.Subscriber));

			var isEmpty$1 = {};

			var __extends$w = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(isEmpty$1, "__esModule", { value: true });
			var Subscriber_1$i = Subscriber$1;
			function isEmpty() {
			    return function (source) { return source.lift(new IsEmptyOperator()); };
			}
			isEmpty$1.isEmpty = isEmpty;
			var IsEmptyOperator = (function () {
			    function IsEmptyOperator() {
			    }
			    IsEmptyOperator.prototype.call = function (observer, source) {
			        return source.subscribe(new IsEmptySubscriber(observer));
			    };
			    return IsEmptyOperator;
			}());
			var IsEmptySubscriber = (function (_super) {
			    __extends$w(IsEmptySubscriber, _super);
			    function IsEmptySubscriber(destination) {
			        return _super.call(this, destination) || this;
			    }
			    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
			        var destination = this.destination;
			        destination.next(isEmpty);
			        destination.complete();
			    };
			    IsEmptySubscriber.prototype._next = function (value) {
			        this.notifyComplete(false);
			    };
			    IsEmptySubscriber.prototype._complete = function () {
			        this.notifyComplete(true);
			    };
			    return IsEmptySubscriber;
			}(Subscriber_1$i.Subscriber));

			var last$1 = {};

			var takeLast$1 = {};

			var __extends$v = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(takeLast$1, "__esModule", { value: true });
			var Subscriber_1$h = Subscriber$1;
			var ArgumentOutOfRangeError_1$1 = ArgumentOutOfRangeError;
			var empty_1$1 = empty;
			function takeLast(count) {
			    return function takeLastOperatorFunction(source) {
			        if (count === 0) {
			            return empty_1$1.empty();
			        }
			        else {
			            return source.lift(new TakeLastOperator(count));
			        }
			    };
			}
			takeLast$1.takeLast = takeLast;
			var TakeLastOperator = (function () {
			    function TakeLastOperator(total) {
			        this.total = total;
			        if (this.total < 0) {
			            throw new ArgumentOutOfRangeError_1$1.ArgumentOutOfRangeError;
			        }
			    }
			    TakeLastOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
			    };
			    return TakeLastOperator;
			}());
			var TakeLastSubscriber = (function (_super) {
			    __extends$v(TakeLastSubscriber, _super);
			    function TakeLastSubscriber(destination, total) {
			        var _this = _super.call(this, destination) || this;
			        _this.total = total;
			        _this.ring = new Array();
			        _this.count = 0;
			        return _this;
			    }
			    TakeLastSubscriber.prototype._next = function (value) {
			        var ring = this.ring;
			        var total = this.total;
			        var count = this.count++;
			        if (ring.length < total) {
			            ring.push(value);
			        }
			        else {
			            var index = count % total;
			            ring[index] = value;
			        }
			    };
			    TakeLastSubscriber.prototype._complete = function () {
			        var destination = this.destination;
			        var count = this.count;
			        if (count > 0) {
			            var total = this.count >= this.total ? this.total : this.count;
			            var ring = this.ring;
			            for (var i = 0; i < total; i++) {
			                var idx = (count++) % total;
			                destination.next(ring[idx]);
			            }
			        }
			        destination.complete();
			    };
			    return TakeLastSubscriber;
			}(Subscriber_1$h.Subscriber));

			Object.defineProperty(last$1, "__esModule", { value: true });
			var EmptyError_1$1 = EmptyError;
			var filter_1$2 = filter$3;
			var takeLast_1$2 = takeLast$1;
			var throwIfEmpty_1$1 = throwIfEmpty$1;
			var defaultIfEmpty_1$2 = defaultIfEmpty$1;
			var identity_1$1 = identity$1;
			function last(predicate, defaultValue) {
			    var hasDefaultValue = arguments.length >= 2;
			    return function (source) { return source.pipe(predicate ? filter_1$2.filter(function (v, i) { return predicate(v, i, source); }) : identity_1$1.identity, takeLast_1$2.takeLast(1), hasDefaultValue ? defaultIfEmpty_1$2.defaultIfEmpty(defaultValue) : throwIfEmpty_1$1.throwIfEmpty(function () { return new EmptyError_1$1.EmptyError(); })); };
			}
			last$1.last = last;

			var mapTo$1 = {};

			var __extends$u = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(mapTo$1, "__esModule", { value: true });
			var Subscriber_1$g = Subscriber$1;
			function mapTo(value) {
			    return function (source) { return source.lift(new MapToOperator(value)); };
			}
			mapTo$1.mapTo = mapTo;
			var MapToOperator = (function () {
			    function MapToOperator(value) {
			        this.value = value;
			    }
			    MapToOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new MapToSubscriber(subscriber, this.value));
			    };
			    return MapToOperator;
			}());
			var MapToSubscriber = (function (_super) {
			    __extends$u(MapToSubscriber, _super);
			    function MapToSubscriber(destination, value) {
			        var _this = _super.call(this, destination) || this;
			        _this.value = value;
			        return _this;
			    }
			    MapToSubscriber.prototype._next = function (x) {
			        this.destination.next(this.value);
			    };
			    return MapToSubscriber;
			}(Subscriber_1$g.Subscriber));

			var materialize$1 = {};

			var __extends$t = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(materialize$1, "__esModule", { value: true });
			var Subscriber_1$f = Subscriber$1;
			var Notification_1 = Notification;
			function materialize() {
			    return function materializeOperatorFunction(source) {
			        return source.lift(new MaterializeOperator());
			    };
			}
			materialize$1.materialize = materialize;
			var MaterializeOperator = (function () {
			    function MaterializeOperator() {
			    }
			    MaterializeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new MaterializeSubscriber(subscriber));
			    };
			    return MaterializeOperator;
			}());
			var MaterializeSubscriber = (function (_super) {
			    __extends$t(MaterializeSubscriber, _super);
			    function MaterializeSubscriber(destination) {
			        return _super.call(this, destination) || this;
			    }
			    MaterializeSubscriber.prototype._next = function (value) {
			        this.destination.next(Notification_1.Notification.createNext(value));
			    };
			    MaterializeSubscriber.prototype._error = function (err) {
			        var destination = this.destination;
			        destination.next(Notification_1.Notification.createError(err));
			        destination.complete();
			    };
			    MaterializeSubscriber.prototype._complete = function () {
			        var destination = this.destination;
			        destination.next(Notification_1.Notification.createComplete());
			        destination.complete();
			    };
			    return MaterializeSubscriber;
			}(Subscriber_1$f.Subscriber));

			var max$1 = {};

			var reduce$1 = {};

			var scan$1 = {};

			var __extends$s = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(scan$1, "__esModule", { value: true });
			var Subscriber_1$e = Subscriber$1;
			function scan(accumulator, seed) {
			    var hasSeed = false;
			    if (arguments.length >= 2) {
			        hasSeed = true;
			    }
			    return function scanOperatorFunction(source) {
			        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
			    };
			}
			scan$1.scan = scan;
			var ScanOperator = (function () {
			    function ScanOperator(accumulator, seed, hasSeed) {
			        if (hasSeed === void 0) { hasSeed = false; }
			        this.accumulator = accumulator;
			        this.seed = seed;
			        this.hasSeed = hasSeed;
			    }
			    ScanOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
			    };
			    return ScanOperator;
			}());
			var ScanSubscriber = (function (_super) {
			    __extends$s(ScanSubscriber, _super);
			    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
			        var _this = _super.call(this, destination) || this;
			        _this.accumulator = accumulator;
			        _this._seed = _seed;
			        _this.hasSeed = hasSeed;
			        _this.index = 0;
			        return _this;
			    }
			    Object.defineProperty(ScanSubscriber.prototype, "seed", {
			        get: function () {
			            return this._seed;
			        },
			        set: function (value) {
			            this.hasSeed = true;
			            this._seed = value;
			        },
			        enumerable: true,
			        configurable: true
			    });
			    ScanSubscriber.prototype._next = function (value) {
			        if (!this.hasSeed) {
			            this.seed = value;
			            this.destination.next(value);
			        }
			        else {
			            return this._tryNext(value);
			        }
			    };
			    ScanSubscriber.prototype._tryNext = function (value) {
			        var index = this.index++;
			        var result;
			        try {
			            result = this.accumulator(this.seed, value, index);
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			        this.seed = result;
			        this.destination.next(result);
			    };
			    return ScanSubscriber;
			}(Subscriber_1$e.Subscriber));

			Object.defineProperty(reduce$1, "__esModule", { value: true });
			var scan_1$2 = scan$1;
			var takeLast_1$1 = takeLast$1;
			var defaultIfEmpty_1$1 = defaultIfEmpty$1;
			var pipe_1 = pipe$1;
			function reduce(accumulator, seed) {
			    if (arguments.length >= 2) {
			        return function reduceOperatorFunctionWithSeed(source) {
			            return pipe_1.pipe(scan_1$2.scan(accumulator, seed), takeLast_1$1.takeLast(1), defaultIfEmpty_1$1.defaultIfEmpty(seed))(source);
			        };
			    }
			    return function reduceOperatorFunction(source) {
			        return pipe_1.pipe(scan_1$2.scan(function (acc, value, index) { return accumulator(acc, value, index + 1); }), takeLast_1$1.takeLast(1))(source);
			    };
			}
			reduce$1.reduce = reduce;

			Object.defineProperty(max$1, "__esModule", { value: true });
			var reduce_1$3 = reduce$1;
			function max(comparer) {
			    var max = (typeof comparer === 'function')
			        ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
			        : function (x, y) { return x > y ? x : y; };
			    return reduce_1$3.reduce(max);
			}
			max$1.max = max;

			var merge$1 = {};

			Object.defineProperty(merge$1, "__esModule", { value: true });
			var merge_1$1 = merge$3;
			function merge() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    return function (source) { return source.lift.call(merge_1$1.merge.apply(void 0, [source].concat(observables))); };
			}
			merge$1.merge = merge;

			var mergeMapTo$1 = {};

			Object.defineProperty(mergeMapTo$1, "__esModule", { value: true });
			var mergeMap_1$1 = mergeMap$1;
			function mergeMapTo(innerObservable, resultSelector, concurrent) {
			    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			    if (typeof resultSelector === 'function') {
			        return mergeMap_1$1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
			    }
			    if (typeof resultSelector === 'number') {
			        concurrent = resultSelector;
			    }
			    return mergeMap_1$1.mergeMap(function () { return innerObservable; }, concurrent);
			}
			mergeMapTo$1.mergeMapTo = mergeMapTo;

			var mergeScan$1 = {};

			var __extends$r = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(mergeScan$1, "__esModule", { value: true });
			var innerSubscribe_1$9 = innerSubscribe$1;
			function mergeScan(accumulator, seed, concurrent) {
			    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
			    return function (source) { return source.lift(new MergeScanOperator(accumulator, seed, concurrent)); };
			}
			mergeScan$1.mergeScan = mergeScan;
			var MergeScanOperator = (function () {
			    function MergeScanOperator(accumulator, seed, concurrent) {
			        this.accumulator = accumulator;
			        this.seed = seed;
			        this.concurrent = concurrent;
			    }
			    MergeScanOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
			    };
			    return MergeScanOperator;
			}());
			mergeScan$1.MergeScanOperator = MergeScanOperator;
			var MergeScanSubscriber = (function (_super) {
			    __extends$r(MergeScanSubscriber, _super);
			    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
			        var _this = _super.call(this, destination) || this;
			        _this.accumulator = accumulator;
			        _this.acc = acc;
			        _this.concurrent = concurrent;
			        _this.hasValue = false;
			        _this.hasCompleted = false;
			        _this.buffer = [];
			        _this.active = 0;
			        _this.index = 0;
			        return _this;
			    }
			    MergeScanSubscriber.prototype._next = function (value) {
			        if (this.active < this.concurrent) {
			            var index = this.index++;
			            var destination = this.destination;
			            var ish = void 0;
			            try {
			                var accumulator = this.accumulator;
			                ish = accumulator(this.acc, value, index);
			            }
			            catch (e) {
			                return destination.error(e);
			            }
			            this.active++;
			            this._innerSub(ish);
			        }
			        else {
			            this.buffer.push(value);
			        }
			    };
			    MergeScanSubscriber.prototype._innerSub = function (ish) {
			        var innerSubscriber = new innerSubscribe_1$9.SimpleInnerSubscriber(this);
			        var destination = this.destination;
			        destination.add(innerSubscriber);
			        var innerSubscription = innerSubscribe_1$9.innerSubscribe(ish, innerSubscriber);
			        if (innerSubscription !== innerSubscriber) {
			            destination.add(innerSubscription);
			        }
			    };
			    MergeScanSubscriber.prototype._complete = function () {
			        this.hasCompleted = true;
			        if (this.active === 0 && this.buffer.length === 0) {
			            if (this.hasValue === false) {
			                this.destination.next(this.acc);
			            }
			            this.destination.complete();
			        }
			        this.unsubscribe();
			    };
			    MergeScanSubscriber.prototype.notifyNext = function (innerValue) {
			        var destination = this.destination;
			        this.acc = innerValue;
			        this.hasValue = true;
			        destination.next(innerValue);
			    };
			    MergeScanSubscriber.prototype.notifyComplete = function () {
			        var buffer = this.buffer;
			        this.active--;
			        if (buffer.length > 0) {
			            this._next(buffer.shift());
			        }
			        else if (this.active === 0 && this.hasCompleted) {
			            if (this.hasValue === false) {
			                this.destination.next(this.acc);
			            }
			            this.destination.complete();
			        }
			    };
			    return MergeScanSubscriber;
			}(innerSubscribe_1$9.SimpleOuterSubscriber));
			mergeScan$1.MergeScanSubscriber = MergeScanSubscriber;

			var min$1 = {};

			Object.defineProperty(min$1, "__esModule", { value: true });
			var reduce_1$2 = reduce$1;
			function min(comparer) {
			    var min = (typeof comparer === 'function')
			        ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
			        : function (x, y) { return x < y ? x : y; };
			    return reduce_1$2.reduce(min);
			}
			min$1.min = min;

			var multicast$1 = {};

			Object.defineProperty(multicast$1, "__esModule", { value: true });
			var ConnectableObservable_1 = ConnectableObservable$1;
			function multicast(subjectOrSubjectFactory, selector) {
			    return function multicastOperatorFunction(source) {
			        var subjectFactory;
			        if (typeof subjectOrSubjectFactory === 'function') {
			            subjectFactory = subjectOrSubjectFactory;
			        }
			        else {
			            subjectFactory = function subjectFactory() {
			                return subjectOrSubjectFactory;
			            };
			        }
			        if (typeof selector === 'function') {
			            return source.lift(new MulticastOperator(subjectFactory, selector));
			        }
			        var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
			        connectable.source = source;
			        connectable.subjectFactory = subjectFactory;
			        return connectable;
			    };
			}
			multicast$1.multicast = multicast;
			var MulticastOperator = (function () {
			    function MulticastOperator(subjectFactory, selector) {
			        this.subjectFactory = subjectFactory;
			        this.selector = selector;
			    }
			    MulticastOperator.prototype.call = function (subscriber, source) {
			        var selector = this.selector;
			        var subject = this.subjectFactory();
			        var subscription = selector(subject).subscribe(subscriber);
			        subscription.add(source.subscribe(subject));
			        return subscription;
			    };
			    return MulticastOperator;
			}());
			multicast$1.MulticastOperator = MulticastOperator;

			var onErrorResumeNext$1 = {};

			var __extends$q = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(onErrorResumeNext$1, "__esModule", { value: true });
			var from_1$1 = from$1;
			var isArray_1$1 = isArray;
			var innerSubscribe_1$8 = innerSubscribe$1;
			function onErrorResumeNext() {
			    var nextSources = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        nextSources[_i] = arguments[_i];
			    }
			    if (nextSources.length === 1 && isArray_1$1.isArray(nextSources[0])) {
			        nextSources = nextSources[0];
			    }
			    return function (source) { return source.lift(new OnErrorResumeNextOperator(nextSources)); };
			}
			onErrorResumeNext$1.onErrorResumeNext = onErrorResumeNext;
			function onErrorResumeNextStatic() {
			    var nextSources = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        nextSources[_i] = arguments[_i];
			    }
			    var source = undefined;
			    if (nextSources.length === 1 && isArray_1$1.isArray(nextSources[0])) {
			        nextSources = nextSources[0];
			    }
			    source = nextSources.shift();
			    return from_1$1.from(source).lift(new OnErrorResumeNextOperator(nextSources));
			}
			onErrorResumeNext$1.onErrorResumeNextStatic = onErrorResumeNextStatic;
			var OnErrorResumeNextOperator = (function () {
			    function OnErrorResumeNextOperator(nextSources) {
			        this.nextSources = nextSources;
			    }
			    OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
			    };
			    return OnErrorResumeNextOperator;
			}());
			var OnErrorResumeNextSubscriber = (function (_super) {
			    __extends$q(OnErrorResumeNextSubscriber, _super);
			    function OnErrorResumeNextSubscriber(destination, nextSources) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        _this.nextSources = nextSources;
			        return _this;
			    }
			    OnErrorResumeNextSubscriber.prototype.notifyError = function () {
			        this.subscribeToNextSource();
			    };
			    OnErrorResumeNextSubscriber.prototype.notifyComplete = function () {
			        this.subscribeToNextSource();
			    };
			    OnErrorResumeNextSubscriber.prototype._error = function (err) {
			        this.subscribeToNextSource();
			        this.unsubscribe();
			    };
			    OnErrorResumeNextSubscriber.prototype._complete = function () {
			        this.subscribeToNextSource();
			        this.unsubscribe();
			    };
			    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
			        var next = this.nextSources.shift();
			        if (!!next) {
			            var innerSubscriber = new innerSubscribe_1$8.SimpleInnerSubscriber(this);
			            var destination = this.destination;
			            destination.add(innerSubscriber);
			            var innerSubscription = innerSubscribe_1$8.innerSubscribe(next, innerSubscriber);
			            if (innerSubscription !== innerSubscriber) {
			                destination.add(innerSubscription);
			            }
			        }
			        else {
			            this.destination.complete();
			        }
			    };
			    return OnErrorResumeNextSubscriber;
			}(innerSubscribe_1$8.SimpleOuterSubscriber));

			var pairwise$1 = {};

			var __extends$p = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(pairwise$1, "__esModule", { value: true });
			var Subscriber_1$d = Subscriber$1;
			function pairwise() {
			    return function (source) { return source.lift(new PairwiseOperator()); };
			}
			pairwise$1.pairwise = pairwise;
			var PairwiseOperator = (function () {
			    function PairwiseOperator() {
			    }
			    PairwiseOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new PairwiseSubscriber(subscriber));
			    };
			    return PairwiseOperator;
			}());
			var PairwiseSubscriber = (function (_super) {
			    __extends$p(PairwiseSubscriber, _super);
			    function PairwiseSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.hasPrev = false;
			        return _this;
			    }
			    PairwiseSubscriber.prototype._next = function (value) {
			        var pair;
			        if (this.hasPrev) {
			            pair = [this.prev, value];
			        }
			        else {
			            this.hasPrev = true;
			        }
			        this.prev = value;
			        if (pair) {
			            this.destination.next(pair);
			        }
			    };
			    return PairwiseSubscriber;
			}(Subscriber_1$d.Subscriber));

			var partition$1 = {};

			Object.defineProperty(partition$1, "__esModule", { value: true });
			var not_1 = not$1;
			var filter_1$1 = filter$3;
			function partition(predicate, thisArg) {
			    return function (source) { return [
			        filter_1$1.filter(predicate, thisArg)(source),
			        filter_1$1.filter(not_1.not(predicate, thisArg))(source)
			    ]; };
			}
			partition$1.partition = partition;

			var pluck$1 = {};

			Object.defineProperty(pluck$1, "__esModule", { value: true });
			var map_1$4 = map$1;
			function pluck() {
			    var properties = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        properties[_i] = arguments[_i];
			    }
			    var length = properties.length;
			    if (length === 0) {
			        throw new Error('list of properties cannot be empty.');
			    }
			    return function (source) { return map_1$4.map(plucker(properties, length))(source); };
			}
			pluck$1.pluck = pluck;
			function plucker(props, length) {
			    var mapper = function (x) {
			        var currentProp = x;
			        for (var i = 0; i < length; i++) {
			            var p = currentProp != null ? currentProp[props[i]] : undefined;
			            if (p !== void 0) {
			                currentProp = p;
			            }
			            else {
			                return undefined;
			            }
			        }
			        return currentProp;
			    };
			    return mapper;
			}

			var publish$1 = {};

			Object.defineProperty(publish$1, "__esModule", { value: true });
			var Subject_1$8 = Subject$1;
			var multicast_1$5 = multicast$1;
			function publish(selector) {
			    return selector ?
			        multicast_1$5.multicast(function () { return new Subject_1$8.Subject(); }, selector) :
			        multicast_1$5.multicast(new Subject_1$8.Subject());
			}
			publish$1.publish = publish;

			var publishBehavior$1 = {};

			Object.defineProperty(publishBehavior$1, "__esModule", { value: true });
			var BehaviorSubject_1 = BehaviorSubject$1;
			var multicast_1$4 = multicast$1;
			function publishBehavior(value) {
			    return function (source) { return multicast_1$4.multicast(new BehaviorSubject_1.BehaviorSubject(value))(source); };
			}
			publishBehavior$1.publishBehavior = publishBehavior;

			var publishLast$1 = {};

			Object.defineProperty(publishLast$1, "__esModule", { value: true });
			var AsyncSubject_1 = AsyncSubject$1;
			var multicast_1$3 = multicast$1;
			function publishLast() {
			    return function (source) { return multicast_1$3.multicast(new AsyncSubject_1.AsyncSubject())(source); };
			}
			publishLast$1.publishLast = publishLast;

			var publishReplay$1 = {};

			Object.defineProperty(publishReplay$1, "__esModule", { value: true });
			var ReplaySubject_1$1 = ReplaySubject$1;
			var multicast_1$2 = multicast$1;
			function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
			    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
			        scheduler = selectorOrScheduler;
			    }
			    var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
			    var subject = new ReplaySubject_1$1.ReplaySubject(bufferSize, windowTime, scheduler);
			    return function (source) { return multicast_1$2.multicast(function () { return subject; }, selector)(source); };
			}
			publishReplay$1.publishReplay = publishReplay;

			var race$1 = {};

			Object.defineProperty(race$1, "__esModule", { value: true });
			var isArray_1 = isArray;
			var race_1$1 = race$3;
			function race() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    return function raceOperatorFunction(source) {
			        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
			            observables = observables[0];
			        }
			        return source.lift.call(race_1$1.race.apply(void 0, [source].concat(observables)));
			    };
			}
			race$1.race = race;

			var repeat$1 = {};

			var __extends$o = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(repeat$1, "__esModule", { value: true });
			var Subscriber_1$c = Subscriber$1;
			var empty_1 = empty;
			function repeat(count) {
			    if (count === void 0) { count = -1; }
			    return function (source) {
			        if (count === 0) {
			            return empty_1.empty();
			        }
			        else if (count < 0) {
			            return source.lift(new RepeatOperator(-1, source));
			        }
			        else {
			            return source.lift(new RepeatOperator(count - 1, source));
			        }
			    };
			}
			repeat$1.repeat = repeat;
			var RepeatOperator = (function () {
			    function RepeatOperator(count, source) {
			        this.count = count;
			        this.source = source;
			    }
			    RepeatOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
			    };
			    return RepeatOperator;
			}());
			var RepeatSubscriber = (function (_super) {
			    __extends$o(RepeatSubscriber, _super);
			    function RepeatSubscriber(destination, count, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.count = count;
			        _this.source = source;
			        return _this;
			    }
			    RepeatSubscriber.prototype.complete = function () {
			        if (!this.isStopped) {
			            var _a = this, source = _a.source, count = _a.count;
			            if (count === 0) {
			                return _super.prototype.complete.call(this);
			            }
			            else if (count > -1) {
			                this.count = count - 1;
			            }
			            source.subscribe(this._unsubscribeAndRecycle());
			        }
			    };
			    return RepeatSubscriber;
			}(Subscriber_1$c.Subscriber));

			var repeatWhen$1 = {};

			var __extends$n = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(repeatWhen$1, "__esModule", { value: true });
			var Subject_1$7 = Subject$1;
			var innerSubscribe_1$7 = innerSubscribe$1;
			function repeatWhen(notifier) {
			    return function (source) { return source.lift(new RepeatWhenOperator(notifier)); };
			}
			repeatWhen$1.repeatWhen = repeatWhen;
			var RepeatWhenOperator = (function () {
			    function RepeatWhenOperator(notifier) {
			        this.notifier = notifier;
			    }
			    RepeatWhenOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
			    };
			    return RepeatWhenOperator;
			}());
			var RepeatWhenSubscriber = (function (_super) {
			    __extends$n(RepeatWhenSubscriber, _super);
			    function RepeatWhenSubscriber(destination, notifier, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.notifier = notifier;
			        _this.source = source;
			        _this.sourceIsBeingSubscribedTo = true;
			        return _this;
			    }
			    RepeatWhenSubscriber.prototype.notifyNext = function () {
			        this.sourceIsBeingSubscribedTo = true;
			        this.source.subscribe(this);
			    };
			    RepeatWhenSubscriber.prototype.notifyComplete = function () {
			        if (this.sourceIsBeingSubscribedTo === false) {
			            return _super.prototype.complete.call(this);
			        }
			    };
			    RepeatWhenSubscriber.prototype.complete = function () {
			        this.sourceIsBeingSubscribedTo = false;
			        if (!this.isStopped) {
			            if (!this.retries) {
			                this.subscribeToRetries();
			            }
			            if (!this.retriesSubscription || this.retriesSubscription.closed) {
			                return _super.prototype.complete.call(this);
			            }
			            this._unsubscribeAndRecycle();
			            this.notifications.next(undefined);
			        }
			    };
			    RepeatWhenSubscriber.prototype._unsubscribe = function () {
			        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
			        if (notifications) {
			            notifications.unsubscribe();
			            this.notifications = undefined;
			        }
			        if (retriesSubscription) {
			            retriesSubscription.unsubscribe();
			            this.retriesSubscription = undefined;
			        }
			        this.retries = undefined;
			    };
			    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
			        var _unsubscribe = this._unsubscribe;
			        this._unsubscribe = null;
			        _super.prototype._unsubscribeAndRecycle.call(this);
			        this._unsubscribe = _unsubscribe;
			        return this;
			    };
			    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
			        this.notifications = new Subject_1$7.Subject();
			        var retries;
			        try {
			            var notifier = this.notifier;
			            retries = notifier(this.notifications);
			        }
			        catch (e) {
			            return _super.prototype.complete.call(this);
			        }
			        this.retries = retries;
			        this.retriesSubscription = innerSubscribe_1$7.innerSubscribe(retries, new innerSubscribe_1$7.SimpleInnerSubscriber(this));
			    };
			    return RepeatWhenSubscriber;
			}(innerSubscribe_1$7.SimpleOuterSubscriber));

			var retry$1 = {};

			var __extends$m = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(retry$1, "__esModule", { value: true });
			var Subscriber_1$b = Subscriber$1;
			function retry(count) {
			    if (count === void 0) { count = -1; }
			    return function (source) { return source.lift(new RetryOperator(count, source)); };
			}
			retry$1.retry = retry;
			var RetryOperator = (function () {
			    function RetryOperator(count, source) {
			        this.count = count;
			        this.source = source;
			    }
			    RetryOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
			    };
			    return RetryOperator;
			}());
			var RetrySubscriber = (function (_super) {
			    __extends$m(RetrySubscriber, _super);
			    function RetrySubscriber(destination, count, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.count = count;
			        _this.source = source;
			        return _this;
			    }
			    RetrySubscriber.prototype.error = function (err) {
			        if (!this.isStopped) {
			            var _a = this, source = _a.source, count = _a.count;
			            if (count === 0) {
			                return _super.prototype.error.call(this, err);
			            }
			            else if (count > -1) {
			                this.count = count - 1;
			            }
			            source.subscribe(this._unsubscribeAndRecycle());
			        }
			    };
			    return RetrySubscriber;
			}(Subscriber_1$b.Subscriber));

			var retryWhen$1 = {};

			var __extends$l = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(retryWhen$1, "__esModule", { value: true });
			var Subject_1$6 = Subject$1;
			var innerSubscribe_1$6 = innerSubscribe$1;
			function retryWhen(notifier) {
			    return function (source) { return source.lift(new RetryWhenOperator(notifier, source)); };
			}
			retryWhen$1.retryWhen = retryWhen;
			var RetryWhenOperator = (function () {
			    function RetryWhenOperator(notifier, source) {
			        this.notifier = notifier;
			        this.source = source;
			    }
			    RetryWhenOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
			    };
			    return RetryWhenOperator;
			}());
			var RetryWhenSubscriber = (function (_super) {
			    __extends$l(RetryWhenSubscriber, _super);
			    function RetryWhenSubscriber(destination, notifier, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.notifier = notifier;
			        _this.source = source;
			        return _this;
			    }
			    RetryWhenSubscriber.prototype.error = function (err) {
			        if (!this.isStopped) {
			            var errors = this.errors;
			            var retries = this.retries;
			            var retriesSubscription = this.retriesSubscription;
			            if (!retries) {
			                errors = new Subject_1$6.Subject();
			                try {
			                    var notifier = this.notifier;
			                    retries = notifier(errors);
			                }
			                catch (e) {
			                    return _super.prototype.error.call(this, e);
			                }
			                retriesSubscription = innerSubscribe_1$6.innerSubscribe(retries, new innerSubscribe_1$6.SimpleInnerSubscriber(this));
			            }
			            else {
			                this.errors = undefined;
			                this.retriesSubscription = undefined;
			            }
			            this._unsubscribeAndRecycle();
			            this.errors = errors;
			            this.retries = retries;
			            this.retriesSubscription = retriesSubscription;
			            errors.next(err);
			        }
			    };
			    RetryWhenSubscriber.prototype._unsubscribe = function () {
			        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
			        if (errors) {
			            errors.unsubscribe();
			            this.errors = undefined;
			        }
			        if (retriesSubscription) {
			            retriesSubscription.unsubscribe();
			            this.retriesSubscription = undefined;
			        }
			        this.retries = undefined;
			    };
			    RetryWhenSubscriber.prototype.notifyNext = function () {
			        var _unsubscribe = this._unsubscribe;
			        this._unsubscribe = null;
			        this._unsubscribeAndRecycle();
			        this._unsubscribe = _unsubscribe;
			        this.source.subscribe(this);
			    };
			    return RetryWhenSubscriber;
			}(innerSubscribe_1$6.SimpleOuterSubscriber));

			var sample$1 = {};

			var __extends$k = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(sample$1, "__esModule", { value: true });
			var innerSubscribe_1$5 = innerSubscribe$1;
			function sample(notifier) {
			    return function (source) { return source.lift(new SampleOperator(notifier)); };
			}
			sample$1.sample = sample;
			var SampleOperator = (function () {
			    function SampleOperator(notifier) {
			        this.notifier = notifier;
			    }
			    SampleOperator.prototype.call = function (subscriber, source) {
			        var sampleSubscriber = new SampleSubscriber(subscriber);
			        var subscription = source.subscribe(sampleSubscriber);
			        subscription.add(innerSubscribe_1$5.innerSubscribe(this.notifier, new innerSubscribe_1$5.SimpleInnerSubscriber(sampleSubscriber)));
			        return subscription;
			    };
			    return SampleOperator;
			}());
			var SampleSubscriber = (function (_super) {
			    __extends$k(SampleSubscriber, _super);
			    function SampleSubscriber() {
			        var _this = _super !== null && _super.apply(this, arguments) || this;
			        _this.hasValue = false;
			        return _this;
			    }
			    SampleSubscriber.prototype._next = function (value) {
			        this.value = value;
			        this.hasValue = true;
			    };
			    SampleSubscriber.prototype.notifyNext = function () {
			        this.emitValue();
			    };
			    SampleSubscriber.prototype.notifyComplete = function () {
			        this.emitValue();
			    };
			    SampleSubscriber.prototype.emitValue = function () {
			        if (this.hasValue) {
			            this.hasValue = false;
			            this.destination.next(this.value);
			        }
			    };
			    return SampleSubscriber;
			}(innerSubscribe_1$5.SimpleOuterSubscriber));

			var sampleTime$1 = {};

			var __extends$j = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(sampleTime$1, "__esModule", { value: true });
			var Subscriber_1$a = Subscriber$1;
			var async_1$6 = async;
			function sampleTime(period, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$6.async; }
			    return function (source) { return source.lift(new SampleTimeOperator(period, scheduler)); };
			}
			sampleTime$1.sampleTime = sampleTime;
			var SampleTimeOperator = (function () {
			    function SampleTimeOperator(period, scheduler) {
			        this.period = period;
			        this.scheduler = scheduler;
			    }
			    SampleTimeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
			    };
			    return SampleTimeOperator;
			}());
			var SampleTimeSubscriber = (function (_super) {
			    __extends$j(SampleTimeSubscriber, _super);
			    function SampleTimeSubscriber(destination, period, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.period = period;
			        _this.scheduler = scheduler;
			        _this.hasValue = false;
			        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
			        return _this;
			    }
			    SampleTimeSubscriber.prototype._next = function (value) {
			        this.lastValue = value;
			        this.hasValue = true;
			    };
			    SampleTimeSubscriber.prototype.notifyNext = function () {
			        if (this.hasValue) {
			            this.hasValue = false;
			            this.destination.next(this.lastValue);
			        }
			    };
			    return SampleTimeSubscriber;
			}(Subscriber_1$a.Subscriber));
			function dispatchNotification(state) {
			    var subscriber = state.subscriber, period = state.period;
			    subscriber.notifyNext();
			    this.schedule(state, period);
			}

			var sequenceEqual$1 = {};

			var __extends$i = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(sequenceEqual$1, "__esModule", { value: true });
			var Subscriber_1$9 = Subscriber$1;
			function sequenceEqual(compareTo, comparator) {
			    return function (source) { return source.lift(new SequenceEqualOperator(compareTo, comparator)); };
			}
			sequenceEqual$1.sequenceEqual = sequenceEqual;
			var SequenceEqualOperator = (function () {
			    function SequenceEqualOperator(compareTo, comparator) {
			        this.compareTo = compareTo;
			        this.comparator = comparator;
			    }
			    SequenceEqualOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparator));
			    };
			    return SequenceEqualOperator;
			}());
			sequenceEqual$1.SequenceEqualOperator = SequenceEqualOperator;
			var SequenceEqualSubscriber = (function (_super) {
			    __extends$i(SequenceEqualSubscriber, _super);
			    function SequenceEqualSubscriber(destination, compareTo, comparator) {
			        var _this = _super.call(this, destination) || this;
			        _this.compareTo = compareTo;
			        _this.comparator = comparator;
			        _this._a = [];
			        _this._b = [];
			        _this._oneComplete = false;
			        _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
			        return _this;
			    }
			    SequenceEqualSubscriber.prototype._next = function (value) {
			        if (this._oneComplete && this._b.length === 0) {
			            this.emit(false);
			        }
			        else {
			            this._a.push(value);
			            this.checkValues();
			        }
			    };
			    SequenceEqualSubscriber.prototype._complete = function () {
			        if (this._oneComplete) {
			            this.emit(this._a.length === 0 && this._b.length === 0);
			        }
			        else {
			            this._oneComplete = true;
			        }
			        this.unsubscribe();
			    };
			    SequenceEqualSubscriber.prototype.checkValues = function () {
			        var _c = this, _a = _c._a, _b = _c._b, comparator = _c.comparator;
			        while (_a.length > 0 && _b.length > 0) {
			            var a = _a.shift();
			            var b = _b.shift();
			            var areEqual = false;
			            try {
			                areEqual = comparator ? comparator(a, b) : a === b;
			            }
			            catch (e) {
			                this.destination.error(e);
			            }
			            if (!areEqual) {
			                this.emit(false);
			            }
			        }
			    };
			    SequenceEqualSubscriber.prototype.emit = function (value) {
			        var destination = this.destination;
			        destination.next(value);
			        destination.complete();
			    };
			    SequenceEqualSubscriber.prototype.nextB = function (value) {
			        if (this._oneComplete && this._a.length === 0) {
			            this.emit(false);
			        }
			        else {
			            this._b.push(value);
			            this.checkValues();
			        }
			    };
			    SequenceEqualSubscriber.prototype.completeB = function () {
			        if (this._oneComplete) {
			            this.emit(this._a.length === 0 && this._b.length === 0);
			        }
			        else {
			            this._oneComplete = true;
			        }
			    };
			    return SequenceEqualSubscriber;
			}(Subscriber_1$9.Subscriber));
			sequenceEqual$1.SequenceEqualSubscriber = SequenceEqualSubscriber;
			var SequenceEqualCompareToSubscriber = (function (_super) {
			    __extends$i(SequenceEqualCompareToSubscriber, _super);
			    function SequenceEqualCompareToSubscriber(destination, parent) {
			        var _this = _super.call(this, destination) || this;
			        _this.parent = parent;
			        return _this;
			    }
			    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
			        this.parent.nextB(value);
			    };
			    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
			        this.parent.error(err);
			        this.unsubscribe();
			    };
			    SequenceEqualCompareToSubscriber.prototype._complete = function () {
			        this.parent.completeB();
			        this.unsubscribe();
			    };
			    return SequenceEqualCompareToSubscriber;
			}(Subscriber_1$9.Subscriber));

			var share$1 = {};

			Object.defineProperty(share$1, "__esModule", { value: true });
			var multicast_1$1 = multicast$1;
			var refCount_1$1 = refCount$1;
			var Subject_1$5 = Subject$1;
			function shareSubjectFactory() {
			    return new Subject_1$5.Subject();
			}
			function share() {
			    return function (source) { return refCount_1$1.refCount()(multicast_1$1.multicast(shareSubjectFactory)(source)); };
			}
			share$1.share = share;

			var shareReplay$1 = {};

			Object.defineProperty(shareReplay$1, "__esModule", { value: true });
			var ReplaySubject_1 = ReplaySubject$1;
			function shareReplay(configOrBufferSize, windowTime, scheduler) {
			    var config;
			    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
			        config = configOrBufferSize;
			    }
			    else {
			        config = {
			            bufferSize: configOrBufferSize,
			            windowTime: windowTime,
			            refCount: false,
			            scheduler: scheduler
			        };
			    }
			    return function (source) { return source.lift(shareReplayOperator(config)); };
			}
			shareReplay$1.shareReplay = shareReplay;
			function shareReplayOperator(_a) {
			    var _b = _a.bufferSize, bufferSize = _b === void 0 ? Number.POSITIVE_INFINITY : _b, _c = _a.windowTime, windowTime = _c === void 0 ? Number.POSITIVE_INFINITY : _c, useRefCount = _a.refCount, scheduler = _a.scheduler;
			    var subject;
			    var refCount = 0;
			    var subscription;
			    var hasError = false;
			    var isComplete = false;
			    return function shareReplayOperation(source) {
			        refCount++;
			        var innerSub;
			        if (!subject || hasError) {
			            hasError = false;
			            subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
			            innerSub = subject.subscribe(this);
			            subscription = source.subscribe({
			                next: function (value) { subject.next(value); },
			                error: function (err) {
			                    hasError = true;
			                    subject.error(err);
			                },
			                complete: function () {
			                    isComplete = true;
			                    subscription = undefined;
			                    subject.complete();
			                },
			            });
			        }
			        else {
			            innerSub = subject.subscribe(this);
			        }
			        this.add(function () {
			            refCount--;
			            innerSub.unsubscribe();
			            if (subscription && !isComplete && useRefCount && refCount === 0) {
			                subscription.unsubscribe();
			                subscription = undefined;
			                subject = undefined;
			            }
			        });
			    };
			}

			var single$1 = {};

			var __extends$h = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(single$1, "__esModule", { value: true });
			var Subscriber_1$8 = Subscriber$1;
			var EmptyError_1 = EmptyError;
			function single(predicate) {
			    return function (source) { return source.lift(new SingleOperator(predicate, source)); };
			}
			single$1.single = single;
			var SingleOperator = (function () {
			    function SingleOperator(predicate, source) {
			        this.predicate = predicate;
			        this.source = source;
			    }
			    SingleOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
			    };
			    return SingleOperator;
			}());
			var SingleSubscriber = (function (_super) {
			    __extends$h(SingleSubscriber, _super);
			    function SingleSubscriber(destination, predicate, source) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.source = source;
			        _this.seenValue = false;
			        _this.index = 0;
			        return _this;
			    }
			    SingleSubscriber.prototype.applySingleValue = function (value) {
			        if (this.seenValue) {
			            this.destination.error('Sequence contains more than one element');
			        }
			        else {
			            this.seenValue = true;
			            this.singleValue = value;
			        }
			    };
			    SingleSubscriber.prototype._next = function (value) {
			        var index = this.index++;
			        if (this.predicate) {
			            this.tryNext(value, index);
			        }
			        else {
			            this.applySingleValue(value);
			        }
			    };
			    SingleSubscriber.prototype.tryNext = function (value, index) {
			        try {
			            if (this.predicate(value, index, this.source)) {
			                this.applySingleValue(value);
			            }
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			    };
			    SingleSubscriber.prototype._complete = function () {
			        var destination = this.destination;
			        if (this.index > 0) {
			            destination.next(this.seenValue ? this.singleValue : undefined);
			            destination.complete();
			        }
			        else {
			            destination.error(new EmptyError_1.EmptyError);
			        }
			    };
			    return SingleSubscriber;
			}(Subscriber_1$8.Subscriber));

			var skip$1 = {};

			var __extends$g = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(skip$1, "__esModule", { value: true });
			var Subscriber_1$7 = Subscriber$1;
			function skip(count) {
			    return function (source) { return source.lift(new SkipOperator(count)); };
			}
			skip$1.skip = skip;
			var SkipOperator = (function () {
			    function SkipOperator(total) {
			        this.total = total;
			    }
			    SkipOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SkipSubscriber(subscriber, this.total));
			    };
			    return SkipOperator;
			}());
			var SkipSubscriber = (function (_super) {
			    __extends$g(SkipSubscriber, _super);
			    function SkipSubscriber(destination, total) {
			        var _this = _super.call(this, destination) || this;
			        _this.total = total;
			        _this.count = 0;
			        return _this;
			    }
			    SkipSubscriber.prototype._next = function (x) {
			        if (++this.count > this.total) {
			            this.destination.next(x);
			        }
			    };
			    return SkipSubscriber;
			}(Subscriber_1$7.Subscriber));

			var skipLast$1 = {};

			var __extends$f = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(skipLast$1, "__esModule", { value: true });
			var Subscriber_1$6 = Subscriber$1;
			var ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError;
			function skipLast(count) {
			    return function (source) { return source.lift(new SkipLastOperator(count)); };
			}
			skipLast$1.skipLast = skipLast;
			var SkipLastOperator = (function () {
			    function SkipLastOperator(_skipCount) {
			        this._skipCount = _skipCount;
			        if (this._skipCount < 0) {
			            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
			        }
			    }
			    SkipLastOperator.prototype.call = function (subscriber, source) {
			        if (this._skipCount === 0) {
			            return source.subscribe(new Subscriber_1$6.Subscriber(subscriber));
			        }
			        else {
			            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
			        }
			    };
			    return SkipLastOperator;
			}());
			var SkipLastSubscriber = (function (_super) {
			    __extends$f(SkipLastSubscriber, _super);
			    function SkipLastSubscriber(destination, _skipCount) {
			        var _this = _super.call(this, destination) || this;
			        _this._skipCount = _skipCount;
			        _this._count = 0;
			        _this._ring = new Array(_skipCount);
			        return _this;
			    }
			    SkipLastSubscriber.prototype._next = function (value) {
			        var skipCount = this._skipCount;
			        var count = this._count++;
			        if (count < skipCount) {
			            this._ring[count] = value;
			        }
			        else {
			            var currentIndex = count % skipCount;
			            var ring = this._ring;
			            var oldValue = ring[currentIndex];
			            ring[currentIndex] = value;
			            this.destination.next(oldValue);
			        }
			    };
			    return SkipLastSubscriber;
			}(Subscriber_1$6.Subscriber));

			var skipUntil$1 = {};

			var __extends$e = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(skipUntil$1, "__esModule", { value: true });
			var innerSubscribe_1$4 = innerSubscribe$1;
			function skipUntil(notifier) {
			    return function (source) { return source.lift(new SkipUntilOperator(notifier)); };
			}
			skipUntil$1.skipUntil = skipUntil;
			var SkipUntilOperator = (function () {
			    function SkipUntilOperator(notifier) {
			        this.notifier = notifier;
			    }
			    SkipUntilOperator.prototype.call = function (destination, source) {
			        return source.subscribe(new SkipUntilSubscriber(destination, this.notifier));
			    };
			    return SkipUntilOperator;
			}());
			var SkipUntilSubscriber = (function (_super) {
			    __extends$e(SkipUntilSubscriber, _super);
			    function SkipUntilSubscriber(destination, notifier) {
			        var _this = _super.call(this, destination) || this;
			        _this.hasValue = false;
			        var innerSubscriber = new innerSubscribe_1$4.SimpleInnerSubscriber(_this);
			        _this.add(innerSubscriber);
			        _this.innerSubscription = innerSubscriber;
			        var innerSubscription = innerSubscribe_1$4.innerSubscribe(notifier, innerSubscriber);
			        if (innerSubscription !== innerSubscriber) {
			            _this.add(innerSubscription);
			            _this.innerSubscription = innerSubscription;
			        }
			        return _this;
			    }
			    SkipUntilSubscriber.prototype._next = function (value) {
			        if (this.hasValue) {
			            _super.prototype._next.call(this, value);
			        }
			    };
			    SkipUntilSubscriber.prototype.notifyNext = function () {
			        this.hasValue = true;
			        if (this.innerSubscription) {
			            this.innerSubscription.unsubscribe();
			        }
			    };
			    SkipUntilSubscriber.prototype.notifyComplete = function () {
			    };
			    return SkipUntilSubscriber;
			}(innerSubscribe_1$4.SimpleOuterSubscriber));

			var skipWhile$1 = {};

			var __extends$d = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(skipWhile$1, "__esModule", { value: true });
			var Subscriber_1$5 = Subscriber$1;
			function skipWhile(predicate) {
			    return function (source) { return source.lift(new SkipWhileOperator(predicate)); };
			}
			skipWhile$1.skipWhile = skipWhile;
			var SkipWhileOperator = (function () {
			    function SkipWhileOperator(predicate) {
			        this.predicate = predicate;
			    }
			    SkipWhileOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
			    };
			    return SkipWhileOperator;
			}());
			var SkipWhileSubscriber = (function (_super) {
			    __extends$d(SkipWhileSubscriber, _super);
			    function SkipWhileSubscriber(destination, predicate) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.skipping = true;
			        _this.index = 0;
			        return _this;
			    }
			    SkipWhileSubscriber.prototype._next = function (value) {
			        var destination = this.destination;
			        if (this.skipping) {
			            this.tryCallPredicate(value);
			        }
			        if (!this.skipping) {
			            destination.next(value);
			        }
			    };
			    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
			        try {
			            var result = this.predicate(value, this.index++);
			            this.skipping = Boolean(result);
			        }
			        catch (err) {
			            this.destination.error(err);
			        }
			    };
			    return SkipWhileSubscriber;
			}(Subscriber_1$5.Subscriber));

			var startWith$1 = {};

			Object.defineProperty(startWith$1, "__esModule", { value: true });
			var concat_1$1 = concat$3;
			var isScheduler_1$1 = isScheduler$1;
			function startWith() {
			    var array = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        array[_i] = arguments[_i];
			    }
			    var scheduler = array[array.length - 1];
			    if (isScheduler_1$1.isScheduler(scheduler)) {
			        array.pop();
			        return function (source) { return concat_1$1.concat(array, source, scheduler); };
			    }
			    else {
			        return function (source) { return concat_1$1.concat(array, source); };
			    }
			}
			startWith$1.startWith = startWith;

			var subscribeOn$1 = {};

			var SubscribeOnObservable$1 = {};

			var __extends$c = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(SubscribeOnObservable$1, "__esModule", { value: true });
			var Observable_1 = Observable$1;
			var asap_1 = asap;
			var isNumeric_1$1 = isNumeric$1;
			var SubscribeOnObservable = (function (_super) {
			    __extends$c(SubscribeOnObservable, _super);
			    function SubscribeOnObservable(source, delayTime, scheduler) {
			        if (delayTime === void 0) { delayTime = 0; }
			        if (scheduler === void 0) { scheduler = asap_1.asap; }
			        var _this = _super.call(this) || this;
			        _this.source = source;
			        _this.delayTime = delayTime;
			        _this.scheduler = scheduler;
			        if (!isNumeric_1$1.isNumeric(delayTime) || delayTime < 0) {
			            _this.delayTime = 0;
			        }
			        if (!scheduler || typeof scheduler.schedule !== 'function') {
			            _this.scheduler = asap_1.asap;
			        }
			        return _this;
			    }
			    SubscribeOnObservable.create = function (source, delay, scheduler) {
			        if (delay === void 0) { delay = 0; }
			        if (scheduler === void 0) { scheduler = asap_1.asap; }
			        return new SubscribeOnObservable(source, delay, scheduler);
			    };
			    SubscribeOnObservable.dispatch = function (arg) {
			        var source = arg.source, subscriber = arg.subscriber;
			        return this.add(source.subscribe(subscriber));
			    };
			    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
			        var delay = this.delayTime;
			        var source = this.source;
			        var scheduler = this.scheduler;
			        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
			            source: source, subscriber: subscriber
			        });
			    };
			    return SubscribeOnObservable;
			}(Observable_1.Observable));
			SubscribeOnObservable$1.SubscribeOnObservable = SubscribeOnObservable;

			Object.defineProperty(subscribeOn$1, "__esModule", { value: true });
			var SubscribeOnObservable_1 = SubscribeOnObservable$1;
			function subscribeOn(scheduler, delay) {
			    if (delay === void 0) { delay = 0; }
			    return function subscribeOnOperatorFunction(source) {
			        return source.lift(new SubscribeOnOperator(scheduler, delay));
			    };
			}
			subscribeOn$1.subscribeOn = subscribeOn;
			var SubscribeOnOperator = (function () {
			    function SubscribeOnOperator(scheduler, delay) {
			        this.scheduler = scheduler;
			        this.delay = delay;
			    }
			    SubscribeOnOperator.prototype.call = function (subscriber, source) {
			        return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
			    };
			    return SubscribeOnOperator;
			}());

			var switchAll$1 = {};

			var switchMap$1 = {};

			var __extends$b = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(switchMap$1, "__esModule", { value: true });
			var map_1$3 = map$1;
			var from_1 = from$1;
			var innerSubscribe_1$3 = innerSubscribe$1;
			function switchMap(project, resultSelector) {
			    if (typeof resultSelector === 'function') {
			        return function (source) { return source.pipe(switchMap(function (a, i) { return from_1.from(project(a, i)).pipe(map_1$3.map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
			    }
			    return function (source) { return source.lift(new SwitchMapOperator(project)); };
			}
			switchMap$1.switchMap = switchMap;
			var SwitchMapOperator = (function () {
			    function SwitchMapOperator(project) {
			        this.project = project;
			    }
			    SwitchMapOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
			    };
			    return SwitchMapOperator;
			}());
			var SwitchMapSubscriber = (function (_super) {
			    __extends$b(SwitchMapSubscriber, _super);
			    function SwitchMapSubscriber(destination, project) {
			        var _this = _super.call(this, destination) || this;
			        _this.project = project;
			        _this.index = 0;
			        return _this;
			    }
			    SwitchMapSubscriber.prototype._next = function (value) {
			        var result;
			        var index = this.index++;
			        try {
			            result = this.project(value, index);
			        }
			        catch (error) {
			            this.destination.error(error);
			            return;
			        }
			        this._innerSub(result);
			    };
			    SwitchMapSubscriber.prototype._innerSub = function (result) {
			        var innerSubscription = this.innerSubscription;
			        if (innerSubscription) {
			            innerSubscription.unsubscribe();
			        }
			        var innerSubscriber = new innerSubscribe_1$3.SimpleInnerSubscriber(this);
			        var destination = this.destination;
			        destination.add(innerSubscriber);
			        this.innerSubscription = innerSubscribe_1$3.innerSubscribe(result, innerSubscriber);
			        if (this.innerSubscription !== innerSubscriber) {
			            destination.add(this.innerSubscription);
			        }
			    };
			    SwitchMapSubscriber.prototype._complete = function () {
			        var innerSubscription = this.innerSubscription;
			        if (!innerSubscription || innerSubscription.closed) {
			            _super.prototype._complete.call(this);
			        }
			        this.unsubscribe();
			    };
			    SwitchMapSubscriber.prototype._unsubscribe = function () {
			        this.innerSubscription = undefined;
			    };
			    SwitchMapSubscriber.prototype.notifyComplete = function () {
			        this.innerSubscription = undefined;
			        if (this.isStopped) {
			            _super.prototype._complete.call(this);
			        }
			    };
			    SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
			        this.destination.next(innerValue);
			    };
			    return SwitchMapSubscriber;
			}(innerSubscribe_1$3.SimpleOuterSubscriber));

			Object.defineProperty(switchAll$1, "__esModule", { value: true });
			var switchMap_1$2 = switchMap$1;
			var identity_1 = identity$1;
			function switchAll() {
			    return switchMap_1$2.switchMap(identity_1.identity);
			}
			switchAll$1.switchAll = switchAll;

			var switchMapTo$1 = {};

			Object.defineProperty(switchMapTo$1, "__esModule", { value: true });
			var switchMap_1$1 = switchMap$1;
			function switchMapTo(innerObservable, resultSelector) {
			    return resultSelector ? switchMap_1$1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1$1.switchMap(function () { return innerObservable; });
			}
			switchMapTo$1.switchMapTo = switchMapTo;

			var takeUntil$1 = {};

			var __extends$a = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(takeUntil$1, "__esModule", { value: true });
			var innerSubscribe_1$2 = innerSubscribe$1;
			function takeUntil(notifier) {
			    return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
			}
			takeUntil$1.takeUntil = takeUntil;
			var TakeUntilOperator = (function () {
			    function TakeUntilOperator(notifier) {
			        this.notifier = notifier;
			    }
			    TakeUntilOperator.prototype.call = function (subscriber, source) {
			        var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
			        var notifierSubscription = innerSubscribe_1$2.innerSubscribe(this.notifier, new innerSubscribe_1$2.SimpleInnerSubscriber(takeUntilSubscriber));
			        if (notifierSubscription && !takeUntilSubscriber.seenValue) {
			            takeUntilSubscriber.add(notifierSubscription);
			            return source.subscribe(takeUntilSubscriber);
			        }
			        return takeUntilSubscriber;
			    };
			    return TakeUntilOperator;
			}());
			var TakeUntilSubscriber = (function (_super) {
			    __extends$a(TakeUntilSubscriber, _super);
			    function TakeUntilSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.seenValue = false;
			        return _this;
			    }
			    TakeUntilSubscriber.prototype.notifyNext = function () {
			        this.seenValue = true;
			        this.complete();
			    };
			    TakeUntilSubscriber.prototype.notifyComplete = function () {
			    };
			    return TakeUntilSubscriber;
			}(innerSubscribe_1$2.SimpleOuterSubscriber));

			var takeWhile$1 = {};

			var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(takeWhile$1, "__esModule", { value: true });
			var Subscriber_1$4 = Subscriber$1;
			function takeWhile(predicate, inclusive) {
			    if (inclusive === void 0) { inclusive = false; }
			    return function (source) {
			        return source.lift(new TakeWhileOperator(predicate, inclusive));
			    };
			}
			takeWhile$1.takeWhile = takeWhile;
			var TakeWhileOperator = (function () {
			    function TakeWhileOperator(predicate, inclusive) {
			        this.predicate = predicate;
			        this.inclusive = inclusive;
			    }
			    TakeWhileOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate, this.inclusive));
			    };
			    return TakeWhileOperator;
			}());
			var TakeWhileSubscriber = (function (_super) {
			    __extends$9(TakeWhileSubscriber, _super);
			    function TakeWhileSubscriber(destination, predicate, inclusive) {
			        var _this = _super.call(this, destination) || this;
			        _this.predicate = predicate;
			        _this.inclusive = inclusive;
			        _this.index = 0;
			        return _this;
			    }
			    TakeWhileSubscriber.prototype._next = function (value) {
			        var destination = this.destination;
			        var result;
			        try {
			            result = this.predicate(value, this.index++);
			        }
			        catch (err) {
			            destination.error(err);
			            return;
			        }
			        this.nextOrComplete(value, result);
			    };
			    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
			        var destination = this.destination;
			        if (Boolean(predicateResult)) {
			            destination.next(value);
			        }
			        else {
			            if (this.inclusive) {
			                destination.next(value);
			            }
			            destination.complete();
			        }
			    };
			    return TakeWhileSubscriber;
			}(Subscriber_1$4.Subscriber));

			var tap$1 = {};

			var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(tap$1, "__esModule", { value: true });
			var Subscriber_1$3 = Subscriber$1;
			var noop_1 = noop$1;
			var isFunction_1 = isFunction$1;
			function tap(nextOrObserver, error, complete) {
			    return function tapOperatorFunction(source) {
			        return source.lift(new DoOperator(nextOrObserver, error, complete));
			    };
			}
			tap$1.tap = tap;
			var DoOperator = (function () {
			    function DoOperator(nextOrObserver, error, complete) {
			        this.nextOrObserver = nextOrObserver;
			        this.error = error;
			        this.complete = complete;
			    }
			    DoOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
			    };
			    return DoOperator;
			}());
			var TapSubscriber = (function (_super) {
			    __extends$8(TapSubscriber, _super);
			    function TapSubscriber(destination, observerOrNext, error, complete) {
			        var _this = _super.call(this, destination) || this;
			        _this._tapNext = noop_1.noop;
			        _this._tapError = noop_1.noop;
			        _this._tapComplete = noop_1.noop;
			        _this._tapError = error || noop_1.noop;
			        _this._tapComplete = complete || noop_1.noop;
			        if (isFunction_1.isFunction(observerOrNext)) {
			            _this._context = _this;
			            _this._tapNext = observerOrNext;
			        }
			        else if (observerOrNext) {
			            _this._context = observerOrNext;
			            _this._tapNext = observerOrNext.next || noop_1.noop;
			            _this._tapError = observerOrNext.error || noop_1.noop;
			            _this._tapComplete = observerOrNext.complete || noop_1.noop;
			        }
			        return _this;
			    }
			    TapSubscriber.prototype._next = function (value) {
			        try {
			            this._tapNext.call(this._context, value);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.next(value);
			    };
			    TapSubscriber.prototype._error = function (err) {
			        try {
			            this._tapError.call(this._context, err);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.error(err);
			    };
			    TapSubscriber.prototype._complete = function () {
			        try {
			            this._tapComplete.call(this._context);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        return this.destination.complete();
			    };
			    return TapSubscriber;
			}(Subscriber_1$3.Subscriber));

			var throttle = {};

			(function (exports) {
			var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(exports, "__esModule", { value: true });
			var innerSubscribe_1 = innerSubscribe$1;
			exports.defaultThrottleConfig = {
			    leading: true,
			    trailing: false
			};
			function throttle(durationSelector, config) {
			    if (config === void 0) { config = exports.defaultThrottleConfig; }
			    return function (source) { return source.lift(new ThrottleOperator(durationSelector, !!config.leading, !!config.trailing)); };
			}
			exports.throttle = throttle;
			var ThrottleOperator = (function () {
			    function ThrottleOperator(durationSelector, leading, trailing) {
			        this.durationSelector = durationSelector;
			        this.leading = leading;
			        this.trailing = trailing;
			    }
			    ThrottleOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
			    };
			    return ThrottleOperator;
			}());
			var ThrottleSubscriber = (function (_super) {
			    __extends(ThrottleSubscriber, _super);
			    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        _this.durationSelector = durationSelector;
			        _this._leading = _leading;
			        _this._trailing = _trailing;
			        _this._hasValue = false;
			        return _this;
			    }
			    ThrottleSubscriber.prototype._next = function (value) {
			        this._hasValue = true;
			        this._sendValue = value;
			        if (!this._throttled) {
			            if (this._leading) {
			                this.send();
			            }
			            else {
			                this.throttle(value);
			            }
			        }
			    };
			    ThrottleSubscriber.prototype.send = function () {
			        var _a = this, _hasValue = _a._hasValue, _sendValue = _a._sendValue;
			        if (_hasValue) {
			            this.destination.next(_sendValue);
			            this.throttle(_sendValue);
			        }
			        this._hasValue = false;
			        this._sendValue = undefined;
			    };
			    ThrottleSubscriber.prototype.throttle = function (value) {
			        var duration = this.tryDurationSelector(value);
			        if (!!duration) {
			            this.add(this._throttled = innerSubscribe_1.innerSubscribe(duration, new innerSubscribe_1.SimpleInnerSubscriber(this)));
			        }
			    };
			    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
			        try {
			            return this.durationSelector(value);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return null;
			        }
			    };
			    ThrottleSubscriber.prototype.throttlingDone = function () {
			        var _a = this, _throttled = _a._throttled, _trailing = _a._trailing;
			        if (_throttled) {
			            _throttled.unsubscribe();
			        }
			        this._throttled = undefined;
			        if (_trailing) {
			            this.send();
			        }
			    };
			    ThrottleSubscriber.prototype.notifyNext = function () {
			        this.throttlingDone();
			    };
			    ThrottleSubscriber.prototype.notifyComplete = function () {
			        this.throttlingDone();
			    };
			    return ThrottleSubscriber;
			}(innerSubscribe_1.SimpleOuterSubscriber));

			}(throttle));

			var throttleTime$1 = {};

			var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(throttleTime$1, "__esModule", { value: true });
			var Subscriber_1$2 = Subscriber$1;
			var async_1$5 = async;
			var throttle_1$1 = throttle;
			function throttleTime(duration, scheduler, config) {
			    if (scheduler === void 0) { scheduler = async_1$5.async; }
			    if (config === void 0) { config = throttle_1$1.defaultThrottleConfig; }
			    return function (source) { return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing)); };
			}
			throttleTime$1.throttleTime = throttleTime;
			var ThrottleTimeOperator = (function () {
			    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
			        this.duration = duration;
			        this.scheduler = scheduler;
			        this.leading = leading;
			        this.trailing = trailing;
			    }
			    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
			    };
			    return ThrottleTimeOperator;
			}());
			var ThrottleTimeSubscriber = (function (_super) {
			    __extends$7(ThrottleTimeSubscriber, _super);
			    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
			        var _this = _super.call(this, destination) || this;
			        _this.duration = duration;
			        _this.scheduler = scheduler;
			        _this.leading = leading;
			        _this.trailing = trailing;
			        _this._hasTrailingValue = false;
			        _this._trailingValue = null;
			        return _this;
			    }
			    ThrottleTimeSubscriber.prototype._next = function (value) {
			        if (this.throttled) {
			            if (this.trailing) {
			                this._trailingValue = value;
			                this._hasTrailingValue = true;
			            }
			        }
			        else {
			            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
			            if (this.leading) {
			                this.destination.next(value);
			            }
			            else if (this.trailing) {
			                this._trailingValue = value;
			                this._hasTrailingValue = true;
			            }
			        }
			    };
			    ThrottleTimeSubscriber.prototype._complete = function () {
			        if (this._hasTrailingValue) {
			            this.destination.next(this._trailingValue);
			            this.destination.complete();
			        }
			        else {
			            this.destination.complete();
			        }
			    };
			    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
			        var throttled = this.throttled;
			        if (throttled) {
			            if (this.trailing && this._hasTrailingValue) {
			                this.destination.next(this._trailingValue);
			                this._trailingValue = null;
			                this._hasTrailingValue = false;
			            }
			            throttled.unsubscribe();
			            this.remove(throttled);
			            this.throttled = null;
			        }
			    };
			    return ThrottleTimeSubscriber;
			}(Subscriber_1$2.Subscriber));
			function dispatchNext(arg) {
			    var subscriber = arg.subscriber;
			    subscriber.clearThrottle();
			}

			var timeInterval$1 = {};

			Object.defineProperty(timeInterval$1, "__esModule", { value: true });
			var async_1$4 = async;
			var scan_1$1 = scan$1;
			var defer_1 = defer$1;
			var map_1$2 = map$1;
			function timeInterval(scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$4.async; }
			    return function (source) { return defer_1.defer(function () {
			        return source.pipe(scan_1$1.scan(function (_a, value) {
			            var current = _a.current;
			            return ({ value: value, current: scheduler.now(), last: current });
			        }, { current: scheduler.now(), value: undefined, last: undefined }), map_1$2.map(function (_a) {
			            var current = _a.current, last = _a.last, value = _a.value;
			            return new TimeInterval(value, current - last);
			        }));
			    }); };
			}
			timeInterval$1.timeInterval = timeInterval;
			var TimeInterval = (function () {
			    function TimeInterval(value, interval) {
			        this.value = value;
			        this.interval = interval;
			    }
			    return TimeInterval;
			}());
			timeInterval$1.TimeInterval = TimeInterval;

			var timeout$1 = {};

			var timeoutWith$1 = {};

			var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(timeoutWith$1, "__esModule", { value: true });
			var async_1$3 = async;
			var isDate_1 = isDate$1;
			var innerSubscribe_1$1 = innerSubscribe$1;
			function timeoutWith(due, withObservable, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$3.async; }
			    return function (source) {
			        var absoluteTimeout = isDate_1.isDate(due);
			        var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
			        return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
			    };
			}
			timeoutWith$1.timeoutWith = timeoutWith;
			var TimeoutWithOperator = (function () {
			    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
			        this.waitFor = waitFor;
			        this.absoluteTimeout = absoluteTimeout;
			        this.withObservable = withObservable;
			        this.scheduler = scheduler;
			    }
			    TimeoutWithOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
			    };
			    return TimeoutWithOperator;
			}());
			var TimeoutWithSubscriber = (function (_super) {
			    __extends$6(TimeoutWithSubscriber, _super);
			    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.absoluteTimeout = absoluteTimeout;
			        _this.waitFor = waitFor;
			        _this.withObservable = withObservable;
			        _this.scheduler = scheduler;
			        _this.scheduleTimeout();
			        return _this;
			    }
			    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
			        var withObservable = subscriber.withObservable;
			        subscriber._unsubscribeAndRecycle();
			        subscriber.add(innerSubscribe_1$1.innerSubscribe(withObservable, new innerSubscribe_1$1.SimpleInnerSubscriber(subscriber)));
			    };
			    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
			        var action = this.action;
			        if (action) {
			            this.action = action.schedule(this, this.waitFor);
			        }
			        else {
			            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
			        }
			    };
			    TimeoutWithSubscriber.prototype._next = function (value) {
			        if (!this.absoluteTimeout) {
			            this.scheduleTimeout();
			        }
			        _super.prototype._next.call(this, value);
			    };
			    TimeoutWithSubscriber.prototype._unsubscribe = function () {
			        this.action = undefined;
			        this.scheduler = null;
			        this.withObservable = null;
			    };
			    return TimeoutWithSubscriber;
			}(innerSubscribe_1$1.SimpleOuterSubscriber));

			Object.defineProperty(timeout$1, "__esModule", { value: true });
			var async_1$2 = async;
			var TimeoutError_1 = TimeoutError;
			var timeoutWith_1$1 = timeoutWith$1;
			var throwError_1 = throwError$1;
			function timeout(due, scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$2.async; }
			    return timeoutWith_1$1.timeoutWith(due, throwError_1.throwError(new TimeoutError_1.TimeoutError()), scheduler);
			}
			timeout$1.timeout = timeout;

			var timestamp$1 = {};

			Object.defineProperty(timestamp$1, "__esModule", { value: true });
			var async_1$1 = async;
			var map_1$1 = map$1;
			function timestamp(scheduler) {
			    if (scheduler === void 0) { scheduler = async_1$1.async; }
			    return map_1$1.map(function (value) { return new Timestamp(value, scheduler.now()); });
			}
			timestamp$1.timestamp = timestamp;
			var Timestamp = (function () {
			    function Timestamp(value, timestamp) {
			        this.value = value;
			        this.timestamp = timestamp;
			    }
			    return Timestamp;
			}());
			timestamp$1.Timestamp = Timestamp;

			var toArray$1 = {};

			Object.defineProperty(toArray$1, "__esModule", { value: true });
			var reduce_1$1 = reduce$1;
			function toArrayReducer(arr, item, index) {
			    if (index === 0) {
			        return [item];
			    }
			    arr.push(item);
			    return arr;
			}
			function toArray() {
			    return reduce_1$1.reduce(toArrayReducer, []);
			}
			toArray$1.toArray = toArray;

			var window$2 = {};

			var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(window$2, "__esModule", { value: true });
			var Subject_1$4 = Subject$1;
			var innerSubscribe_1 = innerSubscribe$1;
			function window$1(windowBoundaries) {
			    return function windowOperatorFunction(source) {
			        return source.lift(new WindowOperator$1(windowBoundaries));
			    };
			}
			window$2.window = window$1;
			var WindowOperator$1 = (function () {
			    function WindowOperator(windowBoundaries) {
			        this.windowBoundaries = windowBoundaries;
			    }
			    WindowOperator.prototype.call = function (subscriber, source) {
			        var windowSubscriber = new WindowSubscriber$1(subscriber);
			        var sourceSubscription = source.subscribe(windowSubscriber);
			        if (!sourceSubscription.closed) {
			            windowSubscriber.add(innerSubscribe_1.innerSubscribe(this.windowBoundaries, new innerSubscribe_1.SimpleInnerSubscriber(windowSubscriber)));
			        }
			        return sourceSubscription;
			    };
			    return WindowOperator;
			}());
			var WindowSubscriber$1 = (function (_super) {
			    __extends$5(WindowSubscriber, _super);
			    function WindowSubscriber(destination) {
			        var _this = _super.call(this, destination) || this;
			        _this.window = new Subject_1$4.Subject();
			        destination.next(_this.window);
			        return _this;
			    }
			    WindowSubscriber.prototype.notifyNext = function () {
			        this.openWindow();
			    };
			    WindowSubscriber.prototype.notifyError = function (error) {
			        this._error(error);
			    };
			    WindowSubscriber.prototype.notifyComplete = function () {
			        this._complete();
			    };
			    WindowSubscriber.prototype._next = function (value) {
			        this.window.next(value);
			    };
			    WindowSubscriber.prototype._error = function (err) {
			        this.window.error(err);
			        this.destination.error(err);
			    };
			    WindowSubscriber.prototype._complete = function () {
			        this.window.complete();
			        this.destination.complete();
			    };
			    WindowSubscriber.prototype._unsubscribe = function () {
			        this.window = null;
			    };
			    WindowSubscriber.prototype.openWindow = function () {
			        var prevWindow = this.window;
			        if (prevWindow) {
			            prevWindow.complete();
			        }
			        var destination = this.destination;
			        var newWindow = this.window = new Subject_1$4.Subject();
			        destination.next(newWindow);
			    };
			    return WindowSubscriber;
			}(innerSubscribe_1.SimpleOuterSubscriber));

			var windowCount$1 = {};

			var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(windowCount$1, "__esModule", { value: true });
			var Subscriber_1$1 = Subscriber$1;
			var Subject_1$3 = Subject$1;
			function windowCount(windowSize, startWindowEvery) {
			    if (startWindowEvery === void 0) { startWindowEvery = 0; }
			    return function windowCountOperatorFunction(source) {
			        return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
			    };
			}
			windowCount$1.windowCount = windowCount;
			var WindowCountOperator = (function () {
			    function WindowCountOperator(windowSize, startWindowEvery) {
			        this.windowSize = windowSize;
			        this.startWindowEvery = startWindowEvery;
			    }
			    WindowCountOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
			    };
			    return WindowCountOperator;
			}());
			var WindowCountSubscriber = (function (_super) {
			    __extends$4(WindowCountSubscriber, _super);
			    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        _this.windowSize = windowSize;
			        _this.startWindowEvery = startWindowEvery;
			        _this.windows = [new Subject_1$3.Subject()];
			        _this.count = 0;
			        destination.next(_this.windows[0]);
			        return _this;
			    }
			    WindowCountSubscriber.prototype._next = function (value) {
			        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
			        var destination = this.destination;
			        var windowSize = this.windowSize;
			        var windows = this.windows;
			        var len = windows.length;
			        for (var i = 0; i < len && !this.closed; i++) {
			            windows[i].next(value);
			        }
			        var c = this.count - windowSize + 1;
			        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
			            windows.shift().complete();
			        }
			        if (++this.count % startWindowEvery === 0 && !this.closed) {
			            var window_1 = new Subject_1$3.Subject();
			            windows.push(window_1);
			            destination.next(window_1);
			        }
			    };
			    WindowCountSubscriber.prototype._error = function (err) {
			        var windows = this.windows;
			        if (windows) {
			            while (windows.length > 0 && !this.closed) {
			                windows.shift().error(err);
			            }
			        }
			        this.destination.error(err);
			    };
			    WindowCountSubscriber.prototype._complete = function () {
			        var windows = this.windows;
			        if (windows) {
			            while (windows.length > 0 && !this.closed) {
			                windows.shift().complete();
			            }
			        }
			        this.destination.complete();
			    };
			    WindowCountSubscriber.prototype._unsubscribe = function () {
			        this.count = 0;
			        this.windows = null;
			    };
			    return WindowCountSubscriber;
			}(Subscriber_1$1.Subscriber));

			var windowTime$1 = {};

			var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(windowTime$1, "__esModule", { value: true });
			var Subject_1$2 = Subject$1;
			var async_1 = async;
			var Subscriber_1 = Subscriber$1;
			var isNumeric_1 = isNumeric$1;
			var isScheduler_1 = isScheduler$1;
			function windowTime(windowTimeSpan) {
			    var scheduler = async_1.async;
			    var windowCreationInterval = null;
			    var maxWindowSize = Number.POSITIVE_INFINITY;
			    if (isScheduler_1.isScheduler(arguments[3])) {
			        scheduler = arguments[3];
			    }
			    if (isScheduler_1.isScheduler(arguments[2])) {
			        scheduler = arguments[2];
			    }
			    else if (isNumeric_1.isNumeric(arguments[2])) {
			        maxWindowSize = Number(arguments[2]);
			    }
			    if (isScheduler_1.isScheduler(arguments[1])) {
			        scheduler = arguments[1];
			    }
			    else if (isNumeric_1.isNumeric(arguments[1])) {
			        windowCreationInterval = Number(arguments[1]);
			    }
			    return function windowTimeOperatorFunction(source) {
			        return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
			    };
			}
			windowTime$1.windowTime = windowTime;
			var WindowTimeOperator = (function () {
			    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
			        this.windowTimeSpan = windowTimeSpan;
			        this.windowCreationInterval = windowCreationInterval;
			        this.maxWindowSize = maxWindowSize;
			        this.scheduler = scheduler;
			    }
			    WindowTimeOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
			    };
			    return WindowTimeOperator;
			}());
			var CountedSubject = (function (_super) {
			    __extends$3(CountedSubject, _super);
			    function CountedSubject() {
			        var _this = _super !== null && _super.apply(this, arguments) || this;
			        _this._numberOfNextedValues = 0;
			        return _this;
			    }
			    CountedSubject.prototype.next = function (value) {
			        this._numberOfNextedValues++;
			        _super.prototype.next.call(this, value);
			    };
			    Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
			        get: function () {
			            return this._numberOfNextedValues;
			        },
			        enumerable: true,
			        configurable: true
			    });
			    return CountedSubject;
			}(Subject_1$2.Subject));
			var WindowTimeSubscriber = (function (_super) {
			    __extends$3(WindowTimeSubscriber, _super);
			    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        _this.windowTimeSpan = windowTimeSpan;
			        _this.windowCreationInterval = windowCreationInterval;
			        _this.maxWindowSize = maxWindowSize;
			        _this.scheduler = scheduler;
			        _this.windows = [];
			        var window = _this.openWindow();
			        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
			            var closeState = { subscriber: _this, window: window, context: null };
			            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
			            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
			            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
			        }
			        else {
			            var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
			            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
			        }
			        return _this;
			    }
			    WindowTimeSubscriber.prototype._next = function (value) {
			        var windows = this.windows;
			        var len = windows.length;
			        for (var i = 0; i < len; i++) {
			            var window_1 = windows[i];
			            if (!window_1.closed) {
			                window_1.next(value);
			                if (window_1.numberOfNextedValues >= this.maxWindowSize) {
			                    this.closeWindow(window_1);
			                }
			            }
			        }
			    };
			    WindowTimeSubscriber.prototype._error = function (err) {
			        var windows = this.windows;
			        while (windows.length > 0) {
			            windows.shift().error(err);
			        }
			        this.destination.error(err);
			    };
			    WindowTimeSubscriber.prototype._complete = function () {
			        var windows = this.windows;
			        while (windows.length > 0) {
			            var window_2 = windows.shift();
			            if (!window_2.closed) {
			                window_2.complete();
			            }
			        }
			        this.destination.complete();
			    };
			    WindowTimeSubscriber.prototype.openWindow = function () {
			        var window = new CountedSubject();
			        this.windows.push(window);
			        var destination = this.destination;
			        destination.next(window);
			        return window;
			    };
			    WindowTimeSubscriber.prototype.closeWindow = function (window) {
			        window.complete();
			        var windows = this.windows;
			        windows.splice(windows.indexOf(window), 1);
			    };
			    return WindowTimeSubscriber;
			}(Subscriber_1.Subscriber));
			function dispatchWindowTimeSpanOnly(state) {
			    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
			    if (window) {
			        subscriber.closeWindow(window);
			    }
			    state.window = subscriber.openWindow();
			    this.schedule(state, windowTimeSpan);
			}
			function dispatchWindowCreation(state) {
			    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
			    var window = subscriber.openWindow();
			    var action = this;
			    var context = { action: action, subscription: null };
			    var timeSpanState = { subscriber: subscriber, window: window, context: context };
			    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
			    action.add(context.subscription);
			    action.schedule(state, windowCreationInterval);
			}
			function dispatchWindowClose(state) {
			    var subscriber = state.subscriber, window = state.window, context = state.context;
			    if (context && context.action && context.subscription) {
			        context.action.remove(context.subscription);
			    }
			    subscriber.closeWindow(window);
			}

			var windowToggle$1 = {};

			var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(windowToggle$1, "__esModule", { value: true });
			var Subject_1$1 = Subject$1;
			var Subscription_1 = Subscription$1;
			var OuterSubscriber_1$2 = OuterSubscriber$1;
			var subscribeToResult_1$2 = subscribeToResult$1;
			function windowToggle(openings, closingSelector) {
			    return function (source) { return source.lift(new WindowToggleOperator(openings, closingSelector)); };
			}
			windowToggle$1.windowToggle = windowToggle;
			var WindowToggleOperator = (function () {
			    function WindowToggleOperator(openings, closingSelector) {
			        this.openings = openings;
			        this.closingSelector = closingSelector;
			    }
			    WindowToggleOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
			    };
			    return WindowToggleOperator;
			}());
			var WindowToggleSubscriber = (function (_super) {
			    __extends$2(WindowToggleSubscriber, _super);
			    function WindowToggleSubscriber(destination, openings, closingSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.openings = openings;
			        _this.closingSelector = closingSelector;
			        _this.contexts = [];
			        _this.add(_this.openSubscription = subscribeToResult_1$2.subscribeToResult(_this, openings, openings));
			        return _this;
			    }
			    WindowToggleSubscriber.prototype._next = function (value) {
			        var contexts = this.contexts;
			        if (contexts) {
			            var len = contexts.length;
			            for (var i = 0; i < len; i++) {
			                contexts[i].window.next(value);
			            }
			        }
			    };
			    WindowToggleSubscriber.prototype._error = function (err) {
			        var contexts = this.contexts;
			        this.contexts = null;
			        if (contexts) {
			            var len = contexts.length;
			            var index = -1;
			            while (++index < len) {
			                var context_1 = contexts[index];
			                context_1.window.error(err);
			                context_1.subscription.unsubscribe();
			            }
			        }
			        _super.prototype._error.call(this, err);
			    };
			    WindowToggleSubscriber.prototype._complete = function () {
			        var contexts = this.contexts;
			        this.contexts = null;
			        if (contexts) {
			            var len = contexts.length;
			            var index = -1;
			            while (++index < len) {
			                var context_2 = contexts[index];
			                context_2.window.complete();
			                context_2.subscription.unsubscribe();
			            }
			        }
			        _super.prototype._complete.call(this);
			    };
			    WindowToggleSubscriber.prototype._unsubscribe = function () {
			        var contexts = this.contexts;
			        this.contexts = null;
			        if (contexts) {
			            var len = contexts.length;
			            var index = -1;
			            while (++index < len) {
			                var context_3 = contexts[index];
			                context_3.window.unsubscribe();
			                context_3.subscription.unsubscribe();
			            }
			        }
			    };
			    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
			        if (outerValue === this.openings) {
			            var closingNotifier = void 0;
			            try {
			                var closingSelector = this.closingSelector;
			                closingNotifier = closingSelector(innerValue);
			            }
			            catch (e) {
			                return this.error(e);
			            }
			            var window_1 = new Subject_1$1.Subject();
			            var subscription = new Subscription_1.Subscription();
			            var context_4 = { window: window_1, subscription: subscription };
			            this.contexts.push(context_4);
			            var innerSubscription = subscribeToResult_1$2.subscribeToResult(this, closingNotifier, context_4);
			            if (innerSubscription.closed) {
			                this.closeWindow(this.contexts.length - 1);
			            }
			            else {
			                innerSubscription.context = context_4;
			                subscription.add(innerSubscription);
			            }
			            this.destination.next(window_1);
			        }
			        else {
			            this.closeWindow(this.contexts.indexOf(outerValue));
			        }
			    };
			    WindowToggleSubscriber.prototype.notifyError = function (err) {
			        this.error(err);
			    };
			    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
			        if (inner !== this.openSubscription) {
			            this.closeWindow(this.contexts.indexOf(inner.context));
			        }
			    };
			    WindowToggleSubscriber.prototype.closeWindow = function (index) {
			        if (index === -1) {
			            return;
			        }
			        var contexts = this.contexts;
			        var context = contexts[index];
			        var window = context.window, subscription = context.subscription;
			        contexts.splice(index, 1);
			        window.complete();
			        subscription.unsubscribe();
			    };
			    return WindowToggleSubscriber;
			}(OuterSubscriber_1$2.OuterSubscriber));

			var windowWhen$1 = {};

			var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(windowWhen$1, "__esModule", { value: true });
			var Subject_1 = Subject$1;
			var OuterSubscriber_1$1 = OuterSubscriber$1;
			var subscribeToResult_1$1 = subscribeToResult$1;
			function windowWhen(closingSelector) {
			    return function windowWhenOperatorFunction(source) {
			        return source.lift(new WindowOperator(closingSelector));
			    };
			}
			windowWhen$1.windowWhen = windowWhen;
			var WindowOperator = (function () {
			    function WindowOperator(closingSelector) {
			        this.closingSelector = closingSelector;
			    }
			    WindowOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
			    };
			    return WindowOperator;
			}());
			var WindowSubscriber = (function (_super) {
			    __extends$1(WindowSubscriber, _super);
			    function WindowSubscriber(destination, closingSelector) {
			        var _this = _super.call(this, destination) || this;
			        _this.destination = destination;
			        _this.closingSelector = closingSelector;
			        _this.openWindow();
			        return _this;
			    }
			    WindowSubscriber.prototype.notifyNext = function (_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
			        this.openWindow(innerSub);
			    };
			    WindowSubscriber.prototype.notifyError = function (error) {
			        this._error(error);
			    };
			    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
			        this.openWindow(innerSub);
			    };
			    WindowSubscriber.prototype._next = function (value) {
			        this.window.next(value);
			    };
			    WindowSubscriber.prototype._error = function (err) {
			        this.window.error(err);
			        this.destination.error(err);
			        this.unsubscribeClosingNotification();
			    };
			    WindowSubscriber.prototype._complete = function () {
			        this.window.complete();
			        this.destination.complete();
			        this.unsubscribeClosingNotification();
			    };
			    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
			        if (this.closingNotification) {
			            this.closingNotification.unsubscribe();
			        }
			    };
			    WindowSubscriber.prototype.openWindow = function (innerSub) {
			        if (innerSub === void 0) { innerSub = null; }
			        if (innerSub) {
			            this.remove(innerSub);
			            innerSub.unsubscribe();
			        }
			        var prevWindow = this.window;
			        if (prevWindow) {
			            prevWindow.complete();
			        }
			        var window = this.window = new Subject_1.Subject();
			        this.destination.next(window);
			        var closingNotifier;
			        try {
			            var closingSelector = this.closingSelector;
			            closingNotifier = closingSelector();
			        }
			        catch (e) {
			            this.destination.error(e);
			            this.window.error(e);
			            return;
			        }
			        this.add(this.closingNotification = subscribeToResult_1$1.subscribeToResult(this, closingNotifier));
			    };
			    return WindowSubscriber;
			}(OuterSubscriber_1$1.OuterSubscriber));

			var withLatestFrom$1 = {};

			var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
			    var extendStatics = function (d, b) {
			        extendStatics = Object.setPrototypeOf ||
			            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			        return extendStatics(d, b);
			    };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(withLatestFrom$1, "__esModule", { value: true });
			var OuterSubscriber_1 = OuterSubscriber$1;
			var subscribeToResult_1 = subscribeToResult$1;
			function withLatestFrom() {
			    var args = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        args[_i] = arguments[_i];
			    }
			    return function (source) {
			        var project;
			        if (typeof args[args.length - 1] === 'function') {
			            project = args.pop();
			        }
			        var observables = args;
			        return source.lift(new WithLatestFromOperator(observables, project));
			    };
			}
			withLatestFrom$1.withLatestFrom = withLatestFrom;
			var WithLatestFromOperator = (function () {
			    function WithLatestFromOperator(observables, project) {
			        this.observables = observables;
			        this.project = project;
			    }
			    WithLatestFromOperator.prototype.call = function (subscriber, source) {
			        return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
			    };
			    return WithLatestFromOperator;
			}());
			var WithLatestFromSubscriber = (function (_super) {
			    __extends(WithLatestFromSubscriber, _super);
			    function WithLatestFromSubscriber(destination, observables, project) {
			        var _this = _super.call(this, destination) || this;
			        _this.observables = observables;
			        _this.project = project;
			        _this.toRespond = [];
			        var len = observables.length;
			        _this.values = new Array(len);
			        for (var i = 0; i < len; i++) {
			            _this.toRespond.push(i);
			        }
			        for (var i = 0; i < len; i++) {
			            var observable = observables[i];
			            _this.add(subscribeToResult_1.subscribeToResult(_this, observable, undefined, i));
			        }
			        return _this;
			    }
			    WithLatestFromSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
			        this.values[outerIndex] = innerValue;
			        var toRespond = this.toRespond;
			        if (toRespond.length > 0) {
			            var found = toRespond.indexOf(outerIndex);
			            if (found !== -1) {
			                toRespond.splice(found, 1);
			            }
			        }
			    };
			    WithLatestFromSubscriber.prototype.notifyComplete = function () {
			    };
			    WithLatestFromSubscriber.prototype._next = function (value) {
			        if (this.toRespond.length === 0) {
			            var args = [value].concat(this.values);
			            if (this.project) {
			                this._tryProject(args);
			            }
			            else {
			                this.destination.next(args);
			            }
			        }
			    };
			    WithLatestFromSubscriber.prototype._tryProject = function (args) {
			        var result;
			        try {
			            result = this.project.apply(this, args);
			        }
			        catch (err) {
			            this.destination.error(err);
			            return;
			        }
			        this.destination.next(result);
			    };
			    return WithLatestFromSubscriber;
			}(OuterSubscriber_1.OuterSubscriber));

			var zip$1 = {};

			Object.defineProperty(zip$1, "__esModule", { value: true });
			var zip_1$2 = zip$3;
			function zip() {
			    var observables = [];
			    for (var _i = 0; _i < arguments.length; _i++) {
			        observables[_i] = arguments[_i];
			    }
			    return function zipOperatorFunction(source) {
			        return source.lift.call(zip_1$2.zip.apply(void 0, [source].concat(observables)));
			    };
			}
			zip$1.zip = zip;

			var zipAll$1 = {};

			Object.defineProperty(zipAll$1, "__esModule", { value: true });
			var zip_1$1 = zip$3;
			function zipAll(project) {
			    return function (source) { return source.lift(new zip_1$1.ZipOperator(project)); };
			}
			zipAll$1.zipAll = zipAll;

			Object.defineProperty(operators, "__esModule", { value: true });
			var audit_1 = audit$1;
			operators.audit = audit_1.audit;
			var auditTime_1 = auditTime$1;
			operators.auditTime = auditTime_1.auditTime;
			var buffer_1 = buffer$1;
			operators.buffer = buffer_1.buffer;
			var bufferCount_1 = bufferCount$1;
			operators.bufferCount = bufferCount_1.bufferCount;
			var bufferTime_1 = bufferTime$1;
			operators.bufferTime = bufferTime_1.bufferTime;
			var bufferToggle_1 = bufferToggle$1;
			operators.bufferToggle = bufferToggle_1.bufferToggle;
			var bufferWhen_1 = bufferWhen$1;
			operators.bufferWhen = bufferWhen_1.bufferWhen;
			var catchError_1 = catchError$1;
			operators.catchError = catchError_1.catchError;
			var combineAll_1 = combineAll$1;
			operators.combineAll = combineAll_1.combineAll;
			var combineLatest_1 = combineLatest$1;
			operators.combineLatest = combineLatest_1.combineLatest;
			var concat_1 = concat$1;
			operators.concat = concat_1.concat;
			var concatAll_1 = concatAll$1;
			operators.concatAll = concatAll_1.concatAll;
			var concatMap_1 = concatMap$1;
			operators.concatMap = concatMap_1.concatMap;
			var concatMapTo_1 = concatMapTo$1;
			operators.concatMapTo = concatMapTo_1.concatMapTo;
			var count_1 = count$1;
			operators.count = count_1.count;
			var debounce_1 = debounce$1;
			operators.debounce = debounce_1.debounce;
			var debounceTime_1 = debounceTime$1;
			operators.debounceTime = debounceTime_1.debounceTime;
			var defaultIfEmpty_1 = defaultIfEmpty$1;
			operators.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
			var delay_1 = delay$1;
			operators.delay = delay_1.delay;
			var delayWhen_1 = delayWhen$1;
			operators.delayWhen = delayWhen_1.delayWhen;
			var dematerialize_1 = dematerialize$1;
			operators.dematerialize = dematerialize_1.dematerialize;
			var distinct_1 = distinct$1;
			operators.distinct = distinct_1.distinct;
			var distinctUntilChanged_1 = distinctUntilChanged$1;
			operators.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
			var distinctUntilKeyChanged_1 = distinctUntilKeyChanged$1;
			operators.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
			var elementAt_1 = elementAt$1;
			operators.elementAt = elementAt_1.elementAt;
			var endWith_1 = endWith$1;
			operators.endWith = endWith_1.endWith;
			var every_1 = every$1;
			operators.every = every_1.every;
			var exhaust_1 = exhaust$1;
			operators.exhaust = exhaust_1.exhaust;
			var exhaustMap_1 = exhaustMap$1;
			operators.exhaustMap = exhaustMap_1.exhaustMap;
			var expand_1 = expand$1;
			operators.expand = expand_1.expand;
			var filter_1 = filter$3;
			operators.filter = filter_1.filter;
			var finalize_1 = finalize$1;
			operators.finalize = finalize_1.finalize;
			var find_1 = find$1;
			operators.find = find_1.find;
			var findIndex_1 = findIndex$1;
			operators.findIndex = findIndex_1.findIndex;
			var first_1 = first$1;
			operators.first = first_1.first;
			var groupBy_1 = groupBy$1;
			operators.groupBy = groupBy_1.groupBy;
			var ignoreElements_1 = ignoreElements$1;
			operators.ignoreElements = ignoreElements_1.ignoreElements;
			var isEmpty_1 = isEmpty$1;
			operators.isEmpty = isEmpty_1.isEmpty;
			var last_1 = last$1;
			operators.last = last_1.last;
			var map_1 = map$1;
			operators.map = map_1.map;
			var mapTo_1 = mapTo$1;
			operators.mapTo = mapTo_1.mapTo;
			var materialize_1 = materialize$1;
			operators.materialize = materialize_1.materialize;
			var max_1 = max$1;
			operators.max = max_1.max;
			var merge_1 = merge$1;
			operators.merge = merge_1.merge;
			var mergeAll_1 = mergeAll$1;
			operators.mergeAll = mergeAll_1.mergeAll;
			var mergeMap_1 = mergeMap$1;
			operators.mergeMap = mergeMap_1.mergeMap;
			operators.flatMap = mergeMap_1.flatMap;
			var mergeMapTo_1 = mergeMapTo$1;
			operators.mergeMapTo = mergeMapTo_1.mergeMapTo;
			var mergeScan_1 = mergeScan$1;
			operators.mergeScan = mergeScan_1.mergeScan;
			var min_1 = min$1;
			operators.min = min_1.min;
			var multicast_1 = multicast$1;
			operators.multicast = multicast_1.multicast;
			var observeOn_1 = observeOn$1;
			operators.observeOn = observeOn_1.observeOn;
			var onErrorResumeNext_1 = onErrorResumeNext$1;
			operators.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
			var pairwise_1 = pairwise$1;
			operators.pairwise = pairwise_1.pairwise;
			var partition_1 = partition$1;
			operators.partition = partition_1.partition;
			var pluck_1 = pluck$1;
			operators.pluck = pluck_1.pluck;
			var publish_1 = publish$1;
			operators.publish = publish_1.publish;
			var publishBehavior_1 = publishBehavior$1;
			operators.publishBehavior = publishBehavior_1.publishBehavior;
			var publishLast_1 = publishLast$1;
			operators.publishLast = publishLast_1.publishLast;
			var publishReplay_1 = publishReplay$1;
			operators.publishReplay = publishReplay_1.publishReplay;
			var race_1 = race$1;
			operators.race = race_1.race;
			var reduce_1 = reduce$1;
			operators.reduce = reduce_1.reduce;
			var repeat_1 = repeat$1;
			operators.repeat = repeat_1.repeat;
			var repeatWhen_1 = repeatWhen$1;
			operators.repeatWhen = repeatWhen_1.repeatWhen;
			var retry_1 = retry$1;
			operators.retry = retry_1.retry;
			var retryWhen_1 = retryWhen$1;
			operators.retryWhen = retryWhen_1.retryWhen;
			var refCount_1 = refCount$1;
			operators.refCount = refCount_1.refCount;
			var sample_1 = sample$1;
			operators.sample = sample_1.sample;
			var sampleTime_1 = sampleTime$1;
			operators.sampleTime = sampleTime_1.sampleTime;
			var scan_1 = scan$1;
			operators.scan = scan_1.scan;
			var sequenceEqual_1 = sequenceEqual$1;
			operators.sequenceEqual = sequenceEqual_1.sequenceEqual;
			var share_1 = share$1;
			operators.share = share_1.share;
			var shareReplay_1 = shareReplay$1;
			operators.shareReplay = shareReplay_1.shareReplay;
			var single_1 = single$1;
			operators.single = single_1.single;
			var skip_1 = skip$1;
			operators.skip = skip_1.skip;
			var skipLast_1 = skipLast$1;
			operators.skipLast = skipLast_1.skipLast;
			var skipUntil_1 = skipUntil$1;
			operators.skipUntil = skipUntil_1.skipUntil;
			var skipWhile_1 = skipWhile$1;
			operators.skipWhile = skipWhile_1.skipWhile;
			var startWith_1 = startWith$1;
			operators.startWith = startWith_1.startWith;
			var subscribeOn_1 = subscribeOn$1;
			operators.subscribeOn = subscribeOn_1.subscribeOn;
			var switchAll_1 = switchAll$1;
			operators.switchAll = switchAll_1.switchAll;
			var switchMap_1 = switchMap$1;
			operators.switchMap = switchMap_1.switchMap;
			var switchMapTo_1 = switchMapTo$1;
			operators.switchMapTo = switchMapTo_1.switchMapTo;
			var take_1 = take$1;
			operators.take = take_1.take;
			var takeLast_1 = takeLast$1;
			operators.takeLast = takeLast_1.takeLast;
			var takeUntil_1 = takeUntil$1;
			operators.takeUntil = takeUntil_1.takeUntil;
			var takeWhile_1 = takeWhile$1;
			operators.takeWhile = takeWhile_1.takeWhile;
			var tap_1 = tap$1;
			operators.tap = tap_1.tap;
			var throttle_1 = throttle;
			operators.throttle = throttle_1.throttle;
			var throttleTime_1 = throttleTime$1;
			operators.throttleTime = throttleTime_1.throttleTime;
			var throwIfEmpty_1 = throwIfEmpty$1;
			operators.throwIfEmpty = throwIfEmpty_1.throwIfEmpty;
			var timeInterval_1 = timeInterval$1;
			operators.timeInterval = timeInterval_1.timeInterval;
			var timeout_1 = timeout$1;
			operators.timeout = timeout_1.timeout;
			var timeoutWith_1 = timeoutWith$1;
			operators.timeoutWith = timeoutWith_1.timeoutWith;
			var timestamp_1 = timestamp$1;
			operators.timestamp = timestamp_1.timestamp;
			var toArray_1 = toArray$1;
			operators.toArray = toArray_1.toArray;
			var window_1 = window$2;
			operators.window = window_1.window;
			var windowCount_1 = windowCount$1;
			operators.windowCount = windowCount_1.windowCount;
			var windowTime_1 = windowTime$1;
			operators.windowTime = windowTime_1.windowTime;
			var windowToggle_1 = windowToggle$1;
			operators.windowToggle = windowToggle_1.windowToggle;
			var windowWhen_1 = windowWhen$1;
			operators.windowWhen = windowWhen_1.windowWhen;
			var withLatestFrom_1 = withLatestFrom$1;
			operators.withLatestFrom = withLatestFrom_1.withLatestFrom;
			var zip_1 = zip$1;
			operators.zip = zip_1.zip;
			var zipAll_1 = zipAll$1;
			operators.zipAll = zipAll_1.zipAll;

			Object.defineProperty(filter, "__esModule", { value: true });
			var operators_1 = operators;
			filter.filter = operators_1.filter;

			(function (exports) {
			function __export(m) {
			    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
			}
			Object.defineProperty(exports, "__esModule", { value: true });
			__export(filter);

			}(filter$1));

			var useEva_1 = createAsyncActions_1 = createActions_1 = void 0;

			var _react = _interopRequireWildcard(React);

			var _Subject = Subject$3;

			var _filter = filter$1;

			function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

			function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

			var isFn = function isFn(val) {
			  return typeof val === "function";
			};

			var implementSymbol = Symbol["for"]("__REVA_IMPLEMENT__");
			var namesSymbol = Symbol["for"]("__REVA_NAMES__");
			var actionsSymbol = Symbol["for"]("__REVA_ACTIONS");

			var createEva = function createEva(actions, effects, subscribes) {
			  subscribes = subscribes || {};

			  var subscription = function subscription() {
			    if (isFn(effects)) {
			      effects(function (type, $filter) {
			        if (!subscribes[type]) {
			          subscribes[type] = new _Subject.Subject();
			        }

			        if (isFn($filter)) {
			          return subscribes[type].pipe((0, _filter.filter)($filter));
			        }

			        return subscribes[type];
			      });
			    }
			  };

			  var dispatch = function dispatch(type) {
			    if (subscribes[type]) {
			      var _subscribes$type;

			      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			        args[_key - 1] = arguments[_key];
			      }

			      (_subscribes$type = subscribes[type]).next.apply(_subscribes$type, args);
			    }
			  };

			  dispatch.lazy = function (type, fn) {
			    if (subscribes[type] && isFn(fn)) {
			      subscribes[type].next(fn());
			    }
			  };

			  var implementAction = function implementAction(name, fn) {
			    if (actions && actions[implementSymbol]) {
			      actions[implementSymbol](name, fn);
			    }

			    return fn;
			  };

			  var implementActions = function implementActions(obj) {
			    var actions = {};

			    for (var name in obj) {
			      if (obj.hasOwnProperty(name) && isFn(obj[name])) {
			        actions[name] = implementAction(name, obj[name]);
			      }
			    }

			    return actions;
			  };

			  return {
			    dispatch: dispatch,
			    subscription: subscription,
			    implementActions: implementActions
			  };
			};

			var ActionFactory = function ActionFactory(names, isAsync) {
			  var _this = this;

			  if (isAsync === void 0) {
			    isAsync = true;
			  }

			  var resolvers = {};
			  var actions = {};
			  names.forEach(function (name) {
			    _this[name] = function () {
			      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			        args[_key2] = arguments[_key2];
			      }

			      if (isAsync) {
			        return new Promise(function (resolve, reject) {
			          if (actions[name]) {
			            resolve(actions[name].apply(actions, args));
			          } else {
			            resolvers[name] = resolvers[name] || [];
			            resolvers[name].push({
			              resolve: resolve,
			              args: args,
			              reject: reject
			            });
			          }
			        });
			      } else {
			        if (actions[name]) {
			          return actions[name].apply(actions, args);
			        } else {
			          resolvers[name] = resolvers[name] || [];
			          resolvers[name].push({
			            resolve: null,
			            args: args,
			            reject: null
			          });

			          if (console && console.error) {
			            console.error("The action \"" + name + "\" is not implemented! We recommend that you call this method by `createAsyncFormActions`");
			          }
			        }
			      }
			    };
			  });
			  this[actionsSymbol] = true;
			  this[namesSymbol] = names;

			  this[implementSymbol] = function (name, fn) {
			    if (resolvers[name] && resolvers[name].length) {
			      setTimeout(function () {
			        for (var i = 0; i < resolvers[name].length; i++) {
			          var _resolvers$name$i = resolvers[name][i],
			              resolve = _resolvers$name$i.resolve,
			              args = _resolvers$name$i.args;
			          if (resolve) resolve(fn.apply(void 0, args));else {
			            fn.apply(void 0, args);
			          }
			        }

			        resolvers[name].length = 0;
			      });
			    }

			    actions[name] = fn;
			    return fn;
			  };
			};

			var createActions = function createActions() {
			  for (var _len3 = arguments.length, names = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			    names[_key3] = arguments[_key3];
			  }

			  return new ActionFactory(names, false);
			};

			var createActions_1 = createActions;

			var createAsyncActions = function createAsyncActions() {
			  for (var _len4 = arguments.length, names = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			    names[_key4] = arguments[_key4];
			  }

			  return new ActionFactory(names, true);
			};

			var createAsyncActions_1 = createAsyncActions;

			var useEva = function useEva(_temp) {
			  var _ref = _temp === void 0 ? {} : _temp,
			      actions = _ref.actions,
			      effects = _ref.effects,
			      subscribes = _ref.subscribes,
			      _ref$autoRun = _ref.autoRun,
			      autoRun = _ref$autoRun === void 0 ? true : _ref$autoRun;

			  return _react["default"].useMemo(function () {
			    var manager = createEva(actions, effects, subscribes);

			    if (autoRun) {
			      manager.subscription();
			    }

			    return manager;
			  }, []);
			};

			useEva_1 = useEva;

			var __defProp$8 = Object.defineProperty;
			var __defProps$5 = Object.defineProperties;
			var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
			var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
			var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$8 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$8.call(b, prop))
			      __defNormalProp$8(a, prop, b[prop]);
			  if (__getOwnPropSymbols$8)
			    for (var prop of __getOwnPropSymbols$8(b)) {
			      if (__propIsEnum$8.call(b, prop))
			        __defNormalProp$8(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
			const createFormActions = exports('createFormActions', () => {
			  if (env.currentActions) {
			    return env.currentActions;
			  }
			  return createActions_1("submit", "reset", "hasChanged", "validate", "clearErrors", "createMutators", "setFormState", "getFormState", "setFieldState", "getFieldState", "getFormGraph", "setFormGraph", "subscribe", "unsubscribe", "createMutators", "isHostRendering", "hostUpdate", "notify", "dispatch", "setFieldValue", "getFieldValue", "setFieldInitialValue", "getFieldInitialValue", "disableUnmountClearStates", "enableUnmountClearStates", "enableUnmountRemoveNode", "disableUnmountRemoveNode");
			});
			const createAsyncFormActions = exports('createAsyncFormActions', () => createAsyncActions_1("submit", "reset", "hasChanged", "clearErrors", "validate", "setFormState", "getFormState", "setFieldState", "getFieldState", "getFormGraph", "setFormGraph", "subscribe", "unsubscribe", "isHostRendering", "createMutators", "hostUpdate", "notify", "dispatch", "setFieldValue", "getFieldValue", "setFieldInitialValue", "getFieldInitialValue", "disableUnmountClearStates", "enableUnmountClearStates", "enableUnmountRemoveNode", "disableUnmountRemoveNode"));
			const isEvent = (candidate) => candidate && (candidate.stopPropagation || candidate.preventDefault || candidate.bubbles);
			const isReactNative = typeof window !== "undefined" && window.navigator && window.navigator.product && window.navigator.product === "ReactNative";
			const getSelectedValues = (options) => {
			  const result = [];
			  if (options) {
			    for (let index = 0; index < options.length; index++) {
			      const option = options[index];
			      if (option.selected) {
			        result.push(option.value);
			      }
			    }
			  }
			  return result;
			};
			const getValueFromEvent = (event) => {
			  if (isEvent(event)) {
			    if (!isReactNative && event.nativeEvent && isValid(event.nativeEvent.text)) {
			      return event.nativeEvent.text;
			    }
			    if (isReactNative && isValid(event.nativeEvent)) {
			      return event.nativeEvent.text;
			    }
			    const detypedEvent = event;
			    const {
			      target: { type, value, checked, files },
			      dataTransfer
			    } = detypedEvent;
			    if (type === "checkbox") {
			      return !!checked;
			    }
			    if (type === "file") {
			      return files || dataTransfer && dataTransfer.files;
			    }
			    if (type === "select-multiple") {
			      return getSelectedValues(event.target.options);
			    }
			    return value;
			  }
			  return event;
			};
			class Broadcast extends Subscribable {
			  setContext(context) {
			    if (!this.context) {
			      this.context = context;
			    }
			  }
			  getContext() {
			    return this.context;
			  }
			}
			const env = {
			  effectStart: false,
			  effectSelector: null,
			  effectEnd: false,
			  currentActions: null
			};
			const createFormEffects = (effects, actions) => {
			  if (isFn$1(effects)) {
			    return (selector) => {
			      env.effectEnd = false;
			      env.effectStart = true;
			      env.currentActions = actions;
			      env.effectSelector = (type, matcher) => {
			        const observable$ = selector(type);
			        if (matcher) {
			          return observable$.pipe(filter_2(isFn$1(matcher) && !matcher["path"] ? matcher : (payload) => {
			            return FormPath.parse(matcher).matchAliasGroup(payload && payload.name, payload && payload.path);
			          }));
			        }
			        return observable$;
			      };
			      Object.assign(env.effectSelector, actions);
			      effects(env.effectSelector, actions);
			      env.effectStart = false;
			      env.effectEnd = true;
			      env.currentActions = null;
			    };
			  } else {
			    return () => {
			    };
			  }
			};
			const createEffectHook = exports('createEffectHook', (type) => (...args) => {
			  if (!env.effectStart || env.effectEnd) {
			    throw new Error("EffectHook must be called synchronously within the effects callback function.");
			  }
			  if (!env.effectSelector) {
			    throw new Error("Can not found effect hook selector.");
			  }
			  return env.effectSelector(type, ...args);
			});
			const FormEffectHooks = exports('FormEffectHooks', {
			  onFormWillInit$: createEffectHook(LifeCycleTypes.ON_FORM_WILL_INIT),
			  onFormInit$: createEffectHook(LifeCycleTypes.ON_FORM_INIT),
			  onFormChange$: createEffectHook(LifeCycleTypes.ON_FORM_CHANGE),
			  onFormOnSubmitSuccess$: createEffectHook(LifeCycleTypes.ON_FORM_ON_SUBMIT_SUCCESS),
			  onFormOnSubmitFailed$: createEffectHook(LifeCycleTypes.ON_FORM_ON_SUBMIT_FAILED),
			  onFormInputChange$: createEffectHook(LifeCycleTypes.ON_FORM_INPUT_CHANGE),
			  onFormInitialValueChange$: createEffectHook(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE),
			  onFormReset$: createEffectHook(LifeCycleTypes.ON_FORM_RESET),
			  onFormSubmitValidateStart$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START),
			  onFormSubmitValidateSuccess$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS),
			  onFormSubmitValidateFailed$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED),
			  onFormSubmit$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT),
			  onFormSubmitStart$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT_START),
			  onFormSubmitEnd$: createEffectHook(LifeCycleTypes.ON_FORM_SUBMIT_END),
			  onFormMount$: createEffectHook(LifeCycleTypes.ON_FORM_MOUNT),
			  onFormUnmount$: createEffectHook(LifeCycleTypes.ON_FORM_UNMOUNT),
			  onFormValidateStart$: createEffectHook(LifeCycleTypes.ON_FORM_VALIDATE_START),
			  onFormValidateEnd$: createEffectHook(LifeCycleTypes.ON_FORM_VALIDATE_END),
			  onFormValuesChange$: createEffectHook(LifeCycleTypes.ON_FORM_VALUES_CHANGE),
			  onFormGraphChange$: createEffectHook(LifeCycleTypes.ON_FORM_GRAPH_CHANGE),
			  onFieldWillInit$: createEffectHook(LifeCycleTypes.ON_FIELD_WILL_INIT),
			  onFieldInit$: createEffectHook(LifeCycleTypes.ON_FIELD_INIT),
			  onFieldValidateStart$: createEffectHook(LifeCycleTypes.ON_FIELD_VALIDATE_START),
			  onFieldValidateEnd$: createEffectHook(LifeCycleTypes.ON_FIELD_VALIDATE_END),
			  onFieldChange$: createEffectHook(LifeCycleTypes.ON_FIELD_CHANGE),
			  onFieldMount$: createEffectHook(LifeCycleTypes.ON_FIELD_MOUNT),
			  onFieldUnmount$: createEffectHook(LifeCycleTypes.ON_FIELD_UNMOUNT),
			  onFieldInputChange$: createEffectHook(LifeCycleTypes.ON_FIELD_INPUT_CHANGE),
			  onFieldValueChange$: createEffectHook(LifeCycleTypes.ON_FIELD_VALUE_CHANGE),
			  onFieldInitialValueChange$: createEffectHook(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE)
			});
			const createEffectsProvider = exports('createEffectsProvider', (callback, middlewares, context) => {
			  const promises = {};
			  const resolves = {};
			  const resolvePayload = (payload) => {
			    return isFn$1(payload.getState) ? payload.getState() : payload;
			  };
			  const waitFor = async (type, filter2) => {
			    if (!promises[type]) {
			      promises[type] = new Promise((resolve) => {
			        resolves[type] = { resolve, filter: filter2 };
			      });
			    }
			    return promises[type].then((payload) => {
			      delete promises[type];
			      delete resolves[type];
			      return payload;
			    });
			  };
			  const triggerTo = (type, payload) => {
			    if (resolves[type]) {
			      payload = resolvePayload(payload);
			      if (resolves[type].filter) {
			        if (resolves[type].filter(payload)) {
			          resolves[type].resolve(payload);
			        }
			      } else {
			        resolves[type].resolve(payload);
			      }
			    }
			  };
			  return ($, actions) => {
			    const runtime = {
			      context,
			      actions,
			      waitFor
			    };
			    const queue = toArr(middlewares).reduce((buf, fn) => {
			      const spec = fn(runtime);
			      for (const key in spec) {
			        buf[key] = buf[key] || [];
			        buf[key] = buf[key].concat(spec[key]);
			      }
			      return buf;
			    }, {});
			    const applyMiddlewares = async (type, payload) => {
			      if (queue[type] && queue[type].length) {
			        let i = 0;
			        const next = (payload2) => {
			          if (!queue[type][i])
			            return payload2;
			          const response = queue[type][i++](payload2, next);
			          if (response === void 0) {
			            return new Promise(() => {
			            });
			          }
			          return Promise.resolve(response);
			        };
			        return await next(resolvePayload(payload));
			      }
			      return payload;
			    };
			    $("onFormInit").subscribe(() => {
			      actions.subscribe(async ({ type, payload }) => {
			        await applyMiddlewares(type, payload);
			        triggerTo(type, payload);
			      });
			    });
			    callback(__spreadProps$5(__spreadValues$8({}, runtime), { applyMiddlewares, triggerTo, waitFor }))($, actions);
			  };
			});
			const ON_FORM_QUERY = "@@__ON_FORM_QUERY__@@";
			const createQueryEffects = exports('createQueryEffects', (resource, middlewares, context) => {
			  return createEffectsProvider(({ applyMiddlewares, actions }) => ($) => {
			    $(ON_FORM_QUERY).subscribe(async (type) => {
			      if (!isStr(type))
			        return;
			      const preValues = await applyMiddlewares("onFormWillQuery", actions.getFormState((state) => state.values));
			      const values = await applyMiddlewares(type, preValues);
			      try {
			        await applyMiddlewares("onFormDidQuery", await resource(values));
			      } catch (e) {
			        await applyMiddlewares("onFormQueryFailed", e);
			        throw e;
			      }
			    });
			    $("onFormMount").subscribe(async () => {
			      actions.dispatch(ON_FORM_QUERY, "onFormFirstQuery");
			    });
			    $("onFormSubmit").subscribe(async () => {
			      actions.dispatch(ON_FORM_QUERY, "onFormSubmitQuery");
			    });
			    $("onFormReset").subscribe(async () => {
			      actions.dispatch(ON_FORM_QUERY, "onFormResetQuery");
			    });
			  }, middlewares, context);
			});
			const inspectChanged = (source, target, keys) => {
			  let changeNum = 0;
			  const changedProps = {};
			  each(keys, (key) => {
			    if (!isEqual(source[key], target[key])) {
			      changeNum++;
			      changedProps[key] = target[key];
			    }
			  });
			  if (changeNum > 0) {
			    return changedProps;
			  }
			};

			var __defProp$7 = Object.defineProperty;
			var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
			var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
			var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$7 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$7.call(b, prop))
			      __defNormalProp$7(a, prop, b[prop]);
			  if (__getOwnPropSymbols$7)
			    for (var prop of __getOwnPropSymbols$7(b)) {
			      if (__propIsEnum$7.call(b, prop))
			        __defNormalProp$7(a, prop, b[prop]);
			    }
			  return a;
			};
			const useDirty = (input = {}, keys = []) => {
			  const ref = React.useRef({ data: __spreadValues$7({}, input), dirtys: {}, num: 0 });
			  ref.current.num = 0;
			  keys.forEach((key) => {
			    if (!isEqual(input[key], ref.current.data[key])) {
			      ref.current.data[key] = input[key];
			      ref.current.dirtys[key] = true;
			      ref.current.num++;
			    } else {
			      ref.current.dirtys[key] = false;
			    }
			  });
			  return ref.current;
			};

			const BroadcastContext = createContext(null);
			const FieldContext = createContext(null);
			const LayoutContext = createContext({});
			var FormContext = createContext(null);

			function useForceUpdate() {
			  const updating = useRef(false);
			  const timer = useRef(null);
			  const [, dispatch] = useState(Object.create(null));
			  updating.current = true;
			  const memoizedDispatch = useCallback(() => {
			    if (!updating.current)
			      dispatch(Object.create(null));
			    else {
			      clearTimeout(timer.current);
			      timer.current = setTimeout(() => {
			        dispatch(Object.create(null));
			      });
			    }
			  }, [dispatch]);
			  useEffect(() => {
			    updating.current = false;
			  });
			  return memoizedDispatch;
			}

			var __defProp$6 = Object.defineProperty;
			var __defProps$4 = Object.defineProperties;
			var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
			var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
			var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$6 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$6.call(b, prop))
			      __defNormalProp$6(a, prop, b[prop]);
			  if (__getOwnPropSymbols$6)
			    for (var prop of __getOwnPropSymbols$6(b)) {
			      if (__propIsEnum$6.call(b, prop))
			        __defNormalProp$6(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
			const FormHookSymbol = Symbol("FORM_HOOK");
			const DEV_TOOLS_HOOK = "__FORMILY_DEV_TOOLS_HOOK__";
			let formID = 0;
			const useInternalForm = (options = {}) => {
			  const forceUpdate = useForceUpdate();
			  const ref = useRef({
			    subscribeId: null
			  });
			  const dirty = useDirty(options, ["initialValues", "values", "editable"]);
			  const alreadyHaveForm = !!options.form;
			  const alreadyHaveHookForm = options.form && options.form[FormHookSymbol];
			  const form = useMemo(() => {
			    const form2 = alreadyHaveForm ? options.form : createForm(options);
			    if (!alreadyHaveForm) {
			      ref.current.subscribeId = form2.subscribe(({ type }) => {
			        if (type === LifeCycleTypes.ON_FORM_HOST_RENDER) {
			          forceUpdate();
			        }
			      });
			    }
			    return form2;
			  }, []);
			  useEffect(() => {
			    if (alreadyHaveHookForm)
			      return;
			    if (dirty.num > 0) {
			      form.setFormState((state) => {
			        if (dirty.dirtys.values && isValid(options.values)) {
			          state.values = options.values;
			        }
			        if (dirty.dirtys.initialValues && isValid(options.initialValues)) {
			          state.initialValues = options.initialValues;
			        }
			        if (dirty.dirtys.editable && isValid(options.editable)) {
			          state.editable = options.editable;
			        }
			      });
			    }
			  });
			  useEffect(() => {
			    if (alreadyHaveHookForm)
			      return;
			    form.setFormState((state) => {
			      state.mounted = true;
			    });
			    formID++;
			    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
			      globalThisPolyfill[DEV_TOOLS_HOOK].inject(formID, form);
			    }
			    return () => {
			      form.unsubscribe(ref.current.subscribeId);
			      form.setFormState((state) => {
			        state.unmounted = true;
			      });
			      if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
			        globalThisPolyfill[DEV_TOOLS_HOOK].unmount(formID);
			      }
			    };
			  }, []);
			  form[FormHookSymbol] = true;
			  return form;
			};
			const useForm = exports('useForm', (props) => {
			  const actionsRef = useRef(null);
			  actionsRef.current = actionsRef.current || props.actions || createFormActions();
			  const broadcast = useContext(BroadcastContext);
			  const { implementActions, dispatch } = useEva_1({
			    actions: actionsRef.current,
			    effects: createFormEffects(props.effects, actionsRef.current)
			  });
			  const lifecycles = [
			    new FormLifeCycle(({ type, payload }) => {
			      dispatch.lazy(type, () => {
			        var _a;
			        return (payload == null ? void 0 : payload.getState) ? (_a = payload.getState) == null ? void 0 : _a.call(payload) : payload;
			      });
			      if (broadcast) {
			        broadcast.notify({ type, payload });
			      }
			    }),
			    new FormLifeCycle(LifeCycleTypes.ON_FORM_WILL_INIT, (form2, formApi) => {
			      const actions = __spreadProps$4(__spreadValues$6({}, formApi), {
			        dispatch: formApi.notify
			      });
			      implementActions(actions);
			      if (broadcast) {
			        broadcast.setContext(actions);
			      }
			    })
			  ];
			  const optionsRef = useRef(__spreadProps$4(__spreadValues$6({}, props), {
			    initialValues: props.initialValues || props.defaultValue
			  }));
			  Object.assign(optionsRef.current, props);
			  optionsRef.current.values = props.value;
			  optionsRef.current.lifecycles = lifecycles;
			  const form = useInternalForm(optionsRef.current);
			  return form;
			});

			const Form = exports('Form', (props = {}) => {
			  const form = useForm(props);
			  return /* @__PURE__ */ React.createElement(FormContext.Provider, {
			    value: form
			  }, isFn$1(props.children) ? props.children(form) : React.Children.map(props.children, (node) => {
			    return React.cloneElement(node);
			  }));
			});
			Form.displayName = "ReactInternalForm";

			var __defProp$5 = Object.defineProperty;
			var __defProps$3 = Object.defineProperties;
			var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
			var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
			var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$5 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$5.call(b, prop))
			      __defNormalProp$5(a, prop, b[prop]);
			  if (__getOwnPropSymbols$5)
			    for (var prop of __getOwnPropSymbols$5(b)) {
			      if (__propIsEnum$5.call(b, prop))
			        __defNormalProp$5(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
			const extendMutators = (mutators, props) => {
			  return __spreadProps$3(__spreadValues$5({}, mutators), {
			    change: (...args) => {
			      args[0] = isFn$1(props.getValueFromEvent) ? props.getValueFromEvent(...args) : args[0];
			      mutators.change(...args.map((event) => getValueFromEvent(event)));
			    },
			    blur: () => {
			      mutators.blur();
			      if (props.triggerType === "onBlur") {
			        mutators.validate({ throwErrors: false });
			      }
			    }
			  });
			};
			const INSPECT_PROPS_KEYS$1 = [
			  "props",
			  "rules",
			  "required",
			  "editable",
			  "visible",
			  "display"
			];
			const useField = exports('useField', (options) => {
			  const forceUpdate = useForceUpdate();
			  const ref = useRef({
			    field: null,
			    unmounted: false,
			    subscriberId: null,
			    uid: null
			  });
			  const form = useContext(FormContext);
			  if (!form) {
			    throw new Error("Form object cannot be found from context.");
			  }
			  const mutators = useMemo(() => {
			    let initialized = false;
			    ref.current.field = form.registerField(options);
			    ref.current.subscriberId = ref.current.field.subscribe((fieldState) => {
			      if (ref.current.unmounted)
			        return;
			      if (initialized) {
			        if (options.triggerType === "onChange") {
			          if (ref.current.field.hasChanged("value")) {
			            mutators.validate({ throwErrors: false });
			          }
			        }
			        if (!form.isHostRendering()) {
			          forceUpdate();
			        }
			      }
			    });
			    ref.current.uid = Symbol();
			    initialized = true;
			    return extendMutators(form.createMutators(ref.current.field), options);
			  }, [options.name, options.path]);
			  useEffect(() => {
			    const cacheProps = ref.current.field.getCache(ref.current.uid);
			    if (cacheProps) {
			      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS$1);
			      if (props) {
			        ref.current.field.setState((state2) => {
			          merge$4(state2, props, {
			            assign: true,
			            arrayMerge: (target, source) => source
			          });
			        });
			      }
			      ref.current.field.setCache(ref.current.uid, options);
			    } else {
			      ref.current.field.setCache(ref.current.uid, options);
			    }
			  });
			  useEffect(() => {
			    ref.current.field.setState((state2) => {
			      state2.mounted = true;
			    }, !ref.current.field.state.unmounted);
			    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, ref.current.field);
			    ref.current.unmounted = false;
			    return () => {
			      ref.current.field.removeCache(ref.current.uid);
			      ref.current.unmounted = true;
			      ref.current.field.unsubscribe(ref.current.subscriberId);
			      ref.current.field.setState((state2) => {
			        state2.unmounted = true;
			      });
			    };
			  }, []);
			  const state = ref.current.field.getState();
			  return {
			    form,
			    field: ref.current.field,
			    state,
			    mutators,
			    props: state.props
			  };
			});

			const Field = exports('Field', (props) => {
			  const { state, field, props: innerProps, mutators, form } = useField(props);
			  if (!state.visible || !state.display)
			    return /* @__PURE__ */ React.createElement(React.Fragment, null);
			  if (isFn$1(props.children)) {
			    return /* @__PURE__ */ React.createElement(FieldContext.Provider, {
			      value: field
			    }, props.children({
			      form,
			      state,
			      props: innerProps,
			      mutators
			    }));
			  } else {
			    return /* @__PURE__ */ React.createElement(FieldContext.Provider, {
			      value: field
			    }, props.children);
			  }
			});
			Field.displayName = "ReactInternalField";
			Field.defaultProps = {
			  path: "",
			  triggerType: "onChange"
			};

			var __defProp$4 = Object.defineProperty;
			var __defProps$2 = Object.defineProperties;
			var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
			var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
			var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$4 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$4.call(b, prop))
			      __defNormalProp$4(a, prop, b[prop]);
			  if (__getOwnPropSymbols$4)
			    for (var prop of __getOwnPropSymbols$4(b)) {
			      if (__propIsEnum$4.call(b, prop))
			        __defNormalProp$4(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
			const FieldList = exports('FieldList', (props) => {
			  return React.createElement(Field, __spreadProps$2(__spreadValues$4({}, props), {
			    dataType: "array"
			  }));
			});
			FieldList.displayName = "ReactInternalFieldList";
			FieldList.defaultProps = {
			  path: "",
			  triggerType: "onChange"
			};

			const INSPECT_PROPS_KEYS = ["props", "visible", "display"];
			const useVirtualField = exports('useVirtualField', (options) => {
			  const forceUpdate = useForceUpdate();
			  const ref = useRef({
			    field: null,
			    unmounted: false,
			    subscriberId: null,
			    uid: null
			  });
			  const form = useContext(FormContext);
			  if (!form) {
			    throw new Error("Form object cannot be found from context.");
			  }
			  useMemo(() => {
			    let initialized = false;
			    ref.current.field = form.registerVirtualField(options);
			    ref.current.subscriberId = ref.current.field.subscribe(() => {
			      if (ref.current.unmounted)
			        return;
			      if (initialized) {
			        forceUpdate();
			      }
			    });
			    ref.current.uid = Symbol();
			    initialized = true;
			  }, [options.name, options.path]);
			  useEffect(() => {
			    const cacheProps = ref.current.field.getCache(ref.current.uid);
			    if (cacheProps) {
			      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS);
			      if (props) {
			        ref.current.field.setState((state2) => {
			          merge$4(state2, props, {
			            assign: true,
			            arrayMerge: (target, source) => source
			          });
			        });
			        ref.current.field.setCache(ref.current.uid, options);
			      }
			    } else {
			      ref.current.field.setCache(ref.current.uid, options);
			    }
			  });
			  useEffect(() => {
			    ref.current.field.setState((state2) => {
			      state2.mounted = true;
			    }, !ref.current.field.state.unmounted);
			    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, ref.current.field);
			    ref.current.unmounted = false;
			    return () => {
			      ref.current.field.removeCache(ref.current.uid);
			      ref.current.unmounted = true;
			      ref.current.field.unsubscribe(ref.current.subscriberId);
			      ref.current.field.setState((state2) => {
			        state2.unmounted = true;
			      });
			    };
			  }, []);
			  const state = ref.current.field.getState();
			  return {
			    state,
			    field: ref.current.field,
			    form,
			    props: state.props
			  };
			});

			const VirtualField = exports('VirtualField', (props) => {
			  const { state, field, props: innerProps, form } = useVirtualField(props);
			  if (!state.visible || !state.display)
			    return /* @__PURE__ */ React.createElement(React.Fragment, null);
			  if (isFn$1(props.children)) {
			    return /* @__PURE__ */ React.createElement(FieldContext.Provider, {
			      value: field
			    }, props.children({
			      form,
			      state,
			      props: innerProps
			    }));
			  } else {
			    return /* @__PURE__ */ React.createElement(FieldContext.Provider, {
			      value: field
			    }, props.children);
			  }
			});
			VirtualField.displayName = "ReactInternalVirtualField";
			VirtualField.defaultProps = {
			  path: ""
			};

			const useFormSpy = exports('useFormSpy', (props) => {
			  const broadcast = useContext(BroadcastContext);
			  const form = useContext(FormContext);
			  const initializedRef = useRef(false);
			  const unmountRef = useRef(false);
			  const timerRef = useRef({});
			  const subscriberId = useRef();
			  const [type, setType] = useState(LifeCycleTypes.ON_FORM_INIT);
			  const [state, dispatch] = useReducer((state2, action) => props.reducer(state2, action, form), props.initialState || {});
			  const subscriber = useCallback(({ type: type2, payload }) => {
			    var _a;
			    if (initializedRef.current)
			      return;
			    const key = `${type2}_${(_a = payload == null ? void 0 : payload.state) == null ? void 0 : _a.name}`;
			    clearTimeout(timerRef.current[key]);
			    timerRef.current[key] = setTimeout(() => {
			      if (unmountRef.current)
			        return;
			      payload = payload && isFn$1(payload.getState) ? payload.getState() : payload;
			      if (isStr(props.selector) && FormPath.parse(props.selector).match(type2)) {
			        setType(type2);
			        dispatch({
			          type: type2,
			          payload
			        });
			      } else if (isArr(props.selector)) {
			        if (!!props.selector.find((str) => {
			          if (isStr(str)) {
			            return str === type2;
			          } else if (isArr(str)) {
			            if (str.length < 2) {
			              return str[0] === type2;
			            } else {
			              return str[0] === type2 && FormPath.parse(str[1]).matchAliasGroup(payload.name, payload.path);
			            }
			          }
			        })) {
			          setType(type2);
			          dispatch({
			            type: type2,
			            payload
			          });
			        }
			      }
			    });
			  }, []);
			  useMemo(() => {
			    initializedRef.current = true;
			    if (broadcast) {
			      subscriberId.current = broadcast.subscribe(subscriber);
			    } else if (form) {
			      subscriberId.current = form.subscribe(subscriber);
			    }
			    initializedRef.current = false;
			  }, []);
			  useEffect(() => {
			    return () => {
			      if (form) {
			        form.unsubscribe(subscriberId.current);
			      } else if (broadcast) {
			        broadcast.unsubscribe(subscriberId.current);
			      }
			      unmountRef.current = true;
			    };
			  }, []);
			  const formApi = broadcast ? broadcast && broadcast.getContext() : form;
			  return {
			    form: formApi,
			    type,
			    state
			  };
			});

			var __defProp$3 = Object.defineProperty;
			var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
			var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
			var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$3 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$3.call(b, prop))
			      __defNormalProp$3(a, prop, b[prop]);
			  if (__getOwnPropSymbols$3)
			    for (var prop of __getOwnPropSymbols$3(b)) {
			      if (__propIsEnum$3.call(b, prop))
			        __defNormalProp$3(a, prop, b[prop]);
			    }
			  return a;
			};
			const FormSpy = exports('FormSpy', (props) => {
			  if (isFn$1(props.children)) {
			    return props.children(useFormSpy(props)) || /* @__PURE__ */ React.createElement(Fragment, null);
			  } else {
			    return props.children || /* @__PURE__ */ React.createElement(Fragment, null);
			  }
			});
			FormSpy.displayName = "ReactInternalFormSpy";
			FormSpy.defaultProps = {
			  selector: `*`,
			  reducer: (state, action) => {
			    return __spreadValues$3(__spreadValues$3({}, state), action.payload);
			  }
			};

			const { Provider } = BroadcastContext;
			const FormProvider = exports('FormProvider', (props) => {
			  const broadcast = useMemo(() => {
			    return new Broadcast();
			  }, []);
			  return /* @__PURE__ */ React.createElement(Provider, {
			    value: broadcast
			  }, props.children);
			});

			var __defProp$2 = Object.defineProperty;
			var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
			var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
			var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$2 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$2.call(b, prop))
			      __defNormalProp$2(a, prop, b[prop]);
			  if (__getOwnPropSymbols$2)
			    for (var prop of __getOwnPropSymbols$2(b)) {
			      if (__propIsEnum$2.call(b, prop))
			        __defNormalProp$2(a, prop, b[prop]);
			    }
			  return a;
			};
			const transformStatus = (type, ref) => {
			  switch (type) {
			    case LifeCycleTypes.ON_FORM_INIT:
			      return "initialize";
			    case LifeCycleTypes.ON_FORM_SUBMIT_START:
			      ref.current.submitting = true;
			      return "submitting";
			    case LifeCycleTypes.ON_FORM_SUBMIT_END:
			      ref.current.submitting = false;
			      return "submitted";
			    default:
			      return ref.current.submitting ? "submitting" : type;
			  }
			};
			const transformFormAPI = (api, type, ref) => {
			  deprecate("FormConsumer", "Please use FormSpy Component.");
			  return {
			    status: transformStatus(type, ref),
			    state: api.getFormState(),
			    submit: api.submit,
			    reset: api.reset
			  };
			};
			const FormConsumer = exports('FormConsumer', (props) => {
			  const ref = useRef({});
			  return /* @__PURE__ */ React.createElement(FormSpy, __spreadValues$2({}, props), ({ form, type }) => {
			    if (!form)
			      return /* @__PURE__ */ React.createElement(React.Fragment, null);
			    return isFn$1(props.children) ? props.children(transformFormAPI(form, type, ref)) : props.children;
			  });
			});

			const computeAttr = (propAttr, layoutAttr, defaultValue) => {
			  if (typeof propAttr !== "undefined")
			    return propAttr;
			  if (typeof layoutAttr !== "undefined")
			    return layoutAttr;
			  return defaultValue;
			};
			const useLayout = exports('useLayout', (props) => {
			  const isLayout = props.isLayout || false;
			  const defaultSettings = props.defaultSettings || {};
			  const context = useContext(LayoutContext);
			  const enableLayout = Object.keys(context).length > 0;
			  const isRoot = isLayout && !enableLayout;
			  const autoRow = computeAttr(props.autoRow, context.autoRow, false);
			  const flex = computeAttr(props.flex, context.flex, false);
			  let columns = computeAttr(props.columns, context.columns, 3);
			  const responsive = (props.responsive || context.contextResponsive) && {
			    lg: computeAttr((props.responsive || {}).lg, (context.contextResponsive || {}).lg, columns),
			    m: computeAttr((props.responsive || {}).m, (context.contextResponsive || {}).m, columns),
			    s: computeAttr((props.responsive || {}).s, (context.contextResponsive || {}).s, columns)
			  };
			  const contextResponsive = responsive ? responsive : context.contextResponsive;
			  const size = computeAttr(props.size, context.size, void 0);
			  const gutter = computeAttr(props.gutter, context.gutter, defaultSettings.gutter || 0);
			  const hasBorder = computeAttr(props.hasBorder, context.hasBorder, true);
			  const inset = computeAttr(props.inset, context.inset, false);
			  const full = computeAttr(props.full, context.full, false);
			  const labelAlign = computeAttr(props.labelAlign, context.labelAlign, "right");
			  const labelWidth = computeAttr(props.labelWidth, context.labelWidth, -1);
			  const wrapperWidth = computeAttr(props.wrapperWidth, context.wrapperWidth, -1);
			  const enableSafeWidth = computeAttr(props.enableSafeWidth, context.enableSafeWidth, true);
			  let labelCol = computeAttr(props.labelCol, context.labelCol, -1);
			  let wrapperCol = computeAttr(props.wrapperCol, context.wrapperCol, -1);
			  const span = computeAttr(props.span, 1, 1);
			  let grid = computeAttr(props.grid, context.grid, false);
			  let inline = computeAttr(props.inline, context.inline, false);
			  if (grid && inline) {
			    if (props.grid) {
			      inline = false;
			      grid = true;
			    }
			    if (props.inline) {
			      grid = false;
			      inline = true;
			    }
			  }
			  if (inline && !isLayout) {
			    labelCol = -1;
			    wrapperCol = -1;
			  }
			  return {
			    enableLayout,
			    isRoot,
			    isLayout,
			    grid,
			    inline,
			    autoRow,
			    flex,
			    inset,
			    hasBorder,
			    columns,
			    contextColumns: context.columns,
			    full,
			    labelWidth,
			    wrapperWidth,
			    labelCol,
			    wrapperCol,
			    labelAlign,
			    gutter,
			    span,
			    context,
			    responsive,
			    contextResponsive,
			    enableSafeWidth,
			    size
			  };
			});
			const useLayoutItem = exports('useLayoutItem', (props) => {
			  const layout = useLayout(props);
			  const { enableLayout } = layout;
			  return enableLayout ? layout : null;
			});

			var __defProp$1 = Object.defineProperty;
			var __defProps$1 = Object.defineProperties;
			var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
			var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
			var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
			var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues$1 = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp$1.call(b, prop))
			      __defNormalProp$1(a, prop, b[prop]);
			  if (__getOwnPropSymbols$1)
			    for (var prop of __getOwnPropSymbols$1(b)) {
			      if (__propIsEnum$1.call(b, prop))
			        __defNormalProp$1(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
			var __objRest = (source, exclude) => {
			  var target = {};
			  for (var prop in source)
			    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
			      target[prop] = source[prop];
			  if (source != null && __getOwnPropSymbols$1)
			    for (var prop of __getOwnPropSymbols$1(source)) {
			      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
			        target[prop] = source[prop];
			    }
			  return target;
			};
			const Layout = exports('Layout', (_a) => {
			  var _b = _a, {
			    children,
			    required,
			    label,
			    addonBefore,
			    addonAfter,
			    description
			  } = _b, props = __objRest(_b, [
			    "children",
			    "required",
			    "label",
			    "addonBefore",
			    "addonAfter",
			    "description"
			  ]);
			  const layout = useLayout(__spreadProps$1(__spreadValues$1({}, props), { isLayout: true }));
			  return /* @__PURE__ */ React.createElement(LayoutContext.Provider, {
			    value: layout
			  }, children(__spreadProps$1(__spreadValues$1({}, layout), {
			    label,
			    required,
			    addonBefore,
			    addonAfter,
			    description
			  })));
			});
			const LayoutItem = exports('LayoutItem', (_c) => {
			  var _d = _c, { children } = _d, props = __objRest(_d, ["children"]);
			  const layoutItem = useLayoutItem(props);
			  return children(layoutItem);
			});

			const useFieldState = exports('useFieldState', (defaultState) => {
			  const ref = useRef();
			  const field = useContext(FieldContext);
			  useMemo(() => {
			    field.setState((state) => {
			      Object.assign(state, defaultState);
			    });
			  }, []);
			  ref.current = isField(field) ? field.getState() : field.getState();
			  return [
			    ref.current,
			    (nextState) => {
			      if (!nextState)
			        return;
			      field.setState((state) => {
			        Object.assign(state, nextState);
			      });
			    }
			  ];
			});

			const useFormState = exports('useFormState', (defaultState) => {
			  const forceUpdate = useForceUpdate();
			  const ref = useRef({});
			  const form = useContext(FormContext);
			  ref.current.subscribeId = useMemo(() => {
			    form.setFormState((state) => {
			      Object.assign(state, defaultState);
			    });
			    return form.subscribe(({ type }) => {
			      if (type === LifeCycleTypes.ON_FORM_CHANGE) {
			        forceUpdate();
			      }
			    });
			  }, []);
			  ref.current.state = form.getFormState();
			  useEffect(() => {
			    return () => {
			      form.unsubscribe(ref.current.subscribeId);
			    };
			  }, []);
			  return [
			    ref.current.state,
			    (nextState) => {
			      if (!nextState)
			        return;
			      form.setFormState((state) => {
			        Object.assign(state, nextState);
			      });
			    }
			  ];
			});

			function useFormEffects(effects) {
			  const form = useContext(FormContext);
			  const { dispatch } = useEva_1({
			    effects: createFormEffects(effects, form)
			  });
			  const subscribeId = useMemo(() => form.subscribe(({ type, payload }) => {
			    dispatch.lazy(type, () => {
			      return isStateModel(payload) ? payload.getState() : payload;
			    });
			  }), []);
			  useEffect(() => {
			    return () => {
			      form.unsubscribe(subscribeId);
			    };
			  }, []);
			}

			var __defProp = Object.defineProperty;
			var __defProps = Object.defineProperties;
			var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
			var __getOwnPropSymbols = Object.getOwnPropertySymbols;
			var __hasOwnProp = Object.prototype.hasOwnProperty;
			var __propIsEnum = Object.prototype.propertyIsEnumerable;
			var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
			var __spreadValues = (a, b) => {
			  for (var prop in b || (b = {}))
			    if (__hasOwnProp.call(b, prop))
			      __defNormalProp(a, prop, b[prop]);
			  if (__getOwnPropSymbols)
			    for (var prop of __getOwnPropSymbols(b)) {
			      if (__propIsEnum.call(b, prop))
			        __defNormalProp(a, prop, b[prop]);
			    }
			  return a;
			};
			var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
			const useFormQuery = exports('useFormQuery', (resource, middlewares, context) => {
			  const ref = useRef();
			  const [state, setState] = useState({
			    loading: false,
			    response: {},
			    error: null
			  });
			  ref.current = state;
			  return __spreadValues({
			    loading: ref.current.loading,
			    response: ref.current.response,
			    error: ref.current.error
			  }, useMemo(() => {
			    let trigger;
			    let promise;
			    let resolve;
			    const onSubmit = () => {
			      promise = new Promise((_resolve) => {
			        resolve = _resolve;
			      });
			      return promise;
			    };
			    const effects = createQueryEffects(resource, [
			      ({ actions }) => {
			        trigger = (type = "onFormSubmitQuery") => {
			          actions.dispatch(ON_FORM_QUERY, type);
			        };
			        return {
			          async onFormWillQuery(payload, next) {
			            setState(__spreadProps(__spreadValues({}, ref.current), {
			              loading: true
			            }));
			            return next(payload);
			          },
			          async onFormQueryFailed(error, next) {
			            setState(__spreadProps(__spreadValues({}, ref.current), {
			              loading: false,
			              error
			            }));
			            return next(error);
			          }
			        };
			      },
			      ...toArr(middlewares),
			      () => ({
			        async onFormDidQuery(payload, next) {
			          const response = await next(payload);
			          setState(__spreadProps(__spreadValues({}, ref.current), {
			            loading: false,
			            response
			          }));
			          if (resolve) {
			            resolve();
			          }
			          return response;
			        }
			      })
			    ], context);
			    return {
			      effects,
			      onSubmit,
			      trigger(type) {
			        if (trigger) {
			          trigger(type);
			        }
			      }
			    };
			  }, []));
			});

		})
	};
}));