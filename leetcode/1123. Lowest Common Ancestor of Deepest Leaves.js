/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function(root) {
    let lca = root;
    let maxDepth = 0;

    const findLCA = (cur, depth) => {
        maxDepth = Math.max(maxDepth, depth);

        if (!cur) return depth;

        const leftDepth = findLCA(cur.left, depth + 1);
        const rightDepth = findLCA(cur.right, depth + 1);

        if (leftDepth === maxDepth && rightDepth === maxDepth) lca = cur;

        return Math.max(leftDepth, rightDepth);
    }

    findLCA(root, 0);

    return lca;

};
