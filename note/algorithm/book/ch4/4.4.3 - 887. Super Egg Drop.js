/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {

    const memo = new Array(k + 1).fill().map(() => new Array(n + 1));


    const dp = (K, N) => {
        if (K === 1) return N;
        if (N === 0) return 0;

        if (memo[K][N]) return memo[K][N];

        let res = Infinity;

        for (let i = 1; i <= N; i += 1) {
            res = Math.min(res, Math.max(dp(K, N - i), dp(K - 1, i - 1)) + 1);
        }

        memo[K][N] = res;

        return res;

    }


    return dp(k, n);
};
