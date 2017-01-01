import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Concerns = new Mongo.Collection('concerns');

if (Meteor.isServer) {
	// Return Concerns only if the user is logged in.
	Meteor.publish('concerns', function concernsPublication() {
		return this.userId && Meteor.users.findOne(this.userId).services.google.email == "craigsamm@gmail.com" && Concerns.find();
	});

	// Return Meteor email address.
	Meteor.publish('userData', function userDataPublication() {
		if (this.userId)
			return Meteor.users.find({ _id: this.userId }, { fields: { services: 1 }});
		else
			this.ready();
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
