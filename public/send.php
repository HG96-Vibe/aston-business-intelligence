<?php
/*
 * ABI website form handler (Namecheap / cPanel).
 * Both forms (contact, careers) post here. Each submission is emailed to ONE inbox only
 * (enquiries@), with the visitor set as Reply-To. Nothing is ever sent to the visitor and
 * nothing is booked automatically.
 */

declare(strict_types=1);

const MAIL_TO    = 'enquiries@astonbusinessintelligence.co.uk';
const MAIL_FROM  = 'enquiries@astonbusinessintelligence.co.uk';   // must be a mailbox on this hosting
const FROM_NAME  = 'ABI website';
const SITE_HOST  = 'astonbusinessintelligence.co.uk';
const MAX_CV     = 5 * 1024 * 1024;
const RATE_MAX   = 5;     // submissions per IP …
const RATE_SECS  = 600;   // … per 10 minutes

date_default_timezone_set('Europe/London');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(bool $ok, string $message = '', int $code = 200): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}
function field(string $k, int $max = 300): string {
    $v = isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : '';
    return mb_substr($v, 0, $max);
}
function oneLine(string $v): string { return trim(preg_replace('/[\r\n\t]+/', ' ', $v)); }   // no header injection
function isEmail(string $v): bool { return (bool) filter_var($v, FILTER_VALIDATE_EMAIL); }

$fallback = 'Something went wrong sending your message. Please email ' . MAIL_TO . ' instead.';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(false, 'Method not allowed.', 405);

// Only accept posts from this site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST) ?: '';
    $self = parse_url('//' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST) ?: '';
    if ($host !== SITE_HOST && $host !== 'www.' . SITE_HOST && $host !== $self) reply(false, 'Not allowed.', 403);
}

// Honeypot: real people never fill this in. Pretend it worked.
if (field('company_website') !== '') reply(true);

// Simple per-IP rate limit (file-based, private temp dir).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$dir = sys_get_temp_dir() . '/abi-forms';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$bucket = $dir . '/' . hash('sha256', $ip);
$now = time();
$hits = array_filter(array_map('intval', @file($bucket, FILE_IGNORE_NEW_LINES) ?: []), fn($t) => $t > $now - RATE_SECS);
if (count($hits) >= RATE_MAX) reply(false, 'Too many messages in a short time. Please try again in a few minutes, or email ' . MAIL_TO . '.', 429);
$hits[] = $now;
@file_put_contents($bucket, implode("\n", $hits), LOCK_EX);

$form  = field('form', 20);
$name  = oneLine(field('name', 120));
$email = oneLine(field('email', 200));
if (mb_strlen($name) < 2) reply(false, 'Please enter your name.', 422);
if (!isEmail($email)) reply(false, 'Please enter a valid email address.', 422);

$attachment = null;

if ($form === 'contact') {
    $company  = oneLine(field('company', 160));
    $phone    = oneLine(field('phone', 60));
    $interest = oneLine(field('interest', 120));
    $when     = oneLine(field('when', 120));
    $message  = field('message', 5000);
    if (mb_strlen($message) < 10) reply(false, 'Tell us a little more about what you need.', 422);

    $subject = 'Call request — ' . $name . ($company !== '' ? " ($company)" : '');
    $body = implode("\n", [
        "Name: $name",
        "Email: $email",
        'Company: ' . ($company ?: '—'),
        'Phone: ' . ($phone ?: '—'),
        'Interested in: ' . ($interest ?: '—'),
        'Preferred time: ' . ($when ?: 'no preference'),
        '',
        $message,
    ]);
} elseif ($form === 'careers') {
    $fallback = 'Something went wrong. Please email your CV to ' . MAIL_TO . ' instead.';
    $linkedin = oneLine(field('linkedin', 300));
    $area     = oneLine(field('area', 120));
    $level    = oneLine(field('level', 120));
    $message  = field('message', 5000);

    if (isset($_FILES['cv']) && is_array($_FILES['cv']) && ($_FILES['cv']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $f = $_FILES['cv'];
        if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE || $f['size'] > MAX_CV) reply(false, 'Please keep your CV under 5 MB.', 422);
        if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) reply(false, $fallback, 400);
        $ext = strtolower(pathinfo((string) $f['name'], PATHINFO_EXTENSION));
        $types = ['pdf' => ['application/pdf'], 'doc' => ['application/msword', 'application/CDFV2', 'application/x-ole-storage'], 'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']];
        $mime = function_exists('finfo_open') ? (string) finfo_file(finfo_open(FILEINFO_MIME_TYPE), $f['tmp_name']) : '';
        if (!isset($types[$ext]) || ($mime !== '' && !in_array($mime, $types[$ext], true))) reply(false, 'Please upload a PDF or Word document.', 422);
        $safeName = preg_replace('/[^A-Za-z0-9._-]+/', '_', mb_substr(pathinfo((string) $f['name'], PATHINFO_FILENAME), 0, 60)) . '.' . $ext;
        $attachment = ['name' => $safeName, 'type' => $types[$ext][0], 'data' => file_get_contents($f['tmp_name'])];
    }

    $subject = 'Talent pool — ' . $name . ' (' . ($area ?: 'unspecified') . ')';
    $body = implode("\n", [
        "Name: $name",
        "Email: $email",
        'LinkedIn: ' . ($linkedin ?: '—'),
        'Area: ' . ($area ?: '—'),
        'Level: ' . ($level ?: '—'),
        'CV: ' . ($attachment ? 'attached' : 'not attached'),
        '',
        $message !== '' ? $message : '(no message)',
    ]);
} else {
    reply(false, $fallback, 400);
}

$body .= "\n\n—\nSent from the website form at " . date('j M Y, H:i') . " (UK time). Reply to this email to answer them directly.";

// Build the message.
$encSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'From: ' . FROM_NAME . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>',
    'MIME-Version: 1.0',
    'X-Mailer: ABI website',
];

if ($attachment) {
    $boundary = 'abi_' . bin2hex(random_bytes(12));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $message = "--$boundary\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($body)) . "\r\n"
        . "--$boundary\r\n"
        . 'Content-Type: ' . $attachment['type'] . '; name="' . $attachment['name'] . "\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . 'Content-Disposition: attachment; filename="' . $attachment['name'] . "\"\r\n\r\n"
        . chunk_split(base64_encode($attachment['data'])) . "\r\n"
        . "--$boundary--\r\n";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: base64';
    $message = chunk_split(base64_encode($body));
}

$sent = @mail(MAIL_TO, $encSubject, $message, implode("\r\n", $headers), '-f' . MAIL_FROM);

if (!$sent) reply(false, $fallback, 500);
reply(true);
