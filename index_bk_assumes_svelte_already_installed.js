
import { writable } from 'svelte/store';

const persistentVariableBackup = (key, initialValue) => {
    let value = initialValue;
    let subscribers = [];

    // Check if localStorage is accessible
    const isLocalStorageAccessible = () => {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Try to get the value from localStorage if it exists and is accessible
    if (isLocalStorageAccessible()) {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            value = JSON.parse(storedValue);
        }
    }

    const { subscribe, set, update } = writable(value);

    // Override the default set method to persist the new value to localStorage if accessible
    const persistentSet = (newValue) => {
        set(newValue);

        if (isLocalStorageAccessible()) {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    };

    function persistUpdate(callback) {
        persistentSet(callback(value));
    }

    // Add a value property to access the current value of the writable store
    return {
        subscribe,
        set: persistentSet,
        update: persistUpdate,
    };
};



