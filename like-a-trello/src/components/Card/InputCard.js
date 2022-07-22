import React, {useContext, useState} from 'react';
import StoreProvider from "../Store/StoreProvider";


function InputCard({listId}) {

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState('');
    const {addMoreCard} = useContext(StoreProvider)

    const handleTextarea = e => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            handleSubmit(e);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (value!=='') {
            addMoreCard(value, listId);
        }
        setValue('');
        setOpen(!open);
    }

    const showForm = () => {
        setOpen(false);
    }

    const handleBlur = () => {
        setOpen(true);
        setValue('');
    }

    return (
        <div className={'inputCard'}>

            {open ? (
                <button
                    className={ 'AddCardButton'}
                    onClick={showForm}>
                    {'Add Card'}
                </button>
            ) : (
                <form onSubmit={handleSubmit} className={'CardDivContainer'}>

                <textarea
                    className={'TextAreaCard'}
                    placeholder={'Enter card'}
                    autoFocus
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    onKeyDown={handleTextarea}
                    onBlur={handleBlur}
                />
                </form>
            )}
        </div>
    );
}

export default InputCard;