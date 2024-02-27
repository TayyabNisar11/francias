import React from 'react';
import { Formik } from 'formik';
import Input from '@components/control/Input';
import GUButton from '@components/control/gu-button';
import CheckBox from '@components/control/checkbox';
import DropDowm from '@components/control/form-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store';
import { commonActions } from "@store/slices/common";
import { FaGraduationCap } from "react-icons/fa";
import * as Yup from "yup";
import { submitFormationData } from '@services/formation';
import { useRouter } from 'next/router';
const FormationContent = () => {
    const router = useRouter()
    var formationData: any;
    if (typeof window != "undefined") {
        formationData = JSON.parse(localStorage.getItem("formation") || "")
    };

    const dispatch = useDispatch()
    const cities = useSelector((state: AppState) => state.formations.cities.data)
    return (
        <div className='formation-content'>
            <div className='formation-content_details'>
                <div className='formation-content_details-title'>
                    <h3>
                        <i><FaGraduationCap /></i>
                        {" "}  Formation:{" "}
                        {formationData?.title}
                    </h3>
                </div>
                <div className='formation-content_details-description'>
                    <p>{formationData?.description}</p>
                </div>
                <p className='formation-content_details-p'>Remplissez s'il vous plaît, le formulaire ci-dessous pour accéder au contenu de la formation</p>
            </div>
            <Formik
                initialValues={{
                    'first_name': "",
                    'last_name': "",
                    'email': "",
                    code: "",
                    accept: false
                }}
                validationSchema={Yup.object().shape({
                    'first_name': Yup.string().required("required"),
                    'last_name': Yup.string().required("required"),
                    email: Yup.string().required("").email(),
                    'code': Yup.string().required("required"),



                })}
                onSubmit={async (values) => {
                    const formObj = {
                        'file_id': formationData?.file_id,
                        'code': values.code,
                        'formation[first_name]': values.first_name,
                        'formation[last_name]': values.last_name,
                        'formation[country_id]': formationData?.city,
                        'formation[email]': values.email
                    };

                    try {
                        const { data } = await submitFormationData(formObj);
                        if (data.status_code >= 200 && data.status_code < 300) {
                            router.push(data?.data?.file)
                        }
                        else {
                            dispatch(commonActions.showToast({ type: "error", message: data?.data?.error }))
                        }

                    } catch (error: any) {
                        dispatch(commonActions.showToast({ type: "error", message: "Fichier non disponible" }))

                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleBlur,
                    handleChange,
                    handleSubmit
                }) => (
                    <form className='newsletter-content_form' onSubmit={handleSubmit}>
                        <p>*{"  "} TOUS LES CHAMPS SONT NÉCESSAIRES, MERCI !</p>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Prenom*'
                                    value={values.last_name}
                                    name="last_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors['last_name'] && touched['last_name'])}
                                />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Nom*'
                                    value={values['first_name']}
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors['first_name'] && touched['first_name'])}
                                />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Code*'
                                    value={values.code}
                                    name="code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.code && touched.code)}
                                />

                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Email*'
                                    name='email'
                                    value={values['email']}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors['email'] && touched['email'])}
                                />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <CheckBox
                                title={`Consentement à recevoir des emails de la part du Centre International d'Antibes`}
                                name="accept"
                                required
                                checked={values.accept}
                                onChange={(e) => setFieldValue("accept", e.target.checked)}
                            />
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-12 com-md-6  col-lg-6'></div>
                            <div className='col-sm-12 com-md-6 col-lg-6'>
                                <GUButton buttonType="submit" variant='contained' weight="bold" fullwidth shape='round'><span style={{ color: "white" }}>VALIDER</span></GUButton>
                            </div>

                        </div>

                    </form>
                )}
            </Formik>
        </div>
    )
}

export default FormationContent