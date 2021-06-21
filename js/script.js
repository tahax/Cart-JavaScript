let shopArray = [
    {img: 'images/js.jpg', title: 'جاوا اسکریپت', price: '1،800،000'},
    {img: 'images/practical-laravel.jpg', title: 'لاراول', price: '1،000،000'},
    {img: 'images/ui-1.jpg', title: 'رابط کاربری', price: '100،000'},
    {img: 'images/php.jpg', title: 'پی اچ پی', price: '1،200،000'},
];
let emptyArray = [];
let shopDiv = document.querySelector('.shop-div');
let buyDiv = document.querySelector('.sabadkharid-parent');
let deleteAllBtn = document.querySelector('.delete-all');

//run the first functions
runTheFunctions();

function runTheFunctions() {

    // //creat the empty array for mozila and ...
    if (getArrayFromLocalStorage() === null){
        setArrayToLocalStorage(emptyArray);
    }

    // create the shop carts
    createShopCarts();

    //load the localStorage and create the buyList
    loadTheLocalStorage();

    //add event listener to button delete all
    deleteAllBtn.addEventListener('click', deleteAllFunction);
}


// create the shop carts

function createShopCarts() {
    shopArray.forEach((element) => {

        //create the div with col classname responsive
        let colDivShop = document.createElement('div');
        colDivShop.className = 'col-12 col-md-6 col-lg-6';
        shopDiv.appendChild(colDivShop);

        //create the inner div with tak-mahsol classname
        let takMahsolDiv = document.createElement('div');
        takMahsolDiv.className = 'tak-mahsol';
        colDivShop.appendChild(takMahsolDiv);

        //create the inner div with tak-mahsol-inner classname
        let takMahsolInnerDiv = document.createElement('div');
        takMahsolInnerDiv.className = 'tak-mahsol-inner';
        takMahsolDiv.appendChild(takMahsolInnerDiv);

        //create the inner img with tak-mahsol-img classname
        let boxImg = document.createElement('img');
        boxImg.className = 'tak-mahsol-img';
        boxImg.setAttribute('src', element.img)
        takMahsolInnerDiv.appendChild(boxImg);

        //create span title of boxes
        let titleSpan = document.createElement('span');
        titleSpan.className = 'tak-mahsol-title tak-iranyekan-bold';
        titleSpan.textContent = element.title;
        takMahsolInnerDiv.appendChild(titleSpan);

        //create span price of boxes
        let priceSpan = document.createElement('span');
        priceSpan.className = 'tak-mahsol-gheymat';
        priceSpan.textContent = element.price;
        takMahsolInnerDiv.appendChild(priceSpan);

        //create button of boxes
        let buyBtn = document.createElement('button');
        buyBtn.className = 'tak-mahsol-btn tak-iranyekan-bold';
        buyBtn.textContent = 'خرید';
        buyBtn.addEventListener('click', buyButton)
        takMahsolInnerDiv.appendChild(buyBtn);
    })
}

//set the localStorage
function setArrayToLocalStorage(letArray) {
    let arrayLS = JSON.stringify(letArray);
    localStorage.setItem('buyList', arrayLS);
}

//get the localStorage
function getArrayFromLocalStorage() {
    let getArrayLs = localStorage.getItem('buyList');
    return JSON.parse(getArrayLs);
}

//load the localStorage
function loadTheLocalStorage() {
    let array = getArrayFromLocalStorage();
    array.forEach((element) => {
        createTheShopBox(element.img, element.title, element.price)
    })
}

// buy button function
function buyButton() {

    let zamen = true;

    let newArray = getArrayFromLocalStorage();
    newArray.forEach((elm) => {
        if (this.parentElement.children[1].textContent === elm.title) {
            zamen = false;
        }
    })

    shopArray.forEach((element, index) => {
        if (this.parentElement.children[1].textContent === element.title && zamen) {
            let array = getArrayFromLocalStorage();
            array.push(shopArray[index]);
            createTheShopBox(element.img, element.title, element.price);
            setArrayToLocalStorage(array);
        }
    })
}

//create the shop box for sabadkharid
function createTheShopBox(img, title, price) {

    //create the box of buy element
    let mahsolSabadDiv = document.createElement('div');
    mahsolSabadDiv.className = 'mahsol-sabad';
    buyDiv.appendChild(mahsolSabadDiv);
    setTimeout(() => {
        mahsolSabadDiv.classList.add('tak-yes-or-no-opacity');
    }, 10)

    ///create the img of buy element
    let imgMahsolSabad = document.createElement('img');
    imgMahsolSabad.className = 'tak-img-sabad';
    imgMahsolSabad.setAttribute('src', img);
    mahsolSabadDiv.appendChild(imgMahsolSabad);

    ///create div of details
    let detailDiv = document.createElement('div');
    detailDiv.className = 'etelate-sabad';
    mahsolSabadDiv.appendChild(detailDiv);

    ////create the title of details
    let detailsTitle = document.createElement('span');
    detailsTitle.className = 'tak-sabad-title tak-iranyekan-bold';
    detailsTitle.textContent = title;
    detailDiv.appendChild(detailsTitle);

    ////create the price of details
    let detailsPrice = document.createElement('span');
    detailsPrice.className = 'tak-sabad-gheymat';
    detailsPrice.textContent = price;
    detailDiv.appendChild(detailsPrice);


    ///create the delete icon
    let deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', 'images/trash.png')
    deleteIcon.className = 'tak-delete-icon';
    mahsolSabadDiv.appendChild(deleteIcon);
    deleteIcon.addEventListener('click', deleteTheBuyElement)


}

// delete the buy element function
function deleteTheBuyElement() {

    let mahsolSabadDiv = this.parentElement;

    //create the vote yes or no
    let voteDiv = document.createElement('div');
    voteDiv.className = 'tak-yes-or-no';
    mahsolSabadDiv.appendChild(voteDiv);
    setTimeout(() => {
        voteDiv.classList.add('tak-yes-or-no-opacity');
    }, 10);


    /// create the yes vote
    let yesVoteIcon = document.createElement('img');
    yesVoteIcon.setAttribute('src', 'images/yes.svg');
    yesVoteIcon.className = 'tak-vote-yes';
    voteDiv.appendChild(yesVoteIcon);
    yesVoteIcon.addEventListener('click', yesVoteFunc);

    /// create the no vote
    let noVoteIcon = document.createElement('img');
    noVoteIcon.setAttribute('src', 'images/no.svg');
    noVoteIcon.className = 'tak-vote-no';
    voteDiv.appendChild(noVoteIcon);
    noVoteIcon.addEventListener('click', noVoteFunc);
}

// click on yes vote
function yesVoteFunc() {
    let array = getArrayFromLocalStorage();
    array.forEach((element, index) => {
        if (element.title === this.parentElement.parentElement.children[1].children[0].textContent) {
            this.parentElement.parentElement.classList.add('tak-yes-or-no-opacity-close');
            array.splice(index, 1);
            setArrayToLocalStorage(array);
            setTimeout(() => {
                this.parentElement.parentElement.remove();
            }, 300)
        }
    })
}

// click on no vote
function noVoteFunc() {
    this.parentElement.classList.add('tak-yes-or-no-opacity-close');
    setTimeout(() => {
        this.parentElement.remove();
    }, 300)
}

function deleteAllFunction() {
    let array = getArrayFromLocalStorage();
    array.splice(0, array.length);
    document.querySelectorAll('.mahsol-sabad').forEach((e) => {
        e.classList.add('tak-yes-or-no-opacity-close');
        setTimeout(()=>{
            e.remove();
        },300)
    });
    setArrayToLocalStorage(array);
}