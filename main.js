import { Hotel } from "./Hotel.js"

const buttonList = document.querySelector('.hotel__list-button')
const buttonCreate = document.querySelector('.hotel__create-button')
const container = document.querySelector('.container')

let hotels = []


const getHotelInputs = () => {
  const visitors = Number(document.getElementById("hotel__visitors-input").value)
  const name = document.getElementById("hotel__name-input").value
  const rooms = Number(document.getElementById("hotel__rooms-input").value)
  return { visitors, name, rooms }
}


const renderCreateForm = () => {
  container.innerHTML = `
    <div class="row mb-3">
      <h1 class="text-center">Додати готель</h1>
    </div>
    <div class="row">
      <div class="col-md-4">
        <form id="hotel_form" class="bg-light p-3 rounded">
          <h3 class="mb-3">Create</h3>
          <div class="mb-3">
            <label class="form-label">Кількість відвідувачів на рік:</label>
            <input type="number" class="form-control" id="hotel__visitors-input" />
          </div>
          <div class="mb-3">
            <label class="form-label">Назва Готелю:</label>
            <input type="text" class="form-control" id="hotel__name-input" />
          </div>
          <div class="mb-3">
            <label class="form-label">Кількість номерів:</label>
            <input type="number" class="form-control" id="hotel__rooms-input" />
          </div>
          <button id="hotel__submit-button" type="button" class="btn btn-primary w-100">Зберегти</button>
        </form>
      </div>
    </div>
  `

  const submitButton = document.getElementById('hotel__submit-button')
  submitButton.addEventListener('click', () => {
    const { visitors, name, rooms } = getHotelInputs()
    if (!visitors || !name || !rooms) {
      alert("Будь ласка, заповніть усі поля!")
      return
    }
    if (visitors < 0) {
        alert("Кількість відвідувачів не може бути відємна")
        return
    }
    if (rooms <= 0) {
        alert("Кількість кімнат не може бути менша за 0")
        return
    }

    const newHotel = new Hotel(visitors, name, rooms)
    hotels.push(newHotel)
    renderHotelList()
    buttonList.classList.add('active')
    buttonCreate.classList.remove('active')
  })
}


const renderHotelList = () => {
  container.innerHTML = `
    <div class="col-md-8 d-flex justify-content-center">
      <div id="hotel__wrapper" class="p-4 w-100"></div>
    </div>
  `

  const wrapper = document.getElementById('hotel__wrapper')

  if (hotels.length === 0) {
    wrapper.innerHTML = `
        <p class="text-center text-muted my-5">Список порожній...</p>
        `
    return
  }

  hotels.forEach((hotel, idx) => {
    wrapper.insertAdjacentHTML('beforeend', `
      <div class="hotel__item border rounded p-3 mb-3">
        <p><strong>Готель №${idx + 1}</strong></p>
        <p>Назва: ${hotel.name}</p>
        <p>Номери: ${hotel.rooms}</p>
        <p>Відвідувачів: ${hotel.visitors}</p>
        <button class="btn btn-sm btn-outline-secondary edit-btn" data-index="${idx}">Редагувати</button>
      </div>
    `)
  })


  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index
      renderEditForm(idx)
    })
  })
}


const renderEditForm = (index) => {
  const hotel = hotels[index]
  container.innerHTML = `
    <div class="row mb-3">
      <h1 class="text-center">Редагувати готель</h1>
    </div>
    <div class="row">
      <div class="col-md-4">
        <form id="edit_form" class="bg-light p-3 rounded">
          <h3 class="mb-3">Edit</h3>
          <div class="mb-3">
            <label class="form-label">Кількість відвідувачів:</label>
            <input type="number" class="form-control" id="hotel__visitors-input" value="${hotel.visitors}" />
          </div>
          <div class="mb-3">
            <label class="form-label">Назва:</label>
            <input type="text" class="form-control" id="hotel__name-input" value="${hotel.name}" />
          </div>
          <div class="mb-3">
            <label class="form-label">Кількість номерів:</label>
            <input type="number" class="form-control" id="hotel__rooms-input" value="${hotel.rooms}" />
          </div>
          <button id="hotel__edit-save" type="button" class="btn btn-success w-100">Зберегти зміни</button>
        </form>
      </div>
    </div>
  `

  document.getElementById('hotel__edit-save').addEventListener('click', () => {
    const { visitors, name, rooms } = getHotelInputs()
    hotels[index] = new Hotel(visitors, name, rooms)
    renderHotelList()
  })
}


buttonList.addEventListener('click', () => {
  buttonList.classList.add('active')
  buttonCreate.classList.remove('active')
  renderHotelList()
})

buttonCreate.addEventListener('click', () => {
  buttonCreate.classList.add('active')
  buttonList.classList.remove('active')
  renderCreateForm()
})
