if (!localStorage.id || !localStorage.uuid) {
  location.replace('/login.html')
} else {
  // console.log('check')
  checkUser()
}

async function checkUser() {
  const resp = await fetch("/check_user", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: +localStorage.id,
      uuid: localStorage.uuid
    })
  })
  const data = await resp.json()
  // console.log(data.data)
  if (!data.data) {
    localStorage.removeItem('id')
    localStorage.removeItem('uuid')
    location.replace('/login.html')
  }
}