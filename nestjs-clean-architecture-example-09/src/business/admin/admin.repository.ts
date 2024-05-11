export interface IAdminRepository {
  getAdminReward(adminId: number): Promise<string>
}
