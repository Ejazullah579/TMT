
$(document).ready(() => {
  stickyheader();
  $('#searchForm').keyup((e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=4b21e1dd08c122c8a4f1a23a8630f217&language=en-US&query='+ searchText+'&page=1&include_adult=false')
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      console.log(response);
      let output = '';
      let vall='';
      let indexx=0;
      $.each(movies, (index, movie) => {
        vall=movies[indexx];
        if(vall.poster_path==null){}
        else
        {
        output += `
          <li onclick="movieSelected('${vall.id}','movie')"  classs="list-group-item" id="list-itemm" >
          <img  src="https://image.tmdb.org/t/p/w500${vall.poster_path}" height="auto" width="100" class="img-thumbnail"
          />  <span class="text-muted"><h1>${vall.title}</h1></span></li>
          `;
          indexx++;}
      });
      if(output==''){
         output=`<li onclick="movieSelected('${vall.id}')"  
         classs="list-group-item" id="list-itemm" >No Data Available</li>`
      }
      $('#result').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
//////////////////////// Getting Movie details //////////////////////////////////
function movieSelected(id,type) {
  sessionStorage.setItem('movieId', id);
  sessionStorage.setItem('typething', type);
  window.location = 'movie.html';
  return false;
}
function movielistSelected(type,id) {
  localStorage.setItem('page_no',1);
  sessionStorage.setItem('type', type);
  sessionStorage.setItem('moviegenre', id);
  window.location = 'movie-list-genre.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  let type = sessionStorage.getItem('typething');
  axios.get('https://api.themoviedb.org/3/'+type+'/'+movieId+'?api_key=4b21e1dd08c122c8a4f1a23a8630f217&append_to_response=videos,images,credits')
    .then((response) => {
      console.log(response);
      let vall="";
      ///////////////////////////// Getting Genre //////////////////////////////////////
      let Genre_res=response.data.genres;
      let  Genre='';
      for (i = 0; i < Genre_res.length; i++){
        vall=Genre_res[i].name;
        Genre +=vall+", ";
      };
      //////////////////// Getting crew Images //////////////////////////
      let movie_crew=response.data.credits.cast;
      let movie_writers=response.data.credits.crew;
      let crew_images='';
      let actors='';
      let writers='';
      for(i=0;i<movie_writers.length;i++){
        if(movie_writers[i].department=="Writing"){
          writers+=movie_writers[i].name+",&nbsp&nbsp";
        }
      }
      for (i = 0; i < movie_crew.length; i++){
        if(i<4){
          if(movie_crew[i].name!=undefined){
          actors+=movie_crew[i].name+",&nbsp&nbsp";
        }}
        vall=movie_crew[i];
        if(vall.profile_path==null){}
        else{if(i<5){
        crew_images += `
          <li id="crew_images" classs="list-group-item" id="list-itemm">
          <img style="" src="https://image.tmdb.org/t/p/w500${vall.profile_path}"
           height="auto" width="198" class="img-thumbnail"></li>
          `;}}
      };
      ///////////////////////// Getting movie images /////////////////////////
      let movie_images=response.data.images.backdrops;
      let images="";
      let j=0;
      if(movie_images.length<=8){
          j=response.data.images.backdrops.length;}
      else{
        j=9;}
      for (i = 0; i < j; i++){
        vall=movie_images[i];
        images += `
          <li id="movie_images" style="display:inline;"  classs="list-group-item" id="list-itemm">
          <img src="https://image.tmdb.org/t/p/w500${vall.file_path}" 
          height="auto" width="345" class="img-thumbnail"></li>
          `;
      };
      /////////////////////////////////////////////////
      let movie = response.data;
      let m_name='';
      if(type=='movie'){
        m_name=movie.title;
      }
      else{
        if(m_name=movie.name==undefined){
          m_name=movie.original_name;
        }
        else{
          m_name=movie.name;
        }
      }
      let link='';
      if(movie.videos.results.length==0){
         link=`https://youtube.com/embed/XRcZ4Pw2t_8?autoplay=1`;}
      else{
      link=`https://youtube.com/embed/`+`${movie.videos.results[0].key}`+`?autoplay=1`;}
      let output = `
        <div style="padding-bottom:50px;padding-top:30px" class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-thumbnail">
            <div class="row">
              <div style="padding-bottom:20px;padding-top:15px;padding-left:16px;" class="well">
                <a id="btn_info" onclick="turnon('${link}')" class="btn-success">Trailar</a>
                <a id="btn_info" href="index.htm" class="btn-warning">Home</a>
              </div>
              </div>
          </div>
          <div class="col-md-8 col-xs-12 ">
            <h2 style="color:#F1C40F;padding-left:10px;font-size:35px;padding-bottom:10px;font-family: 'Times New Roman', Times, serif;">${m_name}</h2>
            <ul id="movie_details" class="list-group">
              <li id="movie_details_item" class="list-group-item"><strong>Genre: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </strong>${Genre}</li>
              <li id="movie_details_item" class="list-group-item"><strong>Released: &nbsp&nbsp </strong> ${movie.release_date}</li>
              <li id="movie_details_item" class="list-group-item"><strong>Rating: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </strong> ${movie.vote_average}</li>
              <li id="movie_details_item" class="list-group-item"><strong>Language: &nbsp </strong> ${movie.original_language}</li>
              <li id="movie_details_item" class="list-group-item"><strong>Writer: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </strong> ${writers}</li>
              <li id="movie_details_item" class="list-group-item"><strong>Actors: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </strong> ${actors}</li>             
            </ul>
            <div style="padding-top:20px" class="col-md-12.5">
              <h2 style="color:#F1C40F;font-size:35px;padding-bottom:10px;padding-left:10px;font-family: 'Times New Roman', Times, serif;">Description</h2>
              <ul id="movie_plot" class="list-group">
                <li style="line-height: 1.4;padding-bottom:10px;font-size:18px;" class="list-group-item"><strong></strong> ${movie.overview}</li>
              </ul>
            </div>
          </div>  
        </div>
      `;
      $('#crew').html(crew_images);
      $('#imagess').html(images);
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
function stickyheader(){
  var $header=$('header');
  var $sticky=$header.before($header.addClass("sticky"));
  var scrollFromTop=$(window).scrollTop();
  $("body").toggleClass("scroll",(scrollFromTop=0||scrollFromTop<80)); 

$(window).on("scroll",function(){

  var scrollFromTop=$(window).scrollTop();
  $("body").toggleClass("scroll",(scrollFromTop>500||scrollFromTop<40));
});
$('.menu li a[href^="#"]').on('click',function(e){
  e.preventDefault();
  var target=$(this.hash);
  if(target.length){
      $('html, body').stop().animate({
          scrollTop:target.offset().top-60
      },1000);
  }
});
}

