import React, {useContext, useState} from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import StoreProvider from "./Store/StoreProvider";

function Title({title}) {

    const [open, setOpen] = useState(false);
    const [value, setvalue] = useState(title)
    const {deleteList} = useContext(StoreProvider)

    const handleSubmit = e => {
        e.preventDefault();
        setOpen(!open);
    }

    const handleDelList = () => {
        deleteList(value);
    }

    return (
        <div>
            {open ? (
                <div>
                    <form onSubmit={handleSubmit} className={'titleText'}>
                        <input
                            value={value}
                            type='text'
                            className="titleInput"
                            onChange={(e)=>setvalue(e.target.value)}
                            autoFocus
                            onBlur={()=> {setOpen(false)}}
                        />
                    </form>
                </div>
                ) : (
                <div>
                    <p onClick={() => setOpen(!open)} className={'titleText'}>
                        {value}
                        <CloseButton className={'x-button-title'} onClick={handleDelList}>X</CloseButton>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Title;