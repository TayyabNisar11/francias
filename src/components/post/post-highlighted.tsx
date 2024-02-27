import moment from "moment";
import { AiOutlineClockCircle } from "react-icons/ai"
import Link from "next/link";
import { Blog } from "./post-stardard";
import renderContent from "html-react-parser";

const MainPost = ({ data, date }: { data: Blog, date: string }) => {
    return (
        <div className="main-post">
            {
                data && <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6 main-post_image">
                        {data?.post?.featured_images?.length > 0 ? <img src={data?.post?.featured_images[0]?.path} /> : ""}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 main-post_content">
                        <span className="main-post_content-category">{data?.name}</span>
                        <Link href={`/sur_les_paves/${data?.post?.id}/${data?.post?.slug}`} passHref >
                            <a className="postTitleLink">
                                <h1 className="main-post_content-title">{data?.post?.title}</h1>
                            </a>
                        </Link>
                        <div className="main-post_content-date">
                            <i><AiOutlineClockCircle /></i>
                            <p>{moment(date).format('DD/MM/YYYY')}</p>
                        </div>
                        <p className="main-post_content-description">{renderContent(data?.post?.short_description || "")}</p>
                        <Link href={`/sur_les_paves/${data?.post?.id}/${data?.post?.slug}`} passHref>
                            <a className="main-post_content-link">Lire plus...</a>
                        </Link>
                    </div>
                </div>
            }

        </div >
    )
};

export default MainPost;
