document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var url = '/getImages';
    var imageContainer = document.querySelector('#imageContainer');
    fetch(url)
      .then(res => res.json())
      .then((data) =>{
        let dataFeed = data.map((image) =>{
          return`
          <div class="col s12 m6 l3">
				    <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${image.path}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${image.title}<i class="material-icons right">expand_less</i></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${image.title}<i class="material-icons right">close</i></span>
                <p>${image.desc}</p>
              </div>
				    </div>
			    </div>
          `
        }).join('');
        imageContainer.innerHTML = dataFeed;
      });
  });