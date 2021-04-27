const form = document.getElementById('form');
let fv= [];
form.addEventListener('submit', e => {
    $(".loader").css("visibility", "visible");
  e.preventDefault();
  const file = form.file.files[0];
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  fr.onload = f => {
    
    const url = "https://script.google.com/macros/s/AKfycbwRSBl0FrPA4GyDcit9ZxPTfiqhMxUc-wSpxxg2JLrzRFyvadfWWiE1Y1uGozpkG1G8/exec";  // <--- Please set the URL of Web Apps.
    
    const qs = new URLSearchParams({filename: form.filename.value || file.name, mimeType: file.type});
    fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
    .then(res => res.json())
    .then(e => fv=e)  // <--- You can retrieve the returned value here.
    .then(result => { alert('Image Uploaded Successfully', result);   $(".loader").css("visibility", "hidden"); })
    .catch(err => console.log(err));

  }
});
