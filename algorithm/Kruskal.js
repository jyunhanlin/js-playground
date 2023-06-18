// finds a minimum spanning forest of an undirected edge-weighted graph.

// 1. create a forest F (a set of trees), where each vertex in the graph is a separate tree
// 2. create a sorted set S containing all the edges in the graph
// 3. while S is nonempty and F is not yet spanning
//   3.1. remove an edge with minimum weight from S
//   3.2. if the removed edge connects two different trees then add it to the forest F, combining two trees into a single tree

// Time complexity: O(E log E) = O(E log V).
