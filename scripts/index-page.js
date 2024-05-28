document.addEventListener('DOMContentLoaded', function () {
    const commentsContainer = document.getElementById('commentsContainer');
    const commentForm = document.getElementById('commentForm');

    // Array of default comments
    const comments = [
        {
            name: "Victor Pinto",
            date: "2023-11-02T00:00:00Z",
            text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
            avatar: {
                url: "",
                description: "Gray Avatar"
            }
        },
        {
            name: "Christina Cabrera",
            date: "2023-10-28T00:00:00Z",
            text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
            avatar: {
                url: "",
                description: "Gray Avatar"
            }
        },
        {
            name: "Isaac Tadesse",
            date: "2023-10-20T00:00:00Z",
            text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
            avatar: {
                url: "",
                description: "Gray Avatar"
            }
        }
    ];

    function createElementWithClass(tag, className) {
        const el = document.createElement(tag);
        el.classList.add(className);
        return el;
    }

    function createCommentElement(comment) {
        const commentEl = createElementWithClass('div', 'comments__item');
        const avatarEl = createElementWithClass('div', 'comments__avatar');
        if (comment.avatar.url) {
            const imgEl = document.createElement('img');
            imgEl.src = comment.avatar.url;
            imgEl.alt = comment.avatar.description;
            imgEl.style.width = '100%';
            imgEl.style.height = '100%';
            imgEl.style.borderRadius = '50%';
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
        dateEl.innerText = formatTimestamp(new Date(comment.date));
        dateEl.classList.add('timestamp');
        dateEl.setAttribute('data-time', comment.date);
        headerEl.appendChild(dateEl);

        const textEl = createElementWithClass('div', 'comments__text');
        textEl.innerText = comment.text;
        contentEl.appendChild(textEl);

        commentEl.appendChild(contentEl);
        return commentEl;
    }

    function displayComments(comments) {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentEl = createCommentElement(comment);
            commentsContainer.appendChild(commentEl);
        });
        updateTimestamps();
    }

    function addNewComment(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const text = document.getElementById('comment').value.trim();
        const date = new Date().toISOString();
        const avatar = { url: "", description: `Avatar of ${name}` };

        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');
        nameInput.classList.remove('error');
        commentInput.classList.remove('error');

        if (!name) nameInput.classList.add('error');
        if (!text) commentInput.classList.add('error');

        if (name && text) {
            const newComment = { name, date, text, avatar };
            comments.unshift(newComment);
            displayComments(comments);
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
            const postedTime = new Date(timestamp.getAttribute('data-time'));
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

    displayComments(comments);
    commentForm.addEventListener('submit', addNewComment);
    setInterval(updateTimestamps, 60000);
    updateLayout();
    addHoverAndClickEvents();
    window.addEventListener('resize', debounce(updateLayout, 100));
});
