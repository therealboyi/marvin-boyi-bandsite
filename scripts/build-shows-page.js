document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '26032028-ded2-4965-b2ae-6996663fe119'; 
    const api = new BandSiteApi(apiKey);

    async function displayShows() {
        const shows = await api.getShows();
        const ticketCardData = shows.map(show => ({
            date: new Date(show.date).toDateString(),
            venue: show.place,
            location: show.location,
            ticketUrl: '#'
        }));
        createTicketCards(ticketCardData);
    }

    function createMusicCard(data) {
        const musicSection = document.querySelector('.music-section');
        const musicCard = document.createElement('div');
        musicCard.classList.add('music-card');

        const textContainer = document.createElement('div');
        textContainer.classList.add('music-card__text-container');

        const albumTitle = document.createElement('h3');
        albumTitle.classList.add('subheader');
        albumTitle.textContent = data.album;
        textContainer.appendChild(albumTitle);

        const songTitle = document.createElement('h1');
        songTitle.classList.add('page-header');
        songTitle.textContent = data.song;
        textContainer.appendChild(songTitle);

        const musicPlayer = document.createElement('div');
        musicPlayer.classList.add('music-card__player');
        musicPlayer.innerHTML = data.embeddedPlayer;

        musicCard.appendChild(textContainer);
        musicCard.appendChild(musicPlayer);

        musicSection.appendChild(musicCard);
    }

    function createTicketCards(dataArray) {
        const ticketSection = document.querySelector('.tickets-section');
        const ticketList = document.createElement('div');
        ticketList.classList.add('tickets__list');
        ticketSection.appendChild(ticketList);

        // Add header row with labels (only for desktop view)
        const headerRow = document.createElement('div');
        headerRow.classList.add('tickets__row', 'tickets__row--header');

        const dateHeader = document.createElement('p');
        dateHeader.classList.add('tickets__label');
        dateHeader.textContent = "Date";
        headerRow.appendChild(dateHeader);

        const venueHeader = document.createElement('p');
        venueHeader.classList.add('tickets__label');
        venueHeader.textContent = "Venue";
        headerRow.appendChild(venueHeader);

        const locationHeader = document.createElement('p');
        locationHeader.classList.add('tickets__label');
        locationHeader.textContent = "Location";
        headerRow.appendChild(locationHeader);

        // Add an empty p element to align with the button column
        const emptyHeader = document.createElement('p');
        emptyHeader.classList.add('tickets__label');
        headerRow.appendChild(emptyHeader);

        ticketList.appendChild(headerRow);

        dataArray.forEach((data, index) => {
            const ticketCard = document.createElement('div');
            ticketCard.classList.add('tickets__card');

            const dateLabel = document.createElement('p');
            dateLabel.classList.add('tickets__label', 'tickets__label--mobile');
            dateLabel.textContent = "Date";
            ticketCard.appendChild(dateLabel);
            const dateValue = document.createElement('p');
            dateValue.classList.add('tickets__value', 'tickets__date');
            dateValue.textContent = data.date;
            ticketCard.appendChild(dateValue);

            const venueLabel = document.createElement('p');
            venueLabel.classList.add('tickets__label', 'tickets__label--mobile');
            venueLabel.textContent = "Venue";
            ticketCard.appendChild(venueLabel);
            const venueValue = document.createElement('p');
            venueValue.classList.add('tickets__value');
            venueValue.textContent = data.venue;
            ticketCard.appendChild(venueValue);

            const locationLabel = document.createElement('p');
            locationLabel.classList.add('tickets__label', 'tickets__label--mobile');
            locationLabel.textContent = "Location";
            ticketCard.appendChild(locationLabel);
            const locationValue = document.createElement('p');
            locationValue.classList.add('tickets__value');
            locationValue.textContent = data.location;
            ticketCard.appendChild(locationValue);

            const buyTicketsButton = document.createElement('a');
            buyTicketsButton.classList.add('tickets__button');
            buyTicketsButton.href = data.ticketUrl;
            buyTicketsButton.textContent = "BUY TICKETS";
            ticketCard.appendChild(buyTicketsButton);

            ticketList.appendChild(ticketCard);

            if (index < dataArray.length - 1) {
                const divider = document.createElement('div');
                divider.classList.add('tickets__divider');
                ticketList.appendChild(divider);
            }
        });

        adjustCardPadding();
    }

    function adjustCardPadding() {
        const ticketCards = document.querySelectorAll('.tickets__card');
        ticketCards.forEach(card => {
            if (window.innerWidth > 1280) {
                card.classList.add('tickets__card--no-padding');
                card.classList.remove('tickets__card--large-padding');
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
                card.classList.add('tickets__card--large-padding');
                card.classList.remove('tickets__card--no-padding');
            }
        });
    }

    function adjustBuyButtonSize() {
        const buyButtons = document.querySelectorAll('.tickets__button');
        buyButtons.forEach(button => {
            if (window.innerWidth > 767) {
                button.classList.add('tickets__button--small-padding');
                button.classList.remove('tickets__button--large-padding');
            } else {
                button.classList.add('tickets__button--large-padding');
                button.classList.remove('tickets__button--small-padding');
            }
        });
    }

    function updateLayout() {
        const desktopHeader = document.querySelector('.desktop-section-title');
        const ticketSection = document.querySelector('.tickets-section');
        let wrapper = document.querySelector('.tickets-section-wrapper');

        if (window.innerWidth > 1280) {
            if (!desktopHeader) {
                const ticketsHeader = document.createElement('h2');
                ticketsHeader.classList.add('section__title', 'desktop-section-title');
                ticketsHeader.textContent = "Shows";

                if (!wrapper) {
                    wrapper = document.createElement('div');
                    wrapper.classList.add('tickets-section-wrapper');
                    ticketSection.parentNode.insertBefore(wrapper, ticketSection);
                    wrapper.appendChild(ticketsHeader);
                    wrapper.appendChild(ticketSection);
                } else {
                    wrapper.insertBefore(ticketsHeader, ticketSection);
                }
            }
        } else {
            if (desktopHeader) {
                desktopHeader.remove();
                if (wrapper) {
                    wrapper.replaceWith(...wrapper.childNodes);
                }
            }
        }

        // Adjust nav link underline for mobile
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            if (window.innerWidth <= 767) {
                link.style.setProperty('--underline-bottom', '-15px'); // Adjust this value as needed
            } else {
                link.style.removeProperty('--underline-bottom');
            }
        });

        updateNavLinkColors();
    }

    function updateNavLinkColors() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.style.color = link.classList.contains('nav__link--active') ? '#FFFFFF' : '#E1E1E1';
        });
    }

    function addHoverAndClickEvents() {
        const ticketCards = document.querySelectorAll('.tickets__card');
        const isMobile = window.innerWidth <= 767;

        ticketCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });

            if (!isMobile) {
                card.addEventListener('click', () => {
                    ticketCards.forEach(c => c.classList.remove('tickets__card--selected'));
                    card.classList.add('tickets__card--selected');
                });
            }
        });

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

    await displayShows();
    createMusicCard({
        album: "Beautiful Beasts Album",
        song: "Stripes of Yellow x For The Stings",
        artist: "MØ",
        songTitle: "Blur (feat. Foster The People)",
        embeddedPlayer: `
            <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/93264012&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false"></iframe>`
    });
    addHoverAndClickEvents();
    adjustBuyButtonSize();
    adjustCardPadding();
    updateLayout();

    window.addEventListener('resize', () => {
        adjustBuyButtonSize();
        adjustCardPadding();
        updateLayout();
    });
});
