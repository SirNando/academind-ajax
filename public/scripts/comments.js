const loadCommentsButtonElement = document.getElementById("load-comments-btn");
const commmentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
        <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
        </article>
        `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost(event) {
  const postId = loadCommentsButtonElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentsListElement = createCommentsList(responseData);
  commmentsSectionElement.innerHTML = '';
  commmentsSectionElement.appendChild(commentsListElement);
}

function saveComment(event) {
    event.preventDefault();
    const postId = loadCommentsButtonElement.dataset.postid;

    const enteredTitle = commentTitleElement.value;
    const enteredText = commentTextElement.value;

    const comment = {title: enteredTitle, text: enteredText};

    fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


loadCommentsButtonElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);