<?php

$email = '"<script>a</script>"@a.c';
var_dump(filter_var($email, FILTER_VALIDATE_EMAIL));

