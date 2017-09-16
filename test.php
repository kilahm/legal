<?php
$pattern = '/^\{(?:(.+?),)*\}$/';
$result = preg_match($pattern, '{abc}', $matches);
var_dump($result, $matches);
