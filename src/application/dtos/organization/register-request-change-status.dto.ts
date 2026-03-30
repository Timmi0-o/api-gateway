export type TRegisterRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REGISTRATION' | 'NEW';

export interface IChangeRegisterRequestStatusBodyDto {
  status: TRegisterRequestStatus;
  rejectionReason?: string;
}
