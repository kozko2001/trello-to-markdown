const trello_to_markdown = require('./index')

const help = () => {
    console.log(`
This is an example of how to use the library

please execute the script as:

node example.js $board_id

and remember to have the TRELLO_API and TRELLO_SECRET setted as enviornment variables
`);


}

if(process.argv.length != 3 || !process.env.TRELLO_SECRET || !process.env.TRELLO_API) {
    help();
    return;
}


const board = process.argv[2];

trello_to_markdown(process.env.TRELLO_API, process.env.TRELLO_SECRET, board)
    .then(markdown => console.log(markdown))

