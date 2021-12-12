
export function storageAllowed() {
	//Due to security we are not allowed to use storage on REPL
	//Thus we use a dummy storage mockup
	//Note: This storage mockup will unfortunately not persist data between browser refreshes
	try {
		const storage = window.localStorage;
		return true;
	} catch (e) {
		console.warn('Access to window.localStorage not available');
		return false;
	}
}

export const storageMock = () => {
	let internalStore = {};
	return {
		getItem: (key) => internalStore[key],
		setItem: (key, value) => {
			internalStore[key] = value;
		},
		clear: () => {
			internalStore = {};
		},
		key: (index) => Object.keys(internalStore)[index],
		removeItem: (key) => {
			internalStore[key] = null;
		},
		length: Object.keys(internalStore).length
	};
};
