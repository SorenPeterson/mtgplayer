Template.Decks.helpers({
	decks() {
		return Decks.find({});
	},
});

Template.Decks.events({
	'click button'(evt, tmpl) {
		Decks.insert({user_id: Meteor.userId(), cards: [], name: "Untitled"});
	},
	'click .deck'(evt, tmpl) {
		Session.set('deck-id', this._id);
		Router.go('/editdeck');
	},
});

Template.EditDeck.onRendered(function() {
});

Template.EditDeck.helpers({
	deck() {
		return Decks.findOne({_id: Session.get('deck-id')});
	},
});

Template.EditDeck.events({
	'submit form'(evt, tmpl) {
		evt.preventDefault();
		var params = tmpl.findAll('input');
		params = _(params).reduce((obj, item) => {
			if(item.name.length > 0) {
				obj[item.name] = item.value;
			}
			return obj;
		}, {});
		params = {$set: params};
		Decks.update({_id: Session.get('deck-id')}, params);
	},
	'click .add-card'(evt, tmpl) {
		Picker.open(name => {
			var deck = Decks.findOne({_id: Session.get('deck-id')});
			var cards = deck.cards;
			cards.push(name);
			Decks.update({_id: Session.get('deck-id')}, {$set: {cards: cards}});
		});
	},
});

