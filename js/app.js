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
        .then(data => displayPhone(data.data.slice(0,20)))
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
            <div class="card p-4">
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
    cardDetailDiv.textContent =''
    const div = document.createElement('div');
    div.classList.add('row')
    const releaseDate = details.releaseDate == ''? 'No release date found' : details.releaseDate;
    const bluetooth = details.others == undefined ? 'no bluetooth info found' : details.others.Bluetooth
     /* const mainFeature =para =>{
        for(const features in para){
            `${features} += ${para[features]}`
        }
     }  */
    div.innerHTML =`
                  <div class="col-md-3">
                    <img src="${details.image}" class="img-fluid rounded-center w-100" alt="...">
                  </div>
                  <div class="col-md-9">
                    <div class="card-body">
                      <h5 class="card-title fw-bolder">${details.brand}</h5>
                      <h6 class="card-title fw-bolder">${details.name}</h6>
                      <dl class="row">
                        <dt class="col-sm-3">
                        Release date</dt>
                        <dd class="col-sm-9">${releaseDate}</dd>
                        
                        <dt class="col-sm-3">storage</dt>
                        <dd class="col-sm-9">
                        ${details.mainFeatures.storage}
                        </dd>
                        
                        <dt class="col-sm-3">displaySize</dt>
                        <dd class="col-sm-9">${details.mainFeatures.displaySize}</dd>
                        
                        <dt class="col-sm-3 text-truncate">chipSet</dt>
                        <dd class="col-sm-9">${details.mainFeatures.chipSet}</dd>
                        
                        <dt class="col-sm-3 text-truncate">memory</dt>
                        <dd class="col-sm-9">${details.mainFeatures.memory}</dd>
                        
                        <dt class="col-sm-3 text-truncate">sensors</dt>
                        <dd class="col-sm-9">${details.mainFeatures.sensors}</dd>
                        
                        <dt class="col-sm-3 text-truncate">Bluetooth</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no bluetooth info found' : details.others.Bluetooth}</dd>
                        
                        <dt class="col-sm-3 text-truncate">GPS</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no GPS info found' : details.others.GPS}</dd>
                        
                        <dt class="col-sm-3 text-truncate">NFC</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no NFC info found' : details.others.NFC}</dd>
                        
                        <dt class="col-sm-3 text-truncate">Radio</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no Radio info found' : details.others.Radio}</dd>
                        
                        <dt class="col-sm-3 text-truncate">USB</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no USB info found' : details.others.USB}</dd>
                        
                        <dt class="col-sm-3 text-truncate">WLAN</dt>
                        <dd class="col-sm-9">${details.others == undefined ? 'no WLAN info found' : details.others.WLAN}</dd>
                    
                    
                        </dl>
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