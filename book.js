const searchInput = document.getElementById('searchInput');
        const bookList = document.getElementById('bookList');
        const notFound = document.getElementById('notFound');

        async function fetchBooks(query) {
            bookList.innerHTML = '';
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.docs && data.docs.length > 0) {
                notFound.style.display = 'none';
                const results = data.docs.slice(0, 20);
                results.forEach(book => {
                    const title = book.title;
                    const author = book.author_name ? book.author_name[0] : 'Unknown';
                    const coverId = book.cover_i;
                    const link = `https://openlibrary.org${book.key}`;
                    const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/60x80?text=No+Cover';

                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="book-info">
                            <img src="${coverUrl}" alt="${title}">
                            <a href="${link}" target="_blank">${title} - ${author}</a>
                        </div>
                        <a class="download-button" href="${link}" target="_blank">Read</a>
                    `;
                    bookList.appendChild(li);
                });
            } else {
                notFound.style.display = 'block';
            }
        }

        searchInput.addEventListener('keyup', function(event) {
            const query = searchInput.value.trim();
            if (event.key === 'Enter' && query) {
                fetchBooks(query);
            }
        });

        // Initial load with default keyword
        fetchBooks("classics");