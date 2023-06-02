document.getElementById('music-search-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const musicianInput = document.getElementById('musician-input').value;
  const genreInput = document.getElementById('genre-input').value;
  const yearInput = document.getElementById('year-input').value;

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(musicianInput)}&genre=${encodeURIComponent(genreInput)}&year=${encodeURIComponent(yearInput)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const musicList = document.getElementById('music-list');
      musicList.innerHTML = '';

      if (data.results.length > 0) {
        data.results.forEach(result => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span>${result.trackName}</span>
            <p>Artist: ${result.artistName}</p>
            <p>Album: ${result.collectionName}</p>
            <p>Genre: ${result.primaryGenreName}</p>
          `;
          musicList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No results found.';
        musicList.appendChild(listItem);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
});
