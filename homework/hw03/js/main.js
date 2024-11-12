import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "chris";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    getPosts();
    getProfile();
    getSuggestions();
    getStories();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
async function getPosts() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const posts = await response.json();
    // console.log(posts);
    showPosts(posts);

}

async function getProfile() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const profile = await response.json();
    console.log(profile);
    showProfile(profile);

}

function showProfile(profile) {
    const asideEl = document.querySelector("aside");

    const template = `
        <header class="flex gap-4 items-center">
            <img src="${profile.thumb_url}" class="rounded-full w-16" alt="Your Profile Picture"/>
            <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>
        </header>`
    asideEl.insertAdjacentHTML("afterbegin", template);
}


async function getSuggestions() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const suggestions = await response.json();
    // console.log(suggestions);
    showSuggestions(suggestions);

}

function showSuggestions(suggestions) {
    const asideEl = document.querySelector("aside");

    suggestions.forEach(suggestion => {
        const template = `
            <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${suggestion.thumb_url}" class="rounded-full" alt="${suggestion.username}'s Profile Picture, Suggestions/>
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-700 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-700 text-sm py-2">follow</button>
            </section>`
        asideEl.insertAdjacentHTML("beforeend", template);
    });    
}


async function getStories() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const stories = await response.json();
    console.log(stories);
    showStories(stories);

}

function showStories(stories) {
    const mainEl = document.querySelector("#stories");

    stories.forEach(story => {
        const template = `
            <div class="flex flex-col justify-center items-center">
                <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" alt="${story.user.username}'s Profile Picture, Stories/>
                <p class="text-xs text-gray-500">${story.user.username}</p>
            </div>`
        mainEl.insertAdjacentHTML("afterbegin", template);
    });    
}



function showPosts(posts){
    const mainEl = document.querySelector("main");

    posts.forEach(post => {
        const template = `
        <!-- Post 1 -->
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button" title="Post Actions"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                        
                        <button title="Comment"><i class="far fa-comment"></i></button>
                        <button title="Send To"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} like(s)</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption}
                    </p>
                </div>
                ${showComments(post.comments)}
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment..." aria-label="Add a comment">
                </div>
                <button title="Post Comment" class="text-blue-700 py-2">Post</button>
            </div>
        </section>`
        mainEl.insertAdjacentHTML("beforeend", template);
    });
}

function showComments(comments) {
    if(comments.length > 1){
        const lastComment = comments[comments.length-1];
        return `
        <p class="text-sm mb-3">
            <strong>${lastComment.user.username}</strong> ${lastComment.text}
        </p>
        <button class="text-sm mb-3">view All ${comments.length} Comments</button>
        `;
    }
    if(comments.length === 1) {
        const lastComment = comments[0];
        return `<p class="text-sm mb-3">
            <strong>${lastComment.user.username}</strong> ${lastComment.text}
        </p>`
    }
    return '';
}

function getLikeButton(post) {
    if(post.current_user_like_id) {
        return `<button title="Unlike" onclick="deleteLike(${post.current_user_like_id})"><i class="fa-solid text-red-700 fa-heart"></i></button>`;
    } else {
        return `<button title="Like" onclick="createLike(${post.id})">
            <i class="far fa-heart"></i>
        </button>`;
    }
}


window.createLike = async function(postID) {
    const postData = {
        "post_id": postID,
    };
    
    //await / async syntax:
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/likes/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
}

window.deleteLike = async function(likeId) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${likeId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}


function getBookmarkButton(post) {
    if(post.current_user_bookmark_id) {
        return `<button title="Unbookmark" onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
    } else {
        return `<button title="Bookmark" onclick="createBookmark(${post.id})">
            <i class="far fa-bookmark"></i>
        </button>`;
    }
}

 window.createBookmark = async function(postID) {
    const postData = {
        "post_id": postID,
    };
    
    //await / async syntax:
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
}

window.deleteBookmark = async function(bookmarkId) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}




// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
