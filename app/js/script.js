/*
scripts
 */
let dropArea = document.getElementById('dragDrop');
let input =  document.getElementById('input');
// dropArea.addEventListener('dragenter', handlerFunction, false)
// dropArea.addEventListener('dragleave', handlerFunction, false)
// dropArea.addEventListener('dragover', handlerFunction, false)

dropArea.addEventListener('dragover',(e) => {
  e.preventDefault();
  dropArea.innerHTML = `<span>Drop image here to upload</span>`;
  dropArea.classList.remove('invalidDrop');
  dropArea.classList.add('dragDropHover');

});

dropArea.addEventListener('dragleave',(e) => {
  e.preventDefault();
  dropArea.classList.remove('dragDropHover');
});

dropArea.addEventListener('drop', (e)=>{
  e.preventDefault();
  console.log(e)
  const file = e.dataTransfer.files[0];
  const formatRegexp = /([^\s]+(\.(jpg|png|gif|bmp))$)/;
  if (!formatRegexp.test(file.name)) {
    dropArea.innerText = "Invalid image format. Please drop valid file";
    dropArea.classList.add('invalidDrop');
    dropArea.classList.remove('dragDropHover')
  } else {
    return uploadeImage(file);
  }
});

function uploadeImage(file) {
  dropArea.innerHTML = `<button id="btn" class="btn btn-success">Drop image here to upload</button>`;
  console.log(file);

  $('#btn').click(()=> {
    var form_data = new FormData();
    form_data.append('file', file);
    alert(form_data);  //Выводим инфо по файлам которые будут отправлены на сервер
    $.ajax({
      url: 'ajax/save-photo.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(php_script_response){
        alert(php_script_response); //  Выводим ответ от сервера
      }
    });
  })
}

