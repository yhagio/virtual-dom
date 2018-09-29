const { createElement, patch } = require("./patch");
const { diff } = require("./diff");
const { pickRandomUser } = require("./demoHelper");

/**
 * (Helper) just to demo updating DOM every 700 milliseconds
 * @param {*} el
 * @param {*} user
 */
function tick(el, user) {
  const patches = diff(view(pickRandomUser()), view(pickRandomUser()));
  patch(el, patches);
  setTimeout(() => tick(el, pickRandomUser()), 700);
}

/////////////// VIRTUAL-DOM CORE: view, hyperscript, render

/**
 * Create a simple JSX style component with simple props 'user' object
 * @param {*} user
 */
function view(user) {
  return (
    <div className={`profile my-profile-${user.id}`}>
      <div id="first-name">{user.firstName}</div>
      <div id="last-name">{user.lastName}</div>
    </div>
  );
}

/**
 * Create Virtual DOM
 * @param {*} type Type of element i.e. 'img', 'ul', 'div', etc
 * @param {*} props Proprty i.e. { src: 'profile.png', className: 'profile' }
 * @param  {*} children Children i.e. string, number, [firstName, LastName], etc
 */
function hyperscript(type, props, ...children) {
  // Ensures props is Object
  const _props = props || {};
  // children can be like string, number, or array of elements
  // and make it flattened to be safe
  const _children = [].concat.apply([], children);

  return {
    type,
    props: _props,
    children: _children
  };
}

/**
 * Create actual elements in the application from virtual dom
 * @param {*} el
 */
function render(el) {
  el.appendChild(createElement(view(pickRandomUser())));

  // This is for demo purpose, update DOM every 700 milliseconds
  setTimeout(() => tick(el, pickRandomUser()), 700);
}

module.exports = {
  view,
  hyperscript,
  render
};
