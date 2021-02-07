const posts = [];
const container = document.querySelector('.container');

let clickedPostId;

const articleContainer = document.querySelector('.article-container');
const commentsContainer = document.querySelector('.comments-container');

const author = document.getElementById('author');
const comment = document.querySelector('.comment-box');

comment.oninput = () => {
    if (comment.value.length > 140) {
        let charactersOverTheLimit = comment.value.length - 140;
        methods.displayWarning(`Your comment can't have more than 140 characters. Your are over ${charactersOverTheLimit} now`);
    } else {
        methods.removeWarning();  
    }
}

const articleTitle = document.querySelector('.article-title');
const articleImage = document.querySelector('.article-image');
const articleBody = document.querySelector('.article-body');

const postCommentInput = document.getElementById('comment');
const commentDate = document.querySelector('.comment-date');

const warning = document.getElementById('warning');

const date = new Date();

const methods = {
    pushPostToPostsArray: retrievedPosts => {
        for (let i = 0; i < 10; i++) {
            posts.push(retrievedPosts[i]);
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

                methods.displayComments(posts[i].comments);

                window.scrollTo(0, 0);
            }

            card.addEventListener('click', fillArticle)
        }
    },
    createCommentsArray: comments => {
        for (let i = 0; i < posts.length; i++) {
            posts[i]['comments'] = [];
            for (let j = 0; j < comments.length; j++) {
                if (posts[i].id === comments[j].postId) {
                    posts[i]['comments'].push(comments[j]);
                 }
            }
        }
    },
    addCommentsToPostObject: () => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(comments => methods.createCommentsArray(comments))
    },
    createImageCard: images => {
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
    },
    addImagesToPostObject: () => {
        fetch('https://api.unsplash.com/search/photos?query=beach&page=1&client_id=z5tR6xI7D8CCROM12n5E0358ttG5G2dYLc1G-HEOUpE')
            .then(response => response.json())
            .then(images => methods.createImageCard(images))
    },
    setPosts: () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(retrievedPosts => methods.pushPostToPostsArray(retrievedPosts))
            .then(() => methods.addCommentsToPostObject())
            .then(() => methods.addImagesToPostObject())
    },
    displayComments: comments => {
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
    },
    displayWarning: message => {
        warning.innerText = message;
        warning.classList.remove('fade');
        warning.classList.add('warning');
    },
    removeWarning: () => {
        warning.classList.add('fade');
        setTimeout(() => {
            warning.innerText = '';
        }, 500);
    },
    postNewComment: () => {
        if (!comment.value) {
            methods.displayWarning("Please write a comment before posting.")
        } else {
            if (comment.value.length < 141) {
                const commentAuthor = document.createElement('div');
                const commentDate = document.createElement('div');
                const authorComment = document.createElement('div');
    
                commentAuthor.setAttribute('class', 'comment-author');
                commentDate.setAttribute('class', 'comment-date')
                authorComment.setAttribute('class', 'comment-body');
    
                commentAuthor.innerText = author.value || "Unknown";
                commentDate.innerText = date.toDateString();
                authorComment.innerText = comment.value;
    
                commentsContainer.append(commentAuthor);
                commentsContainer.append(commentDate);
                commentsContainer.append(authorComment);
    
                const newComment = {
                    postId: clickedPostId,
                    id: posts[clickedPostId].comments[posts[clickedPostId].comments.length - 1].        id + 1,
                    name: author.value,
                    body: comment.value,
                    email: `${name}@mail.com`
                };
            
                posts[clickedPostId].comments.push(newComment);

                methods.removeWarning();
    
                author.value = '';
                comment.value = '';
            }
        }   
    },
    goToHomePage: () => {
        container.classList.remove('d-none');
        articleContainer.classList.add('d-none');
        commentsContainer.innerHTML = '';
        window.scrollTo(0, 0);
    }
};

methods.setPosts();
