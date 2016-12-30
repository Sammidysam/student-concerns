import { Template } from 'meteor/templating';

import { Concerns } from '../api/concerns.js';

import './body.html';

Template.body.events({
	'submit .new-concern'(event) {
		event.preventDefault();

		const target = event.target;
		const anonymous = target.anonymous.checked;
		const text = target.text.value;

		concern = {
			text: text,
			createdAt: new Date()
		};
		if (!anonymous && Meteor.userId())
			concern["owner"] = Meteor.user().profile.name;

		Concerns.insert(concern);

		target.text.value = '';
	}
});

Template.body.helpers({
	concerns() {
		return Concerns.find({});
	}
});
