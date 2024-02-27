import React from 'react';
import { MenuItem } from "@store/slices/formation"


interface DropDownProps {
    title: string,
    placeholder: string,
    name: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    data: MenuItem[]
}

const DropDowm = ({ title, placeholder, name, onChange, data }: DropDownProps) => {
    return (
        <div className='dropdown'>
            <label>{title}</label>
            <select name={name} onChange={onChange
            }>
                <option id='' selected disabled>{placeholder}</option>
                {
                    data?.map((item: MenuItem, index) => <option id={item.id as string} value={item.id as string} >{item.name}</option>)
                }
            </select>
        </div >
    )
}

export default DropDowm