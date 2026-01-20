<?php

  // Your receiving email
  $receiving_email_address = 'praveensrivastav3july@zohomail.in';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/validate.js' ) ) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  // Required fields
  $contact->to = $receiving_email_address;
  $contact->from_name  = $_POST['name']   ?? '';
  $contact->from_email = $_POST['email']  ?? '';
  $contact->subject    = $_POST['subject'] ?? 'Contact Form Message';

  // OPTIONAL: SMTP (recommended with Zoho)
  /*
  $contact->smtp = array(
    'host' => 'smtp.zoho.in',
    'username' => 'praveensrivastav3july@zohomail.in',
    'password' => 'YOUR_ZOHO_APP_PASSWORD',
    'port' => '587'
  );
  */

  // Email body content
  $contact->add_message( $_POST['name']    ?? '', 'From');
  $contact->add_message( $_POST['email']   ?? '', 'Email');
  $contact->add_message( $_POST['message'] ?? '', 'Message', 10);

  echo $contact->send();
?>
