import { PhotoRepository } from "../../../repositories/Photo/PhotoRepository/PhotoRepository";
import Helper from "../../../utils/helper/Helper";
import IRemovePhoto from "./IRemovePhoto";

export default class RemovePhotoRules {

	private repository: PhotoRepository;

	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute( { photoId, key }: IRemovePhoto ){

		await this.repository.destroy(photoId);

		if(Helper.getStorageEnvironmentVariable() === "s3"){ 
			Helper.removeFileAws(key);
		}else{
			Helper.deleteFile(key);
		}

		return "Foto excluída com sucesso";
	}
} 