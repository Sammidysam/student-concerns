import { Template } from 'meteor/templating';

import { Concerns } from '../api/concerns.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	// Whenever Meteor.userId() changes (log in / out), the new subscription
	// results will be retrieved.
	this.autorun(() => {
		Meteor.subscribe('concerns', Meteor.userId());
	});

	Meteor.subscribe('userData');
});

Template.body.events({
	'submit .new-concern'(event) {
		event.preventDefault();

		const target = event.target;
		const anonymous = target.anonymous.checked;
		const text = target.text.value;

		Meteor.call('concerns.insert', text, anonymous);

		target.text.value = '';
	}
});

Template.body.helpers({
	concerns() {
		return Concerns.find({}, { sort: { createdAt: -1 } });
	}
});
