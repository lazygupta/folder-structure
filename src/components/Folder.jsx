import React, { useState } from 'react';

const Folder = ({ handleInsertNode, explorer }) => {
    const [expand, setExpand] = useState(false);

    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    });

    const OnAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            setShowInput({
                visible: false,
                ...showInput
            });
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
        }
    };

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        });
    };

    if (explorer.isFolder) {
        return (
            <div>
                <div>
                    <div
                        className='cursor-default p-1 w-96 bg-gray-300 m-1 flex justify-between items-center'
                        onClick={() => setExpand(!expand)}
                    >
                        <span>📂 {explorer.name}</span>
                        <div>
                            <button onClick={(e) => handleNewFolder(e, true)} className='cursor-pointer border-1 m-1 text-sm p-1 bg-gray-100 w-24'>+ Add Folder</button>
                            <button onClick={(e) => handleNewFolder(e, false)} className='cursor-pointer border-1  m-1 text-sm p-1 bg-gray-100 w-24'>+ Add File</button>
                        </div>
                    </div>
                </div>
                <div className={`${expand ? 'block' : 'hidden'} pl-5`}>
                    {showInput.visible && (
                        <div className='w-96 m-1 '>
                            <span>{showInput.isFolder ? "📂" : "📄"} </span>
                            <input
                                type='text'
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                                className='border-1 border-gray-300 p-1 rounded-sm'
                                autoFocus
                                onKeyDown={OnAddFolder}
                            />
                        </div>
                    )}
                    {explorer.items.map((it) => (
                        <Folder handleInsertNode={handleInsertNode} explorer={it} key={it.id} />
                    ))}
                </div>
            </div>
        );
    } else {
        return <div className='m-1'>📄 {explorer.name}</div>;
    }
};

export default Folder;
