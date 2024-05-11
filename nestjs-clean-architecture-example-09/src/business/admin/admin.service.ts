export interface IAdminService {
  all(): Promise<any[]>
  getAdminReward(adminId: number): Promise<string>
}
