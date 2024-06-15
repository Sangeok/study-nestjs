import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundError } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
  });

  it('should throw 404 error', () => {
    try {
      service.getOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      expect(e.message).toEqual('Movie with ID 999 not found.');
    }
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeMovies = service.getAll().length;
      service.deleteOne(1);
      const afterMovies = service.getAll().length;
      expect(afterMovies).toBeLessThan(beforeMovies);
    });
  });

  describe('create()', () => {
    it('create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(beforeCreate).toBeLessThan(afterCreate);
    });
  });
});
