import { CreatePlayerUseCase} from "./CreatePlayer.UseCase";
import { controller, httpPost, interfaces, requestBody, response } from "inversify-express-utils";
import { ICreatePlayerDTO, ICreatePlayerReturn } from "./ICreatePlayer.DTO";
import { Player } from "@entities/Player";


@controller('/player/create')
export class CreatePlayerController implements interfaces.Controller {
    
    constructor(private createPlayerUseCase: CreatePlayerUseCase) { }
      
    @httpPost('/')
    async execute(@requestBody() data: ICreatePlayerDTO, @response() res): Promise<ICreatePlayerReturn> {
        try {
            const dataReturn = await this.createPlayerUseCase.execute(data);
            return res.status(201).json(dataReturn);
        } catch (error: any) {
            throw new Error(error);(error || 'Internal server error!');
        }
    }   
}