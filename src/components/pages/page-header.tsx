import React from 'react';
import classnames from "classnames"
interface PageHeaderProps {
    className: Array<string>,
    title: string,
    subTitle: string
}

const PagesHeader = ({ className, title, subTitle }: PageHeaderProps) => {
    return (
        <div className={classnames('pageHeader', className)}>
            <h1>{title}</h1>
            <h3>{subTitle}</h3>
        </div>
    )
}

export default PagesHeader