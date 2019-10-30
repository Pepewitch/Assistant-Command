import * as functions from 'firebase-functions';
import { WebhookClient, BasicCard, Button, Image } from 'dialogflow-fulfillment';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export const dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
	const agent = new WebhookClient({ request, response });

	const invocation = agent => {
		const {
			parameters: { amount, target_name },
		} = agent;
		return agent.add(
			'Yeah, send to ' + target_name + ' ' + amount.amount + ' ' + amount.currency
		);
	};

	let intentMap = new Map();
	intentMap.set('invocation', invocation);
	agent.handleRequest(intentMap);
});
