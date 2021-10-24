import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  // 리턴값의 타입을 정해주기 위해서
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string) {
    const board = this.boards.find((board) => board.id === id);
    if (!board) throw new NotFoundException(`Can not find Board with id ${id}`);
    return board;
  }

  deleteBoardById(id: string): void {
    const board = this.getBoardById(id);
    this.boards = this.boards.filter(({ id }) => id !== board.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
