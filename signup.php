<?php

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form data
  $name = $_POST["name"];
  $surname = $_POST["surname"];
  $password = $_POST["password"];
  $confirm_password = $_POST["confirm_password"];
  $address_lane_1 = $_POST["address_lane_1"];
  $address_lane_2 = $_POST["address_lane_2"];
  $landmark = $_POST["landmark"];
  $city = $_POST["city"];
  $state = $_POST["state"];
  $pincode = $_POST["pincode"];

  // Validate the form data
  if (empty($name) || empty($surname) || empty($password) || empty($confirm_password) || empty($address_lane_1) || empty($city) || empty($state) || empty($pincode)) {
    echo "Please fill in all the required fields.";
  } elseif ($password != $confirm_password) {
    echo "Passwords do not match.";
  } else {
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Connect to the database
    $mongo = new MongoDB\Client;
    $db = $mongo->ecommerce;
    $collection = $db->users;

    // Insert the user data into the database
    $insertOneResult = $collection->insertOne([
      'name' => $name,
      'surname' => $surname,
      'password' => $hashed_password,
      'address_lane_1' => $address_lane_1,
      'address_lane_2' => $address_lane_2,
      'landmark' => $landmark,
      'city' => $city,
      'state' => $state,
      'pincode' => $pincode
    ]);

    // Check if the insert was successful
    if ($insertOneResult->getInsertedCount() == 1) {
      echo "User registered successfully.";
    } else {
      echo "Error registering user.";
    }
  }
}

?>
