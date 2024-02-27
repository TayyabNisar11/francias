import { NextSeo } from 'next-seo';
import DownloadSidebar from '@components/sections/sidebars/downloadSidebar';

const Acceder = () => {
    return (
        <>
            <NextSeo
                title='Apprendre le français à travers des actualités culturelles - Français Langue Etrangère - FLE - apprendre le français en ligne | Culture - Le Français et vous'
                description='Apprendre le français à travers les actualités culturelles telles que les sorties musique ou cinéma mais aussi littérature sans oublier l&amp;#39;édito mensuel !'
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: "Sur les pavés - Culture",
                    description: "Les coups de coeur du mois de l&#39;équipe pédagogique...",
                    site_name: "F&V - Le Français et vous",

                }}
            />
            <div className='flexer'>
                <DownloadSidebar />
            </div>
        </>
    );
};
export default Acceder;
