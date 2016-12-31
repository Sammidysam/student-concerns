import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Concerns = new Mongo.Collection('concerns');

Meteor.methods({
	'concerns.insert'(text, anonymous) {
		check(text, String);

		concern = {
            text: text,
            createdAt: new Date()
        };
        if (!anonymous && Meteor.userId())
            concern["owner"] = Meteor.user().profile.name;

        Concerns.insert(concern);
    }
});
