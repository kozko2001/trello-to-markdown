# trello-to-markdown

Small library that connects to a trello board, downloads all the cards and 
places them in markdown table

```
| Inbox | OnGoing                                                 | Blocked / Waiting | Completed! |
| :---- | :------------------------------------------------------ | :---------------- | :--------- |
|       | [On Going!](https://trello.com/c/qwQ8wvAH/173-on-going) |                   |            |
```

#### Usage

1. Obtains an API token and secret for trello (trello.com/app-key)

2. Obtain the id of the board you want to have the have (is the id of the board url)

3. Use the library, check the example but there is not much to say


#### Try

You can try with the `example.js`, you would need to set the `TRELLO_API` and `TRELLO_SECRET` environment variables 
and call the script as:

```
node example.js $BOARD_ID
```




