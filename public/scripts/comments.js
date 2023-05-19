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

async function fetchCommentsForPost() {
  const postId = loadCommentsButtonElement.dataset.postid;
  try {
    const response = await fetch(`/posts/${postId}/comments`);
    if(!response.ok) {
      return;
    }
  
    const responseData = await response.json();
  
    if(responseData && responseData.length > 0) {
      const commentsListElement = createCommentsList(responseData);
      commmentsSectionElement.innerHTML = '';
      commmentsSectionElement.appendChild(commentsListElement);
    } else {
      commmentsSectionElement.firstElementChild.textContent ='We could not find any comments. Maybe add one?';
    }
  } catch(error) {
    alert('Getting comments failed.');
  }
}

async function saveComment(event) {
    event.preventDefault();
    const postId = loadCommentsButtonElement.dataset.postid;

    const enteredTitle = commentTitleElement.value;
    const enteredText = commentTextElement.value;

    const comment = {title: enteredTitle, text: enteredText};

    const response = await fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
      fetchCommentsForPost();
    } else {
      alert('Could not send comment.');
    }

}


loadCommentsButtonElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);