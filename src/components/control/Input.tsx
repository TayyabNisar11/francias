import React from 'react';
import classnames from "classnames";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    placeholder: string;
    style?: React.CSSProperties;
    className?: string;
    value?: string,
    error?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void

}

const Input = ({ placeholder, value, onChange, error, className, style, ...rest }: InputProps) => {

    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classnames("input", className, { inputError: error })}
            type="text"

            {...rest}
        />
    )
}

export default Input