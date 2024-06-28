'use client';

import { useRouter } from 'next/navigation';
import styles from './navbar.module.scss';
import { Button } from '@/components/ui';
import { authService } from '@/services/auth.service';
import { useStore } from '@nanostores/react';
import { userStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/services/auth-token.service';
import { setUser } from '@/stores/user.store';
import { userData } from '@/api/auth';

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

	useEffect(() => {
		const accessToken = getAccessToken();

		if (accessToken) {
			setUser(userData);
		}
	}, []);

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
