import React, { useState } from 'react';
import PagesHeader from '../page-header';
import { Formik } from 'formik';
import Input from '@components/control/Input';
import GUButton from '@components/control/gu-button';
import CheckBox from '@components/control/checkbox';
import DropDowm from '@components/control/form-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store';
import { SubscribeNewsletter } from '@services/pages';
import { commonActions } from "@store/slices/common";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";

const NewsletterContent = () => {
    const [isVerifiedCapcha, setIsVerifiedCapcha] = useState(false)

    const dispatch = useDispatch()
    const cities = useSelector((state: AppState) => state.formations.cities.data);

    const onReCAPTCHAChange = (captchaCode: any) => {
        if (!captchaCode) {
            dispatch(commonActions.showToast({ type: "error", message: "reCAPTCHA was expired" }))
        }
        setIsVerifiedCapcha(true)

    }

    return (
        <div className='newsletter-content'>

            <div><PagesHeader title='Lettre' subTitle={`D'informations`} className={['newsletterImage']} /></div>
            <p>Remplissez ce formulaire pour finalisez votre inscription à notre lettre d'information mensuelle:</p>
            <Formik
                initialValues={{ first_name: "", last_name: "", email: "", country_id: "", accept: 0 }}
                validationSchema={Yup.object().shape({
                    first_name: Yup.string().required('Please enter your first name'),
                    last_name: Yup.string().required('Please enter your last name'),
                    email: Yup.string().required('Please enter email').email("please enter valid email"),
                    country_id: Yup.string().required('Please select country'),
                    accept: Yup.boolean()
                })}
                onSubmit={async (values) => {
                    try {
                        if (isVerifiedCapcha) {
                            const response = await SubscribeNewsletter(values);
                            if (!response.data?.data?.error) {
                                dispatch(commonActions.showToast({ type: "success", message: "Inscription à notre lettre d’information effectuée avec succès!" }))
                                setIsVerifiedCapcha(false);
                                (window as any).grecaptcha.reset();
                            }
                            else {
                                dispatch(commonActions.showToast({ type: "error", message: "Cette adresse e-mail est déjà inscrite" }))
                            }
                        }
                        else {
                            dispatch(commonActions.showToast({ type: "error", message: "Le ReCAPTCHA est incorrect, veuillez réessayer." }))
                        }


                    } catch (error: any) {

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
                                    error={Boolean(errors.last_name && touched.last_name)}
                                />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Nom*'
                                    value={values.first_name}
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.first_name && touched.first_name)}
                                />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                              
                                <DropDowm
                                    // value={values.country_id}
                                    name="country_id"
                                    placeholder='Pays*'
                                    onChange={handleChange}
                                    data={cities}
                                />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Input
                                    placeholder='Email*'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.email && touched.email)}
                                />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <CheckBox
                                title={`Consentement à recevoir des emails de la part du Centre International d'Antibes`}
                                name="accept"
                                checked={values.accept == 1}
                                onChange={(e) => setFieldValue("accept", e.target.checked ? 1 : 0)}
                            />
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-12 com-md-6  col-lg-6 '>
                                <ReCAPTCHA
                                    // ref={recaptchaRef}
                                    size="normal"
                                    sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_ID || ""}
                                    onChange={onReCAPTCHAChange}
                                />
                            </div>
                            <div className='col-sm-12 com-md-6 col-lg-6  d-flex align-items-center justify-content-center'>
                                <GUButton buttonType='submit' variant='contained' weight="bold" fullwidth shape='round'><span style={{ color: "white" }}>VALIDER</span></GUButton>
                            </div>

                        </div>

                    </form>
                )}
            </Formik>
        </div >
    )
}

export default NewsletterContent