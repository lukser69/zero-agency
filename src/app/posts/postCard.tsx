import { IPost } from '@/types/post.types';
import styles from './postCard.module.scss';

interface PostCardProps {
	post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<div className={styles['post-card']}>
			<div className={styles['post-card__title']}>{post.title}</div>
			<div>{post.body}</div>
		</div>
	);
}
