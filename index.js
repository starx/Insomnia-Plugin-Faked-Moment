const faker = require('faker');
const moment = require('moment');
const properCase = require('proper-case');
const insomniaPluginFaker = require('insomnia-plugin-faker');
const insomniaPluginFakerDefaultTemplateTags = insomniaPluginFaker.templateTags[0];

// Actual Template Tags export that Insomnia expects
module.exports.templateTags = [{
    name: 'faked_moment',
    displayName: 'Faked Moment',
    description: 'Generate fake date using Faker.js and pass the result to Moment.js in Insomnia',
    args: insomniaPluginFakerDefaultTemplateTags.args.concat([
        {
            displayName: 'Moment options',
            type: 'string',
            description: 'Allows you to pass in a string that some types allow for more fine grained control over the output of the value. See http://marak.github.io/faker.js/faker.html for more info.'
        }
    ]),
    async run(context, type, ...args) {
        var fakerArgs = args.slice(0, args.length -1);
        var fakerRunPromise = insomniaPluginFakerDefaultTemplateTags.run(context, type, ...fakerArgs).then(function(fakerResponse) {
            console.log("Faker response.", fakerResponse);
            /*
             * Moment
             */
            let momentString = args.slice(-1)[0];
            if (momentString == "") {
                return fakerResponse;
            }
            // Attempt to parse arguments as JSON object or list
            let momentJson = JSON.parse(momentString);

            if(momentJson) {
                console.log('Parse moment.js options. ', momentJson);
                const momentObj = moment(fakerResponse);
                let momentResponse = fakerResponse;
                if(momentJson.hasOwnProperty('format')) {
                    momentResponse = momentObj.format(momentJson.format);
                }

                return momentResponse;
            }

            // In any case return Faker's response
            return fakerResponse;

        });
        return fakerRunPromise;
    }
}];

