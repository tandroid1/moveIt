# MoveIt

A jQuery plugin that allows you to move elements at a specified breakpoint. 

## Example

```javascript
// Selector sets the context of where we're moving things.
$('#page').moveIt([
  {
    el: '#search', // Move #search...
    moveTo: '#header', // to the #header...
    position: 'append', // and append it there. 
    bpDirection: 'min-width' // Match min-width breakpoint. Default.
  },
  {
    el: '#socialIcons',
    moveTo: '#sidebar',
    position: 'before',
    bpDirection: 'max-width',
    breakpoint: 720 // override the default breakpoint.
  }
], 520); // default breakpoint for all elements.
```

## Options 

### Items 

An array of items that should be moved. Each item must be an object. 

`el` - Element that should be moved. Should be a string in the format of a css selector.
`moveTo` - Element to move `el` to. Should be a string in the format of a css selector.
`bpDirection` - CSS media query direction to match.
 - `max-width` - Element moves when the window is smaller than the breakpoint.
 - `min-width` - Element moves when the window is larger than the breakpoint.
`breakpoint` - A breakpoint that will override the default.
`removeInlineScripts` - Remove any script tags within the element you are moving. This can prevent inline functions from being called every time the element is moved.

### Default Breakpoint

A default breakpoint that will apply to all items that do not have one specified.

## Events

### Usage 

```javascript
$('#page').on('itemsMovedThere', function() {
  // do something when items move to destination...
});
```

### Available Events

- `itemMoved` - Triggered when any item is moved, there or back.
- `itemMovedThere` - triggered when any item is moved to destination.
- `itemMovedBack` - Triggered when any item is moved back to original position.
- `itemsMovedThere` - Triggerd when all items have moved to destination.
- `itemsMovedBack` - Triggered when all items have moved back to original position.




