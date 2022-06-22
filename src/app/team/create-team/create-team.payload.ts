export class CreateTeamPayload{
    teamId?:number;
    teamName: string;
    gameTitle: string;
    teamSize?: number;
    url?: string;
    username?: string;
    console?: string;
}