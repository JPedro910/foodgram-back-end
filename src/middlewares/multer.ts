import { InvalidParamError } from "../utils/errors/index";

import Helper from "../utils/helper/Helper";
import path from "path";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const storageTypes = {
	local: multer.diskStorage({

		destination: (req, file, callback) => callback(null, "src/utils/tmp"),

		filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
        
	}),

	s3: multerS3({
		s3: new aws.S3({
			accessKeyId: Helper.getAwsAccessKeyEnvironmentVariable(),
			secretAccessKey: Helper.getAwsAccessSecretKeyEnvironmentVariable(),
			region: Helper.getAwsDefaultRegionEnvironmentVariable()
		}),
		bucket: Helper.getBucketNamenvironmentVariable(),
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: "public-read",
		key: (req, file, callback) =>  callback(null, `${Date.now()}-${file.originalname}`)
	})
};

const multerConfig = {

	dest: path.resolve(__dirname, "..", "utils", "tmp"),

	storage: storageTypes[Helper.getStorageEnvironmentVariable()],

	limits: { fileSize: 1024 * 1024 },

	fileFilter: (req, file, callback) => {
      
		const allowedTypes = [
			"image/jpeg",
			"image/png"
		];

		if (allowedTypes.includes(file.mimetype)) 
			return callback(null, true);

		callback(new InvalidParamError("Tipo de Arquivo inválido, a imagem precisa estar em formato JPEG ou PNG"));

	}
};

export default multer(multerConfig).single("file");