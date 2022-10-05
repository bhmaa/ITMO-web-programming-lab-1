<?php
session_start();
if(isset($_SESSION['data'])) {
    foreach ($_SESSION['data'] as $i) {
        echo "<tr>";
        echo "<td>" . $i['x'] . "</td>";
        echo "<td>" . $i['y'] . "</td>";
        echo "<td>" . $i['r'] . "</td>";
        echo "<td>" . $i['result'] . "</td>";
        echo "<td>" . $i['current_time'] . "</td>";
        echo "<td>" . $i['execution_time'] . "</td>";
        echo "</tr>";
    }
}