<?php

function isDataValid($x, $y, $r) {
    if (!($x == -2 || $x == -1.5 || $x == -1 || $x == -0.5 || $x == 0 || $x == 0.5 || $x == 1 || $x == 1.5 || $x == 2)) {
        return false;
    }
    if (is_nan($y) || $y < -5 || $y > 3 || strlen($y) > 12) {
        return false;
    }
    if (is_nan($r) || $r < 2 || $r > 5 || strlen($r) > 12) {
        return false;
    }
    return true;
}

function check($x, $y, $r) {
    if ($x <= 0 && $y <= 0) {
        return $y >= -0.5 * $x - $r / 2 && $x >= -1 * $r;
    } elseif ($x >= 0 && $y >= 0) {
        return $x ** 2 + $y ** 2 <= $r ** 2;
    } elseif ($x >= 0 && $y <= 0) {
        return $x <= $r && $y >= -1 * $r;
    } else {
        return false;
    }
}

    $xValue = $_POST['x'];
    $yValue = $_POST['y'];
    $rValue = $_POST['r'];
    $timezoneOffset = $_POST['timezone'];

    $currentTime = date('H:i:s', time() - $timezoneOffset * 60);

    echo "<tr>";
    if (isDataValid($xValue, $yValue, $rValue)) {
        $result = check($xValue, $yValue, $rValue);
        $text_result = $result ? 'HIT' : 'MISS';

        $executionTime = round((microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) * 1000, 3);

        echo "<td>" . $xValue . "</td>";
        echo "<td>" . $yValue . "</td>";
        echo "<td>" . $rValue . "</td>";
        echo "<td>" . $text_result . "</td>";
        echo "<td>" . $currentTime . "</td>";
        echo "<td>" . $executionTime . "</td>";
    } else {
        echo "<td colspan=\"6\">" . "data is invalid" . "</td>";
    }
    echo "</tr>";