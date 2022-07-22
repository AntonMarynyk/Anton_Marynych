import React from 'react';
import Title from "./Title";
import Card from "./Card/Card";
import InputCard from "./Card/InputCard";
import {Draggable, Droppable} from "react-beautiful-dnd";

function List({list, addCard, index}) {

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided)=>(
                <div className={'blockList'} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <Title title={list.title}/>
                    <Droppable droppableId={list.id}>
                        {(provided)=>(
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {list.cards.map((card, index)=>(
                                    <Card key={card.id} card={card} addCard={addCard} index={index}/>
                                ))}
                                {provided.placeholder}
                            </div>)
                        }
                    </Droppable>
                    <InputCard listId={list.id} type={'card'}/>
                </div>
            )}
        </Draggable>
    );
}

export default List;