
const persistentVariable = (storeKey, initialValue) => {
    let subscriptions = [];
    let storeValue;

    // store localstorage state
    let isLocalStorageAccessible = false;

    // set localStorage state
    try {
        localStorage.setItem('__test__', '__test__');
        localStorage.removeItem('__test__');
        isLocalStorageAccessible = true;
    } catch (e) {
        // Local storage is not accessible
    }

    // set initial value
    if (isLocalStorageAccessible) {
        let currentStoreString;
        try { // check if initial exists in localstorage
            currentStoreString = localStorage.getItem(storeKey);
            storeValue = JSON.parse(currentStoreString);

            if(storeValue === null) {
                storeValue = initialValue;
            }
        } catch { // set initial value if none exists in localstorage
            localStorage.setItem(storeKey, JSON.stringify(initialValue));
            storeValue = initialValue;
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
