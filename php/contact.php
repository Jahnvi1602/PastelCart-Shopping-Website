<?php

// Get data from the form
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

// Check if fields are empty
if (empty($name) || empty($email) || empty($message)) {
    echo "<h2>Please fill all the fields.</h2>";
    echo "<a href='../contact.html'>Go Back</a>";
    exit();
}

// Check email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<h2>Please enter a valid email address.</h2>";
    echo "<a href='../contact.html'>Go Back</a>";
    exit();
}

// Display success message
echo "<!DOCTYPE html>";
echo "<html>";
echo "<head>";
echo "<title>PastelCart - Contact</title>";

echo "<style>
        body {
            font-family: Arial;
            background-color: #fff5f7;
            text-align: center;
            padding: 80px;
        }

        .box {
            background-color: white;
            padding: 40px;
            max-width: 500px;
            margin: auto;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        h1 {
            color: #d77a91;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #d77a91;
            color: white;
            text-decoration: none;
            border-radius: 25px;
        }
      </style>";

echo "</head>";

echo "<body>";

echo "<div class='box'>";

echo "<h1>Thank You, $name! 💗</h1>";

echo "<p>Your message has been received successfully.</p>";

echo "<p>We will contact you at <b>$email</b>.</p>";

echo "<a href='../index.html'>Back to Home</a>";

echo "</div>";

echo "</body>";
echo "</html>";

?>