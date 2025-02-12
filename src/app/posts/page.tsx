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
		fetchData();
	}, [currentPage]);

	async function fetchData() {
		setIsLoadingPosts(true);
		setPosts(await getPosts(currentPage));
		setIsLoadingPosts(false);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<section>
			{posts ? (
				<>
					<div className={styles.posts}>
						{posts.map((post) => (
							<Link href={`/posts/${post.id}`} key={post.id}>
								<PostCard post={post} />
							</Link>
						))}
					</div>

					<Pagination
						loading={isLoadingPosts}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</>
			) : (
				''
			)}
		</section>
	);
}
