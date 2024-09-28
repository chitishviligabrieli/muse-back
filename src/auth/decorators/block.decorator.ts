import { SetMetadata } from '@nestjs/common';

export const IS_BLOCKED_KEY = 'isAdmin';
export const Blocked = () => SetMetadata(IS_BLOCKED_KEY, true)