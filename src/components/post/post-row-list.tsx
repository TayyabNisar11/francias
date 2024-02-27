import { renderThemeClass } from '@common/functions';
import classNames from 'classnames';
import React from 'react';
import { PostProps, PostInfo } from './shared';
import moment from 'moment';
import Link from 'next/link';
import PostCoverImage from './shared/post-cover-image';
import renderContent from 'html-react-parser';

const PostStardardFull = ({
	data,
	className,
	theme,
	infos = [PostInfo.User, PostInfo.Date, PostInfo.Comment],
}: any) => {
	const renderInfos = () => {
		return infos?.map((item: any, index: number) => {
			switch (item) {
				case PostInfo.User:
					return (
						<div
							className='card-content__info-item card-content__info-item__author'
							key={index}
						>
							<i className='far fa-user mr-2'></i>
							<p>
								{data?.auther?.last_name} {data?.auther?.first_name}
							</p>
						</div>
					);
				case PostInfo.Date:
					return (
						<div
							className='card-content__info-item card-content__info-item__time'
							key={index}
						>
							<i className='far fa-clock'></i>
							<p>{moment(data?.created_at).format('DD/MM/YYYY')}</p>
						</div>
					);
				default:
					return <React.Fragment key={index}></React.Fragment>;
			}
		});
	};

	//convert html in the plain text
	const plainTextConversion = (text: any) => {
		text = text.replace('/p', '');
		text = text.replace(
			/<[^>]*(>|$)|&nbsp;|&lt;|style;|l&#39;|l&#39;| d&#39;|&amp;|amp;|L&#39;|&quot;|&zwnj;|&raquo;|&laquo;|&gt;/g,
			'',
		);
		const startInd = text.indexOf(';') + 1;
		const subStr = text.slice(startInd);
		return subStr;
	};

	return (
		<>
			<div className='col-md-6 col-lg-6 col-sm-12'>
				<PostCoverImage src={data?.featured_images[0]?.path} />
			</div>
			<div className='card-content col-md-6 col-lg-6 col-sm-12'>
				<h5 className='card-content__category'>{data?.category_id}</h5>
				<Link href={`/sur_les_paves/${data?.id}/${data?.slug}`} passHref>
					<a
						className='card-content__title'
						dangerouslySetInnerHTML={{ __html: data?.title }}
					></a>
				</Link>
				<div className='card-content__info'>{renderInfos()}</div>
				<div
					className='card-content__description'
					dangerouslySetInnerHTML={{
						__html: data?.short_description
							? plainTextConversion(data?.short_description)
							: '',
					}}
				></div>
			</div>
		</>
	);
};

export default PostStardardFull;
