/* eslint-env mocha */

import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';

import {Tasks} from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'testuser',
        });
      });

      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can test
        // in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // Set up a fake method call that looks like what the method expexts
        const invocation = {userId};

        // Run the method with "this" set to the fake invocation
        deleteTask.apply(invocation, [taskId]);

        // Verify that the method does what expected
        assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}
