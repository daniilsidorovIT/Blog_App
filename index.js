const posts = [];

const TITLE_LIMIT_NOTIFICATION = 100;
const TEXT_LIMIT_NOTIFICATION = 200;

const postTitleinputNode = document.querySelector('[data-find="js-post-title-input"]');
const postTextinputNode = document.querySelector('[data-find="js-post-text-input"]');
const newPostBtnNode = document.querySelector('[data-find="js-new-post-btn"]');
const postsNode = document.querySelector('[data-find="js-posts"]');
const validationNotification = document.querySelector(
  '[data-find="js-validationNotification"]'
);

newPostBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();

  postTitleinputNode.value = '';
  postTextinputNode.value = '';
});

postTitleinputNode.addEventListener("input", function (event) {
  const currentValue = event.target.value;
  if (currentValue.length > TITLE_LIMIT_NOTIFICATION) {
    validationNotification.innerText = `Заголовок не должен содержать больше ${TITLE_LIMIT_NOTIFICATION} символов.`;
    validationNotification.classList.remove("validationNotification__hidden");
  } else {
    validationNotification.classList.add("validationNotification__hidden");
  }
});

postTextinputNode.addEventListener("input", function (event) {
  const currentValue = event.target.value;
  if (currentValue.length > TEXT_LIMIT_NOTIFICATION) {
    validationNotification.innerText = `Пост не должен содержать больше ${TEXT_LIMIT_NOTIFICATION} символов.`;
    validationNotification.classList.remove("validationNotification__hidden");
  } else {
    validationNotification.classList.add("validationNotification__hidden");
  }
});

function getPostFromUser() {
  const title = postTitleinputNode.value;
  const text = postTextinputNode.value;

  return {
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  const currentDate = new Date();
  const dt = `${currentDate.toLocaleDateString()}.${currentDate.toLocaleTimeString()}`;

  posts.push({
    dt,
    title,
    text,
  });
}

function getPost() {
  return posts;
}

function renderPosts() {
  const posts = getPost();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
        <div class='post'>
            <p class='post__date'>${post.dt}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>
        `;
  });

  postsNode.innerHTML = postsHTML;
}
