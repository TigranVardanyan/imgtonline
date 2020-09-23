/*
scripts
 */
let dropArea = document.getElementById('dragDrop');
let input =  document.getElementById('input');

dropArea.addEventListener('dragover',(e) => {
  e.preventDefault();
  dropArea.innerHTML = `<span>Drop image here to upload</span>`;
  dropArea.classList.remove('invalidDrop');
  dropArea.classList.remove('done');
  dropArea.classList.add('dragDropHover');

});

dropArea.addEventListener('dragleave',(e) => {
  e.preventDefault();
  dropArea.classList.remove('dragDropHover');
  dropArea.classList.remove('done');
});

dropArea.addEventListener('drop', (e)=>{
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const formatRegexp = /([^\s]+(\.(jpg|jpeg|png|gif|bmp|tiff|webp|heif))$)/;
  if (!formatRegexp.test(file.name)) {
    dropArea.innerText = "Invalid image format. Please drop valid file";
    dropArea.classList.add('invalidDrop');
    dropArea.classList.remove('dragDropHover');
    dropArea.classList.remove('done');
  } else {
    return uploadeImage(file);
  }
});

function uploadeImage(file) {
  dropArea.innerHTML = `<button id="btn" class="btn btn-success">Upload file</button>
                        <p>${file.name}</p>`;
  $('#btn').click(()=> {
    var form_data = new FormData();
    form_data.append('file', file);
    $.ajax({
      url: 'ajax/generateFile.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(php_script_response){
        dropArea.classList.add('done');
        php_script_response = JSON.parse(php_script_response); // Be sure to convert JSON to an object !!
        function copyClip(){
          console.log(php_script_response.path)
          navigator.clipboard.writeText(decodeURI(php_script_response.path));
        }
        dropArea.innerHTML = `<button id="btn" class="btn btn-success" onclick="copyClip('${encodeURI(php_script_response.path)}')">Press to copy link</button>
                              <a id="link" class="link" href="${php_script_response.path}">${php_script_response.file_name}</a>`;
      },
      error: function(php_script_response) {
        alert(php_script_response);
      }
    });
  })
}

function copyClip(text){
  try {
    navigator.clipboard.writeText(decodeURI(text));
    let btn = document.getElementById("btn");
    btn.innerText = "Copied!";
    btn.classList.remove('btn-success');
    btn.classList.add('btn-primary');
  }
  catch (e) {
    console.log(e)
  }
}