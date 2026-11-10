const $ = id => document.getElementById(id);

let posts = [];
let selectedMedia = null;

// NOTIFICATIONS
function notify(message) {
    alert(message);
}

// CREATE POST: MEDIA PREVIEW
$("postMedia").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/") &&
        !file.type.startsWith("video/")) {
        notify("Please select an image or video.");
        return;
    }

    if (file.size > 20 * 1024 * 1024) {
        notify("Maximum file size is 20MB.");
        event.target.value = "";
        return;
    }

    selectedMedia = file;
    notify("Media selected successfully!");
});

// PUBLISH POST
$("publishBtn").addEventListener("click", () => {
    const caption = $("postCaption").value.trim();

    if (!caption && !selectedMedia) {
        notify("Write something or select a photo/video.");
        return;
    }

    const post = {
        id: Date.now(),
        caption,
        media: selectedMedia
            ? URL.createObjectURL(selectedMedia)
            : null,
        mediaType: selectedMedia
            ? selectedMedia.type
            : null,
        liked: false,
        likes: 0
    };

    posts.unshift(post);
    renderPosts();

    $("postCaption").value = "";
    $("postMedia").value = "";
    selectedMedia = null;

    notify("Your post has been published!");
});

// RENDER POSTS
function renderPosts() {
    const feed = $("feed");

    feed.innerHTML = posts.map(post => {
        let mediaHTML = "";

        if (post.media && post.mediaType.startsWith("image/")) {
            mediaHTML = `
                <div class="post-media">
                    <img src="${post.media}" alt="Post image">
                </div>
            `;
        } else if (post.media && post.mediaType.startsWith("video/")) {
            mediaHTML = `
                <div class="post-media">
                    <video src="${post.media}" controls></video>
                </div>
            `;
        }

        return `
            <article class="post card">

                <div class="post-header">
                    <div class="avatar">E</div>

                    <div class="user-info">
                        <strong>You</strong>
                        <small>Just now</small>
                    </div>

                    <button class="more-btn"
                        data-delete="${post.id}">•••</button>
                </div>

                ${mediaHTML}

                <div class="post-actions">
                    <button class="like-btn ${post.liked ? "liked" : ""}"
                        data-like="${post.id}">
                        ${post.liked ? "♥" : "♡"}
                    </button>

                    <button class="comment-btn"
                        data-comment="${post.id}">▢</button>

                    <button class="share-btn"
                        data-share="${post.id}">↗</button>
                </div>

                <div class="post-caption">
                    <strong>You</strong>
                    ${escapeHTML(post.caption)}
                </div>

                <small class="likes-count">
                    ${post.likes} likes
                </small>

            </article>
        `;
    }).join("") + feed.innerHTML;

    connectPostButtons();
}

// SAFE TEXT DISPLAY
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// POST BUTTONS
function connectPostButtons() {

    document.querySelectorAll("[data-like]").forEach(button => {
        button.onclick = () => {
            const post = posts.find(
                item => item.id === Number(button.dataset.like)
            );

            if (!post) return;

            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;

            button.classList.toggle("liked", post.liked);
            button.textContent = post.liked ? "♥" : "♡";

            const count = button.closest(".post")
                .querySelector(".likes-count");

            count.textContent = post.likes + " likes";
        };
    });

    document.querySelectorAll("[data-comment]").forEach(button => {
        button.onclick = () => {
            notify("Comments will be connected in the next update.");
        };
    });

    document.querySelectorAll("[data-share]").forEach(button => {
        button.onclick = async () => {
            const post = posts.find(
                item => item.id === Number(button.dataset.share)
            );

            if (!post) return;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Connectly",
                        text: post.caption || "Check out this post!"
                    });
                } catch (error) {
                    // Sharing cancelled.
                }
            } else {
                notify("Sharing will be available in a future update.");
            }
        };
    });

    document.querySelectorAll("[data-delete]").forEach(button => {
        button.onclick = () => {
            const id = Number(button.dataset.delete);

            if (!confirm("Delete this post?")) return;

            posts = posts.filter(post => post.id !== id);
            renderPosts();
        };
    });
}

// BOTTOM NAVIGATION
document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".bottom-nav button")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        const tab = button.dataset.tab;

        if (tab === "create") {
            $("postCaption").focus();
            window.scrollTo({top: 0, behavior: "smooth"});
        } else if (tab !== "home") {
            notify(tab.charAt(0).toUpperCase() +
                tab.slice(1) + " is coming soon!");
        }
    });
});

// STORIES
$("addStoryBtn").addEventListener("click", () => {
    notify("Story uploads are coming soon!");
});

// TOP ACTIONS
$("notificationsBtn").addEventListener("click", () => {
    notify("Your notifications will appear here.");
});

$("messagesBtn").addEventListener("click", () => {
    notify("Private messaging is coming soon.");
});
