<?php

// Get cart data sent from JavaScript
$cart = json_decode($_POST["cart"], true);

// Check if cart is empty
if (empty($cart)) {
    echo "<h2>Your cart is empty.</h2>";
    echo "<a href='../index.html'>Go Shopping</a>";
    exit();
}

// Calculate total
$total = 0;

foreach ($cart as $product) {
    $total = $total + ($product["price"] * $product["quantity"]);
}

?>

<!DOCTYPE html>
<html>

<head>

    <title>PastelCart - Order Successful</title>

    <style>

        body {
            font-family: Arial;
            background-color: #fff5f7;
            padding: 40px;
        }

        .order-box {
            max-width: 700px;
            margin: auto;
            background-color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        h1 {
            color: #d77a91;
            text-align: center;
        }

        .product {
            padding: 15px;
            margin: 10px 0;
            background-color: #faf0f3;
            border-radius: 10px;
        }

        .total {
            text-align: right;
            font-size: 22px;
            font-weight: bold;
            color: #555;
            margin-top: 20px;
        }

        .home-btn {
            display: block;
            width: 150px;
            margin: 25px auto 0;
            padding: 12px;
            text-align: center;
            background-color: #d77a91;
            color: white;
            text-decoration: none;
            border-radius: 25px;
        }

    </style>

</head>

<body>

<div class="order-box">

    <h1>🎉 Order Placed Successfully!</h1>

    <p style="text-align:center;">
        Thank you for shopping with <b>PastelCart</b> 💗
    </p>

    <h2>Order Summary</h2>

    <?php foreach ($cart as $product): ?>

        <div class="product">

            <b>
                <?php echo htmlspecialchars($product["name"]); ?>
            </b>

            <br>

            Quantity:
            <?php echo $product["quantity"]; ?>

            <br>

            Price:
            ₹<?php echo $product["price"]; ?>

            <br>

            Subtotal:
            ₹<?php echo $product["price"] * $product["quantity"]; ?>

        </div>

    <?php endforeach; ?>

    <div class="total">

        Total Amount:
        ₹<?php echo $total; ?>

    </div>

    <a href="../index.html" class="home-btn">
        Continue Shopping
    </a>

</div>

</body>

</html>