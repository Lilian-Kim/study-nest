import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  // 리턴값의 타입을 정해주기 위해서
  getAllBoards(): Board[] {
    return this.boards;
  }
}
