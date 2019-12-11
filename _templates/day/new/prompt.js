// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'day',
        message: 'Which day?'
      })
      .then(({ day }) => {
        if (day === '') {
          throw Error('You must give a day.');
        }

        const dayPath = path.join('src', day);
        if (fs.existsSync(dayPath)) {
          throw Error(`Day ${day} already exists.\n`);
        }

        return {
          day
        };
      })
};
