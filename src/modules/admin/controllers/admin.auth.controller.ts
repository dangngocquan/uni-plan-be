import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResTokenDto } from '../../auth/dto/res.token.dto';
import { ReqLoginDto } from '../../auth/dto/req.login.dto';

@Controller('admin/auth')
@ApiTags('Admin Auth')
export class AdminAuthController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Admin login.',
    type: ResTokenDto,
  })
  async login(@Body() dto: ReqLoginDto): Promise<ResTokenDto> {
    return await this.adminService.login(dto);
  }
}
