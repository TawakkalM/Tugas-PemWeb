<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fname = htmlspecialchars($_POST["fname"]);
    $lname = htmlspecialchars($_POST["lname"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = htmlspecialchars($_POST["password"]);
    $file = $_FILES["file"];

    // CEK EKSTENSI FILE
    if(pathinfo($file["name"], PATHINFO_EXTENSION) !== "txt"){
        die("Only accept file .txt!");
    }

    // BACA ISI FILE
    $fileName = $file["name"];
    $fileContent = file_get_contents($file["tmp_name"]);
    $fileLines = explode("\n", $fileContent);

    // AMBIL INFO BROWSER
    $browser = $_SERVER["HTTP_USER_AGENT"];

    // STORE DATA
    session_start();
    $_SESSION["data"] = compact("fname", "lname", "email", "fileName", "fileLines", "browser");
    header("Location: result.php");
    exit;
} else {
    header("Location: form.php");
    exit;
}
?>
