import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { AuthUser } from '../interfaces/auth-user.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' })
  }

  async validate(login: string, password: string): Promise<AuthUser> {
    return this.authService.validateUser({ login, password })
  }
}