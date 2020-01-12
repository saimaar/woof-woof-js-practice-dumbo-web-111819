//ELEMENTS
const divDogBar = document.querySelector("#dog-bar");
const divDogInfo = document.querySelector("#dog-info")
console.log(divDogInfo);
// const span = document.createElement("span")
// span.innerText = "pup's name"
// divDogBar.append(span)


//GET to the server
fetch(`http://localhost:3000/pups`)
.then((resp) => {
  return resp.json()
})
.then((pupArray) => {
  console.log(pupArray);
  renderAllpups(pupArray)

})

//DOM Manipulation create ELEMENTS
function displayPup(pup){

  let span = document.createElement("span")
  span.innerText = pup.name
  divDogBar.append(span)
//--------------------------------------------
  span.addEventListener("click", (evt) => {
    let imageTag = document.createElement("img")
      imageTag.src = pup.image
    let h2 = document.createElement("h2")
      h2.innerText = pup.name
    let button = document.createElement("button")
    button.innerText = pup.isGoodDog ? "Good Dog": "Bad Dog";
      button.addEventListener("click", (evt) => {dogButton(evt, pup.id) })
      divDogInfo.innerHTML = ""
      divDogInfo.append(imageTag, h2, button)

  })

}//end

function dogButton(evt, pupId){
fetch(`http://localhost:3000/pups/${pupId}`,{
  method: "PATCH",
  headers: {
     'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    isGoodDog: evt.target.innerText === "Good Dog" ? false : true,
  })
})
.then((resp) => {
  return resp.json()
})
.then( (dogObj) => {
  evt.target.innerText = dogObj.isGoodDog ? "Good Dog": "Bad Dog";
}
)}





//READ
function renderAllpups(pupArray){
  pupArray.forEach((pup) => {
      displayPup(pup)
  })
}



// let imageTag = document.createElement("img")
//   imageTag.src = pup.image
// let h2 = document.createElement("h2")
//   h2.innerText = pup.name
// let button = document.createElement("button")
//   button.innerContent = pup.isGoodDog
//
//   divDogInfo.append(imageTag, h2, button)
//   console.log(divDogInfo);
