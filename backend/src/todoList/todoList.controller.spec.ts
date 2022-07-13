import request from 'supertest';
import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { describe, beforeAll, it, afterAll, expect } from 'vitest';

describe('todoList에 get요청을 보내면 전체 todoList가 반환된다', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.init();
  });

  it(`GET /todo-list`, async () => {
    const response = await request(app.getHttpServer())
      .get('/todo-list')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200)
    expect(response.body).toEqual([
          {
           "completed": false,
           "content": "우르롹끼님",
           "createdAt": 1655992913234,
         },
          {
           "completed": false,
           "content": "메모하기",
           "createdAt": 24,
         },
       ])
  });


  it(`POST /todo-list`, async () => {
    const response = await request(app.getHttpServer())
      .post('/todo-list')
      .send({ 
        "completed": false,
        "content": "북북춤 추기",
        "createdAt": 24,
        })
      .set('Content-Type', 'application/json');
        
    expect(response.status).toEqual(201)
  });

  it(`DELETE /todo-list/:content`, async () => {
    const response = await request(app.getHttpServer())
      .delete(encodeURI('/todo-list/북북춤 추기'))

    expect(response.status).toEqual(200)
  });

  it(`PATCH /todo-list/:content`, async () => {
    const response = await request(app.getHttpServer())
      .patch(encodeURI('/todo-list/북북춤 추기'))

    expect(response.status).toEqual(200)
  });

  afterAll(async () => {
    await app.close();
  });
});