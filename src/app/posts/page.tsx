'use client';

import { PostCard } from '@/components/postCard';
import styles from './posts.module.scss';
import { useEffect, useState } from 'react';
import { IPost } from '@/types/post.types';
import getPosts from '@/api/getPosts';
import Link from 'next/link';
import { Pagination } from '@/components/ui';

export default function Posts() {
	const [posts, setPosts] = useState<IPost[] | null>(null);
	const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 10;

	useEffect(() => {
		// Эмитируем задержку сервера
		// и из-за этого ставим раньше начало загрузки
		setIsLoadingPosts(true);

		setTimeout(() => {
			fetchData();
		}, 1000);
	}, [currentPage]);

	async function fetchData() {
		setIsLoadingPosts(true);
		setPosts(await getPosts(currentPage));
		setIsLoadingPosts(false);
	}

	return (
		<section>
			<div className={styles.posts}>
				{posts
					? posts.map((post) => (
							<Link href={`/posts/${post.id}`} key={post.id}>
								<PostCard post={post} />
							</Link>
					  ))
					: ''}
			</div>

			<Pagination
				loading={isLoadingPosts}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</section>
	);
}
