<?php

if ( 0 < $_FILES['file']['error'] ) {
  echo json_encode(array("err_code"=>$_FILES['file']['error']));
}
else {
  move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
  echo json_encode(array("path"=> getenv("SERVER_NAME") .'/catalog/imgtonline/'. $_SERVER['SCRIPT_NAME '] . "/uploads/" . $_FILES['file']['name'], "file_name" => $_FILES['file']['name']));
}