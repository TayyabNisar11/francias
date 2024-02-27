import GUButton from '@components/control/gu-button'
import { getBannerImage } from '@services/add-banner'
import { AppState } from '@store'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
interface AddBannerProps {
    banner: "homepage" | "contact_us" | "propos" | "game_listing" | "blog_listing" | "exercices" | "lesson_listing" | "guide" | "newsletter"
}

const AddBanner = ({ banner }: AddBannerProps) => {

    const [addBanner, setAddBanner] = useState<{
        src: string,
        url: string
    }>({ src: "", url: "" });

    const bannerList = useSelector((state: AppState) => state.banners.slugs.data);

    useEffect(() => {
        if (bannerList.length > 0) {
            getBannerImage(bannerList, banner).then((url) => {
                setAddBanner(url)
            })
        }

    }, [bannerList]) 

    return (
        <div className="adv">

            <div className="container">
               <a target='_blank' href={addBanner?.url}>
                        <img src={addBanner?.src} alt={banner} />
            </a>
                

            </div>

        </div>
    );
}

export default AddBanner