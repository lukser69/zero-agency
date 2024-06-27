'use client';

import PostCard from './postCard';
import styles from './posts.module.scss';
import { useEffect, useState } from 'react';
import { IPost } from '@/types/post.types';
import getPosts from '@/api/getPosts';
import Link from 'next/link';

export default function Posts() {
	const [posts, setPosts] = useState<IPost[] | null>(null);

	useEffect(() => {
		(async function fetchData() {
			setPosts(await getPosts());
		})();
	}, []);

	return (
		<section className={styles.posts}>
			{posts
				? posts.map((post) => (
						<Link href={`/posts/${post.id}`} key={post.id}>
							<PostCard post={post} />
						</Link>
				  ))
				: ''}
		</section>
	);
}
