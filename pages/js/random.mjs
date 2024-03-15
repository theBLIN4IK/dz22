function generateRandomUser() {
    const names = ['Андрей', 'Артём', 'Алексей']
    const countries = ['Россия', 'Украина', 'Беларусь']
  
    return {
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 85) + 1,
      country: countries[Math.floor(Math.random() * countries.length)]
    }
  }
 
  export default generateRandomUser