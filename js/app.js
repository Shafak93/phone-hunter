const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    searchField.value = ''
    
    if(searchText == ''){
        const noSearch = document.getElementById('no-search');
        noSearch.innerHTML = `
        <h3 class="text-center text-danger">Please write phone name to show results</h3>
        `
    }else{
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    }
    
}

const displayPhone = phones =>{
    console.log(phones);
    const phoneCardDiv = document.getElementById('phone-card');
    phoneCardDiv.textContent = ''
    
    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
    div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p>${phone.brand}</p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
              </div>
    `
    phoneCardDiv.appendChild(div);
    })

}
const loadPhoneDetails = slug =>{
    console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))

}


const displayPhoneDetails = details =>{
    console.log(details)
    const cardDetailDiv = document.getElementById('card-detail');
    const div = document.createElement('div');
    div.classList.add('row')
    const releaseDate = details.releaseDate == ''? 'No release date found' : details.releaseDate
    div.innerHTML =`
            
                  <div class="col-md-4">
                    <img src="${details.image}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${details.brand}</h5>
                      <h5 class="card-title">${details.name}</h5>
                    <h5>Release date:</h5>${releaseDate}
                    </div>
                  </div>
            
    `
    
    
  /*   `
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${details.name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    `; */
    cardDetailDiv.appendChild(div);

}