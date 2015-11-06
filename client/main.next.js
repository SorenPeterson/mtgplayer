Meteor.subscribe('cards');
Meteor.subscribe('decks');

var body;

Meteor.startup(function() {
	body = document.getElementsByTagName('body')[0];
});

window.Picker = {
	open(hollaback) {
		if(!this.isOpen()) {
			this.view = Blaze.render(Template.CardPicker, body);
			this.hollaback = hollaback;
		}
	},
	close() {
		if(this.isOpen()) {
			Blaze.remove(this.view);
			delete this.view;
			if(typeof hollaback === 'function') {
				this.hollaback();
			}
		}
	},
	isOpen() {
		return !!this.view;
	},
	query: new ReactiveVar(''),
}

Template.CardPicker.events({
	'keyup input'(evt, tmpl) {
		Picker.query.set(evt.target.value);
	},
	'click .close'(evt, tmpl) {
	},
});

Template.CardPicker.helpers({
	results() {
		var regex = new RegExp(Picker.query.get(), 'i');
		return Cards.find({name: {$regex: regex}}, {limit: 10});
	}
});

