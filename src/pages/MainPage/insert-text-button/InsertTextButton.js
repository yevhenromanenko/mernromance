import React from 'react';

const InsertTextButton = ({ name, label, textareaName, setContent }) => {
    const handleClick = () => {
        setContent((content) => {
            const updatedContent = content !== undefined ? `${content}%${name}%` : `%${name}%`;
            return updatedContent;
        });
       // setContent((content) => `${content}%${name}%`);
    };

    return (
        <button
            className="waves-effect waves-light btn-save-letter"
            onClick={handleClick}
            style={{ marginLeft: '3px', marginBottom: '10px' }}
        >
            {label}
        </button>
    );
};

export default InsertTextButton;
