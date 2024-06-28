'use client';

import { useRouter } from 'next/navigation';
import styles from './navbar.module.scss';
import { Button } from '@/components/ui';
import { authService } from '@/services/auth.service';
import { useStore } from '@nanostores/react';
import { userStore } from '@/stores/user.store';
import { useState } from 'react';

export default function Navbar() {
	const user = useStore(userStore);
	const { push } = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	function onLogin() {
		setIsLoading(true);
		push('/auth');
		setIsLoading(false);
	}

	async function onLogout() {
		setIsLoading(true);
		await authService.logout();
		setIsLoading(false);
	}

	return (
		<nav className={styles.navbar}>
			{user ? (
				<>
					<span className={styles['navbar__user-email']}>{user.email}</span>
					<Button disabled={isLoading} onClick={onLogout}>
						Logout
					</Button>
				</>
			) : (
				<Button disabled={isLoading} onClick={onLogin}>
					Login
				</Button>
			)}
		</nav>
	);
}
