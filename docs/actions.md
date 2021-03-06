---
layout: docs
title: Actions
description: The Actions returned by createActions
permalink: /docs/actions/
---

# Actions

Each action returned by [`alt.createActions`](createActions.md) comes with a few different properties.

## action

> (...data: mixed): mixed

The action itself is a reference to the function that handles the action. The actions are fire and forget like in flux. One solution to know when an action has completed is to return a promise from the action so these calls can later be aggregated. This is a convenient approach if you're attempting to use actions on the server so you can be notified when all actions have completed and it is safe to render.

```js
MyActions.updateName('Zack');
```

## action.defer

> (data: mixed): undefined

This is a method that faciliates calling multiple actions in another actions. Since multiple actions cannot be fired until the dispatch loop has finished this helper function waits for the dispatch loop to finish and then fires off the action. It is not recommended but it is available anyway.

```js
MyActions.updateName.defer('Zack');
```

```js
// Calling actions within actions is considered an anti-pattern but at least
// at a quick glance it's easy to tell what updateName is going to fire-off.
MyActions.prototype.updateName = function (name) {
  this.dispatch(name);
  this.actions.updateFirstName.defer(first(name));
  this.actions.updateLastName.defer(last(name));
  this.actions.saveToDatabase.defer();
}
```

## action.CONSTANT

A constant is automatically available at creation time. This is a unique identifier for the constant that can be used for dispatching and listening.

```js
MyActions.prototype.updateName = function (name) { };
```

will become

```js
myActions.UPDATE_NAME;
```

## action.methodName

Similar to the constant.

```js
MyActions.prototype.updateName = function (name) { };
```

is

```js
myActions.updateName;
```

This allows flexibility giving you choice between using the constant form or the method form.
