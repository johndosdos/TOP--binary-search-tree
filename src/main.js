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
  }
}

class Tree {
  /** @param {Array<number>} array  */
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  /**
   * @param {Array<number>} array
   * @returns {BSTNode | null}  */
  #buildTree(array) {
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    const compareFunction = (a, b) => a - b;
    const sortedArray = array.sort(compareFunction);
    const uniqueArray = [...new Set(sortedArray)];

    const rootNode = this.#buildSubTree(uniqueArray);

    return rootNode;
  }

  /**
   * @param {Array<number>} array
   * @param {number} start
   * @param {number} end
   * @returns {BSTNode | null} */
  #buildSubTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const rootNodeIndex = Math.floor((start + end) / 2);
    const rootNode = new BSTNode(array[rootNodeIndex]);

    rootNode.left = this.#buildSubTree(array, start, rootNodeIndex - 1);
    rootNode.right = this.#buildSubTree(array, rootNodeIndex + 1, end);

    return rootNode;
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
   * @param {number} value
   * @returns {BSTNode | null}  */
  insert(value, root = this.root) {
    if (root && root.value) {
      if (value === root.value) {
        console.log(`\n\nINSERT: Failed! Duplicate value found.\n\n`);
        return null;
      } else if (value < root.value) {
        root.left = this.insert(value, root.left);
        return root;
      } else if (value > root.value) {
        root.right = this.insert(value, root.right);
        return root;
      }
    }

    const node = new BSTNode(value);
    if (node?.value) {
      root = node;
    }
    console.log(`\n\nINSERT: Success!\n\n`);
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

  height() {}

  depth() {}

  isBalanced() {}

  rebalance() {}

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

function generateRandomNumber(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const randomNumber = generateRandomNumber(10);
randomNumber;

const myTree = new Tree([14, 98, 56, 68, 63, 18, 60, 73, 49, 97]);
// myTree.insert(40);
// myTree.insert(51);
// myTree.insert(50);
// myTree.insert(57);
// myTree.insert(52);
myTree.prettyPrint(myTree.root);
// console.log(myTree.levelOrder(myTree.root));
// console.log(myTree.preOrder(myTree.root));
console.log(myTree.inOrder(myTree.root));
console.log(myTree.postOrder(myTree.root));
