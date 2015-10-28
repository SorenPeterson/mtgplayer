Template.Decks.helpers({
	function decks() {
		return Decks.find({});
	}
});

Template.EditDeck.onRendered(function() {
	console.log('hi');
});

Template.EditDeck.helpers({
	function deck() {
		return Decks.find({_id: Session.get('deck-id')});
	},
});

Temlpate.EditDeck.events({
	'submit form': function (evt, tmpl)
});

