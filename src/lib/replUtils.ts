
export function storageAllowed() {
	//Due to security we are not allowed to use storage on REPL
	//Thus we use a dummy storage mockup
	//Note: This storage mockup will unfortunately not persist data between browser refreshes
	try {
		const storage = window.localStorage;
		return true;
	} catch (e) {
		console.warn('Access to window.localStorage not available. Data will not be persisted.');
		return false;
	}
}

export const storageMock = (): Storage => {
	let internalStore: any = {};

	return {
		getItem: (key: string): string | null => key in internalStore ? internalStore[key] : null,
		setItem: (key: string, value: string): void => { internalStore[key] = value },
		clear: () => { internalStore = {} },
		key: (index: number): string | null => Object.keys(internalStore)[index],
		removeItem: (key: string) => delete internalStore[key],
		length: Object.keys(internalStore).length
	}
}