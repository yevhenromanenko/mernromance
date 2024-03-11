import InsertTextButton from "./InsertTextButton";
import React from "react";


const InsertButtons = ({setContent, textareaName}) => {

    return (
            <>
                <InsertTextButton
                    name="Name"
                    label="И.Ф"
                    textareaName={textareaName}
                    setContent={setContent}
                />
                <InsertTextButton
                    name="firstName"
                    label="Имя"
                    textareaName={textareaName}
                    setContent={setContent}
                />
                <InsertTextButton
                    name="City"
                    label="Город"
                    textareaName={textareaName}
                    setContent={setContent}
                />
                <InsertTextButton
                    name="Country"
                    label="Страна"
                    textareaName={textareaName}
                    setContent={setContent}
                />
                <InsertTextButton
                    name="Age"
                    label="Возраст"
                    textareaName={textareaName}
                    setContent={setContent}
                />
            </>
    )
}

export default InsertButtons;
