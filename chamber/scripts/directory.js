//Directory Cards
const cards = document.querySelector("#cards");

async function getMemberData() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}
getMemberData();

const displayMembers = (members) => {
  members.forEach((member, index) => {
    let card = document.createElement("section");
    card.classList.add("card");

    let logo = document.createElement("img");
    let name = document.createElement("h2");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let website = document.createElement("a");
    let memberLevel = document.createElement("p");

    name.textContent = `${member.name}`;
    logo.setAttribute("src", member.imageurl);
    logo.setAttribute("alt", `Logo of ${member.name}`);
    logo.setAttribute("width", "300");
    logo.setAttribute("height", "auto");
    if (index !== 0) {
      logo.setAttribute("loading", "lazy");
    }
    address.textContent = `Address: ${member.address}`;
    phone.textContent = `Phone: ${member.phonenumber}`;
    website.textContent = `${member.website}`;
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    memberLevel.textContent = `Member Level: ${member.memlevel}`;

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(memberLevel);
    cards.appendChild(card);
  });
};

//Grid or List View
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const cardView = document.querySelector(".grid");

gridbutton.addEventListener("click", () => {
  cardView.classList.remove("list");
  cardView.classList.add("grid");
  updateCardView();
});

listbutton.addEventListener("click", showList);

function showList() {
  cardView.classList.remove("grid");
  cardView.classList.add("list");
  updateCardView();
}

function updateCardView() {
  const isListView = cardView.classList.contains("list");
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const logo = card.querySelector("img");
    const address = card.querySelector("p:nth-of-type(1)");
    const phone = card.querySelector("p:nth-of-type(2)");
    const name = card.querySelector("h2");
    const website = card.querySelector("a");
    const memberLevel = card.querySelector("p:nth-of-type(3)");

    if (isListView) {
      logo.style.display = "none";
      address.style.display = "none";
      phone.style.display = "none";
      name.style.display = "inline-block";
      website.style.display = "inline-block";
      memberLevel.style.display = "inline-block";
      name.style.marginRight = "10px";
      website.style.marginRight = "10px";
    } else {
      logo.style.display = "block";
      address.style.display = "block";
      phone.style.display = "block";
      name.style.display = "block";
      website.style.display = "block";
      memberLevel.style.display = "block";
      name.style.marginRight = "0";
      website.style.marginRight = "0";
    }
  });
}
