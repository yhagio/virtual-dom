/**
 * Check if a node has been changed
 * @param {*} node1
 * @param {*} node2
 */
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

/**
 * CHeck if a node's props has been changed
 * @param {*} newNode
 * @param {*} oldNode
 */
function diffProps(newNode, oldNode) {
  const patches = [];
  const props = Object.assign({}, newNode.props, oldNode.props);
  Object.keys(props).forEach(name => {
    const newVal = newNode.props[name];
    const oldVal = oldNode.props[name];
    if (!newVal) {
      patches.push({
        type: "REMOVE_PROP",
        name,
        value: oldVal
      });
    } else if (!oldVal || newVal !== oldVal) {
      patches.push({
        type: "SET_PROP",
        name,
        value: newVal
      });
    }
  });

  return patches;
}

/**
 * Same as 'diff' for a node's children
 * @param {*} newNode
 * @param {*} oldNode
 */
function diffChildren(newNode, oldNode) {
  const patches = [];
  const patchesLen = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < patchesLen; i++) {
    patches[i] = diff(newNode.children[i], oldNode.children[i]);
  }

  return patches;
}

/**
 * Determines if a node is being updated, replaced, deleted, or created
 * @param {*} newNode
 * @param {*} oldNode
 */
function diff(newNode, oldNode) {
  if (!oldNode) {
    return {
      type: "CREATE",
      newNode
    };
  } else if (!newNode) {
    return {
      type: "REMOVE"
    };
  } else if (changed(newNode, oldNode)) {
    return {
      type: "REPLACE",
      newNode
    };
  }
  if (newNode.type) {
    return {
      type: "UPDATE",
      children: diffChildren(newNode, oldNode),
      props: diffProps(newNode, oldNode)
    };
  }
}

module.exports = {
  diff
};
