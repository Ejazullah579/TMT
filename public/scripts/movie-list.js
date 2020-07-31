


//   action movie
  function getMovieslist(gen) {
  //////////////////////action movies/////////////////
  for(j=1;j<2;j++){
    let list = '';
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=4b21e1dd08c122c8a4f1a23a8630f217&with_genres='+gen+'&page='+j)
      .then((response) => {
        let movies = response.data.results;
        console.log(response);
        console.log(j);
        let indexx=0;
        $.each(movies, (index, movie) =>{
            list+=`
                <div class=" swiper-slide"><img id="list-img" 
                onclick="movieSelected('${movies[indexx].id}','movie')" 
                src="https://image.tmdb.org/t/p/w500${movies[indexx].poster_path}" 
                height="auto" width="150" class="img-thumbnail"></div>
            `;
            indexx++;
        })
        if(gen==28){
          $('#movie-list-action').append(list);}
        else if(gen==35){
          $('#movie-list-comedy').append(list);}
        else if(gen==16){
          $('#movie-list-animation').append(list);} 
        else if(gen==14){
          $('#movie-list-fantasy').append(list);} 
        else if(gen==12){
          $('#movie-list-adventure').append(list);}        
      })
      .catch((err) => {
        console.log(err);
      });
  }}