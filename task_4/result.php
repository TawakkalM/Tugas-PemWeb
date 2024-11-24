<?php
session_start();
if(!isset($_SESSION["data"])){
    header("Location: form.php");
    exit;
}

$data = $_SESSION["data"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Result</title>
    <style>
        table {
            width: 80%;
            margin: auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ccc;
        }

        h2{
            text-align: center;
        }
    </style>
</head>
<body>
    <h2>Registration Result</h2>
    <table>
        <tr>
            <th>First Name</th>
            <td><?= htmlspecialchars($data["fname"]) ?></td>
        </tr>
        <tr>
        <tr>
            <th>Last Name</th>
            <td><?= htmlspecialchars($data["lname"]) ?></td>
        </tr>
        <tr>
            <th>Email</th>
            <td><?= htmlspecialchars($data["email"]) ?></td>
        </tr>
        <tr>
            <th>Browser Information</th>
            <td><?= htmlspecialchars($data["browser"]) ?></td>
        </tr>
        <tr>
            <th>Document Name</th>
            <td><?= htmlspecialchars($data["fileName"]) ?></td>
        </tr>
    </table>

    <h2>Content Document</h2>
    <table>
        <tr>
            <th>No</th>
            <th>Line</th>
        </tr>
        <?php 
        if (!empty($data['fileLines'])):
            foreach ($data['fileLines'] as $index => $line): 
                if (trim($line) !== ""): // Menampilkan hanya baris dengan konten
        ?>
        <tr>
            <td><?= $index + 1 ?></td>
            <td><?= htmlspecialchars($line) ?></td>
        </tr>
        <?php 
                endif;
            endforeach;
        else: 
        ?>
        <tr>
            <td colspan="2">Document is empty or not any data to show.</td>
        </tr>
        <?php endif; ?>
    </table>
</body>
</html>
