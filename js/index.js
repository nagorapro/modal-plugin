/*
  --------------------------------------------
  1. Dynamically display auto cards +
  2. When you click on "Price", show a modal
     window with price +
  3. When you click on "Delete", show a modal
     window with confirmation +
  --------------------------------------------
  4. Create a new plugin based on $.modal
     $.confirm (Promise) +
  --------------------------------------------
*/

let cars = [
  {
    id: 1,
    title: 'Mersedes',
    text: 'Mersedes perfectly combines acceleration and handling.',
    price: '$100,000',
    img: 'https://images.unsplash.com/photo-1608216601876-f3623092e9ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Lamborgini',
    text: 'Lamborgini perfectly combines acceleration and handling.',
    price: '$200,000',
    img: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Ferrari',
    text: 'Ferrari perfectly combines acceleration and handling.',
    price: '$300,000',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
]

/*
  <div class="mb-3 col-sm-6 col-md-4">
    <div class="card">
      <img class="card-img-top mh-140" src="..." alt="image">
      <div class="card-body">
        <h5 class="card-title">...</h5>
        <p class="card-text">...</p>
        <button class="btn btn-primary btn-modal">Price</button>
        <button class="btn btn-secondary btn-modal">Delete</button>
      </div>
    </div>
  </div>
*/

const toHTML = card => `
  <div class="mb-3 col-sm-6 col-md-4">
    <div class="card">
      <img class="card-img-top mh-140" src="${card.img}"
        alt="${card.title}">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <p class="card-text">${card.text}</p>
        <button class="btn btn-primary"
          data-btn="price" data-id="${card.id}">Price</button>
        <button class="btn btn-secondary"
          data-btn="remove" data-id="${card.id}">Delete</button>
      </div>
    </div>
  </div>
`

function render() {
  const html = cars.map(toHTML).join('')
  document.querySelector('#cars').innerHTML = html
}
render()

const modal = $.modal({
  title: 'Price',
  closeble: true,
  content: ``,
  width: '60%',
  buttons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        modal.close()
      }
    },
    {
      text: 'Cancel',
      type: 'secondary',
      handler() {
        modal.close()
      }
    }
  ]
})

document.addEventListener('click', event => {
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const car = cars.find(i => i.id === id)

  if (btnType === 'price') {
    modal.setContent(`
      <div class="row">
        <div class="col-md-4">
          <img src="${car.img}" class="mb-4 img-fluid rounded-start"
            alt="${car.title}">
        </div>
        <div class="col-md-8">
          <h3>${car.title}</h3>
          <p>The cost of this model ${car.title} is ${car.price}</p>
        </div>
      </div>
    `)
    modal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `
        <div class="row">
          <div class="col-md-4">
            <img src="${car.img}" class="mb-4 img-fluid rounded-start"
              alt="${car.title}">
          </div>
          <div class="col-md-8">
            <h3>${car.title}</h3>
            <p>To delete this model ${car.title} press delete.</p>
          </div>
        </div>
      `
    })
      .then(() => {
        cars = cars.filter(i => i.id !== id)
        render()
      })
    // .catch(() => { console.log('Cancel') })
  }
})