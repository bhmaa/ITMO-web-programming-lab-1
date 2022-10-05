<?php

function check($x, $y, $r)
{
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

    session_start();
    if(!isset($_SESSION['data'])) {
        $_SESSION['data'] = array();
    }
    $xValue = floatval($_POST['x']);
    $yValue = floatval($_POST['y']);
    $rValue = floatval($_POST['r']);
    $timezoneOffset = $_POST['timezone'];

    $currentTime = date('H:i:s', time() - $timezoneOffset * 60);

    $result = check($xValue, $yValue, $rValue);
    $text_result = $result ? 'hit' : 'miss';

    $executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

    $answer = array("x"=>$xValue, "y"=>$yValue, "r"=>$rValue, "result"=>$text_result, "current_time"=>$currentTime,
        "execution_time"=>$executionTime);

    $_SESSION['data'][] = $answer;

    echo "<tr>";
    echo "<td>" . $xValue. "</td>";
    echo "<td>" . $yValue . "</td>";
    echo "<td>" . $rValue . "</td>";
    echo "<td>" . $text_result . "</td>";
    echo "<td>" . $currentTime . "</td>";
    echo "<td>" . $executionTime . "</td>";
    echo "</tr>";