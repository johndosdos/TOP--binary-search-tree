// @ts-check

class BSTNode {
  /**
   * @param {number} value
   *  */
  constructor(value) {
    /** @type {value | null} */
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
    this.subtree = undefined;
  }

  /**
   * @param {Array<number>} array
   * @returns {BSTNode}  */
  #buildTree(array) {
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    const compareFunction = (a, b) => a - b;
    const sortedArray = array.sort(compareFunction);
    const uniqueArray = [...new Set(sortedArray)];

    const rootNode = this.#buildRootNode(uniqueArray);
    this.subtree = this.#buildSubTree(uniqueArray);

    return rootNode;
  }

  /**
   * @param {Array<number>} array
   * @returns {BSTNode}
   */
  #buildRootNode(array) {
    const rootNodeIndex = Math.floor(array.length / 2);
    const rootNode = new BSTNode(array[rootNodeIndex]);

    return rootNode;
  }

  /** @param {Array<number>} array */
  #buildSubTree(array) {
    if (array.length === 0) {
      return null;
    }

    const rootNodeIndex = Math.floor(array.length / 2);
    const rootNode = new BSTNode(array[rootNodeIndex]);

    const leftArray = array.slice(0, rootNodeIndex);
    const rightArray = array.slice(rootNodeIndex + 1, array.length);

    rootNode.left = this.#buildSubTree(leftArray);
    rootNode.right = this.#buildSubTree(rightArray);

    return rootNode;
  }
}

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(myTree.subtree);
