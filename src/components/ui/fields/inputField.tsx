import { type ChangeEventHandler, forwardRef } from 'react';
import styles from './inputField.module.scss';

interface InputFieldProps {
	id: string;
	label: string;
	extra?: string;
	placeholder: string;
	variant?: string;
	state?: 'error' | 'success';
	disabled?: boolean;
	type?: string;
	isNumber?: string;
}

const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			id,
			label,
			extra,
			placeholder,
			variant,
			state,
			disabled,
			type,
			isNumber,
			...rest
		},
		ref
	) => {
		return (
			<div className={`${extra}`}>
				<label htmlFor={id} className={styles['field__label']}>
					{label}
				</label>
				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={[
						styles.field,
						state === 'success'
							? styles['field__success']
							: state === 'error'
							? styles['field__error']
							: '',
					].join(' ')}
					onKeyDown={(event) => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault();
						}
					}}
					{...rest}
				/>
			</div>
		);
	}
);

Field.displayName = 'field';

export default Field;
