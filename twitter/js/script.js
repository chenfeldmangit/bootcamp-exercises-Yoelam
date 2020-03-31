userData = {
    "coverImage": "assets/profileImage.png",
    "profileImage": "assets/profile.png",
    "name": "ABCDef",
    "about": "read this if you must."
}

feedTweets = [
    {"id":"1", "name": "DATAx", "tweet":  "Marketing plans are not what they used to be! Don’t go anywhere to join our #CMO Webinar presented by @cvent today at 1 p.m. EST, to learn how to #adapt and strategize your #marketing efforts seamlessly across many #channels. #virtualevent", "profileImage": "assets/user_icon2.jpg", "tweetImage": "assets/feed-ex1.jfif"},
    {"id":"2", "name": "Ethics in Bricks", "tweet":  "It’s only Quarantine if it’s in the Quarantine province of France. Otherwise it's just sparkling self isolation.", "profileImage": "assets/user_icon1.jpg", "tweetImage": "assets/feed-ex2.jfif"},
    // {"id":"3", "name": "Israel Israeli", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex1.jfif"}
]

userTweets = [
    {"id":"1", "tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"},
    {"id":"2", "tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex2.jfif"},
    {"id":"3", "tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"},
    {"id":"4", "tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex2.jfif"},
    {"id":"5", "tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"}
]

window.onload = () => {
    //localStorage.clear();
    if (localStorage.getItem("userData") == null) {
        localStorage.setItem("userData", JSON.stringify(userData));
    }
    if (localStorage.getItem("feedTweets") == null) {
        localStorage.setItem("feedTweets", JSON.stringify(feedTweets));
    }
    if (localStorage.getItem("userTweets") == null) {
        localStorage.setItem("userTweets", JSON.stringify(userTweets));
    }
    showHomePage();

}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showHomePage() {
    document.getElementById('profileContainer').classList.add('hidden');
    document.getElementById('feedContainer').classList.remove('hidden');
    document.getElementById('feedContainer').scrollTo(0,0);

    const tweetsContainer = document.getElementById("feedTweets");
    tweetsContainer.innerText = "";

    tweetsContainer.innerText = "Loading...";
    DataAPI.getFeedTweets()
        .then(tweets => {
            tweetsContainer.innerText = "";
            tweets.forEach(tweet => {
                addTweetItem(tweetsContainer, tweet);
            });
        })

    scrollToTop();
}

function showProfilePage() {
    document.getElementById('feedContainer').classList.add('hidden');
    document.getElementById('profileContainer').classList.remove('hidden');

    const profileData = JSON.parse(localStorage.getItem("userData"));
    document.getElementById('coverImg').src = profileData.coverImage;
    document.getElementById('profileImg').src = profileData.profileImage;
    document.querySelector('#profileContainer .name').innerHTML = profileData.name;
    document.querySelector('#description .name').innerHTML = profileData.name;
    document.querySelector('#profileContainer .about').innerHTML = profileData.about;

    const tweetsContainer = document.getElementById("profileTweets");
    tweetsContainer.innerText = "";

    tweetsContainer.innerText = "Loading...";
    DataAPI.getUserTweets()
        .then(tweets => {
            tweetsContainer.innerText = "";
            tweets.forEach(tweet => {
                addTweetItem(tweetsContainer, tweet, profileData.name, profileData.profileImage);
            });
        })


    scrollToTop();
}

function addTweetItem(tweetsContainer, tweet, nameOverride, profileImgOverride) {
    const tweetTemplate = document.getElementById("tweetTemplate");
    const tweetItem = tweetTemplate.content.cloneNode(true);

    tweetItem.querySelector("#icon").src = profileImgOverride == null ? tweet.profileImage : profileImgOverride;
    tweetItem.querySelector("#feedItemTitle").textContent = nameOverride == null ? tweet.name : nameOverride;
    tweetItem.querySelector("#tweetText").textContent = tweet.tweet;
    if (tweet.tweetImage != null) {
        tweetItem.querySelector("#feedItemMultimedia").src = tweet.tweetImage;
    }
    tweetItem.querySelector(".delete-button").dataset.tweetid = tweet.id;

    tweetsContainer.appendChild(tweetItem);
}

openProfileEdit = () => {
    document.querySelector("#usernameInput").value = userData.name;
    document.querySelector("#aboutInput").value = userData.about;
    document.getElementById("editPage").classList.remove('hidden');
}

closePage = (event) => {
    if (event.target.id === "editPage") {
        document.getElementById("editPage").classList.add('hidden');
    }
    if (event.target.id === "tweetPage") {
        document.getElementById("tweetPage").classList.add('hidden');
    }
}

openTweetPage = () => {
    document.getElementById("tweetPage").classList.remove('hidden');
}

function publishNewTweet() {
    const tweetText = document.querySelector("#tweetInput").value;
    let tweet = {
      "id": createUUID(),
      "name": userData.name,
      "tweet":  tweetText,
      "profileImage": userData.profileImage
    }
    DataAPI.addTweet(tweet);

    document.getElementById("tweetPage").classList.add('hidden');
    showHomePage();
}

function saveProfileData() {
    const userName = document.querySelector("#usernameInput").value;
    const about = document.querySelector("#aboutInput").value;

    if (userName != null) {
        userData.name = userName;
    }
    if (about != null) {
        userData.about = about;
    }

    localStorage.setItem("userData", JSON.stringify(userData));

    document.getElementById("editPage").classList.add('hidden');
    showProfilePage();
}

async function deleteTweet(element) {
    let tweetId = element.dataset.tweetid;
    await DataAPI.deleteTweetFromFeedTweets(tweetId);
    await DataAPI.deleteTweetFromUserTweets(tweetId);
    location.reload();
}

function createUUID(){
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
}