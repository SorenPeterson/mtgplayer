Meteor.publish('decks', function() {
	return Decks.find();
});

Decks.allow({
	insert(userId, deck) {
		return userId === deck.user_id;
	},
	remove(userId, deck) {
		return userId === deck.user_id;
	},
});

