import { InvalidParamError, MissingParamError } from "../../../../utils/errors";
import { UserRepository } from "../../../../repositories/User/UserRepository/UserRepository";
import IUpdateUserEmail from "./IUpdateUserEmail";

export default class UpdateUserEmailRules {

	private repository: UserRepository;

	constructor() {
		this.repository = new UserRepository;
	}

	async execute( { id, email, token }: IUpdateUserEmail ) {
		if (!email || !token)
			return new MissingParamError("Preencha todos os campos");

		if (token !== await this.repository.getVerificationTokenById(id))
			return new InvalidParamError("Token Inválido");

		if (Date.now() > await this.repository.getVerificationTokenExpiryDateById(id))
			return new InvalidParamError("Link expirado, recomece o processo");

		await this.repository.updateEmail(id, email);

		await this.repository.updateVerificationTokenExpiryDateById(id, 0);

		return "Email atualizado com sucesso";
	}
}