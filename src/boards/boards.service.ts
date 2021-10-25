import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { threadId } from 'worker_threads';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // // 리턴값의 타입을 정해주기 위해서
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoardById(id: number): void {
    this.boardRepository.deleteBoardById(id);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getBoards();
  }
  // getBoardById(id: string) {
  //   const board = this.boards.find((board) => board.id === id);
  //   if (!board) throw new NotFoundException(`Can not find Board with id ${id}`);
  //   return board;
  // }
  // deleteBoardById(id: string): void {
  //   const board = this.getBoardById(id);
  //   this.boards = this.boards.filter(({ id }) => id !== board.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
