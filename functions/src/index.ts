import * as functions from 'firebase-functions';
import { WebhookClient } from 'dialogflow-fulfillment';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export const dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
	const agent = new WebhookClient({ request, response });

	const command = agent => {
		const {
			parameters: { amount, target_name },
		} = agent;
		return agent.add('Hello World !!!!');
	};

	let intentMap = new Map();
	intentMap.set('Command', command);
	agent.handleRequest(intentMap);
});
