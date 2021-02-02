let posts = [];
const photos = document.querySelectorAll('img');
console.log(photos)

function setComments() {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => {
            for (let i = 0; i < posts.length; i++) {
                for (let j = 0; j < comments.length; j++) {
                    if (posts[i].id === comments[j].postId) {
                        posts[i]['comments'] = comments[j];
                     }
                }
            }
        })
}


function setImages() {
    fetch('https://api.unsplash.com/search/photos?query=europe&page=1&client_id=z5tR6xI7D8CCROM12n5E0358ttG5G2dYLc1G-HEOUpE')
        .then(response => response.json())
        .then(images => {
            for (let i = 0; i < posts.length; i++) {
                posts[i]['urls'] = images.results[i]['urls'];
                photos[i].setAttribute('src', images.results[i]['urls'].regular)
            }
        })
        .then(() => console.log())
}

function setPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(res => { 
                for (let i = 0; i < 10; i++) {
                    posts.push(res[i]);
                }
            }
        )
        .then(() => setComments())
        .then(() => setImages()) 
}

//setPosts()

async function test() {
    const result = await setPosts();
    console.log(result)
}

test()