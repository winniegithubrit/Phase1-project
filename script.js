//gave the link a name 'url' for easy navigation
  const url = 'http://localhost:3000/songs';
const songList = document.getElementById('songs');
const musicContainer = document.querySelector('.music-info-and-image-container');
const musicInfo = document.querySelector('.music-info');
const imageContainer = document.querySelector('.image-container');
const addSongButton = document.getElementById('btn');
const deleteSongButton = document.getElementById('btn2');
const searchBar = document.getElementById('search')
const searchButton = document.getElementById('btn3')
function showSongDetails(song) {
  // Clear the music info and image containers
  musicInfo.innerHTML = '';
  imageContainer.innerHTML = '';

  // Create elements to display the song details
  const title = document.createElement('h2');
  const artist = document.createElement('p');
  const description = document.createElement('p');
  const rating = document.createElement('p');
  const image = document.createElement('img');
  const commentButton = document.createElement('button');
  const audio = document.createElement('audio');
  // Set the text and image content for the elements
  title.textContent = song.title;
  artist.textContent = `Artist: ${song.artist}`;
  description.textContent = `Description: ${song.description}`;
  rating.textContent = `Rating: ${song.rating}`;
  image.src = song.image;
  image.dataset.id = song.id; // Add the id to the img element
  commentButton.textContent = 'Comment';
 

   // Add event listeners to the buttons
   commentButton.addEventListener('click', () => {
    // Code to handle comment button click
    console.log('Comment button clicked');
  });

   // Add event listener to the image element to play the song
   image.addEventListener('click', () => {
    audio.src = song.audio;
    audio.controls = true;
    audio.autoplay = true;
    musicInfo.appendChild(audio);
  });
  


  // Add the elements to the music info and image containers
  musicInfo.appendChild(title);
  musicInfo.appendChild(artist);
  musicInfo.appendChild(description);
  musicInfo.appendChild(rating);
  imageContainer.appendChild(image);
  musicInfo.appendChild(commentButton);
  
}

function deleteSong() {
  // Get the selected song id
  const selectedSongId = musicContainer.querySelector('img').dataset.id;

  // Send a DELETE request to the server to delete the song
  fetch(`${url}/${selectedSongId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Remove the song from the playlist and the db.json
        const selectedSong = document.querySelector(`li[data-id="${selectedSongId}"]`);
        selectedSong.remove();
        // Clear the music info and image containers
        musicInfo.innerHTML = '';
        imageContainer.innerHTML = '';
      } else {
        throw new Error('Something went wrong');
      }
    })
    
}



deleteSongButton.addEventListener('click', () => {
  //call the function for execution
  deleteSong();
});

// Fetch the song data from the server
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Loop through the songs and create a list item for each one
    data.forEach(song => {
      const li = document.createElement('li');
      li.textContent = song.title;
      li.dataset.id = song.id; // Add the id to the li element
      songList.appendChild(li);

      // Add a click event listener to the list item
      li.addEventListener('click', () => {
        showSongDetails(song);
      });
    });
  })
  

  function addSong(title, artist, description, rating, image,audio) {
    // Create an object with the new song data
    const newSong = {
      title: title,
      artist: artist,
      description: description,
      rating: rating,
      image: image,
      audio:audio
    };

  
    // Send a POST request to the server with the new song data
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSong)
    })
      .then(response => response.json())
      .then(data => {
        // Create a new list item with the song title and id
        const li = document.createElement('li');
        li.textContent = data.title;
        li.dataset.id = data.id;
        songList.appendChild(li);
  
        // Add a click event listener to the new list item
        li.addEventListener('onclick', () => {
          showSongDetails(data);
        });
      })
     
  }
  
  addSongButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const description = document.getElementById('description').value;
    const rating = document.getElementById('rating').value;
    const image = document.getElementById('image').value;
    const audio = document.getElementById('audio').value;
    addSong(title, artist, description, rating, image, audio);
  });
  //adding the search input
  searchButton.addEventListener('click', () => {
    const bar = searchBar.value.toLowerCase();
    const songs = songList.querySelectorAll('li');
  
    Array.from(songs).filter(song => {
      const title = song.textContent.toLowerCase();
      if (title.includes(bar)) {
        song.style.display = 'block';
      } else {
        song.style.display = 'none';
      }
    });
    
    searchBar.addEventListener('click', () => {
      Array.from(songs).forEach(song => {
        song.style.display = 'block';
      });
    });
  });
  //adding the like button and making it responsive
  /*const likeButtons = document.getElementById('btn4')
  musicInfo.appendChild(likeButtons);
  likeButtons.addEventListener('click', () => {
    const songId = song.id;
    const newRating = song.rating + 1;
    fetch(`${url}/${songId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating: newRating })
    })
    .then(response => response.json())
    .then(data => {
      rating.textContent = `Rating: ${data.rating}`;
      song.rating = data.rating;
    })
    .catch(error => console.log(error));
  });
  */
 
  


  
  
  
  
  

  
 