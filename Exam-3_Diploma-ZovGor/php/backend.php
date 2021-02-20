<?php
include 'connection.php';

$email = $_POST["email"];
$pattern = [
    'email' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
];

/*
Validate input values
@param $name
@param $value
@return int
*/

function checkRegExp($name, $value)
{
    global $pattern;
    return preg_match($pattern[$name], $value);
}

if (!checkRegExp('email', $email)) {
    $response['error']['email'] = 'Invalid email';
}

if (!$response['error']) {
    $userInfoSql = "INSERT INTO `reviews` (`email`)
                VALUES ('$email')";
    mysqli_query($connect, $userInfoSql);
}
$response["success"] = true;

echo json_encode($response);
