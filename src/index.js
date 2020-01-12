//Elements
const dogBarDiv = document.querySelector("#dog-bar");
const infoDiv = document.querySelector("#dog-info")

//---------------------------------------------------



fetch("http://localhost:3000/pups")
.then((resp) => {
  return resp.json()
})
.then((dogArray) => {
  renderDogs(dogArray)
})

function dogInfo(dog, span){
  const img = document.createElement("img");
  img.src = dog.image;
  const h2 = document.createElement("h2")
  h2.innerText = dog.name
  const button = document.createElement("button")
  button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
  infoDiv.innerHTML= ""
  infoDiv.append(img, h2, button)

  //-------------------------------------------//

  button.addEventListener("click", (evt) => {
     // if (evt.target.innerText === "Good Dog!"){
     //      evt.target.innerText = "Bad Dog!"
     //  } else if (evt.target.innerText === "Bad Dog!"){
     //    evt.target.innerText = "Good Dog!"
     //  }

      //===========update server ========================//

      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isGoodDog: evt.target.innerText === "Good Dog!" ? false : true
        })

      })
      .then((resp) => {
        return resp.json()
      })
      .then((dogObj) => {
        console.log(dogObj);
          evt.target.innerText = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
      })
  })

}//end of dogINFO

function displayOnDom(dog){
  const span = document.createElement("span")
  span.innerText = dog.name
  dogBarDiv.append(span)
  //--------------------------------------------
  span.addEventListener("click", (evt) => {
    dogInfo(dog, span)
  })
}// end of displayOnDom


function renderDogs(dogArray){
  dogArray.forEach((dog) => {
      displayOnDom(dog)
      // dogInfo(dog)
  })
}
