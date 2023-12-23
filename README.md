fn-one is a tiny library to chain functions.

## Installation

### Node.js

```bash
npm install --save fn-one
```

### Browsers

Install as above and use the `fn-one.js` file found in the node_modules directory:

```html
<script src="./node_modules/fn-one/fn-one.js"></script>
```

## Usage

When chaining functions, each function's output is passed to the next function in line. If a function explicitly returns _false_ or throws an exception, the chain breaks. With function chaining, there is less need for explicit control structures such as if-else statements and loops that clutter the code. They are hidden inside lower-level functions where they belong.

The example below shows how a user account creation process can be implemented by chaining functions:

```js
const chain = require('fn-one');

// (...)

async function createUser(email, password, firstName, lastName) {
    return await chain(
        () => validateInput(email, password, firstName, lastName),
        () => isPasswordValid(password),
        () => userService.isEmailAvailable(email),
        () => userService.hashPassword(password),
        (hashedPassword) => userService.create(email, hashedPassword, firstName, lastName)
    );
}
```

**Things to keep in mind:**

-   fn-one _awaits_ all passed functions, whether they return a promise or not.
-   Rejected promises break the chain.
-   fn-one always returns a promise.
