# Solve Dynamic Programming(DP) problem with SRTBOT

### DP

- Overlapping sub-problems
- Optimal substructure

### SRTBOT

- **S**ubproblems definition
- **R**elate subproblem solutions recursively
- **T**opological order to argue relation is acyclic and sub-problems form a DAG
- **B**ase cases
- **O**riginal problem
- **T**ime analysis


#### Subproblems definition

- input is a sequence `A`
  - Prefix
  ```
  dp[i]: the soultion to the subproblem with input A[:i+1]
  ```
  - Sufficx
  ```
  dp[i]: the soultion to the subproblem with input A[i:]
  ```
  - Substrings
  ```
  dp[i][j]: the soulution to teh subproblem wihh input A[i:j+1]
  ```
- input are 2 sequences `A` and `B`
  - 3 x 3 = 9 possible types from previous singel sequence
- input is number `k`
  ```
  dp[k]: the solution to the subproblem with input `K`
  ```
- input is a binary tree `r`
  ```
  dp[r]: the solution to the subproblem with the subtree that `r` as the root node
  ```

