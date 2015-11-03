Template.Decks.helpers({
	decks() {
		return Decks.find({});
	}
});

Template.EditDeck.onRendered(function() {
	console.log('hi');
});

Template.EditDeck.helpers({
	deck() {
		return Decks.find({_id: Session.get('deck-id')});
	}
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
		Decks.remove(Session.get('deck-id'));
		params.user_id = Meteor.userId();
		Decks.insert(params);
	}
});

