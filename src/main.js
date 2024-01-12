// @ts-check

class BSTNode {
  /**
   * @param {number} value
   *  */
  constructor(value) {
    /** @type {value} */
    this.value = value;
    /** @type {BSTNode | null} */
    this.left = null;
    /** @type {BSTNode | null} */
    this.right = null;
    /** @type {number} */
    this.height = 0;
  }
}

class Tree {
  /** @param {Array<number>} array  */
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  //PRIVATE
  /**
   * @param {Array<number>} array
   * @returns {BSTNode | null}  */
  #buildTree(array) {
    const uniqueArray = [...new Set(array)];

    const rootNode = this.#buildSubTree(uniqueArray);
    return rootNode;
  }

  /**
   * @param {Array<number>} array
   * @returns {BSTNode | null} */
  #buildSubTree(array) {
    if (!this.root) {
      const element = array.pop();
      this.root = this.insert(element);
    }
    while (array.length) {
      const element = array.pop();
      this.insert(element);
    }

    return this.root;
  }

  /**
   * @param {BSTNode} node
   * @returns {BSTNode}
   */
  #findSuccessorNode(node) {
    if (node.left) {
      return this.#findSuccessorNode(node.left);
    }
    return node;
  }

  /**
   * @param {BSTNode | null} root
   */
  #updateSubtreeHeight(root) {
    if (root) {
      root.height =
        Math.max(root?.left?.height ?? -1, root?.right?.height ?? -1) + 1;
    }
  }

  /**
   * @param {BSTNode | null} root
   */
  #checkSubtreeBalance(root) {
    const balance = this.isBalanced(root);
  }

  //PUBLIC
  /**
   * @param {number | undefined} value
   * @returns {BSTNode | null}  */
  insert(value, root = this.root) {
    // conditional checks
    if (value) {
      if (!root) {
        root = new BSTNode(value);
        return root;
      } else if (value < root.value) {
        root.left = this.insert(value, root.left);
      } else if (value > root.value) {
        root.right = this.insert(value, root.right);
      }
    }

    // update height of the tree
    this.#updateSubtreeHeight(root);
    // this.#checkSubtreeBalance(root);

    return root;
  }

  /**
   * @param {number} value
   * @param {BSTNode | null} root
   * @returns {BSTNode | null} */
  delete(value, root = this.root) {
    if (root && root.value) {
      //
      //Case 1: node has two children
      if (value === root.value && root.left && root.right) {
        //Case 1.a: right node has leftmost leaf node
        const successorNode = this.#findSuccessorNode(root.right);
        root.value = successorNode.value;

        //Case 1.b: right node has no children
        if (successorNode === root.right) {
          root.right = this.delete(successorNode.value, root.right);
        } else {
          this.delete(successorNode.value, root.right);
        }

        return root;
      }

      //Case 2: node has one child
      if (value === root.value && (root.left || root.right)) {
        console.log(`\n\nDELETE: Success!\n\n`);
        return root.left || root.right;
      } else if (value < root.value) {
        root.left = this.delete(value, root.left);
        return root;
      } else if (value > root.value) {
        root.right = this.delete(value, root.right);
        return root;
      }

      //Case 3: node has no children
      if (value === root.value) {
        console.log(`\n\nDELETE: Success!\n\n`);
        return null;
      } else if (value < root.value) {
        root.left = this.delete(value, root.left);
        return root;
      } else if (value > root.value) {
        root.right = this.delete(value, root.right);
        return root;
      }
    }

    console.log(`\n\nCANNOT DELETE: Value is not found in the tree.\n\n`);
    return root;
  }

  /**
   * @param {number} value
   * @returns {BSTNode | null}   */
  find(value, root = this.root) {
    const node = root;

    if (node?.value) {
      if (value === node.value) {
        return node;
      } else if (value < node.value) {
        return this.find(value, node.left);
      } else if (value > node.value) {
        return this.find(value, node.right);
      }
    }

    return null;
  }

  /**
   * @param {BSTNode | null} node
   * @returns {Array<number | undefined>}
   */
  levelOrder(node) {
    let currentNode = node;
    const queue = [];
    const resultArray = [];

    queue.push(currentNode);

    while (queue.length) {
      if (currentNode?.left) queue.push(currentNode?.left);
      if (currentNode?.right) queue.push(currentNode?.right);

      const result = queue.shift();
      resultArray.push(result?.value);
      currentNode = queue[0];
    }

    return resultArray;
  }

  /**
   * @param {BSTNode | null | undefined} node
   * @param {Array<number | undefined>} resultArray
   * @returns {Array<number | undefined>}
   */
  preOrder(node, resultArray = []) {
    let currentNode = node;

    if (!currentNode) {
      return resultArray;
    }

    resultArray.push(currentNode?.value);
    this.preOrder(currentNode?.left, resultArray);
    this.preOrder(currentNode?.right, resultArray);

    return resultArray;
  }

  /**
   * @param {BSTNode | null | undefined} node
   * @param {Array<number | undefined>} resultArray
   * @returns {Array<number | undefined>}
   */
  inOrder(node, resultArray = []) {
    let currentNode = node;

    if (!currentNode) {
      return resultArray;
    }

    this.inOrder(currentNode?.left, resultArray);
    resultArray.push(currentNode?.value);
    this.inOrder(currentNode?.right, resultArray);

    return resultArray;
  }

  /**
   * @param {BSTNode | null | undefined} node
   * @param {Array<number | undefined>} resultArray
   * @returns {Array<number | undefined>}
   */
  postOrder(node, resultArray = []) {
    let currentNode = node;

    if (!currentNode) {
      return resultArray;
    }

    this.postOrder(currentNode?.left, resultArray);
    this.postOrder(currentNode?.right, resultArray);
    resultArray.push(currentNode?.value);

    return resultArray;
  }

  /**
   * @param {number} nodeValue
   * @param {BSTNode | null} root
   * @returns {number}
   */
  height(nodeValue, root = this.root) {
    if (root) {
      if (root?.value === nodeValue) {
        return root.height;
      }

      if (nodeValue < root.value) {
        return this.height(nodeValue, root.left);
      } else {
        return this.height(nodeValue, root.right);
      }
    }

    return -1;
  }

  /**
   * @param {number} nodeValue
   * @param {BSTNode | null} root
   * @returns {number}
   */
  depth(nodeValue, root = this.root, depthOfNode = 0) {
    if (nodeValue === root?.value) {
      return depthOfNode;
    }

    if (root) {
      if (nodeValue < root.value) {
        return this.depth(nodeValue, root.left, depthOfNode + 1);
      } else {
        return this.depth(nodeValue, root.right, depthOfNode + 1);
      }
    }

    return -1;
  }

  /**
   * @param {BSTNode | null} root
   * @returns {boolean}
   */
  isBalanced(root = this.root) {
    /**
     * Performs a depth-first search on the given root node.
     *
     * @param {object} root - The root node of the tree.
     * @return {array} An array containing a boolean value indicating if the tree is balanced,
     *                 and the height of the tree.
     */
    function dfs(root) {
      if (!root) return [true, 0];

      const leftTree = dfs(root.left);
      const rightTree = dfs(root.right);

      const balanceStatus =
        leftTree[0] &&
        rightTree[0] &&
        Math.abs(leftTree[1] - rightTree[1]) <= 1;

      return [balanceStatus, 1 + Math.max(leftTree[1], rightTree[1])];
    }
    return dfs(root)[0];
  }

  /**
   * @param {BSTNode | null} node
   */
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

/**
 * @param {number} size
 */
function generateRandomNumber(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const randomNumber = generateRandomNumber(3);
randomNumber;

const myTree = new Tree([24, 62, 79]);
myTree.prettyPrint(myTree.root);
console.log(myTree.height(24));
