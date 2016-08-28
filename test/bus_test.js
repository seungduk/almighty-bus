
const assert = require('chai').assert;
const bus = require('../src/bus');

describe('Bus', () => {
  describe('.post', () => {
    afterEach(() => {
      bus.unregisterAll();
    });

    it('posts an event to multiple subscribers', () => {
      let callbackCounter = 0;
      const subscriber1 = {
        subscribeNewEvent(...parameters) {
          assert.equal(parameters[0], 'parameter');
          assert.equal(parameters[1], 123);
          ++callbackCounter;
        },
      };
      const subscriber2 = {
        subscribeNewEvent(...parameters) {
          assert.equal(parameters[0], 'parameter');
          assert.equal(parameters[1], 123);
          ++callbackCounter;
        },
      };
      bus.register(subscriber1);
      bus.register(subscriber2);
      bus.post('new-event', 'parameter', 123);
      assert.equal(callbackCounter, 2);
      bus.unregister(subscriber1);
      bus.unregister(subscriber2);
    });

    it('does not post an event if a subscriber is already unregistered', () => {
      let callbackCounter = 0;
      const subscriber = {
        subscribeNewEvent() {
          ++callbackCounter;
        },
      };
      bus.register(subscriber);
      bus.unregister(subscriber);
      bus.post('new-event');
      assert.equal(callbackCounter, 0);
    });
  });
});
