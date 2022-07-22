import React, {useContext, useState} from 'react';
import {Draggable} from "react-beautiful-dnd";
import CloseButton from 'react-bootstrap/CloseButton'
import StoreProvider from "../Store/StoreProvider";


function Card({card, index}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(card.content);
    const {deleteCard} = useContext(StoreProvider)

    const handleSubmit = e => {
        e.preventDefault();
        setOpen(!open);
    }

    const handleSubmitTextarea = e => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            handleSubmit(e);
        }
    }

    const handleDelCard = () => {
        deleteCard(card.id);
    }

    return (
        <Draggable draggableId={card.id} index={index}>

            {(provided)=>(
                <div
                    className={"CardDivContainer"}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {open ? (
                        <div className="CardComp">
                            <form onSubmit={handleSubmit} className="CardComp">
                    <textarea
                        className="CardComp"
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        onKeyDown={handleSubmitTextarea}
                        autoFocus
                        onBlur={() => setOpen(false)}
                    />
                            </form>
                        </div>
                    ) : (
                        <div className="CardComp">
                            <p onClick={() => setOpen(!open)} className={'CardText'}>
                                {value}
                                <CloseButton className={'x-button-card'} onClick={handleDelCard}>X</CloseButton>
                            </p>
                        </div>
                    )}
                </div>
            )}


        </Draggable>
    );
}

export default Card;