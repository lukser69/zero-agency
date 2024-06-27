'use client';

import styles from './pagination.module.scss';
import { useState } from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	loading: boolean;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	loading,
}: PaginationProps) {
	const [pageNumber, setPageNumber] = useState(currentPage);

	const handlePageChange = (page: number) => {
		setPageNumber(page);
		onPageChange(page);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					className={
						i === pageNumber
							? styles['pagination__item'] +
							  ' ' +
							  styles['pagination__item-active']
							: styles['pagination__item']
					}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</li>
			);
		}
		return pageNumbers;
	};

	return (
		<ul
			className={[
				styles.pagination,
				loading ? styles['pagination__loading'] : '',
			].join(' ')}
		>
			{renderPageNumbers()}
		</ul>
	);
}
