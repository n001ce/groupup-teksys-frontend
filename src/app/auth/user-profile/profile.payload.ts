import { CommentPayload } from "src/app/comment/comment.payload";
import { GameModel } from "src/app/game/game-response";
import { TeamModel } from "src/app/shared/team-model";
import { Member } from "src/app/team/view-team/member.payload";

export class ProfilePayload{
    userId?: number;
    username?: string;
    games?: GameModel[];
    teams?: TeamModel[];
    joinedTeams?: TeamModel[];
    comments?: CommentPayload[];
    joinedDate?: Date;
}