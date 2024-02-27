import { renderThemeClass } from '@common/functions';
import { ThemeVariation } from '@common/enum';
import React from 'react';
import { PostItemCategory } from '@store/slices/posts';
import Link from 'next/link';

interface CategoriesData {
  id: number,
  name: string,
  slug?: string
}
const CategoryBar = ({ data, theme }: { data: CategoriesData; theme?: ThemeVariation }) => {
  return (
    <Link href={"/sur_les_paves/category/" + data.slug} as={`/sur_les_paves/category/${data.slug}`} passHref>
      <a className={`category ${data.slug}-bar -bar ${renderThemeClass(theme)}`} href={`/post/category/${data.id}`}>
        <span className="title">{data.name}</span>
      </a>
    </Link>
  );
};

export default CategoryBar;
