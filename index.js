const posts = [];
const container = document.querySelector('.container');

let clickedPostId;

const articleContainer = document.querySelector('.article-container');
const commentsContainer = document.querySelector('.comments-container');

const articleTitle = document.querySelector('.article-title');
const articleImage = document.querySelector('.article-image');
const articleBody = document.querySelector('.article-body');

const postCommentInput = document.getElementById('comment');
const commentDate = document.querySelector('.comment-date');

const date = new Date();

function addCommentsToPosts() {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => {
            for (let i = 0; i < posts.length; i++) {
                posts[i]['comments'] = [];
                for (let j = 0; j < comments.length; j++) {
                    if (posts[i].id === comments[j].postId) {
                        posts[i]['comments'].push(comments[j]);
                     }
                }
            }
        })
}

function addImagesToPosts() {
    fetch('https://api.unsplash.com/search/photos?query=beach&page=1&client_id=z5tR6xI7D8CCROM12n5E0358ttG5G2dYLc1G-HEOUpE')
        .then(response => response.json())
        .then(images => {
            for (let i = 0; i < posts.length; i++) {
                posts[i]['urls'] = images.results[i]['urls'];
                const picture = document.createElement('img');
                picture.setAttribute('src', images.results[i]['urls'].small);
                picture.setAttribute('class', 'card-image');
                document.querySelector(`#card-${i}`).append(picture);
                const title = document.createElement('h4')
                document.querySelector(`#card-${i}`).append(title);
                title.innerText = posts[i].title;
            }
        })
}



function setPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(res => { 
                for (let i = 0; i < 10; i++) {
                    posts.push(res[i]);
                    const card = document.createElement('div')
                    card.setAttribute('id', `card-${i}`);
                    card.setAttribute('class', 'polaroid');
                    container.append(card)

                    function fillArticle() {
                        clickedPostId = i;
                        container.classList.add('d-none');
                        articleContainer.classList.remove('d-none');
                        articleTitle.innerText = posts[i].title;
                        articleImage.setAttribute('src', posts[i].urls.regular);
                        articleBody.innerText = posts[i].body;

                        displayComments(posts[i].comments);

                        window.scrollTo(0, 0);
                    }

                    card.addEventListener('click', fillArticle)
                }
            }
        )
        .then(() => addCommentsToPosts())
        .then(() => addImagesToPosts())
}

function displayComments(comments) {
    for (let i = 0; i < comments.length; i++) {
        const author = document.createElement('div');
        const commentDate = document.createElement('div');
        const commentBody = document.createElement('div');

        author.setAttribute('class', 'comment-author');
        commentDate.setAttribute('class', 'comment-date')
        commentBody.setAttribute('class', 'comment-body');

        author.innerText = comments[i].name;
        commentDate.innerText = date.toDateString();
        commentBody.innerText = comments[i].body;

        commentsContainer.append(author);
        commentsContainer.append(commentDate);
        commentsContainer.append(commentBody);
    };
};

function postComment() {
    const author = document.getElementById('author');
    const comment = document.querySelector('.comment-box');

    const commentAuthor = document.createElement('div');
    const commentDate = document.createElement('div');
    const authorComment = document.createElement('div');

    commentAuthor.setAttribute('class', 'comment-author');
    commentDate.setAttribute('class', 'comment-date')
    authorComment.setAttribute('class', 'comment-body');

    author.value ? commentAuthor.innerText = author.value : commentAuthor.innerText = "Unknown";
    commentDate.innerText = date.toDateString();
    authorComment.innerText = comment.value;

    commentsContainer.append(commentAuthor);
    commentsContainer.append(commentDate);
    commentsContainer.append(authorComment);

    const newComment = {
        postId: clickedPostId,
        id: posts[clickedPostId].comments[posts[clickedPostId].comments.length - 1].id + 1,
        name: author.value,
        body: comment.value,
        email: `${name}@mail.com`
    };

    posts[clickedPostId].comments.push(newComment);

    author.value = '';
    comment.value = '';
}


function goToHomePage() {
    container.classList.remove('d-none');
    articleContainer.classList.add('d-none');
    window.scrollTo(0, 0);
};

document.querySelector('.logo').addEventListener('click', goToHomePage);

postCommentInput.addEventListener('click', postComment);

setPosts();



