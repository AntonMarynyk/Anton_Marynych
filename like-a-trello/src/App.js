import './App.css';
import List from "./components/List";
import store from './components/Store/DataStore'
import {v4 as uuid} from 'uuid'
import {useState} from "react";
import StoreProvider from './components/Store/StoreProvider'
import {DragDropContext, Droppable} from "react-beautiful-dnd";

function App() {

    const [data, setData] = useState(store);
    const [title, setTitle] = useState('');

    const addMoreCard = (title, listId)=> {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            content: title
        }
        const lists = data.lists[listId];
        lists.cards = [...lists.cards, newCard]

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: lists
            }
        };
        setData(newState);
    }

    const deleteList = (value) => {
        const listId = Object.keys(data.lists).filter((key) => data.lists[key].title === value)[0];
        delete data.lists[listId];
        const newState = {
            lists: data.lists,
            listIds: [...data.listIds.filter((val)=> val!==listId)]
        }
        setData(newState);
        console.log(data.lists);
    }

    const deleteCard = (cardId) => {
        // console.log(data.lists['list-1'])
        let listId = '';
        let elementIndex = 0;
        for (let i in data.lists) {
            for (let j of data.lists[i].cards) {
                if (j.id === cardId) {
                    listId = i;
                    elementIndex = data.lists[i].cards.indexOf(j);
                }
            }
        }
        data.lists[listId].cards.splice(elementIndex, 1)

        const newState = {
            ...data,
            lists: {
                ...data.lists
            }
        }

        setData(newState);


    }

    const handleSubmit = e => {
        e.preventDefault();

        if (title!=='') {

            const newListId = uuid();

            const newList = {
                id: newListId,
                title: title,
                cards: []
            }

            const newState = {
                listIds: [...data.listIds, newListId],
                lists: {
                    ...data.lists,
                    [newListId]: newList
                }
            }
            setData(newState);
        }

        setTitle('');
    }

    const handleInput = e => {
        const AddValue = e.target.value;
        setTitle(AddValue);
    }

    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;
        if (!destination) {
            return;
        }
        if (type === 'list') {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId)
            return;
        }
        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter((card)=> card.id === draggableId)[0];

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard)
            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList
                }
            };
            setData(newState);
        }else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList
                }
            };
            setData(newState);
        }
    }

    return (
            <StoreProvider.Provider value={{addMoreCard, deleteList, deleteCard}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'app'} type='list' direction={'horizontal'}>
                        {(provided)=>(
                            <div className="App" ref={provided.innerRef} {...provided.droppableProps}>
                                {data.listIds.map((listId, index)=> (
                                    <List list={data.lists[listId]} key={listId} addCard={setData} index={index}/>
                                ))}

                                <form onSubmit={handleSubmit}>
                                    <input
                                        className={'inputCreateNewList'}
                                        placeholder={'Add new List'}
                                        value={title}
                                        onChange={handleInput}
                                        onBlur={()=>setTitle('')}
                                    />
                                </form>

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </StoreProvider.Provider>
    );
}

export default App;
