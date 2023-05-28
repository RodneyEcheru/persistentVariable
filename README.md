# persistentVariable

### description
A simple and efficient way to manage state

The persistentVariable Library is lightweight and provides a simple and efficient way to create and persist data across page refreshes as well as being reactive for use cases such as a shopping cart and user states in svelte 

## Installation

You can install the persistentVariable library using npm:

```shell
npm install easystatemanagersvelte
```

# Usage

## Basic Usage

### example 1

```shell
// Import the persistentVariable library
import persistentVariable from "easystatemanagersvelte";

// store initial value in a variable
const mypersistentVariable = persistentVariable("initial value");

// get the current value
$: console.log($mypersistentVariable); // log whenever value changes

// change value
mypersistentVariable.set("new value");
```
### Example 2
```shell
// Import the persistentVariable library
import persistentVariable from "easystatemanagersvelte";

// create the stateful variable with an initial value of an empty array
const myarray = persistentVariable("myarray", []);

// subscribe to the variable and log the value whenever it changes
myarray.subscribe((value) => {
  console.log(value);
});

// add an item to the cart
myarray.update((value) => [...value, "item 1"]);

// add another item to the myarray
myarray.update((value) => [...value, "item 2"]);
```

### example 3
```shell
// Import the persistentVariable library
import persistentVariable from "easystatemanagersvelte";

// Create a stateful variable with an initial value
const cart = persistentVariable('cart', []);

// Subscribe to changes in the cart value
const unsubscribe = cart.subscribe((value) => {
  console.log('Cart updated:', value);
});

// Update the cart value
cart.set(['item1', 'item2', 'item3']);

// Access the current value of the cart
console.log('Current cart value:', $cart);

// Unsubscribe from further changes
unsubscribe();
```

## Basic Shopping Cart Example

```shell
// Import the persistentVariable library
import persistentVariable from "easystatemanagersvelte";

// Create a stateful variable for the shopping cart
const cart = persistentVariable('cart', []);

// Function to add an item to the cart
function addItem(item) {
  cart.update((currentCart) => {
    // Create a new cart array with the added item
    return [...currentCart, item];
  });
}

// Function to remove an item from the cart
function removeItem(item) {
  cart.update((currentCart) => {
    // Filter out the item from the current cart
    return currentCart.filter((cartItem) => cartItem !== item);
  });
}

// Subscribe to changes in the cart value
const unsubscribe = cart.subscribe((value) => {
  console.log('Cart updated:', value);
});

// Add items to the cart
addItem('item1');
addItem('item2');
addItem('item3');

// Remove an item from the cart
removeItem('item2');

// Access the current value of the cart
console.log('Current cart value:', $cart);

// Unsubscribe from further changes
unsubscribe();
```

### inspiration
This library was inspired by svelte but with persistence added

## license
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
