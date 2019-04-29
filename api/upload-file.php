<?php



require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../includes/requests.php';
require_once __DIR__ . '/../includes/config.php';

$upload = new \Delight\FileUpload\FileUpload();
$upload->withTargetDirectory(__DIR__ . '/../uploads');
$upload->from('file');

try {
    $uploadedFile = $upload->save();

    $stmt = $db->prepare('INSERT INTO files (displayname, filename, filesize) VALUES (?, ?, ?)');
    $stmt->execute([
        $_FILES['file']['name'],
        $uploadedFile->getFilenameWithExtension(),
        $_FILES['file']['size']
    ]);

    // success: $uploadedFile->getFilenameWithExtension()
    sendResponse(201, ['message' => 'Uploaded successfully']);
}
catch (\Delight\FileUpload\Throwable\InputNotFoundException $e) {
    // input not found
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}
catch (\Delight\FileUpload\Throwable\InvalidFilenameException $e) {
    // invalid filename
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}
catch (\Delight\FileUpload\Throwable\InvalidExtensionException $e) {
    // invalid extension
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}
catch (\Delight\FileUpload\Throwable\FileTooLargeException $e) {
    // file too large
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}
catch (\Delight\FileUpload\Throwable\UploadCancelledException $e) {
    // upload cancelled
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}
catch (Exception $e) {
    // upload cancelled
    sendResponse(400, ['message' => 'Uploaded failed: ' . $e->getMessage()]);
}