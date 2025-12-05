<?php
// 文件路径
$file = __DIR__ . "/messages.json";

// 如果文件不存在，初始化为空数组
if (!file_exists($file)) file_put_contents($file, '[]');

$messages = json_decode(file_get_contents($file), true) ?: [];

// 获取动作
$action = $_GET['action'] ?? '';

if ($action === 'list') {
    // 返回消息列表
    echo json_encode(array_values($messages), JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'add') {
    // 获取新内容
    $text = trim($_POST["text"] ?? "");
    if ($text === "") {
        exit(json_encode(['error'=>'empty']));
    }

    // 插入新消息
    $messages[] = [
        "text" => htmlspecialchars($text, ENT_QUOTES),
        "time" => time()
    ];

    // 清理超过 24 小时的数据
    $messages = array_filter($messages, function($m) {
        return $m["time"] >= (time() - 86400);
    });

    // 最多保留 50 条
    $messages = array_slice($messages, -50, 50, true);

    // 写入文件并检查是否成功
    $result = file_put_contents($file, json_encode(array_values($messages), JSON_UNESCAPED_UNICODE));
    if($result === false){
        http_response_code(500);
        echo json_encode(['error'=>'写入失败']);
        exit;
    }

    // 返回成功
    echo json_encode(['success'=>true], JSON_UNESCAPED_UNICODE);
    exit;
}

// 其他情况
http_response_code(400);
echo json_encode(['error'=>'invalid action'], JSON_UNESCAPED_UNICODE);
