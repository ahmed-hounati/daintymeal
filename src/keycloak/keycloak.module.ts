import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [ConfigModule],
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {}