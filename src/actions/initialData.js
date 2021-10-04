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
                        { id: 'card-1', boardID: 'board-1', columnID: 'column-1', title: 'Title of card 1', cover: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/186476445_2851274748473229_1833304691370865343_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Z69OlTp9t-YAX_Gn6Aa&_nc_ht=scontent.fsgn5-6.fna&oh=2d5a021bf5b41aba122817d654b11ee6&oe=617DFE05' },
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