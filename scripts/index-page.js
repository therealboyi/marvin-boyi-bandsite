document.addEventListener('DOMContentLoaded', function() {
    const commentsContainer = document.getElementById('commentsContainer');
  
    // Array of default comments
    const defaultComments = [
      {
        name: "Victor Pinto",
        date: "11/02/2023",
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        avatar: {
          url: "./assets/images/avatar-placeholder.png",
          description: "Avatar of Victor Pinto"
        }
      },
      {
        name: "Christina Cabrera",
        date: "10/28/2023",
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
        avatar: {
          url: "./assets/images/avatar-placeholder.png",
          description: "Avatar of Christina Cabrera"
        }
      },
      {
        name: "Isaac Tadesse",
        date: "10/20/2023",
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        avatar: {
          url: "./assets/images/avatar-placeholder.png",
          description: "Avatar of Isaac Tadesse"
        }
      }
    ];
  
    function createElementWithClass(tag, className) {
      const el = document.createElement(tag);
      el.classList.add(className);
      return el;
    }
  
    // Function to create a comment element
    function createCommentElement(comment) {
      const commentEl = createElementWithClass('div', 'comments__item');
  
      // Create and append avatar element
      const avatarEl = createElementWithClass('img', 'comments__avatar');
      avatarEl.src = comment.avatar.url;
      avatarEl.alt = comment.avatar.description;
      commentEl.appendChild(avatarEl);
  
      // Create and append comment content container
      const contentEl = createElementWithClass('div', 'comments__content');
  
      // Create and append name element
      const nameEl = createElementWithClass('div', 'comments__name');
      nameEl.innerText = comment.name;
      contentEl.appendChild(nameEl);
  
      // Create and append date element
      const dateEl = createElementWithClass('div', 'comments__date');
      dateEl.innerText = comment.date;
      contentEl.appendChild(dateEl);
  
      // Create and append text element
      const textEl = createElementWithClass('div', 'comments__text');
      textEl.innerText = comment.text;
      contentEl.appendChild(textEl);
  
      // Append the content to the comment element
      commentEl.appendChild(contentEl);
  
      return commentEl;
    }
  
    // Function to display comments
    function displayComments(comments) {
      comments.forEach(comment => {
        const commentEl = createCommentElement(comment);
        commentsContainer.appendChild(commentEl);
      });
    }
  
    // Function to handle new comment submission
    function addNewComment(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const name = document.getElementById('name').value;
      const text = document.getElementById('comment').value;
      const date = new Date().toLocaleDateString();
      const avatar = {
        url: "./assets/images/avatar-placeholder.png", // Placeholder for now, will be dynamic
        description: `Avatar of ${name}`
      };
  
      if (name && text) {
        const newComment = {
          name: name,
          date: date,
          text: text,
          avatar: avatar
        };
  
        const commentEl = createCommentElement(newComment);
        commentsContainer.insertBefore(commentEl, commentsContainer.firstChild);
  
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
      } else {
        alert('Please enter both name and comment.');
      }
    }
  
    // Load default comments on page load
    displayComments(defaultComments);
  
    document.getElementById('submitComment').addEventListener('click', addNewComment);
  });
  