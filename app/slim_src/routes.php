<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Routes

$app->get('/', function ($request, $response, $args) {
    // Render index view (GAME)
    return $this->renderer->render($response, 'index.phtml', $args);
});