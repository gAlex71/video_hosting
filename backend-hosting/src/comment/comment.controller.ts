import { Controller, UsePipes, ValidationPipe, HttpCode, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';
import { CommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createComment(@CurrentUser('id') id: string, @Body() dto: CommentDto){
    return this.commentService.create(+id, dto);
  }
}
