import React from 'react';
import classnames from "classnames";
import renderContent from "html-react-parser"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    title: string
    style?: React.CSSProperties;
    className?: string;
    checked: boolean,
    required?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void


}

const CheckBox = ({ title, checked, onChange, required, className, style, ...rest }: InputProps) => {
    return (
        <div className="form-check d-flex align-items-center">
            <input onChange={onChange} required={required} className={classnames("form-check-input", className)} type="checkbox" checked={checked} {...rest} />
            <label className="form-check-label ml-3">
                {renderContent(title || "")}
            </label>
        </div>
    )
}

export default CheckBox