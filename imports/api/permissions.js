import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

export const Permissions = new Mongo.Collection('permissions');

if (Meteor.isServer) {
	// A person with permissions can see permissions.
	Meteor.publish('permissions', function permissionsPublication() {
		return this.userId && Permissions.find({ email: Meteor.users.findOne(this.userId).services.google.email }).count() > 0 && Permissions.find();
	});
}

Meteor.methods({
	'permissions.insert'(email) {
		check(email, String);
		check(Meteor.user().services.google.email, Match.Where(function (x) {
			check(x, String);
			return Permissions.find({ email: x }).count() > 0;
		}));

		Permissions.insert({
			email: email
		});
	},
	'permissions.remove'(id) {
		check(id, String);
		check(Meteor.user().services.google.email, Match.Where(function (x) {
            check(x, String);
            return Permissions.find({ email: x }).count() > 0;
        }));

		Permissions.remove(id);
	}
});
