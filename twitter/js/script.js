userData = {
    "coverImage": "assets/profileImage.png",
    "profileImage": "assets/profile.png",
    "name": "ABCDe",
    "about": "read this if you must."
}
localStorage.setItem("userData", JSON.stringify(userData));

feedTweets = [
    {"name": "DATAx", "tweet":  "Marketing plans are not what they used to be! Don’t go anywhere to join our #CMO Webinar presented by @cvent today at 1 p.m. EST, to learn how to #adapt and strategize your #marketing efforts seamlessly across many #channels. #virtualevent", "profileImage": "assets/user_icon2.jpg", "tweetImage": "assets/feed-ex1.jfif"},
    {"name": "Ethics in Bricks", "tweet":  "It’s only Quarantine if it’s in the Quarantine province of France. Otherwise it's just sparkling self isolation.", "profileImage": "assets/user_icon1.jpg", "tweetImage": "assets/feed-ex2.jfif"},
    {"name": "Israel Israeli", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex1.jfif"}
]
localStorage.setItem("feedTweets", JSON.stringify(feedTweets));

userTweets = [
    {"name": "ABCDe", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex1.jfif"},
    {"name": "ABCDe", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex2.jfif"},
    {"name": "ABCDe", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex1.jfif"},
    {"name": "ABCDe", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex2.jfif"},
    {"name": "ABCDe", "tweet":  "had a lot of time to write about something!", "profileImage": "assets/profile.png", "tweetImage": "assets/feed-ex1.jfif"}
]
localStorage.setItem("userTweets", JSON.stringify(userTweets));

window.onload = () => {
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
    DataAPI.getFeedTweets
        .then(data => {
            data.forEach(item => {
                addTweetItem(tweetsContainer, item);
            });
        })

    scrollToTop();
}

function showProfilePage() {
    document.getElementById('feedContainer').classList.add('hidden');
    document.getElementById('profileContainer').classList.remove('hidden');

    DataAPI.getUserData
        .then(data => {
            document.getElementById('coverImg').src = data.coverImage;
            document.getElementById('profileImg').src = data.profileImage;
            document.querySelector('#profileContainer .name').innerHTML = data.name;
            document.querySelector('#description .name').innerHTML = data.name;
            document.querySelector('#profileContainer .about').innerHTML = data.about;
        })

    const tweetsContainer = document.getElementById("profileTweets");
    tweetsContainer.innerText = "";
    DataAPI.getUserTweets
        .then(data => {
            data.forEach(item => {
                addTweetItem(tweetsContainer, item);
            });
        })

    scrollToTop();
}

function addTweetItem(tweetsContainer, tweet) {
    const tweetTemplate = document.getElementById("tweetTemplate");
    const tweetItem = tweetTemplate.content.cloneNode(true);
    tweetItem.querySelector("#icon").src = tweet.profileImage;
    tweetItem.querySelector("#feedItemTitle").textContent = tweet.name;
    tweetItem.querySelector("#tweetText").textContent = tweet.tweet;
    if (tweet.tweetImage != null) {
        tweetItem.querySelector("#feedItemMultimedia").src = tweet.tweetImage;
    }

    tweetsContainer.appendChild(tweetItem);
}

