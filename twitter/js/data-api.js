
class DataAPI {

    static #getJsonData = itemName => {
        return new Promise((resolve, reject) => {
            try {
                let data = localStorage.getItem(itemName);
                resolve(JSON.parse(data));
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static getUserData = this.#getJsonData("userData");

    static getUserTweets = this.#getJsonData("userTweets");

    static getFeedTweets = this.#getJsonData("feedTweets");

    static getJsonSync(itemName) {
        let data = localStorage.getItem(itemName);
        return JSON.parse(data);
    }

    static getUserDataSync() {
        this.getJsonSync("userData");
    }

    static getUserTweetsSync() {
        this.getJsonSync("userTweets");
    }

    static getFeedTweetsSync() {
        this.getJsonSync("feedTweets");
    }

}