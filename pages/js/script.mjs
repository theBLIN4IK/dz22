const button1 = document.querySelector('.but3')
const button2 = document.querySelector('.but2')
const button3 = document.querySelector('.but1')
const button4 = document.querySelector('.change')
// see
const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const content = document.querySelector('.content')

button2.addEventListener('click', async (e) => {
    e.preventDefault()  
    try {
        const notes = await getData('http://localhost:3006/getData')
        content.innerHTML = ''
        notes.reverse().forEach(note => {
              content.insertAdjacentHTML('beforeend',
               `<li class="note">${note.text.name}, ${note.text.age}, ${note.text.country}
                </li>
                `)
          })
        //удаление задач
    } catch (err) {
		console.error(err)
	}
})
//add 
const postData = (url, data) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
button1.addEventListener('click', async (e) => {
    e.preventDefault()
    const name = prompt("Введите имя")
    const age = +prompt("Введите возраст")
    const country = prompt("Введите страну")

    if(name && age && country) {
        try {
            const response = await postData('http://localhost:3006/addData', {
                text: {
                   name: name,
                  age: age,
                  country: country
                }
            })
            console.log(response, 'данные успешно добавлены')
        } catch (error) {
            console.error(error)
        }
    } else {
        alert("говно переделывай")
    }
})


import generateRandomUser from "./random.mjs"
//создвние масива - щстальное в random.mjs
button3.addEventListener('click', async (e) => {
    e.preventDefault()
  generateRandomUser()
  let random = generateRandomUser()
  if(random) {
      try {
          const response = await postData('http://localhost:3006/addData', {
              text: random
          })
          console.log(response, 'данные успешно добавлены')
      } catch (error) {
          console.error(error)
      }
  } else {
      alert("хз что то пошло не так")
  }
})
////change -- не вышло
//const changeData = (url, data) => {
//	return new Promise((resolve, reject) =>
//		fetch(url, {
//			method: 'PATCH',
//			body: JSON.stringify(data),
//			headers: { 'Content-type': 'application/json; charset=UTF-8' }
//		})
//			.then(response => response.json())
//			.then(json => resolve(json))
//			.catch(error => reject(error))
//	)
//}
//content.addEventListener('click', async (e) => {
//    
//    if (e.target && e.target.className === 'change') {
//        e.preventDefault();
//        let name = prompt("Введите имя")
//        const response = await changeData('http://localhost:3006/patchData', {
//            
//            text: {
//                name: name
//                
//            }
//        })
//    }
//})
