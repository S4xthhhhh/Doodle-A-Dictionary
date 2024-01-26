function btn_clicked(){
    const word =document.getElementById("input-search").value;
    document.getElementById("phonetic").textContent='';
    document.getElementById("POS").textContent='';
    document.getElementById("Meaning").textContent='';
    document.getElementById("Example").textContent="";
    document.getElementById("error").style.display="none"
    getMeaning(word)
}

async function getMeaning(word){
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let response = await data.json()
     if(response[0]?.meanings[0]?.partOfSpeech){
        document.getElementById("result").style.display="block";
        document.getElementById("input-word").textContent=word
        document.getElementById("phonetic").textContent=response[0].phonetic
        document.getElementById("POS").textContent=response[0].meanings[0].partOfSpeech
        document.getElementById("Meaning").textContent=response[0].meanings[0].definitions[0].definition
        document.getElementById("Example").textContent=response[0].meanings[0].definitions[0].example
    }else{
        document.getElementById("error").style.display="block"

document.getElementById("result").style.display="none";
    }
}
