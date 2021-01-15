// =============== API ============== //

fetch('http://localhost:3000/api/cameras')
  .then(res => {
    if(res.ok) {
      res.json().then(data => {
        console.log(data)
      })
    }
  })




