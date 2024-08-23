import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import Toaster from './Toaster.svelte';

export type Level = 'info' | 'success' | 'error';

export type ToastProps = {
	id: string;
	message: string;
	level: Level;
	delay: number;
	close: () => void;
};

export type ToastFunc = (message: string, level?: Level, delay?: number) => void;

export type ToasterContext = {
	sendToast: ToastFunc;
};

const contextId = crypto.randomUUID();
const toasts = writable<ToastProps[]>([]);

const removeToastNotification = (id: string): void => {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
};

const createToastNotification = (
	message: string,
	level: Level = 'info',
	delay: number = 5000
): void => {
	const id = crypto.randomUUID();
	const toastProps: ToastProps = {
		id,
		message,
		level,
		delay,
		close: () => removeToastNotification(id)
	};

	toasts.update((toasts) => [toastProps, ...toasts]);
};

export const createToaster = () => {
	setContext<ToasterContext>(contextId, {
		sendToast: createToastNotification
	});

	return { toaster: Toaster, props: { toasts } };
};

export const createToast = () => {
	const { sendToast } = getContext<ToasterContext>(contextId);

	return sendToast;
};
