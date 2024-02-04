const { response } = require("express");

if (!localStorage.id || !localStorage.uuid) {
  location.replace("/login.html");
} else {
  // console.log('check')
  checkUser();
}

async function checkUser() {
  const resp = await fetch("/check_user", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: +localStorage.id,
      uuid: localStorage.uuid,
    }),
  });
  const data = await resp.json();
  // console.log(data.data)
  if (!data.data) {
    localStorage.removeItem("id");
    localStorage.removeItem("uuid");
    location.replace("/login.html");
  }
}

// Задача с загрузкой данных:
// Напишите функцию, которая использует fetch для загрузки данных с удаленного сервера. Используйте async/await для ожидания завершения запроса и try/catch для обработки возможных ошибок.
async function asYnc(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const data = await response.json();
    return date;
  } catch (error) {
    console.log("Произошла ошибка", error);
    return null;
  }
}
async function loadData(){
  const url = 'https://jsonplaceholder.typicode.com/posts/1'
  const data = await fetch(url)
  if(data){
    console.log('Загруженные данные', data)
  }
  else{
    console.log('Возникла какая то ошибка')
  }
}
loadData()

