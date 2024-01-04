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
   * @param {number} value
   * @returns {BSTNode | null}  */
  insert(value, root = this.root) {
    if (root && root.value) {
      if (value === root.value) {
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
    return root;
  }

  /** @param {number} value  */
  delete(value) {}

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

  levelOrder() {}

  preOrder() {}

  inOrder() {}

  postOrder() {}

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
myTree.prettyPrint(myTree.root);
myTree.insert(2);
myTree.prettyPrint(myTree.root);
// console.log(myTree.find(18));
