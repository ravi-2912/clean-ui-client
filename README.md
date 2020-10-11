Made the following adjustments to React-Reflex in `dist\es\ReactContainer.js` in function `_definePropert(this, "onStopResize", data => {})` from lines 89.

```javascript
let thisElements = this.elements
if(thisElements === null)
    thisElements = [this.children[data.index - 1], this.children[data.index + 1]];
const resizedRefs = thisElements.map(element => {
    return element.ref;
});
```
