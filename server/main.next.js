Meteor.publish('cards', function() {
	return Cards.find({});
});

Cards.allow({
	insert(userId, card) {
		return true;
	}
});

Meteor.publish('decks', function() {
	return Decks.find({});
});

Decks.allow({
	insert(userId, deck) {
		return userId === deck.user_id;
	},
	remove(userId, deck) {
		return userId === deck.user_id;
	},
});

