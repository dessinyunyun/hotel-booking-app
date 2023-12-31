import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserAccountDto {
    @IsNotEmpty()
    usac_user_id: number;

    @IsNotEmpty()
    usac_entity_id:number;

    @IsNotEmpty()
    usac_account_number: string;

    @IsNotEmpty()
    usac_type: string;

    @IsOptional()
    usac_saldo: string;

    @IsOptional()
    usac_expmonth: number;

    @IsOptional()
    usac_expyear:  number;
}
