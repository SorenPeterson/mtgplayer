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
	update(userId, deck) {
		return userId === deck.user_id;
	},
});

Meteor.startup(function () {
	if(Cards.find({}).count() < 1000) {
		HTTP.get(Meteor.absoluteUrl('mtg.json'), function(err, result) {
			if(Cards.find().count() < 15652) {
				Cards.remove({});
				for(var i in result.data) {
					Cards.insert(result.data[i]);
				}
				console.log(typeof result.data);
			}
		});
	}
});

