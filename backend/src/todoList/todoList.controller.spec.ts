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

  it(`/GET todoList`, async () => {
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

  it(`/POST todoList`, async () => {
    const response = await request(app.getHttpServer())
      .post('/todo-list/')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(201)
  });




  afterAll(async () => {
    await app.close();
  });
});