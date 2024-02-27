import { getMainMenu } from "@services/layout";
import { getPostsSlugs } from "@services/blog";
import { getLessonsSlugs } from "@services/lesson";
import { getGameSlugs } from "@services/game";


const APPLICATION_URL = "https://www.cia-france.com/francais-et-vous";

function renderURL(url: string) {
    return `<url>
        <loc>${APPLICATION_URL}${url}</loc>
    </url>`
}


function renderAppUrls(menu: any) {
    return menu.map((item: any) => {
        if (item?.submenu_list?.length > 0) {
            return renderAppUrls(item?.submenu_list)
        }
        else {
            return renderURL(item.url)
        }
    }).join('')
}

async function generateSiteMap() {
    const [response, posts, lessons, games]: any = await Promise.all([getMainMenu(), getPostsSlugs(), getLessonsSlugs(), getGameSlugs()])
    const AppURLS = renderAppUrls(response.data?.data || [])
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${APPLICATION_URL}</loc>
     </url>
     ${AppURLS}
     ${posts.data?.data.mostPopuler.map((post: any) => renderURL(`/sur_les_paves/${post.id}/${post.slug}`)).join("")}
     ${lessons.data?.data.mostPopuler.map((lesson: any) => renderURL(`/sous_le_platane/${lesson.id}/${lesson.slug}`)).join("")}
     ${games.data?.data.mostPopuler.map((game: any) => renderURL(`/sur_les_galets/${game.id}/${game.slug}`)).join("")}
        </urlset>
            `;
}

function SiteMap() { }

export async function getServerSideProps({ res }: any) {
    const sitemap = await generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;