import {NotificationTypeEnum} from '../utils/NotificationTypeEnum';

export interface NotificationModel {
  message?: string;
  type?: NotificationTypeEnum
}
