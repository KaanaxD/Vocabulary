import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

const { mockQuery } = vi.hoisted(() => {
  return { mockQuery: vi.fn() }
})

vi.mock('pg', () => ({
  Pool: function () {
    return { query: mockQuery }
  },
}))

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(() => Promise.resolve('hashed_password')),
    compare: vi.fn(() => Promise.resolve(true)),
  },
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(() => 'mocked_jwt_token'),
  },
}))

import { authRouter } from '../routes/auth.route'
import { errorHandler } from '../middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)
app.use(errorHandler)

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should register a new user successfully', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashed_password',
      created_at: new Date().toISOString(),
    }
    mockQuery.mockResolvedValueOnce({ rows: [mockUser] })

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toEqual(mockUser)
  })

  it('should return 400 for short username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'ab', password: 'password123' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: '1234567' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 500 when DB insert fails', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] })

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' })

    expect(res.status).toBe(500)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe('akun gagal dibuat')
  })
})

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should login successfully', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashed_password',
      created_at: new Date().toISOString(),
    }
    mockQuery.mockResolvedValueOnce({ rows: [mockUser] })

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('berhasil login')
    expect(res.body.token).toBe('mocked_jwt_token')
  })

  it('should return 404 when user not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] })

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nonexistent', password: 'password123' })

    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe('user tidak ditemukan')
  })

  it('should return 400 for short username', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'ab', password: 'password123' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: '1234567' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})
