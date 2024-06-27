import styles from './comment.module.scss';
import { IComment } from '@/types/post.types';

interface CommentProps {
	comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
	return (
		<div className={styles.comment}>
			{/* <div className={styles['comment__author']}>
				{`(${comment.email}) ${comment.name}`}
			</div> */}
			<div className={styles['comment__author']}>{comment.email}</div>
			<div className={styles['comment__name']}>{comment.name}</div>
			<div>{comment.body}</div>
		</div>
	);
}
