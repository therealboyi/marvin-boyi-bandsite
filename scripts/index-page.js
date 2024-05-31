document.addEventListener('DOMContentLoaded', async function () {
    const commentsContainer = document.getElementById('commentsContainer');
    const commentForm = document.getElementById('commentForm');

    const apiKey = '26032028-ded2-4965-b2ae-6996663fe119';  
    const api = new BandSiteApi(apiKey);

    function createElementWithClass(tag, className) {
        const el = document.createElement(tag);
        el.classList.add(className);
        return el;
    }

    function getLikedComments() {
        const likedComments = localStorage.getItem('likedComments');
        return likedComments ? JSON.parse(likedComments) : {};
    }

    function setLikedComment(commentId, liked) {
        const likedComments = getLikedComments();
        if (liked) {
            likedComments[commentId] = true;
        } else {
            delete likedComments[commentId];
        }
        localStorage.setItem('likedComments', JSON.stringify(likedComments));
    }

    function createCommentElement(comment) {
        const commentEl = createElementWithClass('div', 'comments__item');
        const avatarEl = createElementWithClass('div', 'comments__avatar');
        if (comment.avatar.url) {
            const imgEl = document.createElement('img');
            imgEl.src = comment.avatar.url;
            imgEl.alt = comment.avatar.description;
            imgEl.classList.add('comments__avatar');
            avatarEl.appendChild(imgEl);
        } else {
            avatarEl.classList.add('comments__avatar--placeholder');
        }
        commentEl.appendChild(avatarEl);

        const contentEl = createElementWithClass('div', 'comments__content');
        const headerEl = createElementWithClass('div', 'comments__header');
        contentEl.appendChild(headerEl);

        const nameEl = createElementWithClass('div', 'comments__name');
        nameEl.innerText = comment.name;
        headerEl.appendChild(nameEl);

        const dateEl = createElementWithClass('div', 'comments__date');
        dateEl.innerText = formatTimestamp(new Date(comment.timestamp));
        dateEl.classList.add('timestamp');
        dateEl.setAttribute('data-time', comment.timestamp);
        headerEl.appendChild(dateEl);

        const textEl = createElementWithClass('div', 'comments__text');
        textEl.innerText = comment.comment;
        contentEl.appendChild(textEl);

        const footerEl = createElementWithClass('div', 'comments__footer');

        const likesEl = createElementWithClass('div', 'comments__likes');
        likesEl.innerText = `Likes: ${comment.likes}`;
        footerEl.appendChild(likesEl);

        const likeButton = createElementWithClass('button', 'comments__button');
        const likeIcon = createElementWithClass('img', 'comments__icon');
        likeIcon.src = './assets/icons/icon-like.svg';
        likeIcon.alt = 'Like';
        likeButton.appendChild(likeIcon);

        // Set initial liked state from localStorage
        const likedComments = getLikedComments();
        let liked = likedComments[comment.id] || false;
        if (liked) {
            likeButton.classList.add('comments__button--liked');
        }

        likeButton.addEventListener('click', async () => {
            liked = !liked;
            setLikedComment(comment.id, liked);
            likeButton.classList.toggle('comments__button--liked', liked);

            if (liked) {
                comment.likes++;
                await api.likeComment(comment.id);
            } else {
                comment.likes--;
            }

            likesEl.innerText = `Likes: ${comment.likes}`;
        });

        footerEl.appendChild(likeButton);

        const deleteButton = createElementWithClass('button', 'comments__button');
        const deleteIcon = createElementWithClass('img', 'comments__icon');
        deleteIcon.src = './assets/icons/icon-delete.svg';
        deleteIcon.alt = 'Delete';
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener('click', async () => {
            await api.deleteComment(comment.id);
            await displayComments();
        });
        footerEl.appendChild(deleteButton);

        contentEl.appendChild(footerEl);
        commentEl.appendChild(contentEl);
        return commentEl;
    }

    async function displayComments() {
        commentsContainer.innerHTML = '';
        const comments = await api.getComments();
        comments.forEach(comment => {
            const commentEl = createCommentElement({
                name: comment.name,
                timestamp: comment.timestamp,
                comment: comment.comment,
                likes: comment.likes,
                id: comment.id,
                avatar: { url: '', description: 'Gray Avatar' }
            });
            commentsContainer.appendChild(commentEl);
        });
        updateTimestamps();
    }

    async function addNewComment(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const commentText = document.getElementById('comment').value.trim();

        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');
        nameInput.classList.remove('error');
        commentInput.classList.remove('error');

        if (!name) nameInput.classList.add('error');
        if (!commentText) commentInput.classList.add('error');

        if (name && commentText) {
            const newComment = { name, comment: commentText };
            await api.postComment(newComment);
            await displayComments();
            document.getElementById('name').value = '';
            document.getElementById('comment').value = '';
        } else {
            alert('Please enter both name and comment.');
        }
    }

    function formatTimestamp(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `${interval} days ago`;
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `${interval} hours ago`;
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `${interval} minutes ago`;
        return `${seconds} seconds ago`;
    }

    function updateTimestamps() {
        const timestamps = document.querySelectorAll('.timestamp');
        timestamps.forEach(timestamp => {
            const postedTime = new Date(parseInt(timestamp.getAttribute('data-time')));
            timestamp.innerText = formatTimestamp(postedTime);
        });
    }

    function updateFooterLayout() {
        const footerContainer = document.querySelector('.footer');
        if (window.innerWidth > 767) {
            footerContainer.classList.add('desktop-layout');
            footerContainer.classList.remove('mobile-layout');
        } else {
            footerContainer.classList.add('mobile-layout');
            footerContainer.classList.remove('desktop-layout');
        }
    }

    function updateNavUnderline() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            if (window.innerWidth <= 767) {
                link.style.setProperty('--underline-bottom', '-15px'); // Mobile
            } else {
                link.style.setProperty('--underline-bottom', '-30px'); // Desktop/Tablet
            }
        });
    }

    function updateLayout() {
        const desktopHeader = document.querySelector('.desktop-section-title');
        const commentSection = document.querySelector('.comments');
        const wrapper = document.querySelector('.comments-wrapper');
        const mobileHeader = document.querySelector('.comments__title-mobile');

        if (window.innerWidth > 1280 || (window.innerWidth >= 768 && window.innerWidth <= 1280)) {
            if (!desktopHeader) {
                const commentsHeader = document.createElement('h2');
                commentsHeader.classList.add('section__title', 'desktop-section-title');
                commentsHeader.textContent = "Join the Conversation";

                if (!wrapper) {
                    const newWrapper = document.createElement('div');
                    newWrapper.classList.add('comments-wrapper');
                    commentSection.parentNode.insertBefore(newWrapper, commentSection);
                    newWrapper.appendChild(commentsHeader);
                    newWrapper.appendChild(commentSection);
                } else {
                    wrapper.insertBefore(commentsHeader, commentSection);
                }
            }
            if (mobileHeader) {
                mobileHeader.style.display = 'none';
            }
        } else {
            if (desktopHeader) {
                desktopHeader.remove();
                if (wrapper) {
                    wrapper.replaceWith(...wrapper.childNodes);
                }
            }
            if (mobileHeader) {
                mobileHeader.style.display = 'block';
            }
        }

        updateNavUnderline();
        updateFooterLayout();
    }

    function addHoverAndClickEvents() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('nav__link--active'));
                link.classList.add('nav__link--active');
                updateNavLinkColors();
            });
            link.addEventListener('mouseover', () => {
                if (!link.classList.contains('nav__link--active')) {
                    link.style.color = '#FFFFFF';
                }
            });
            link.addEventListener('mouseout', () => {
                if (!link.classList.contains('nav__link--active')) {
                    link.style.color = '#E1E1E1';
                }
            });
        });
    }

    function updateNavLinkColors() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.style.color = link.classList.contains('nav__link--active') ? '#FFFFFF' : '#E1E1E1';
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    await displayComments();
    commentForm.addEventListener('submit', addNewComment);
    setInterval(updateTimestamps, 60000);
    updateLayout();
    addHoverAndClickEvents();
    window.addEventListener('resize', debounce(updateLayout, 100));
});
