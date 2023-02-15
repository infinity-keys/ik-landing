const Economy = require('discord-economy-super');

let eco = new Economy({
	storagePath: './storage.json',
	updateCountdown: 1000,
	checkStorage: true,
	deprecationWarnings: true,
	sellingItemPercent: 75,
	savePurchasesHistory: true,
	dailyAmount: 100,
	workAmount: [10, 50],
	weeklyAmount: 1000,
	dailyCooldown: 60000 * 60 * 24,
	workCooldown: 60000 * 60,
	weeklyCooldown: 60000 * 60 * 24 * 7,
	dateLocale: 'en',
	updater: {
		checkUpdates: true,
		upToDateMessage: true,
	},
	errorHandler: {
		handleErrors: true,
		attempts: 5,
		time: 3000,
	},
	optionsChecker: {
		ignoreInvalidTypes: false,
		ignoreUnspecifiedOptions: true,
		ignoreInvalidOptions: false,
		showProblems: true,
		sendLog: true,
		sendSuccessLog: false,
	},
});


eco.on('ready', economy => {
	eco = economy;
	console.log('Economy is ready!');
});
module.exports = eco;