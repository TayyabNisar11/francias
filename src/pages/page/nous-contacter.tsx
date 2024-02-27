import { useEffect, useState, createRef } from "react";
import Breadcrumb, { BreadcrumbItem } from "@components/other/breadcrumb";
import SubscribeBanner from "@components/other/subscribeBanner";
import { Formik } from 'formik';
import GUButton from '@components/control/gu-button';
import * as Yup from 'yup';
import Input from "@components/control/Input";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@store";
import DropDowm from '@components/control/form-dropdown';
import { handleGetCities } from "@store/thunk/formation";
import { commonActions } from "@store/slices/common";
import { submitContactUs } from "@services/pages";
import AddBanner from '@components/other/ad-baner';
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import renderContent from "html-react-parser";
import { getCmsPageContent, getPageSlug } from "@services/layout";
import ReCAPTCHA from "react-google-recaptcha";
import classNames from "classnames";



export const getStaticProps: GetStaticProps = async (context) => {
    const pageSlug = await getPageSlug("NOUS CONTACTER")
    const res = await getCmsPageContent(pageSlug.data.data.slug);
    return {
        props: {
            content: res.data.data[0]
        },
        revalidate: 10
    }
}


const ContactFormSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
    email: Yup.string().required('Please enter email').email("please enter valid email"),
    country_id: Yup.string().required('Please select country'),
    message: Yup.string().required('Please enter your message'),
    newsletter: Yup.boolean(),
    terms: Yup.boolean()
});

function Contact({ content }: any) {
    const dispatch = useDispatch()
    const [isVerifiedCapcha, setIsVerifiedCapcha] = useState(false)
    const cities = useSelector((state: AppState) => state.formations.cities.data);
    useEffect(() => {
        if (!cities?.length) {
            dispatch(handleGetCities())
        }

    }, [])

    const onReCAPTCHAChange = (captchaCode: any) => {
        if (!captchaCode) {
            dispatch(commonActions.showToast({ type: "error", message: "reCAPTCHA was expired" }))
        }
        setIsVerifiedCapcha(true)

    }



    return (
        <>
            <NextSeo title={content?.meta_title} description={content?.meta_description} additionalMetaTags={[
                { name: "keywords", content: content?.keywords }
            ]} />
            <div className="contactPage">
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem>{content?.title}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <div className="my-2 row">
                        <div className="col-lg-9 col-md-8 col-sm-12 ">

                            <div className="row">
                                <div className="col-md-4 contactDetails contactDetails">
                                    <h1>{content?.title}</h1>
                                    {renderContent(content?.content || "")}
                                    <ul className="contacts">
                                        <li>
                                            <div className="iconWrap">
                                                <i className="fas fa-map-marked-alt"></i>
                                            </div>
                                            <p>
                                                38 Bd. D’Aguillon, <br />
                                                06600 Antibes, France
                                            </p>
                                        </li>

                                        <li>
                                            <div className="iconWrap">
                                                <i className="fas fa-phone-alt"></i>
                                            </div>
                                            <p>
                                                <a href="">
                                                    +33 (0)4 92 90 71 72
                                                </a>

                                            </p>
                                        </li>

                                        <li>
                                            <div className="iconWrap">
                                                <i className="fas fa-comments"></i>
                                            </div>
                                            <p>
                                                <a href="">
                                                    WhatsApp
                                                </a>

                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-8 formWrap">

                                    <Formik
                                        initialValues={{
                                            first_name: "",
                                            last_name: "",
                                            email: "",
                                            country_id: "",
                                            message: "",
                                            newsletter: 0,
                                            terms: 0
                                        }}
                                        validationSchema={ContactFormSchema}
                                        onSubmit={async (values) => {
                                            try {
                                                if (isVerifiedCapcha) {
                                                    const response = await submitContactUs(values);
                                                    if (response.data?.status_code >= 200 && response.data?.status_code < 300) {
                                                        dispatch(commonActions.showToast({ type: "success", message: " Demande envoyée" }))
                                                        setIsVerifiedCapcha(false);
                                                        (window as any).grecaptcha.reset();
                                                    }
                                                }
                                                else {
                                                    dispatch(commonActions.showToast({ type: "error", message: "Le ReCAPTCHA est incorrect, veuillez réessayer." }))
                                                }

                                            } catch (error) {
                                                dispatch(commonActions.showToast({ type: "error", message: "error occured" }))
                                            }

                                        }}
                                    >
                                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <div className="input-group">
                                                            <Input
                                                                name="last_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Prenom"
                                                                error={!!errors.last_name && !!touched.last_name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <div className="input-group">
                                                            <Input
                                                                type="text"
                                                                value={values.first_name}
                                                                placeholder="Nom"
                                                                name="first_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={!!errors.first_name && !!touched.first_name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                                        <div className="input-group">
                                                            <Input
                                                                type="email"
                                                                value={values.email}
                                                                placeholder="Email"
                                                                name="email"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={!!errors.email && !!touched.email}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                                        <div className="input-group">
                                                            <DropDowm
                                                                name="country_id"
                                                                placeholder='Pays*'
                                                                onChange={handleChange}
                                                                data={cities}
                                                                error={!!errors.country_id && !!touched.country_id}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                                        <div className="input-group">
                                                            <textarea
                                                                name="message"
                                                                value={values.message}
                                                                cols={30}
                                                                rows={8}
                                                                placeholder="Message"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={classNames({ inputError: !!errors.message && !!touched.message })}
                                                            />

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="checkBoxsWrapper">

                                                    <div className="checkBox">
                                                        <input
                                                            onChange={(e: any) => setFieldValue("terms", e.target.checked ? 1 : 0)}
                                                            checked={values.terms == 1}
                                                            type="checkbox"
                                                            name="accept"
                                                            id="accept" />

                                                        <label htmlFor="accept">
                                                            Oui, j'ai (ou mon tuteur légal), lu et compris comment le
                                                            CIA traite mes données
                                                            personnelles com me indiqué dans la <a href=""> politique de confidentialité </a> et
                                                            accepte l'utilisation pour le CIA de mes
                                                            données personnelles à des fins de marketing direct.
                                                        </label>
                                                    </div>

                                                    <div className="checkBox">
                                                        <input
                                                            onChange={(e: any) => setFieldValue("newsletter", e.target.checked ? 1 : 0)}
                                                            checked={values.newsletter == 1}
                                                            type="checkbox" name="newsletter" id="newsletter" />

                                                        <label htmlFor="newsletter">
                                                            Oui, je m’inscris à la newsletter du Centre International d’Antibes.
                                                        </label>
                                                    </div>

                                                </div>



                                                <div className="captchaWrapper">
                                                    <ReCAPTCHA
                                                        size="normal"
                                                        sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_ID || ""}
                                                        onChange={onReCAPTCHAChange}
                                                    />
                                                </div>



                                                <GUButton weight="bold"
                                                    size="large"
                                                    variant="contained"
                                                    shape="round"
                                                    className="submitForm"
                                                    buttonType="submit">
                                                    ENVOYER MON MESSAGE
                                                </GUButton>
                                            </form>
                                        )}
                                    </Formik>

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="subscribeTeaser">
                                <SubscribeBanner />
                            </div>
                        </div>

                    </div>
                </div>


                <div className="container">
                    <AddBanner banner="contact_us" />
                </div>


            </div >
        </>
    )
}

export default Contact