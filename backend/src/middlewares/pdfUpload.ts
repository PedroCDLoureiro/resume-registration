import multer from 'multer';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (_req, file, callback) => {
    const isPdf =
        file.mimetype === 'application/pdf' && file.originalname.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
        return callback(new Error('O arquivo deve ser um PDF válido.'));
    }

    callback(null, true);
};

export const uploadPdf = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter,
});
