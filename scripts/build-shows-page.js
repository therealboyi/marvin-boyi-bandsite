document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
  
    // Data for music card
    const musicCardData = {
      album: "Beautiful Beasts Album",
      song: "Stripes of Yellow x For The Stings",
      artist: "MØ",
      songTitle: "Blur (feat. Foster The People)",
      embeddedPlayer: `
        <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/5914614&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
          <a href="https://soundcloud.com/travisscott-2" title="Travis Scott" target="_blank" style="color: #cccccc; text-decoration: none;">Travis Scott</a> · 
          <a href="https://soundcloud.com/travisscott-2/sets/owl-pharaoh" title="Owl Pharaoh" target="_blank" style="color: #cccccc; text-decoration: none;">Owl Pharaoh</a>
        </div>`
    };
  
    // Data for ticket purchase cards
    const ticketCardData = [
      {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
        ticketUrl: "#",
      },
      {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
        ticketUrl: "#",
      },
      {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA",
        ticketUrl: "#",
      },
      {
        date: "Thu Oct 24 2024",
        venue: "The Fillmore",
        location: "San Francisco, CA",
        ticketUrl: "#",
      },
      {
        date: "Sun Nov 03 2024",
        venue: "Fox Theater",
        location: "Oakland, CA",
        ticketUrl: "#",
      },
      {
        date: "Fri Nov 15 2024",
        venue: "The Warfield",
        location: "San Francisco, CA",
        ticketUrl: "#",
      }
    ];
  
    // Function to create music card
    function createMusicCard(data) {
      const musicSection = document.querySelector('.music-section');
      console.log("Music section:", musicSection);
      const musicCard = `
        <div class="music-card">
          <h2>${data.album}</h2>
          <h3>${data.song}</h3>
          <div class="music-player">
            ${data.embeddedPlayer}
          </div>
        </div>
      `;
      musicSection.innerHTML = musicCard;
    }
  
    // Function to create ticket purchase cards
    function createTicketCards(dataArray) {
      const ticketSection = document.querySelector('.tickets-section');
      console.log("Ticket section:", ticketSection);
      const ticketsHeader = `<h2 class="section-header">Shows</h2>`;
      const ticketCards = dataArray.map((data, index) => `
        <div class="ticket-card">
          <div class="ticket-header-row">
            <p class="label">Date</p>
            <p class="label">Venue</p>
            <p class="label">Location</p>
          </div>
          <div class="ticket-value-row">
            <p class="value">${data.date}</p>
            <p class="value">${data.venue}</p>
            <p class="value">${data.location}</p>
          </div>
          <a href="${data.ticketUrl}" class="buy-tickets-button">Buy Tickets</a>
        </div>
        ${index < dataArray.length - 1 ? '<div class="divider"></div>' : ''}
      `).join('');
      ticketSection.innerHTML = ticketsHeader + ticketCards;
    }
  
    createMusicCard(musicCardData);
    createTicketCards(ticketCardData);
  });
  