import React from 'react';
import { MenuItem } from "@store/slices/formation"
import classNames from "classnames"

interface DropDownProps {
    placeholder: string,
    name: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    data: MenuItem[],
    error?: boolean
}

const DropDowm = ({ placeholder, name, onChange, data, error }: DropDownProps) => {
    return (
        <div className={classNames('input-dropdown')}>
            <select className={classNames({ inputError: error })} name={name} onChange={onChange
            }>
                <option id='' value="" selected disabled>{placeholder}</option>
                {
                    data?.map((item: MenuItem, index) => <option id={item.id as string} value={item.id as string} >{item.name}</option>)
                }
            </select>
        </div >
    )
}

export default DropDowm