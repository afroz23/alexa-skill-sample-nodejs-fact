/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'entrepreneur facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a entrepreneur fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = ['One of the youngest CEOs in the IT industry, 46-year-old Francisco D Souza joined Cognizant as a co-founder in 1994, the year it was started as a division of The Dun & Bradstreet Corporation.',
  'When Pichai used to live in India, he could recall every single number he had ever dialled.',
  'The Google CEO currently has about 20-30 smartphones lying around in his house that he uses and tests from time to time.',
  'CEOs In India Make An Avg Rs.2 Crore Per Year.',
  'Pichai bought his first mobile phone in 1995 and his first smartphone in 2006.',
  'John Mackey is an American businessman and the current co-CEO of Whole Foods Market which he co-founded in 1980.',
  'Shantanu Narayen who’s from Hyderabad heads one of the world’s leading software companies, Adobe.',
  'Marissa Mayer, the current president and CEO of Yahoo, is obsessed with cupcakes and high fashion.',
  'Apple boss, Tim Cook said he decided to join Apple after just five minutes of his interview with Steve Jobs.',
  'Billionaire software CEO, Larry Ellison and romance novelist Melanie Craft sealed an eight-year courtship by getting married on December 18, 2003.',
  'Chanda D Kochhar, Managing Director and CEO of ICICI Bank, designs many of her own sarees.',
  'One of the biggest success stories of an Indian in the technology space comes from Microsoft CEO Satya Nadella.',
  'Sanjay Kumar Jha who hails from Bihar is now the CEO of Global Foundries, the worlds first full-service semiconductor foundry.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
