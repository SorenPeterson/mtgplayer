Cards = new Mongo.Collection('cards');
Decks = new Mongo.Collection('decks');

Router.onBeforeAction(function() {
	this.layout('Layout');
	this.next();
});

Router.route('/', function() {
	this.layout(null);
	this.render('Index');
});

Router.route('/decks');

Router.route('/editdeck', function () {
	this.render('EditDeck');
});

