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
const commentatorForm = document.getElementById('commentator');


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
  
  //creating the like button and and make it increase the rating
  const likeButton = document.createElement('button');
// Create the update button to update the song details
const updateButton = document.createElement('button')
 
  const audio = document.createElement('audio');
  // Set the text and image content for the elements
  title.textContent = song.title;
  artist.textContent = `Artist: ${song.artist}`;
  description.textContent = `Description: ${song.description}`;
  rating.textContent = `Rating: ${song.rating}`;
  image.src = song.image;
  image.dataset.id = song.id; // Add the id to the img element

  //setting the text content of the like button
  likeButton.textContent = 'Like';
   // Add event listener to the image element to play the song
   image.addEventListener('click', () => {
    audio.src = song.audio;
    audio.controls = true;
    audio.autoplay = true;
    musicInfo.appendChild(audio);
  });
   // Add event listener to the like button to increase the song rating
   likeButton.addEventListener('click', (e) => {
    e.preventDefault
    // Increase the song rating by 1
    song.rating++;
    rating.textContent = `Rating: ${song.rating}`;  
})
  // Set the text content of the update button
  updateButton.textContent = 'Update';
// Add an event listener to the update button to update the song details
updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  const newTitle = prompt('Enter new title:', song.title);
  const newArtist = prompt('Enter new artist:', song.artist);
  const newDescription = prompt('Enter new description:', song.description);
  const newImage = prompt('Enter new image URL:', song.image);
  const newAudio = prompt('Enter new audio URL:', song.audio);
  
  // Update the song details using the PUT REQUEST
  fetch(`${url}/${song.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: newTitle,
      artist: newArtist,
      description: newDescription,
      image: newImage,
      audio: newAudio,
      rating: song.rating
    })
  })
  .then(response => response.json())
  .then(updatedSong => {
    // Show the updated song details
    title.textContent = updatedSong.title;
    artist.textContent = `Artist: ${updatedSong.artist}`;
    description.textContent = `Description: ${updatedSong.description}`;
    rating.textContent = `Rating: ${updatedSong.rating}`;
    image.src = updatedSong.image;
    audio.src = updatedSong.audio;
  })
});
  //adding event listener to the comment section
  const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();


  // Get the input values from the form
  const name = document.getElementById('namee').value;
  const comment = document.getElementById('commentt').value;
  // Create a new comment object
  const newComment = {
    name: name,
    comment: comment
  };
  // Send a POST request to add the new comment to the database
  fetch(`${url}/${song.id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  })
  .then(response => response.json())
  .then(comment => {
    // Display the new comment
    const commentList = document.getElementById('comment-list');
    const li = document.createElement('li');
    li.textContent = `${comment.name}: ${comment.comment}`;
    commentList.appendChild(li);

    // Clear the input fields
    document.getElementById('namee').value = '';
    document.getElementById('commentt').value = '';
  });
});

  

  


  // Add the elements to the music info and image containers
  musicInfo.appendChild(title);
  musicInfo.appendChild(artist);
  musicInfo.appendChild(description);
  musicInfo.appendChild(rating);
  imageContainer.appendChild(image);
  musicInfo.appendChild(likeButton);
   musicInfo.appendChild(updateButton)
}

 //delete song function that will enable the user to delete a song 

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
        throw new Error('Something is wrong');
      }
    })
    
}


//adding an event listener to the deletesongButton
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
  
//adding song concept starts here
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
  //adding the search button and functionality
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
 
 