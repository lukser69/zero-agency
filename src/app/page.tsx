import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function Home() {
	revalidatePath('/posts');
	redirect(`/posts`);
}
