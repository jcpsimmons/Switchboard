# Switchboard.js

![](https://img.shields.io/badge/Internet%20Explorer-^11-brightgreen)

*A barebones JavaScript library for event timing and DOM observing.*

*Developed for [LivingSpaces.com](https://livingspaces.com) by [Josh C. Simmons](https://jcsdesign.me)*

**Switchboard.js** is a tool for developers working on legacy webpages. We're all familiar with the "jQuery jumble" approach to coding that was common before frameworks such as React/Vue/Angular. Unfortunately a lot of these legacy pages still need updated and when they do, the risk of bugs due to timing are extremely high.

Instead of railing against the jQuery mess paradigm, Switchboard.js embraces this approach by allowing devs to hook into various page updates as needed without having to refactor huge amounts of legacy code.

---

## Getting Started

The production-ready, mostly-IE11-and-up compatible script is in the `/build` directory. Grab the Switchboard.js file from there, store it on your server, and bring the file in via a `<script>` tag.

Once imported - create switchboard instance

```javascript
let switchboard = new Switchboard()
```
 
**Now let's tell Switchboard to wait for jQuery to load**

```javascript
switchboard.listenEvent('jquery', 'jQuery')
```

**Want to wait for a page element to update?**

```javascript
switchboard.monitorDomChange('#IDtoWatch')
```

---

## Methods

### Constructor

Can be invoked as such `Switchboard(true)` for verbose logging. Helpful for debugging.

### listenEvent

```javascript
.listenEvent(string eventName, string variableName)
```

Waits for a variable to be present on the page. `variableName` should be input as the variable name after `window.` e.g. if you're waiting for `window.EventBus` you would send the variable name `EventBus`. `eventName` is the name of the document-level event that will be thrown ONCE when the variable becomes present on the page. 

```javascript
switchboard.listenEvent('eventbusload', 'EventBus')

document.addEventListener('eventbusload', ()=> alert('🎆 EventBus has loaded! 🎆'))
```

### monitorDomChange 

*Probably doesn't work on IE*

```javascript
.monitorDomChange(optional string targetSelector, optional Boolean subtree)
```

Used to observe DOM mutation on an element. Defaults to observing `body` with `subtree=true`. On DOM change throws an event named `DOMMutation`

---

## Attributes

### verbose (Boolean)

Default `false`. Shows/hides console output from program. Make `false` for production.

### documentEventList (Array) (work-in-progress)

Running tab of all document-level event listeners. If running on a modern browser this will also include every existing event listener including the ones added by switchboard. Less-modern browsers will only contain Switchboard-added event listeners.

