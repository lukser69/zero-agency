import style from './post.module.scss';
import getPost from '@/api/getPost';
import getPostComments from '@/api/getPostComments';
import getUser from '@/api/getUser';
import { Comment } from '@/components/comment';
import { IUser } from '@/types/auth.types';
import { IComment, IPost } from '@/types/post.types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Post',
};

export default async function Post({
	params: { id },
}: {
	params: { id: number };
}) {
	const postData: IPost | null = await getPost(id);
	const userData: IUser | null = postData
		? await getUser(postData.userId)
		: null;
	const postComments: IComment[] | null = await getPostComments(id);

	return (
		<>
			{postData && (
				<section className={style.post}>
					<h2 className={style['post__title']}>{postData.title}</h2>
					<div>{postData.body}</div>
					{userData && (
						<div className={style['post__author']}>{userData.email}</div>
					)}
				</section>
			)}

			{postComments && (
				<section className={style.comments}>
					<div className={style['comments__title']}>Comments:</div>
					{postComments.map((comment) => (
						<Comment comment={comment} key={comment.id} />
					))}
				</section>
			)}
		</>
	);
}
