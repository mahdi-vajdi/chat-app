import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IRefreshToken,
  IRefreshTokenEntity,
} from '@auth/models/refresh-token.model';

@Entity({
  name: 'refresh_tokens',
  comment:
    'Stores the refresh tokens that are issued to the user for authentication',
})
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({
    type: 'bigint',
    comment: 'The user id which this refresh token belongs to',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'The hashed string of the actual token',
  })
  token: string;

  @Column({
    type: 'varchar',
    unique: true,
    comment: 'A unique id to identify the jwt. usually a uuid',
  })
  identifier: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  static fromDomain(refreshToken: IRefreshToken): RefreshTokenEntity {
    if (!refreshToken) return null;

    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.userId = refreshToken.userId;
    refreshTokenEntity.token = refreshToken.token;
    refreshTokenEntity.identifier = refreshToken.identifier; // Assuming id is unique and can be used as identifier

    return refreshTokenEntity;
  }

  static toDomain(refreshTokenEntity: RefreshTokenEntity): IRefreshTokenEntity {
    if (!refreshTokenEntity) return null;

    return {
      id: refreshTokenEntity.id,
      userId: refreshTokenEntity.userId,
      token: refreshTokenEntity.token,
      identifier: refreshTokenEntity.identifier,
      createdAt: refreshTokenEntity.createdAt,
      updatedAt: refreshTokenEntity.updatedAt,
      deletedAt: refreshTokenEntity.deletedAt,
    };
  }
}
