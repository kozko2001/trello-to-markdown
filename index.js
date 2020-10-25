var Trello = require("trello");
var toMarkdown = require('mdast-util-to-markdown')
var table = require('mdast-util-gfm-table')

const getColums = async (trello, board) =>  {
    const lists  = await trello.getListsOnBoard(board)
    return lists.map(list => ({
        "id": list["id"],
        "name": list["name"],
        "cards": [],
    }))
}

const fillListWithCards = async (trello, lists) => {
    const promises = lists.map(list => trello.getCardsForList(list['id']))
    const cards = await Promise.all(promises)

    for(let i = 0; i<cards.length; i++) {
        const list = lists[i];
        const cardsForThisList = cards[i];

        list.cards = cardsForThisList.map(card => ({ 
            "name": card['name'],
            "url": card["url"]
        }));
    }

    return lists
}

const getDataFromTrello = async (api_key, api_secret, board) => {
    const trello = new Trello(api_key, api_secret);

    const columns = await getColums(trello, board)
    return await fillListWithCards(trello, columns)
    
}


const createMdastRow = (values) => {
    const v = values.map(v => ({type: 'tableCell', children: [{type: 'text', value: v}]}))
    return {
        type: 'tableRow',
        children: v
      }
}

const createCard = (card) => `[${card.name}](${card.url})`


const createMdast = (lists) => {
    const max_cards_in_lists = Math.max.apply(Math, lists.map(l => l.cards.length));

    const aligns = lists.map(l => 'left');
    const headers = createMdastRow(lists.map(l => l['name']))
    
    const values = []
    for(let i = 0; i< max_cards_in_lists; i++) {
        const p = lists.map(l => l.cards[i])
                       .map(c => (c && createCard(c) ) || '');
        values.push(createMdastRow(p))
    }

    return {
        type: 'root',
        children: [
          {
            type: 'table',
            align: aligns,
            children: [
              headers,
              ...values
            ]
          }
        ]
      }
      
}


const trello_to_markdown = async (api_key, api_secret, board) => {
    const data = await getDataFromTrello(api_key, api_secret, board);

    const tree = createMdast(data);
    var out = toMarkdown(tree, {extensions: [table.toMarkdown()]})
    
    return out;
}


module.exports = trello_to_markdown
