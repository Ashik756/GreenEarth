# QNA
### Live Link :
```
https://ashik756.github.io/GreenEarth
```
## i) What is the difference between var, let, and const ?

**Answer:**
Difference between `var`, `let`, and `const` as follows:

`var` is function-scoped and can be redeclared.

`let` is block-scoped and can be reassigned but not redeclared.

`const` is block-scoped, cannot be redeclared, and cannot be reassigned.



## ii) What is the difference between map(), forEach(), and filter() ?

**Answer:**
Difference between `map()`, `forEach()`, and `filter()` as follows:

`map()` returns a new array with transformed elements.

`forEach()` iterates over elements but returns nothing (i.e, `undefined`).

`filter()` returns a new array with elements that pass a condition.



## iii) What are arrow functions in ES6 ?

**Answer:**
Arrow functions are a concise way to write functions in ES6. They use `=>` and inherit the `this` value from their surrounding scope.



## iv) How does destructuring assignment work in ES6 ?
**Answer:**

Destructuring lets you extract values from arrays or objects into variables.

Such as :
```js
const [a, b] = [1,2];
const {name, age} = person;
```



## v) Explain template literals in ES6. How are they different from string concatenation ?

**Answer:**
Template literals use backticks (\`) and `${}` for embedding variables: ``` `Hello ${name}` ```, unlike concatenation, which uses `+` (e.g., `"Hello " + name`).

Template literals provide a more readable syntax, allow embedding expressions directly, and support multi-line strings without special characters. String concatenation doesn't support those.