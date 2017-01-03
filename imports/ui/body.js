import { Template } from 'meteor/templating';

import { Concerns } from '../api/concerns.js';
import { Permissions } from '../api/permissions.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	// Whenever Meteor.userId() changes (log in / out), the new subscription
	// results will be retrieved.
	this.autorun(() => {
		Meteor.subscribe('concerns', Meteor.userId());
		Meteor.subscribe('permissions', Meteor.userId());
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
	},
	'submit .new-permission'(event) {
		event.preventDefault();

		const target = event.target;
		const email = target.email.value;

		Meteor.call('permissions.insert', email);

		target.email.value = '';
	}
});

Template.body.helpers({
	canSeeConcerns() {
		return Meteor.userId() && Concerns.find().count() > 0;
	},
	canSeePermissions() {
		return Meteor.userId() && Permissions.find().count() > 0;
	},
	concerns() {
		return Concerns.find({}, { sort: { createdAt: -1 } });
	},
	permissions() {
		return Permissions.find({}, { sort: { email: 1 } });
	}
});
