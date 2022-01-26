import IPhotoTestRepository from "./IPhotoTestRepository";
import prisma from "../../../../prisma/index";
import { Photo } from "../../../entities/Photo";

export class PhotoTestRepository implements IPhotoTestRepository {

	async createTestPhoto(): Promise<void> {
		try {
			await prisma.user.create({
				data: {
					id: "aa98bc1b-22f4-4fc6-be64-3d830068bdqqaaaaaaaa",
					email: "joao@teste.com",
					name: "João Pedro",
					password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
					verificationToken: "544f818f5f5cd4cde44c611683fc71",
					verifiedEmail: true
				}
			});
		}

		catch(e) {
			console.log(e);
		}
	}

	async getPhotos(): Promise<Photo[]> {
		try {
			const photo = await prisma.photo.findMany();
			return photo;
		}

		catch(e) {
			console.log(e);
		}
	}

	async deleteTestPhoto(): Promise<void> {
		try {
			await prisma.photo.deleteMany({});
			await prisma.user.deleteMany({});
		}

		catch(e) {
			console.log(e);
		}
	}
}
