
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
}