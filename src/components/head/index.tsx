import React from 'react'
import Head from 'next/head';

interface HeadProps {
    title: string,
    description: string,
    keywords?: string,
    image?: string,
    ogUrl?: string,
    ogType?: "article" | "website"

}




const MetaHead = ({ title, description, keywords, image, ogType = "article", ogUrl }: HeadProps) => {
    return <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta property="og:type" content={ogType} />
    </Head>
}

export default MetaHead