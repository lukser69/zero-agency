import styles from './auth.module.scss';
import { Metadata } from 'next';
import Auth from './auth';

export const metadata: Metadata = {
	title: `Login`,
	description: 'login',
};

export default function AuthPage() {
	return (
		<section className={styles.auth}>
			<Auth />
		</section>
	);
}
