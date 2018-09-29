/////////////// PATCH //////////////////

/**
 * Set props (attribute) to the target DOM
 * @param {*} target
 * @param {*} name
 * @param {*} value
 */
function setProp(target, name, value) {
  if (name === "className") {
    return target.setAttribute("class", value);
  }
  return target.setAttribute(name, value);
}

/**
 * Set props to the target element recursively for nested ones
 * @param {*} target
 * @param {*} props
 */
function setProps(target, props) {
  Object.keys(props).forEach(name => setProp(target, name, props[name]));
}

function removeProp(target, name) {
  if (name === "className") {
    return target.removeAttribute("class");
  }
  return target.removeAttribute(name);
}

function patchProps(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const propPath = patches[i];
    const { type, name, value } = propPath;
    if (type === "SET_PROP") {
      setProp(parent, name, value);
    } else if (type === "REMOVE_PROP") {
      removeProp(parent, name);
    }
  }
}

/**
 * Create actual elements with props from virtual dom node
 * (to be appended to the application's mounting point)
 * @param {*} node
 */
function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const el = document.createElement(node.type);

  // Set props
  setProps(el, node.props);
  node.children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
}

/**
 * Create, remove, replace, or update DOM
 * @param {*} parent
 * @param {*} patches
 * @param {*} index
 */
function patch(parent, patches, index = 0) {
  if (!patches) return;

  const el = parent.childNodes[index];

  switch (patches.type) {
    case "CREATE": {
      const newEl = createElement(patches.newNode);
      return parent.appendChild(newEl);
    }
    case "REMOVE": {
      return parent.removeChild(el);
    }
    case "REPLACE": {
      const newEl = createElement(patches.newNode);
      return parent.replaceChild(newEl, el);
    }
    case "UPDATE": {
      patchProps(el, patches.props);
      for (let i = 0; i < patches.children.length; i++) {
        patch(el, patches.children[i], i);
      }
    }
  }
}

module.exports = {
  createElement,
  patch
};
