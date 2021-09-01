// console.log('client side javascript file is loaded !');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {

//     response.json().then((data) => {
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('.form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const errormsg = document.querySelector('errormsg')



weatherForm.addEventListener('submit', (event) => {

    event.preventDefault(); //prevent loading

    const location = search.value


    fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {

                if (data.error) {
                    errormsg.textContent = data.error;

                } else {
                    messageOne.textContent=data.forecast
                    messageTwo.textContent=data.location;
                    // console.log(data.address);
                    // console.log(data.forecast);
                }
            })
        })
})