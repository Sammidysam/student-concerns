import { Template } from 'meteor/templating';

import { Concerns } from '../api/concerns.js';

import './body.html';

Template.body.events({
	'submit .new-concern'(event) {
		event.preventDefault();

		const target = event.target;
		const anonymous = target.anonymous.checked;
		const text = target.text.value;

		Concerns.insert({
			text,
			createdAt: new Date()
		});

		target.text.value = '';
	}
});
