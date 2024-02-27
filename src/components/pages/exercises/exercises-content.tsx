import React from 'react';
import PagesHeader from '../page-header';
import renderContent from "html-react-parser"

const SubjectLevels = ["Exercices", "Corrections"]

const ExercisesContent = ({ content }: any) => {
    return (
        <div className=''>
            <div><PagesHeader title='Exercices' subTitle={`de grammaire`} className={['exerciseImage']} /></div>
            <div className='mt-3'>
                {renderContent(content?.content || "")}
            </div>
            <div>
                <h4 className='mb-3 subjects'><b>Sujet/Niveau</b></h4>
                <div className='exercises-content_levels '>
                    {
                        content?.exercise_list?.map((data: any) => {
                            return <div className='d-flex align-items-center justify-content-between mb-2 resourcesRow'>
                                <div className='col-6 mb-2 subjectLabel'>
                                    {data.title}
                                </div>
                                <div className='col-6 mb-2 tagsWrapper'>
                                    {SubjectLevels.map((level: string, index: number) => {
                                        return <a target="_blank" className='tag gameTag mr-2' href={data[`file${index + 1}`][0]?.path} > <span >{level}</span></a>
                                    })}
                                </div>

                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ExercisesContent