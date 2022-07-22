const cards = [
    {
        id: 'card-1',
        content: 'Do something - 1'
    },
    {
        id: 'card-2',
        content: 'Do something - 2'
    },
    {
        id: 'card-3',
        content: 'Do something - 3'
    }
]

const data = {
    lists: {
        'list-1': {
            id: "list-1",
            title: 'Todo',
            cards: cards
        },
        'list-2': {
            id: "list-2",
            title: 'Doing',
            cards: [
                {
                    id: 'card-4',
                    content: 'Do something - 4'
                },
                {
                    id: 'card-5',
                    content: 'Do something - 5'
                }
            ]
        }
    },
    listIds: ['list-1', 'list-2']
}

export default data;