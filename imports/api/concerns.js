import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Permissions } from './permissions.js';

export const Concerns = new Mongo.Collection('concerns');

if (Meteor.isServer) {
	// Return Concerns only if the user is logged in.
	Meteor.publish('concerns', function concernsPublication() {
		return this.userId && Permissions.find({ email: Meteor.users.findOne(this.userId).services.google.email }).count() > 0 && Concerns.find();
	});
}

Meteor.methods({
	'concerns.insert'(text, anonymous) {
		check(text, String);

		concern = {
            text: text,
            createdAt: new Date()
        };
        if (!anonymous && Meteor.userId())
            concern['owner'] = Meteor.user().profile.name;

        Concerns.insert(concern);
    }
});
