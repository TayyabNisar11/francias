import { ThemeVariation } from '@common/enum';
import { PostItem } from '@store/slices/posts';

export enum PostInfo {
  User,
  Date,
  Comment,
}
interface PostDeatil {
  id: number,
  title: string,
  slug: string,
  user_id: number,
  content: string,
  content_html: string,
  short_description: string,
  published_at: string,
  category_name: string,
  featured_images: { path: string }[],
  user: {
    first_name: string,
    last_name: string
  }
}
export interface PostProps {
  hideCover?: boolean;
  hideContent?: boolean;
  data: PostDeatil;
  className?: string;
  theme?: ThemeVariation;
  hideButton?: boolean;
  hideDescription?: boolean;
  hideInfos?: boolean;
  infos?: PostInfo[];

}
