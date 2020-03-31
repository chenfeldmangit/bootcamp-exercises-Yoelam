userData = {
    "coverImage": "assets/profileImage.png",
    "profileImage": "assets/profile.png",
    "name": "ABCDef",
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
    {"tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"},
    {"tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex2.jfif"},
    {"tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"},
    {"tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex2.jfif"},
    {"tweet":  "had a lot of time to write about something!", "tweetImage": "assets/feed-ex1.jfif"}
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
    feedTweets.forEach(item => {
        addTweetItem(tweetsContainer, item);
    });
    // DataAPI.getFeedTweets
    //     .then(data => {
    //         data.forEach(item => {
    //             addTweetItem(tweetsContainer, item);
    //         });
    //     })

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
    userTweets.forEach(item => {
        addTweetItem(tweetsContainer, item, profileData.name, profileData.profileImage);
    });
    // DataAPI.getUserTweets
    //     .then(data => {
    //         data.forEach(item => {
    //             addTweetItem(tweetsContainer, item, userData.name, userData.profileImage);
    //         });
    //     })


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

    tweetsContainer.appendChild(tweetItem);
}

openProfileEdit = () => {
    document.querySelector("#usernameInput").value = userData.name;
    document.querySelector("#aboutInput").value = userData.about;
    document.getElementById("editPage").classList.remove('hidden');
}

closeProfileEdit = (event) => {
    if (event.target.id === "editPage") {
        document.getElementById("editPage").classList.add('hidden');
    }
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