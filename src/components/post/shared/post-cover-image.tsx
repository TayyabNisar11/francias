import React from 'react';
import Image from 'next/image';

const PostCoverImage = ({ src }: { src: string }) => {
	return (
		<div className='card-cover d-flex align-items-center justify-content-center '>
			<Image
				objectFit={src ? 'cover' : 'contain'}
				src={src ? src : '/francais-et-vous/assets/images/fetv-placeholder.png'}
				width={800}
				height={400}
				alt='Post cover'
			/>
		</div>
	);
};

export default PostCoverImage;
