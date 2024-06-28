'use client';

import { Button, Field } from '@/components/ui';
import styles from './auth.module.scss';
import { authService } from '@/services/auth.service';
import { IAuthForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange',
	});

	const [isLoadingForm, setIsLoadingForm] = useState(false);
	const [isErrorForm, setIsErrorForm] = useState(false);

	const { replace } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: async (data: IAuthForm) => {
			const response = await authService.main('login', data);
			if (!response) {
				throw new Error('Пользователь не найден');
			}
			return response;
		},
		onError() {
			setIsLoadingForm(false);
			setIsErrorForm(true);
			reset();
		},
		onSuccess() {
			setIsLoadingForm(false);
			setIsErrorForm(false);
			reset();
			replace('/posts');
		},
	});

	const onSubmit: SubmitHandler<IAuthForm> = (data) => {
		setIsErrorForm(false);
		setIsLoadingForm(true);
		mutate(data);
	};

	return (
		<div className={styles['auth__card']}>
			<form className={styles['auth__form']} onSubmit={handleSubmit(onSubmit)}>
				<h1>Auth</h1>

				<div className={styles['auth__form-fields']}>
					<Field
						id='email'
						label='Email:'
						placeholder='Enter Email:'
						type='email'
						state={isErrorForm ? 'error' : undefined}
						{...register('email', {
							required: 'Email is required!',
						})}
					/>

					<Field
						id='password'
						label='Password:'
						placeholder='Enter Password:'
						type='password'
						state={isErrorForm ? 'error' : undefined}
						{...register('password', {
							required: 'Password is required!',
						})}
					/>

					{isErrorForm && (
						<div className={styles['auth__form-hint']}>
							invalid email or password
						</div>
					)}
				</div>

				<div className={styles['auth__form-actions']}>
					<Button disabled={isLoadingForm}>Login</Button>
				</div>
			</form>
		</div>
	);
}
