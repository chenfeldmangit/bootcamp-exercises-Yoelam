
class DataAPI {

    static getJsonData(itemName) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(function () {
                    let data = localStorage.getItem(itemName);
                    resolve(JSON.parse(data));
                }, 1000);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static addTweetToItem(tweet, itemName) {
        let tweets = JSON.parse(localStorage.getItem(itemName));
        tweets.unshift(tweet);
        localStorage.setItem(itemName, JSON.stringify(tweets));
    }

    static addTweet(tweet) {
        return new Promise((resolve, reject) => {
            try {
                DataAPI.addTweetToItem(tweet, "feedTweets");
                DataAPI.addTweetToItem(tweet, "userTweets");
            } catch(err) {
                reject(err);
            }
        })
    }

    static deleteTweet(tweetId, storeItemName) {
        let tweets = JSON.parse(localStorage.getItem(storeItemName));
        let filtered = tweets.filter(item => {
            return item.id !== tweetId;
        });
        localStorage.setItem(storeItemName, JSON.stringify(filtered));
        console.log(filtered);
    }

    static async deleteTweetFromFeedTweets(tweetId) {
        return this.deleteTweet(tweetId, "feedTweets");
    }

    static async deleteTweetFromUserTweets(tweetId) {
        return this.deleteTweet(tweetId, "userTweets");
    }

    static userData() {
        return this.getJsonData("userData");
    }

    static getUserTweets() {
        return this.getJsonData("userTweets");
    }

    static getFeedTweets() {
        return this.getJsonData("feedTweets");
    }

}