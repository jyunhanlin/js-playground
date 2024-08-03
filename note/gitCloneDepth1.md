# Git Clone with depth 1

```sh
git clone --depth 1 https://github.com/facebook/react
```

**When need to checkout some commit hash**

```sh
git pull --unshallow
```

**When need to checkout other branch**

```sh
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
```
