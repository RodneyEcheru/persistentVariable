
const persistentVariable = (storeKey, initialValue) => {
    let subscriptions = [];
    let storeValue;

    let isLocalStorageAccessible = false;

    try {
        localStorage.setItem('__test__', '__test__');
        localStorage.removeItem('__test__');
        isLocalStorageAccessible = true;
    } catch (e) {
        // Local storage is not accessible
    }

    if (isLocalStorageAccessible) {
        let currentStoreString = localStorage.getItem(storeKey);
        if (currentStoreString === null || currentStoreString === undefined) {
            storeValue = initialValue;
            localStorage.setItem(storeKey, JSON.stringify(storeValue));
        } else {
            storeValue = JSON.parse(currentStoreString);
        }
    } else {
        storeValue = initialValue;
    }

    const subscribe = (subscription) => {
        subscription(storeValue);
        subscriptions = [...subscriptions, subscription];
        return () => {
            subscriptions = subscriptions.filter(s => s !== subscription);
        };
    };

    const set = (value) => {
        storeValue = value;
        if (isLocalStorageAccessible) {
            localStorage.setItem(storeKey, JSON.stringify(value));
        }
        subscriptions.forEach(subscription => subscription(storeValue));
    };

    const update = (update_func) => set(update_func(storeValue));

    return { subscribe, set, update };
};

module.exports = persistentVariable;
