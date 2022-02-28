const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    searchField.value = ''

    if(searchText == ''){
        const noSearch = document.getElementById('no-search');
        noSearch.innerHTML = `
        <p class="text-center text-danger">Please write phone name to show results</p>
        `
    }else{
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
    }
    
}
searchPhone();

const displayPhone = phones =>{
    console.log(phones);
    const phoneCardDiv = document.getElementById('phone-card');
    
    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
    div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p>${phone.brand}</p>
                </div>
              </div>
    `
    phoneCardDiv.appendChild(div);
    })

}