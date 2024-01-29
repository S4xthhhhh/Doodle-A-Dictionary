function btn_clicked() {
  const word = document.getElementById("input-search").value;
  document.getElementById("phonetic").textContent = "";
  document.getElementById("POS").textContent = "";
  document.getElementById("Meaning"). innerHTML = "";
  document.getElementById("Example"). innerHTML = "";
  document.getElementById("s-POS").textContent = "";
  document.getElementById("s-Meaning").innerHTML = "";
  document.getElementById("s-Example").innerHTML = "";
  getMeaning(word);
}

async function getMeaning(word) {
  let data = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  let response = await data.json();

  if (response[0]?.meanings[0]?.partOfSpeech) {
    document.getElementById("result").style.display = "block";
    document.getElementById("error").style.display = "none";
    document.getElementById("input-word").textContent = word;
    document.getElementById("phonetic").textContent = response[0].phonetic;
    document.getElementById("POS").textContent =
      response[0].meanings[0].partOfSpeech;
    document.getElementById("Example").textContent =
      response[0].meanings[0].definitions[0].example;

    const defArray = response[0].meanings[0].definitions;
    defArray.forEach((value) => {
      document
        .getElementById("Meaning")
        .insertAdjacentHTML("afterend", "<li>" + value.definition + "</li>");
    });
    const meaningArray = defArray.filter((value) => value.meanings);
    meaningArray.forEach((value) => {
      document
        .getElementById("Example")
        .insertAdjacentHTML("afterend", "<li>" + value.example + "</li>");
    });

    if (response[0]?.meanings[1]?.definitions[0]) {
      document.getElementById("s-POS").textContent =
        response[0].meanings[1].partOfSpeech;
      const defArraytwo = response[0].meanings[1].definitions;
      defArraytwo.forEach((value) => {
        document
          .getElementById("s-Meaning")
          .insertAdjacentHTML("afterend", "<li>" + value.definition + "</li>");
      });
      const meaningArraytwo = defArray.filter((value) => value.meanings);
      meaningArraytwo.forEach((value) => {
        document
          .getElementById("s-Example")
          .insertAdjacentHTML("afterend", "<li>" + value.example + "</li>");
      });
    }
  } else {
    document.getElementById("error").style.display = "block";
    document.getElementById("result").style.display = "none";
  }
}
