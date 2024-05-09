import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class ResCourseDto {
    @ApiProperty()
    id: UUID;

    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    credits: number;

    @ApiProperty()
    groupId: UUID;

    @ApiProperty({
        isArray: true,
    })
    prereqCourseIds: UUID[];
    
    @ApiProperty({
        isArray: true,
    })
    prereqCourseCodes: string[];
}