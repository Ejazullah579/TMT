

///////////////////  Get page  /////////////////////
function pageupdate(id) {
  localStorage.setItem('page_no', id);
  console.log("yay baoi"+localStorage.getItem('page_no'));
  return false;
}
function nextbtn(){
  let val=parseInt(localStorage.getItem('page_no'))+2;
  localStorage.setItem('page_no',val);
  console.log("yay hai"+val);
}
function prevbtn(){
  let moviegen = sessionStorage.getItem('moviegenre');
  let val;
  if(parseInt(localStorage.getItem('page_no'))==1){
    val=1;}
  else{
    val=parseInt(localStorage.getItem('page_no')-2);}
  localStorage.setItem('page_no',val);
}

///////////////////  Get movies  /////////////////////
function getMovieslist(type,genre,page) {
  // console.log("yay boi"+page);
    let show_type=sessionStorage.getItem('show_type');
    let list='';
    var indexx=1;
    let val=parseInt(page);
    let con=parseInt(page)+2;
    // console.log("val="+val+" con="+con);
     if(type=='movie'){
      while(val<con){
        axios.get('https://api.themoviedb.org/3/discover/'+type+'?api_key=4b21e1dd08c122c8a4f1a23a8630f217&with_genres='+
        genre+'&page='+val)
          .then((response) => {
            let movies = response.data.results;
            console.log(response);
            console.log(indexx);
            let i=0;
            if(indexx==21){
                i=4;}
            for(;i<20;i++){
              if(movies[i].poster_path==null){}
              else
              {
                list+=`
                <img id="li-img" onclick="movieSelected('${movies[i].id}','movie')"  
                src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}"
                height="auto" width="149" class="img-thumbnail">
                `;
                indexx++;
            }}$('#list-itemmm').append(list);
          })
          .catch((err) => {
            console.log(err);
          });
          val++;
      }
     }
     else if(type=='tv'){
      while(val<con){
        axios.get('https://api.themoviedb.org/3/tv/'+show_type+'?api_key=4b21e1dd08c122c8a4f1a23a8630f217&language=en-US&page='+val)
          .then((response) => {
            let movies = response.data.results;
            console.log(response);
            console.log(indexx);
            let i=0;
            if(indexx==21){
                i=4;}
            for(;i<20;i++){
              if(movies[i].poster_path==null){}
              else
              {
                list+=`
                <img id="li-img" onclick="movieSelected('${movies[i].id}','tv')"  
                src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}"
                height="auto" width="149" class="img-thumbnail">
                `;
                indexx++;
            }}$('#list-itemmm').append(list);
          })
          .catch((err) => {
            console.log(err);
          });
          val++;
      }
     }  
  }

    function gettoplist(sec,cata) {
      // console.log("yay boi"+page);
        let list='';
        var indexx=1;
        // console.log("val="+val+" con="+con);
          axios.get('https://api.themoviedb.org/3/'+sec+'/'+cata+'?api_key=4b21e1dd08c122c8a4f1a23a8630f217&language=en-US&page=1')
            .then((response) => {
              let movies = response.data.results;
              console.log(response);
              console.log(indexx);
              let i=0;
              for(;i<7;i++){
                if(movies[i].poster_path==null){}
                else
                {
                  list+=`
                  <img id="li-img" onclick="movieSelected('${movies[i].id}','${sec}')"  
                  src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}"
                  height="auto" width="149" class="img-thumbnail">
                  `;
                  indexx++;
              }}
              if(sec=='tv'){
                $('#list-item3').append(list);
              }
              else if(cata=='now_playing'){
                $('#list-item1').append(list);
              }
              else if(cata=='top_rated'){
                $('#list-item2').append(list);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }