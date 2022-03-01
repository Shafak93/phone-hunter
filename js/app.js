//serach box data load
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
//Search result data
const displayPhone = phones =>{
    const phoneCardDiv = document.getElementById('phone-card');
    phoneCardDiv.textContent = ''
    if(phones.length == 0 ){
        const errorMessage = document.getElementById('no-search');
        errorMessage.innerHTML =`
        <h3 class="text-center text-danger"> No results found</h3>
        `
    }else{
        const errorMessage = document.getElementById('no-search');
        errorMessage.textContent = ''
        phones.forEach(phone =>{
            const div = document.createElement('div');
            div.classList.add('col');
        div.innerHTML = `
                <div class="h-100 card p-4 rounded">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p>${phone.brand}</p>
                      
                    </div>
                    <div class="card-footer text-center">
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                    </div>
                  </div>
        `
        phoneCardDiv.appendChild(div);
        })
    }
    
    

}
//Button details Data load
const loadPhoneDetails = slug =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))

}

//Button details card result
const displayPhoneDetails = details =>{
    const cardDetailDiv = document.getElementById('card-detail');
    cardDetailDiv.textContent =''
    const div = document.createElement('div');
    div.classList.add('row')
    const releaseDate = details.releaseDate == ''? 'No release date found' : details.releaseDate;
    const bluetooth = details.others == undefined ? 'no bluetooth info found' : details.others.Bluetooth
    div.innerHTML =`
                  <div class="col-md-3">
                    <img src="${details.image}" class="img-fluid rounded-center w-100" alt="...">
                    <div class='text-center text-md-center mt-3'>
                        <h5 class="card-title fw-bolder">${details.brand}</h5>
                        <h6 class="card-title fw-bolder">${details.name}</h6>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="card-body">
                      <dl class="row text-wrap">
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
                        <dd class="col-sm-9 text-wrap">${details.mainFeatures.sensors[0]},<br>
                        ${details.mainFeatures.sensors[1]}<br>
                        ${details.mainFeatures.sensors[2]}<br>
                        ${details.mainFeatures.sensors[3]}<br>
                        ${details.mainFeatures.sensors[4]}<br>
                        ${details.mainFeatures.sensors[5]}
                        </dd>
                        
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
    cardDetailDiv.appendChild(div);

}