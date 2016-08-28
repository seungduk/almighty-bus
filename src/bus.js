
import _ from 'lodash';

const subscribers = [];

function functionNameOf(eventName, prefix) {
  return _.camelCase(`${prefix}_${eventName}`);
}

function subscribeFunctionsOf(subscribers, eventName) {
  const functions = [];
  const functionName = functionNameOf(eventName, 'subscribe');
  for (let subscriber of subscribers) {
    if (_.isFunction(subscriber[functionName])) {
      functions.push(subscriber[functionName]);
    }
  }
  return functions;
}

const maxCallStackSize = 10;
const callStack = [];
function post(eventName, ...parameters) {
  if (callStack.length >= maxCallStackSize) {
    throw new Error(`Post aborted. Call stack size reached its maximum(${maxCallStackSize}).`)
  }
  callStack.push({
    eventName,
    parameters,
  });
  for (let callback of subscribeFunctionsOf(subscribers, eventName)) {
    callback(...parameters);
  }
  callStack.pop();
}

function register(subscriber) {
  if (!subscriber) {
    throw new Error('Parameter subscriber is not given.');
  }
  subscribers.push(subscriber);
  // TODO(seungduk): Collect produce functions.
}

function unregister(subscriber) {
  _.pull(subscribers, subscriber);
}

function unregisterAll() {
  while (subscribers.length > 0) {
    subscribers.pop();
  }
}

module.exports = {
  post,
  register,
  unregister,
  unregisterAll,
};
