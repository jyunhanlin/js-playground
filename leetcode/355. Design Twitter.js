var Twitter = function () {
  this.time = 0;
  this.tweets = new Map();
  this.follows = new Map();
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.tweets.has(userId)) this.tweets.set(userId, []);
  this.tweets.get(userId).push({ time: ++this.time, id: tweetId });
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  const candidates = [];
  const users = new Set([userId]);

  if (this.follows.has(userId)) {
    for (const followee of this.follows.get(userId)) {
      users.add(followee);
    }
  }

  for (const uid of users) {
    const userTweets = this.tweets.get(uid) || [];
    candidates.push(...userTweets.slice(-10));
  }

  return candidates
    .sort((a, b) => b.time - a.time)
    .slice(0, 10)
    .map((tweet) => tweet.id);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  if (followerId === followeeId) return;
  if (!this.follows.has(followerId)) this.follows.set(followerId, new Set());
  this.follows.get(followerId).add(followeeId);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (this.follows.has(followerId)) {
    this.follows.get(followerId).delete(followeeId);
  }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
