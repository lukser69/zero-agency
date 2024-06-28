import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './button.module.scss';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button className={[styles.button, className].join(' ')} {...rest}>
			{children}
		</button>
	);
}
