export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardID: 'board-1',
                    title: 'To do column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        { id: 'card-1', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 1', cover: 'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/186476445_2851274748473229_1833304691370865343_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iTZ3D_ogQqoAX8MpZmK&_nc_ht=scontent-xsp1-3.xx&oh=37d2ede5322aab5faa7d995fd56dc5b6&oe=61527C85' },
                        { id: 'card-2', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 2', cover: null },
                        { id: 'card-3', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 3', cover: null },
                        { id: 'card-4', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 4', cover: null },
                        { id: 'card-5', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 5', cover: null },
                        { id: 'card-6', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 6', cover: null },
                        { id: 'card-7', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 7', cover: null }
                    ]
                },
                {
                    id: 'column-2',
                    boardID: 'board-1',
                    title: 'Inprogress column',
                    cardOrder: ['card-8', 'card-9', 'card-10'],
                    cards: [
                        { id: 'card-8', boardID: 'board-1', columnID: 'column-2', title: 'Title of card 8', cover: null },
                        { id: 'card-9', boardID: 'board-1', columnID: 'column-2', title: 'Title of card 9', cover: null },
                        { id: 'card-10', boardID: 'board-1', columnID: 'column-2', title: 'Title of card 10', cover: null }
                    ]
                },
                {
                    id: 'column-3',
                    boardID: 'board-1',
                    title: 'Done column',
                    cardOrder: ['card-11', 'card-12', 'card-13'],
                    cards: [
                        { id: 'card-11', boardID: 'board-1', columnID: 'column-3', title: 'Title of card 11', cover: null },
                        { id: 'card-12', boardID: 'board-1', columnID: 'column-3', title: 'Title of card 12', cover: null },
                        { id: 'card-13', boardID: 'board-1', columnID: 'column-3', title: 'Title of card 13', cover: null }
                    ]
                }
            ]
        }
    ]
}