export type TRegisterRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface IChangeRegisterRequestStatusBodyDto {
  status: TRegisterRequestStatus;
  rejectionReason?: string;
}
