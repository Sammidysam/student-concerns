import { Meteor } from 'meteor/meteor';

// Return Meteor email address.
if (Meteor.isServer) {
	Meteor.publish('userData', function userDataPublication() {
		if (this.userId)
			return Meteor.users.find({ _id: this.userId }, { fields: { services: 1 }});
		else
			this.ready();
	});
}
